# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application when the container launches
CMD ["npm", "start"]