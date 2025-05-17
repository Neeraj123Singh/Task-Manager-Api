"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const tslib_1 = require("tslib");
const Task_1 = require("../models/Task");
const error_1 = require("../middlewares/error");
const getTasks = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = yield Task_1.Task.find({ createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        res.json(tasks);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
const createTask = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield Task_1.Task.create(Object.assign(Object.assign({}, req.body), { createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
        res.status(201).json(task);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
const getTask = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield Task_1.Task.findOne({ _id: req.params.id, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!task) {
            throw new error_1.AppError('Task not found', 404);
        }
        res.json(task);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getTask = getTask;
const updateTask = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield Task_1.Task.findOneAndUpdate({ _id: req.params.id, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, req.body, { new: true });
        if (!task) {
            throw new error_1.AppError('Task not found', 404);
        }
        res.json(task);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield Task_1.Task.findOneAndDelete({ _id: req.params.id, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!task) {
            throw new error_1.AppError('Task not found', 404);
        }
        res.status(204).send();
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.js.map