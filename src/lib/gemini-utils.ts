import { GoogleGenAI } from "@google/genai";
import Groq from 'groq-sdk';

/**
 * Utility to wait for a certain duration.
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Request Queue to manage concurrency and rate limiting.
 */
export type AIStatus = 'Healthy' | 'Busy' | 'Low Quota' | 'Queue Paused';

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
  private batchDelay = 35000; // High base delay (35s) for stability on free/low-tier quotas
  private status: AIStatus = 'Healthy';
  private lowQuotaMode = false;
  private totalProcessed = 0;
  private consecutiveSuccesses = 0;
  private startTime = Date.now();

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
  }

  setQuotaStatus(status: AIStatus) {
    this.status = status;
    if (status === 'Queue Paused') {
      this.consecutiveSuccesses = 0;
    } else if (status === 'Low Quota') {
      this.lowQuotaMode = true;
      this.batchDelay = Math.max(this.batchDelay, 45000); 
      this.consecutiveSuccesses = 0;
    } else if (status === 'Busy') {
      this.batchDelay = Math.max(this.batchDelay, 35000);
    } else {
      this.lowQuotaMode = false;
      // Don't reset delay immediately to Healthy value, let it lower slowly via process()
    }
  }

  resume() {
    this.status = 'Healthy';
    this.lowQuotaMode = false;
    this.batchDelay = Math.max(this.batchDelay, 40000); // Start slow on resume
    this.process();
  }

  private async process() {
    if (this.queue.length === 0 || this.activeRequests >= this.maxConcurrency || this.status === 'Queue Paused') {
      return;
    }

    const task = this.queue.shift();
    if (task) {
      this.activeRequests++;
      this.status = this.lowQuotaMode ? 'Low Quota' : 'Busy';
      try {
        const delay = this.batchDelay + (Math.random() * 8000);
        await sleep(delay);
        const result = await task.fn();
        this.totalProcessed++;
        this.consecutiveSuccesses++;
        
        // Adaptive Speed: Slowly reduce delay every 3 successes
        if (this.consecutiveSuccesses >= 3 && this.batchDelay > 15000) {
          this.batchDelay -= 2000;
          this.consecutiveSuccesses = 0;
        }
        
        task.resolve(result);
      } catch (error) {
        this.consecutiveSuccesses = 0;
        task.reject(error);
      } finally {
        this.activeRequests--;
        const currentStatus = this.status as AIStatus;
        if (currentStatus !== 'Queue Paused' && currentStatus !== 'Low Quota') {
          this.status = 'Healthy';
        }
        await sleep(2000);
        this.process();
      }
    }
  }

  getQueueStatus() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const rate = this.totalProcessed > 0 ? elapsed / this.totalProcessed : 0;
    const eta = this.queue.length * (this.batchDelay / 1000 + 5); 

    return {
      active: this.activeRequests,
      pending: this.queue.length,
      status: this.status,
      isPaused: this.status === 'Queue Paused',
      lowQuotaMode: this.lowQuotaMode,
      totalProcessed: this.totalProcessed,
      etaSeconds: Math.round(eta),
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
  const retryDelays = [20000, 45000, 90000, 180000, 300000]; // Deeper exponential backoff
  const maxRetries = 5; // Use 5 attempts to survive longer outages
  
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
          geminiQueue.setQuotaStatus('Low Quota');
        }

        if ((isRateLimit || isTransient) && i < maxRetries - 1) {
          const delay = retryDelays[i];
          console.warn(`[Stability System] AI Quota Reset Needed. Waiting ${delay / 1000}s... (Attempt ${i + 1}/${maxRetries})`);
          await sleep(delay);
          continue;
        }
        
        // Final failure after multiple attempts
        if (isRateLimit) {
          geminiQueue.setQuotaStatus('Queue Paused');
          console.error("AI provider quota reached. Generation will resume automatically soon.");
          
          // Smart Scheduler: Auto-resume after 20 minutes (enough for most minute-based quotas)
          setTimeout(() => {
            geminiQueue.resume();
          }, 1200000); // 20 minutes
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }, metadata);
};

