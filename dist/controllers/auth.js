"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const error_1 = require("../middlewares/error");
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn });
};
const register = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new error_1.AppError('Validation failed', 400);
        }
        const { name, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            throw new error_1.AppError('Email already registered', 400);
        }
        const user = yield User_1.User.create({
            name,
            email,
            password,
        });
        const token = generateToken(String(user._id));
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new error_1.AppError('Validation failed', 400);
        }
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email }).select('+password');
        if (!user || !(yield user.comparePassword(password))) {
            throw new error_1.AppError('Invalid email or password', 401);
        }
        const token = generateToken(String(user._id));
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map