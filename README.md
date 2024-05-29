# Travel and Expense Tracker

## Overview

Travel and Expense Tracker is a Node.js-based backend application designed to help users manage and track their travel expenses efficiently. The application supports receipt capture, expense categorization, multi-currency support, budget management, and more.

## Features

- User Authentication (Register/Login) -- ongoing
- Receipt Capture with OCR -- ongoing
- Expense Categorization -- ongoing
- Location-Based Tracking -- ongoing
- Multi-Currency Support -- ongoing
- Budget Management -- ongoing
- Expense Analysis and Reporting -- ongoing
- Offline Mode -- ongoing
- Team and Multi-User Support -- ongoing
- Integration with Third-Party Services -- ongoing
- Kafka Integration for Asynchronous Processing -- ongoing

## Technologies Used

- Node.js
- Express
- MongoDB
- Kafka
- Passport.js (for authentication)
- JWT (for token-based authentication)
- Docker
- Docker Compose

## Getting Started

### Prerequisites

- Node.js (version 18.17.1 or above)
- Kafka
- MongoDB
- Docker and Docker Compose

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yx-fan/app_backend.git
cd app_backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory and add the following variables: -- ongoing
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/travel-expense-tracker
JWT_SECRET=your_jwt_secret
KAFKA_BROKER=localhost:9092
LOG_LEVEL=debug
NODE_ENV=development
```

### Running the Application

1. **Using Docker**
Start services using Docker Compose: -- ongoing
```bash
docker-compose up
```
This will start the server along with MongoDB and Kafka as defined in the `docker-compose.yml` file.

2. **Running Locally**
Before start the server, Make sure MongoDB and Kafka are running locally.
Start the server:
```bash
npm run dev
```
This will start the server on the port specified in the `.env` file (default is 3000).

### Running Tests -- ongoing
To run the tests, use the following command:
```bash
npm test
```

## API Endpoints

### Authentication

...


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
