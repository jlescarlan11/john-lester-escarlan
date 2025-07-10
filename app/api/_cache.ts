// Simple in-memory cache for API responses
// Not for production use (use Redis for distributed cache)

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in ms

interface CacheEntry {
  value: unknown;
  expires: number;
}

const cache: Record<string, CacheEntry> = {};

export function getCache(key: string): unknown {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

export function setCache(key: string, value: unknown, duration?: number): void {
  cache[key] = {
    value,
    expires: Date.now() + (duration ?? CACHE_DURATION),
  };
}

export function clearProjectCache() {
  // Invalidate all project-related cache entries
  Object.keys(cache).forEach((key) => {
    if (key.startsWith('/api/project')) {
      delete cache[key];
    }
  });
}

export function clearResumeCache() {
  // Invalidate resume cache entry
  delete cache['/api/resume'];
} 