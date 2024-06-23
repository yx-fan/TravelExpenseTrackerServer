const CurrencyController = require('./currency.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Currency
 *   description: Currency management endpoints
 */

/**
 * @swagger
 * /api/v1/currency:
 *   get:
 *     summary: Get all currencies
 *     tags: [Currency]
 *     responses:
 *       200:
 *         description: Currencies retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', CurrencyController.getCurrencies);

module.exports = router;