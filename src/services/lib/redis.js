import Redis from "ioredis";

const redis = new Redis(`rediss://:${process.env.UPSTASH_REDIS_TOKEN}@${process.env.UPSTASH_REDIS_URL.replace('https://', '')}`);

export { redis };
