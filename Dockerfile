# Base image
FROM node:18

# Set the timezone to America/New_York
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3001

# Start the application
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then nodemon dotenv/config server.js; else node server.js; fi"]