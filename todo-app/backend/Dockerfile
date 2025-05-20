# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy all other files
COPY . .

# Expose the application port
EXPOSE 5000

# Start command
CMD ["node", "server.js"]