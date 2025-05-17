"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.cacheMiddleware = void 0;
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
});
const cacheMiddleware = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = `__express__${req.originalUrl || req.url}`;
        const cachedResponse = yield redis.get(key);
        if (cachedResponse) {
            return res.json(JSON.parse(cachedResponse));
        }
        const originalJson = res.json;
        res.json = function (body) {
            redis.setex(key, 3600, JSON.stringify(body));
            return originalJson.call(this, body);
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.cacheMiddleware = cacheMiddleware;
const clearCache = (...args_1) => tslib_1.__awaiter(void 0, [...args_1], void 0, function* (pattern = '*') {
    try {
        const keys = yield redis.keys(`__express__${pattern}`);
        if (keys.length > 0) {
            yield redis.del(...keys);
        }
    }
    catch (error) {
        console.error('Error clearing cache:', error);
    }
});
exports.clearCache = clearCache;
//# sourceMappingURL=cache.js.map