"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Task_1 = require("../models/Task");
dotenv_1.default.config();
const seedDatabase = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        yield User_1.User.deleteMany({});
        yield Task_1.Task.deleteMany({});
        console.log('Cleared existing data');
        const createdUsers = yield User_1.User.create([
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
        yield Task_1.Task.deleteMany({});
        yield Task_1.Task.insertMany([
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
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});
seedDatabase();
//# sourceMappingURL=seed.js.map