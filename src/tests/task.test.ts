import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';
import { Task, ITask } from '../models/Task';

let authToken: string;
let userId: string;

beforeEach(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});

  // Register and login a user for testing
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

  authToken = registerRes.body.data.token;
  userId = registerRes.body.data.user.id;
});

describe('Task Endpoints', () => {
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending'
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.task.title).toBe('Test Task');
      expect(res.body.data.task.user).toBe(userId);
    });

    it('should not create a task without authentication', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending'
        });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create some tasks
      await Task.create([
        {
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending',
          user: userId
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          status: 'completed',
          user: userId
        }
      ]);
    });

    it('should get all tasks for authenticated user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.tasks).toHaveLength(2);
    });

    it('should not get tasks without authentication', async () => {
      const res = await request(app)
        .get('/api/tasks');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        user: userId
      }) as ITask & { _id: mongoose.Types.ObjectId };
      taskId = task._id.toString();
    });

    it('should get a task by id', async () => {
      const res = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.task.title).toBe('Test Task');
    });

    it('should not get a task with invalid id', async () => {
      const res = await request(app)
        .get('/api/tasks/invalid-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        user: userId
      }) as ITask & { _id: mongoose.Types.ObjectId };
      taskId = task._id.toString();
    });

    it('should update a task', async () => {
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task',
          status: 'completed'
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.task.title).toBe('Updated Task');
      expect(res.body.data.task.status).toBe('completed');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        user: userId
      }) as ITask & { _id: mongoose.Types.ObjectId };
      taskId = task._id.toString();
    });

    it('should delete a task', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');

      // Verify task is deleted
      const task = await Task.findById(taskId);
      expect(task).toBeNull();
    });
  });
}); 