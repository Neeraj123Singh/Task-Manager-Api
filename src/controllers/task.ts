import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Task } from '../models/Task';
import { AppError } from '../middlewares/error';
import { clearCache } from '../middlewares/cache';

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await Task.find({ createdBy: req.user?._id });
    res.json(tasks);
    return;
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user?._id });
    res.status(201).json(task);
    return;
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user?._id });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    res.json(task);
    return;
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user?._id },
      req.body,
      { new: true }
    );
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    res.json(task);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user?._id });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
}; 