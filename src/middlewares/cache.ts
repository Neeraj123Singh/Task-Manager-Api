import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = await redis.get(key);

    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    }

    const originalJson = res.json;
    res.json = function(body: any) {
      redis.setex(key, 3600, JSON.stringify(body));
      return originalJson.call(this, body);
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const clearCache = async (pattern: string = '*') => {
  try {
    const keys = await redis.keys(`__express__${pattern}`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}; 