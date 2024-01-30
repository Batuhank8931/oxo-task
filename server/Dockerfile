# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY server/ .

# Expose the port used by the application
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
