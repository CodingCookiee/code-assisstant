import { redis } from '../lib/redis.js';
import createError from '../_utils/createError.js'


export async function rateLimit(req, res, next) {
    const ip = req.headers.get('x-forwarded-for') || req.socket.remoteAddress || 'anonymous'
    const key = `rate-limit:${ip}`

    const current = await redis.incr(key)
    if (current === 1) {
        await redis.expire(key, 60) // 1 minute window
      }
    //   10 requests per minute
      if (current > 10) {
        console.log('Rate limit exceeded')
        throw createError(429, 'Rate limit exceeded')
      }

}
