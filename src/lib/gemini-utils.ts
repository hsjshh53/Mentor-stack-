/**
 * Utility to wait for a certain duration.
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Request Queue to manage concurrency and rate limiting.
 */
export type AIStatus = 'Healthy' | 'Limited Quota' | 'Quota Reached' | 'Queue Paused';

interface QueueTask {
  id: string;
  name: string;
  priority: number;
  requestedAt: number;
  fn: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

class GeminiQueue {
  private queue: QueueTask[] = [];
  private activeRequests = 0;
  private maxConcurrency = 1; 
  private batchDelay = 7500; 
  private status: AIStatus = 'Healthy';
  private lowQuotaMode = false;

  async add<T>(fn: () => Promise<T>, metadata: { id?: string, name?: string, priority?: number } = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      const task: QueueTask = {
        id: metadata.id || Math.random().toString(36).substring(7),
        name: metadata.name || 'AI Task',
        priority: metadata.priority || 0,
        requestedAt: Date.now(),
        fn,
        resolve,
        reject
      };

      this.queue.push(task);
      this.queue.sort((a, b) => b.priority - a.priority); // High priority first
      this.process();
    });
  }

  pause() {
    this.status = 'Queue Paused';
    // We don't wipe the queue anymore, we store pending lessons
  }

  setQuotaStatus(status: AIStatus) {
    this.status = status;
    if (status === 'Quota Reached' || status === 'Queue Paused') {
      // Pause processing
    } else if (status === 'Limited Quota') {
      this.lowQuotaMode = true;
      this.batchDelay = 15000; // Slower in low quota
    } else {
      this.lowQuotaMode = false;
      this.batchDelay = 7500;
    }
  }

  resume() {
    this.status = 'Healthy';
    this.lowQuotaMode = false;
    this.process();
  }

  private async process() {
    if (this.queue.length === 0 || this.activeRequests >= this.maxConcurrency || this.status === 'Queue Paused' || this.status === 'Quota Reached') {
      return;
    }

    const task = this.queue.shift();
    if (task) {
      this.activeRequests++;
      try {
        // Add delay between requests
        await sleep(this.batchDelay + (Math.random() * 2000));
        const result = await task.fn();
        task.resolve(result);
      } catch (error) {
        task.reject(error);
      } finally {
        this.activeRequests--;
        this.process();
      }
    }
  }

  getQueueStatus() {
    return {
      active: this.activeRequests,
      pending: this.queue.length,
      status: this.status,
      isPaused: this.status === 'Queue Paused' || this.status === 'Quota Reached',
      lowQuotaMode: this.lowQuotaMode,
      pendingTasks: this.queue.map(t => ({ id: t.id, name: t.name, requestedAt: t.requestedAt }))
    };
  }
}

const geminiQueue = new GeminiQueue();
export const getQueueStatus = () => geminiQueue.getQueueStatus();

/**
 * Enhanced Gemini API call with strict exponential backoff (15s, 30s, 60s) 
 * and queue management. Max 3 attempts as per stability system rules.
 */