/**
 * Robustly parses JSON from AI response, handling potential markdown wrappers,
 * unescaped control characters, and truncated responses.
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

  // 3. Extract JSON part if AI returned conversational text or trailing garbage
  const extractPrimaryJson = (str: string) => {
    const firstBrace = str.indexOf('{');
    const firstBracket = str.indexOf('[');
    let startIndex = -1;
    if (firstBrace !== -1 && firstBracket !== -1) startIndex = Math.min(firstBrace, firstBracket);
    else if (firstBrace !== -1) startIndex = firstBrace;
    else if (firstBracket !== -1) startIndex = firstBracket;
    
    if (startIndex === -1) return str;

    const charOpen = str[startIndex];
    const charClose = charOpen === '{' ? '}' : ']';
    
    let count = 0;
    let inString = false;
    let escaped = false;
    
    for (let i = startIndex; i < str.length; i++) {
        const c = str[i];
        if (c === '"' && !escaped) inString = !inString;
        if (inString) {
          if (c === '\\' && !escaped) escaped = true;
          else escaped = false;
          continue;
        }
        
        if (c === charOpen) count++;
        else if (c === charClose) count--;
        
        if (count === 0) {
          return str.substring(startIndex, i + 1);
        }
    }
    return str.substring(startIndex);
  };

  const toParse = extractPrimaryJson(cleaned);

  const repairJson = (str: string): string => {
    let fixed = str;

    // 1. Remove non-printable control characters that are NEVER valid in JSON
    // except inside strings where they must be escaped.
    // We'll first treat the whole thing as a string and escape whatever needs escaping.
    
    let inString = false;
    let escaped = false;
    let result = '';
    let openBraces = 0;
    let openBrackets = 0;

    for (let i = 0; i < fixed.length; i++) {
        const char = fixed[i];
        
        // Handle string boundaries
        if (char === '"' && !escaped) {
          inString = !inString;
          result += char;
          continue;
        }

        if (inString) {
          if (!escaped) {
            if (char === '\\') {
              escaped = true;
            } else if (char === '\n' || char === '\r' || char === '\t' || char.charCodeAt(0) < 32) {
              result += ' ';
            } else {
              result += char;
            }
          } else {
            // We just passed a backslash
            const validEscapes = ['"', '\\', '/', 'b', 'f', 'n', 'r', 't'];
            if (validEscapes.includes(char)) {
              result += '\\' + char;
              escaped = false;
            } else if (char === 'u') {
              // Check if it's a valid hex sequence: \uXXXX
              const hex = fixed.substring(i + 1, i + 5);
              if (hex.length === 4 && /^[0-9a-fA-F]{4}$/.test(hex)) {
                result += '\\u' + hex;
                i += 4; // Skip the hex digits
              } else {
                // Invalid unicode escape, just escape the backslash and the 'u'
                result += '\\\\u';
              }
              escaped = false;
            } else {
              // Not a standard escape char, so treat the backslash as a literal backslash
              result += '\\\\' + char;
              escaped = false;
            }
          }
        } else {
          if (char.charCodeAt(0) >= 32 || ['\n', '\r', '\t', ' '].includes(char)) {
            result += char;
          }
          if (char === '{') openBraces++;
          if (char === '}') openBraces--;
          if (char === '[') openBrackets++;
          if (char === ']') openBrackets--;
          escaped = false;
        }
    }
    
    // Close unterminated string
    if (inString) {
      if (escaped) {
        result += '\\\\';
      }
      result += '"';
    } else if (escaped) {
      // should ideally not happen outside string but let's be safe
      result += '\\\\';
    }
    
    // Truncation Repair: try to close open braces/brackets
    if (openBrackets > 0) result += ']'.repeat(openBrackets);
    if (openBraces > 0) result += '}'.repeat(openBraces);

    fixed = result;

    // Fix trailing commas
    fixed = fixed.replace(/,\s*([\]}])/g, '$1');

    // Fix single quotes for keys
    fixed = fixed.replace(/(\{|,)\s*'([^"':]+)':/g, '$1"$2":');
    
    // Fix unquoted keys
    fixed = fixed.replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

    return fixed;
  };

  try {
    return JSON.parse(toParse);
  } catch (e: any) {
    try {
        const repaired = repairJson(toParse);
        return JSON.parse(repaired);
    } catch (e2) {
        console.error("[Gemini Utils] JSON Parse Failure:", e);
        console.log("Raw response length:", text.length);
        console.log("Extraction Attempt length:", toParse.length);
        
        // Final attempt: maybe extra formatting or accidental double braces
        if (toParse.startsWith('{{') && toParse.endsWith('}}')) {
          try {
              return JSON.parse(repairJson(toParse.substring(1, toParse.length - 1)));
          } catch { /* ignore */ }
        }
        
        throw new Error(`Failed to decode AI response: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
};

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

const genAI = GEMINI_KEY && GEMINI_KEY !== 'undefined' ? new GoogleGenAI({ apiKey: GEMINI_KEY }) : null;
const groq = GROQ_KEY && GROQ_KEY !== 'undefined' ? new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true }) : null;

export const isAiConfigured = () => !!genAI || !!groq || !!OPENROUTER_KEY;

/**
 * Smart AI Bridge with auto-priority: OpenRouter (Primary) -> Gemini (Secondary) -> Groq (Tertiary)
 * Wrapped in callGeminiWithRetry for automatic rate limiting and exponential backoff.
 */
/**
 * Ultra-Fast AI Generator for mission-critical speed.
 * Bypasses the main queue and implements strict skip-on-fail logic.
 */
export async function ultraFastGenerate(prompt: string, modelOverride?: string): Promise<string | null> {
  // Step 1: OpenRouter (Primary)
  if (OPENROUTER_KEY && OPENROUTER_KEY !== 'undefined') {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "MentorStack Academy High-Speed",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelOverride || "google/gemini-2.0-flash-exp:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1,
          max_tokens: 2000
        }),
        signal: AbortSignal.timeout(10000) // 10s timeout for ultra-fast
      });

      if (response.status === 429) return "ERROR_QUOTA_REACHED";
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (text) return text;
    } catch (error: any) {
      if (error.message?.includes('429')) return "ERROR_QUOTA_REACHED";
      console.warn("[Speed Engine] OpenRouter failed. Skipping...");
    }
  }

  // Final fallback to Gemini Flash (no retry, just one shot)
  if (genAI) {
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      return result.text || "ERROR_AI_FAILED";
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        return "ERROR_QUOTA_REACHED";
      }
      console.warn("[Speed Engine] Gemini Flash failed. Skipping...");
    }
  }

  return "ERROR_AI_FAILED";
}

export async function smartGenerate(prompt: string, onProgress?: (msg: string) => void, modelOverride?: string): Promise<string> {
  return await callGeminiWithRetry(async () => {
    // Step 1: OpenRouter (Primary)
    if (OPENROUTER_KEY && OPENROUTER_KEY !== 'undefined') {
      try {
        if (onProgress) onProgress(`OpenRouter Engine processing (${modelOverride || 'auto'})...`);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "MentorStack Academy",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: modelOverride || "google/gemini-2.0-flash-exp:free", // Default to a good free model or auto
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
          })
        });

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      } catch (error: any) {
        console.warn("[AI Bridge] OpenRouter Failed, falling back to Gemini...", error.message);
        if (onProgress) onProgress("OpenRouter busy/failed. Switching to Gemini Engine...");
      }
    }

    // Step 2: Fallback to Gemini (Secondary)
    if (genAI) {
      try {
        if (onProgress) onProgress("Gemini Engine processing...");
        // Use gemini-3-flash-preview as recommended for basic/moderate tasks
        const result = await genAI.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        
        const text = result.text;
        if (text) return text;
      } catch (error: any) {
        console.warn("[AI Bridge] Gemini 3 Flash Failed, trying Flash Latest...", error.message);
        
        try {
          const result = await genAI.models.generateContent({
            model: "gemini-flash-latest",
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
          });
          const text = result.text;
          if (text) return text;
        } catch (innerError: any) {
          console.warn("[AI Bridge] Gemini Failed, falling back to Groq...", innerError.message);
          if (onProgress) onProgress("Gemini busy/failed. Switching to Groq Engine...");
        }
      }
    }

    // Step 3: Groq (Tertiary)
    if (groq) {
      try {
        if (onProgress) onProgress("Groq Llama-3.3 Engine processing...");
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama-3.3-70b-versatile',
          temperature: 0.1,
          max_tokens: 4096,
        });
        const text = chatCompletion.choices[0]?.message?.content;
        if (text) return text;
      } catch (error: any) {
        throw error; // If even Groq fails, we throw the final error
      }
    }

    throw new Error("No AI providers configured or all failed. Please check API keys.");
  }, { name: 'Smart Generate' });
}
