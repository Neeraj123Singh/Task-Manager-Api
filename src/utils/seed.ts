import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Task } from '../models/Task';

dotenv.config();

interface SampleUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);
    console.log('Created users');

    // Seed tasks
    await Task.deleteMany({});
    await Task.insertMany([
      {
        title: 'Sample Task 1',
        description: 'This is a sample task',
        status: 'pending',
        dueDate: new Date(),
        assignedTo: createdUsers[0]._id,
        createdBy: createdUsers[0]._id,
      },
      {
        title: 'Sample Task 2',
        description: 'This is another sample task',
        status: 'completed',
        dueDate: new Date(),
        assignedTo: createdUsers[1]._id,
        createdBy: createdUsers[0]._id,
      },
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 