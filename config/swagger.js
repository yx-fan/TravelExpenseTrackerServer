const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL +  ":" + process.env.PORT : process.env.LOCAL_BASE_URL + ":" + process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Expense Tracker API',
      version: '1.0.3',
      description: 'API documentation for the Travel Expense Tracker application',
    },
    servers: [
      {
        url: url,
      },
    ],
  },
  apis: ['./src/api/v1/**/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
