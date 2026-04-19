/**
 * Utility to wait for a certain duration.
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Request Queue to manage concurrency and rate limiting.
 */
class GeminiQueue {
  private queue: (() => Promise<any>)[] = [];
  private activeRequests = 0;
  private maxConcurrency = 2; // User requested 1-3
  private batchDelay = 1000;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const task = async () => {
        this.activeRequests++;
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.activeRequests--;
          this.process();
        }
      };

      this.queue.push(task);
      this.process();
    });
  }

  private async process() {
    if (this.queue.length === 0 || this.activeRequests >= this.maxConcurrency) {
      return;
    }

    const task = this.queue.shift();
    if (task) {
      // Add a small jittered delay between requests in the same "batch"
      await sleep(this.batchDelay + (Math.random() * 500));
      task();
    }
  }
}

const geminiQueue = new GeminiQueue();

/**
 * Enhanced Gemini API call with exponential backoff and queue management.
 */
export const callGeminiWithRetry = async (fn: () => Promise<any>, maxRetries = 10) => {
  let lastError: any;
  
  // Use the queue to control concurrency
  return await geminiQueue.add(async () => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        
        let errorMsg = "";
        if (typeof error.message === 'string') {
          errorMsg = error.message;
        } else if (error.error?.message) {
          errorMsg = error.error.message;
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
          (error.code === 429);
        
        const isTransient = 
          normalizedMsg.includes("503") || 
          normalizedMsg.includes("500") || 
          normalizedMsg.includes("overloaded") || 
          normalizedMsg.includes("deadline exceeded") ||
          normalizedMsg.includes("internal error") ||
          normalizedMsg.includes("xhr error") ||
          normalizedMsg.includes("rpc failed") ||
          (error.status === 500) ||
          (error.code === 503);

        if (isRateLimit || isTransient) {
          // starts at 6s for retry 1, 12s for retry 2... up to reasonable limits
          const baseDelay = isRateLimit ? 6000 : 2000;
          const delay = Math.pow(2, i) * baseDelay + (Math.random() * 3000);
          
          // Cap the delay at 45s to avoid hitting the 130s rule
          const cappedDelay = Math.min(delay, 45000);
          
          console.warn(`[Gemini Engine] ${isRateLimit ? 'Quota Throttled' : 'Transient Hiccup'}. Retrying attempt ${i + 1}/${maxRetries} after ${Math.round(cappedDelay)}ms...`);
          
          await sleep(cappedDelay);
          continue;
        }
        
        throw error;
      }
    }
    
    // Format error message for UI
    const formattedError = new Error(
      lastError?.message || "Critical failure in AI Logic Engine. Max retries exceeded."
    );
    (formattedError as any).status = lastError?.status || 500;
    (formattedError as any).code = lastError?.code || "AI_ENGINE_FAILURE";
    
    throw formattedError;
  });
};
