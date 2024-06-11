# Installation Guide

## Environment Setup

Before starting the installation, make sure your system has the following software installed:

1. **Node.js and npm**: Ensure Node.js (recommended LTS version) and npm are installed. You can check the installed versions with the following commands:
```bash
node -v
npm -v
```

2. **MongoDB**: Install MongoDB database. Refer to the [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/) for installation instructions.

3. **RabbitMQ**: Install RabbitMQ message queue. Refer to the [RabbitMQ Installation Guide](https://www.rabbitmq.com/docs/download) for installation instructions.

## Clone the Project

Clone the project from the GitHub repository to your local machine:

```bash
git clone https://github.com/yx-fan/app_backend.git
cd app_backend
```

## Install Dependencies

Run the following command in the project root directory to install the project dependencies:

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the root directory and add the following variables for starting locally:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/travel-expense-tracker
JWT_SECRET=change_to_the_jwt_secret
LOG_LEVEL=debug
NODE_ENV=development
RABBITMQ_URL=amqp://127.0.0.1:5672
SENDER_EMAIL=change_to_sender_email
SENDER_EMAIL_PASSWORD=change_to_sender_email_password
PROD_BASE_URL=change_to_production_base_url
LOCAL_BASE_URL=http://localhost
```

Create a `.env.docker` file in the root directory and add the following variables for starting by docker-compose:

```bash
PORT=3001
MONGO_URI=mongodb://mongodb:27017/travel-expense-tracker
JWT_SECRET=change_to_the_jwt_secret
LOG_LEVEL=debug
NODE_ENV=development
RABBITMQ_URL=amqp://rabbitmq:5672
SENDER_EMAIL=change_to_sender_email
SENDER_EMAIL_PASSWORD=change_to_sender_email_password
PROD_BASE_URL=change_to_production_base_url
LOCAL_BASE_URL=http://localhost
```

## Running the Service

### Using Docker

You can run the project using Docker. Ensure Docker and Docker Compose are installed on your system.

```bash
docker-compose up --build
```

This will start the server along with MongoDB and RabbitMQ as defined in the `docker-compose.yml` file. 

This will start the server on the port specified in the `.env.docker` file (default is 3001).

### Running Locally

Before start the server, Make sure MongoDB and RabbitMQ are running locally.

To start the service, run the following command in the project root directory:

```bash
npm start
```

For development purposes using `Nodemon`, run the following command:

```bash
npm run dev
```

This will start the server on the port specified in the `.env` file (default is 3000).

### Access the Service

Once the service is running, you can access it in your browser at:

```bash
http://localhost:3000
```

## Additional Information

For detailed API information, refer to the [API Documentation](./API.md).

For more information about the project, refer to the [README.md](./README.md) file.

This `INSTALL.md` file provides a comprehensive guide for setting up and running your Travel Expense Tracker application, ensuring that users can easily follow the steps to get the application up and running.