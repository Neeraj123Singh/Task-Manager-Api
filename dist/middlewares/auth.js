"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const error_1 = require("./error");
const protect = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new error_1.AppError('Not authorized to access this route', 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.User.findById(decoded.id);
        if (!user) {
            throw new error_1.AppError('User not found', 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new error_1.AppError('Not authorized', 401);
        }
        if (!roles.includes(req.user.role)) {
            throw new error_1.AppError('Not authorized to access this route', 403);
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map