export const callGeminiWithRetry = async (fn: () => Promise<any>, metadata: { id?: string, name?: string, priority?: number } = {}) => {
  let lastError: any;
  const retryDelays = [15000, 30000, 60000]; 
  const maxRetries = 3;
  
  return await geminiQueue.add(async () => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await fn();
        geminiQueue.setQuotaStatus('Healthy');
        return result;
      } catch (error: any) {
        lastError = error;
        
        let errorMsg = "";
        if (typeof error.message === 'string') {
          errorMsg = error.message;
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (typeof error === 'string') {
          errorMsg = error;
        } else {
          try {
            errorMsg = JSON.stringify(error);
          } catch {
            errorMsg = String(error);
          }
        }
        
        const normalizedMsg = errorMsg.toLowerCase();
        const isRateLimit = 
          normalizedMsg.includes("429") || 
          normalizedMsg.includes("resource_exhausted") || 
          normalizedMsg.includes("quota") || 
          normalizedMsg.includes("rate limit") ||
          (error.status === 429) ||
          (error.code === 429) ||
          (error.error?.code === 429) ||
          (error.error?.status === "RESOURCE_EXHAUSTED");
        
        const isTransient = 
          normalizedMsg.includes("503") || 
          normalizedMsg.includes("500") || 
          normalizedMsg.includes("overloaded") || 
          normalizedMsg.includes("deadline exceeded");

        if (isRateLimit) {
          geminiQueue.setQuotaStatus('Limited Quota');
        }

        if ((isRateLimit || isTransient) && i < maxRetries - 1) {
          const delay = retryDelays[i];
          console.warn(`[Stability System] AI Quota Reset Needed. Waiting ${delay / 1000}s... (Attempt ${i + 1}/${maxRetries})`);
          await sleep(delay);
          continue;
        }
        
        // Final failure after 3 attempts
        if (isRateLimit) {
          geminiQueue.setQuotaStatus('Quota Reached');
          console.error("AI provider quota reached. Generation will resume automatically later.");
          
          // Smart Scheduler: Delay next run (Auto-resume after 1 hour or manually)
          setTimeout(() => {
            geminiQueue.resume();
          }, 3600000); // 1 hour
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }, metadata);
};

/**
 * Robustly parses JSON from AI response, handling potential markdown wrappers 
 * and unescaped control characters.
 */
export const safeJsonParse = (text: string) => {
  if (!text) return null;
  
  let cleaned = text.trim();
  
  // 1. Remove Markdown code blocks
  if (cleaned.includes('```')) {
    const match = cleaned.match(/```(?:json)?([\s\S]*?)```/);
    if (match && match[1]) {
      cleaned = match[1].trim();
    } else {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
  }

  // 2. Clear BOM and other invisible chars
  cleaned = cleaned.replace(/^\ufeff/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "");

  // 3. Extract JSON part if AI returned conversational text
  if (!cleaned.startsWith('{') && !cleaned.startsWith('[') && (cleaned.includes('{') || cleaned.includes('['))) {
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    let startIndex = -1;
    if (firstBrace !== -1 && firstBracket !== -1) startIndex = Math.min(firstBrace, firstBracket);
    else if (firstBrace !== -1) startIndex = firstBrace;
    else if (firstBracket !== -1) startIndex = firstBracket;
    
    if (startIndex !== -1) {
      let lastIndex = -1;
      const lastBrace = cleaned.lastIndexOf('}');
      const lastBracket = cleaned.lastIndexOf(']');
      lastIndex = Math.max(lastBrace, lastBracket);
      
      if (lastIndex > startIndex) {
        cleaned = cleaned.substring(startIndex, lastIndex + 1);
      }
    }
  }

  const attemptParse = (str: string): any => {
    try {
      return JSON.parse(str);
    } catch (e: any) {
      let fixed = str;

      // Fix unescaped control characters in string literals
      fixed = fixed.replace(/[\u0000-\u001F]/g, (char) => {
        const code = char.charCodeAt(0);
        if (code === 10) return '\\n'; // newline
        if (code === 13) return '\\r'; // carriage return
        if (code === 9) return '\\t';  // tab
        return ''; // remove other control characters
      });

      // Fix trailing commas
      fixed = fixed.replace(/,\s*([\]}])/g, '$1');

      // Fix single quotes for keys
      fixed = fixed.replace(/(\{|,)\s*'([^"':]+)':/g, '$1"$2":');

      try {
        return JSON.parse(fixed);
      } catch (e2) {
        // Try fixing unquoted keys
        let unquotedFixed = fixed.replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
        try {
          return JSON.parse(unquotedFixed);
        } catch (e3) {
            // One last attempt: maybe accidental double braces
            if (fixed.startsWith('{{') && fixed.endsWith('}}')) {
                return attemptParse(fixed.substring(1, fixed.length - 1));
            }
            throw e;
        }
      }
    }
  };

  try {
    return attemptParse(cleaned);
  } catch (e) {
    console.error("[Gemini Utils] JSON Parse Failure:", e);
    console.log("Raw response snippet:", text.substring(0, 500));
    throw new Error(`Failed to decode AI response: ${e instanceof Error ? e.message : String(e)}`);
  }
};
