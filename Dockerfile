# Base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]