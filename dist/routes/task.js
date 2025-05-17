"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controllers/task");
const auth_1 = require("../middlewares/auth");
const cache_1 = require("../middlewares/cache");
const express_validator_1 = require("express-validator");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.get('/', auth_1.protect, cache_1.cacheMiddleware, (0, asyncHandler_1.asyncHandler)(task_1.getTasks));
router.post('/', auth_1.protect, [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('dueDate').isISO8601().withMessage('Valid due date is required'),
    (0, express_validator_1.body)('assignedTo').notEmpty().withMessage('Assigned user is required'),
], (0, asyncHandler_1.asyncHandler)(task_1.createTask));
router.get('/:id', auth_1.protect, cache_1.cacheMiddleware, (0, asyncHandler_1.asyncHandler)(task_1.getTask));
router.put('/:id', auth_1.protect, [
    (0, express_validator_1.body)('title').optional().trim().notEmpty(),
    (0, express_validator_1.body)('description').optional().trim().notEmpty(),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'in-progress', 'completed']),
    (0, express_validator_1.body)('dueDate').optional().isISO8601(),
    (0, express_validator_1.body)('assignedTo').optional().notEmpty(),
], (0, asyncHandler_1.asyncHandler)(task_1.updateTask));
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), (0, asyncHandler_1.asyncHandler)(task_1.deleteTask));
exports.default = router;
//# sourceMappingURL=task.js.map