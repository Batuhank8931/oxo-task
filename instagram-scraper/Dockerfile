# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY instagram-scraper/package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY instagram-scraper/ .

# Expose the port used by the application
EXPOSE 8080

# Command to run the application
CMD ["node", "data_sender.js"]
