import { Request, Response, NextFunction } from 'express';
export declare const cacheMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clearCache: (pattern?: string) => Promise<void>;
