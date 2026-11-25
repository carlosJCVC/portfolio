export const createRateLimiter = ({ maxRequests, windowMs, now = () => Date.now() }) => {
  const hits = new Map()

  const prune = (timestamps, currentTime) => timestamps.filter((t) => currentTime - t < windowMs)

  return {
    consume(key) {
      const currentTime = now()
      const recent = prune(hits.get(key) ?? [], currentTime)

      if (recent.length >= maxRequests) {
        hits.set(key, recent)
        const retryAfterMs = windowMs - (currentTime - recent[0])
        return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) }
      }

      recent.push(currentTime)
      hits.set(key, recent)

      if (hits.size > 5000) {
        for (const [k, stamps] of hits) {
          if (prune(stamps, currentTime).length === 0) hits.delete(k)
        }
      }

      return { allowed: true, retryAfterSeconds: 0 }
    }
  }
}
