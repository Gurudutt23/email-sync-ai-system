export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 5,
  delayMs = 1000
): Promise<T> {
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;

      // Retry only for 503 (model overloaded)
      if (error.status === 503 || error?.statusText === "Service Unavailable") {
        console.log(`⚠️ Retry attempt ${attempt} after 503 error...`);
      } else {
        throw error; // Unknown error → don't retry
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw new Error("Max retry attempts reached.");
}
