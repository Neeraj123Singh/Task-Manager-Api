FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Build TypeScript code
RUN npm run build

# Debug: Show build output
RUN echo "📦 Build output:" && \
    ls -la dist && \
    echo "📁 Contents of dist:" && \
    find dist -type f

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
