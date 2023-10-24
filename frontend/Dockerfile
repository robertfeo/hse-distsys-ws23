# Node.js base image
FROM node:16-alpine

# Setup working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilizes Docker cache to speed up subsequent builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application
RUN npm run build:production

# Expose port for application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]