const express = require('express');
const passport = require('../../../../config/passport');
const ExpenseController = require('./expense.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: Expense management endpoints
 */

/**
 * @swagger
 * /api/v1/expense/{tripId}:
 *   post:
 *     summary: Create an expense
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: Trip ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: number
 *                 example: 9
 *               receiptId:
 *                 type: string
 *                 example: #e6d598ef
 *               merchantName:
 *                 type: string
 *                 example: Starbucks
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2021-12-01
 *               amount:
 *                 type: number
 *                 example: 100
 *               location:
 *                 type: string
 *                 example: 6332 Business Drive, Suite 528, Palo Alto, California 94301
 *               postalCode:
 *                 type: string
 *                 example: 94301
 *               description:
 *                 type: string
 *                 example: I ordered a cappuccino
 *         required:
 *           - category
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       500: 
 *         description: Internal server error
 */
router.post('/:tripId', passport.authenticate('jwt', { session: false }), ExpenseController.createExpense);

/**
 * @swagger
 * /api/v1/expense:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', passport.authenticate('jwt', { session: false }), ExpenseController.getExpenses);

/**
 * @swagger
 * /api/v1/expense/{tripId}:
 *   get:
 *     summary: Get all expenses for a trip
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: Trip ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expenses found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
router.get('/:tripId', passport.authenticate('jwt', { session: false }), ExpenseController.getExpensesByTrip);

module.exports = router;