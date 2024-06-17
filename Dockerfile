# Base image
FROM node:18 AS build

# Set the timezone to America/New_York
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update the package list
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt-get autoremove -y

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Use smaller image
FROM node:18-slim

# Set the timezone to America/New_York
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set the working directory
WORKDIR /app

# Copy the files from the build image
COPY --from=build /app /app

# Install nodemon
RUN npm install -g nodemon

# Expose the port
EXPOSE 3001

# Start the application
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then nodemon dotenv/config server.js; else node server.js; fi"]