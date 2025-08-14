FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Expose health check port
EXPOSE 3005

# Start the application
CMD ["npm", "start"]
