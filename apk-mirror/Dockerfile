# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY apk-mirror/package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY apk-mirror/ .

# Expose the port used by the application
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
