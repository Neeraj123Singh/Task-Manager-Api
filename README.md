# Task Manager API

A RESTful API for managing tasks built with Node.js, Express, TypeScript, MongoDB, and Redis.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (if running locally)
- Redis (if running locally)

## Project Structure

```
task-manager-api/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middlewares
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── tests/         # Test files
│   ├── utils/         # Utility functions
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
├── dist/              # Compiled TypeScript files
├── .env               # Environment variables
├── docker-compose.yml # Docker services configuration
└── package.json       # Project dependencies
```

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager-api
   ```

2. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://mongodb:27017/task-manager
   REDIS_URL=redis://redis:6379
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```

3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - API server on http://localhost:3001
   - MongoDB on port 27017
   - Redis on port 6379

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (see above for configuration)

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Development

For development with hot-reload:
```bash
npm run dev
```

## Testing

### Running Tests with Docker

1. Run all tests:
   ```bash
   docker exec task-manager-api-app-1 npm test
   ```

2. Run tests in watch mode:
   ```bash
   docker exec task-manager-api-app-1 npm run test:watch
   ```

3. Run tests with coverage:
   ```bash
   docker exec task-manager-api-app-1 npm run test:coverage
   ```

### Running Tests Locally

1. Run all tests:
   ```bash
   npm test
   ```

2. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```

3. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

## API Documentation

Once the server is running, you can access the API documentation at:
```
http://localhost:3001/api-docs
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build TypeScript code
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| PORT | Server port | 3001 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/task-manager |
| REDIS_URL | Redis connection string | redis://localhost:6379 |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRES_IN | JWT token expiration | 1d |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a task by ID
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Error Handling

The API uses a consistent error response format:
```json
{
  "status": "error",
  "message": "Error message"
}
```

## Success Response Format

Successful responses follow this format:
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```
# Task-Manager-Api
# Task-Manager-Api
# Task-Manager-Api
# Task-Manager-Api
# Task-Manager-Api
