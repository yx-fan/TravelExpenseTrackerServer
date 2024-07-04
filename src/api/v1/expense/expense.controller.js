const ExpenseService = require('./expense.service');
const ReceiptService = require('../receipt/receipt.service');
const TripService = require('../trip/trip.service');
const CoordinateService = require('./coordinate.service');
const customError = require('../../../../utils/customError');
const logger = require('../../../../utils/logger');

class ExpenseController {

    async createExpense(req, res, next) {
        let user = req.user;
        let tripId = req.params.tripId;
        let expenseData = req.body;
        try {
            
            let trip = await TripService.getTripById(tripId);
            if (!trip) {
                throw new customError('Trip not found', 404);
            }
            const receipt = await ReceiptService.saveReceiptData(user, trip, expenseData);
            let { latitude, longitude } = await CoordinateService.getCoordinates(expenseData.location);
            if (!latitude || !longitude) {
                logger.warn('Coordinates not found for location');
                latitude = 0;
                longitude = 0;
            }
            expenseData.latitude = latitude;
            expenseData.longitude = longitude;
            let expense = await ExpenseService.createExpense(user, trip, receipt, expenseData);
            expense.trip = trip;  // Update the trip object in the expense object
            return res.success({ expense }, 'Expense created successfully', 201);
        } catch (error) {
            next(error);
        }
    }

    async getExpenses(req, res, next) {
        const user = req.user;
        try {
            const expenses = await ExpenseService.getExpenses(user);
            return res.success({ expenses }, 'Expenses retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }

    async getExpensesByTrip(req, res, next) {
        const user = req.user;
        const tripId = req.params.tripId;
        try {
            const trip = await TripService.getTripById(tripId);
            if (!trip) {
                throw new customError('Trip not found', 404);
            }

            const expenses = await ExpenseService.getExpensesByTrip(user, trip);
            return res.success({ expenses }, 'Expenses retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }

    async updateExpense(req, res, next) {
        const expenseId = req.params.expenseId;
        const expenseData = req.body;
        try {
            const expense = await ExpenseService.updateExpense(expenseId, expenseData);
            return res.success({ expense }, 'Expense updated successfully', 200);
        } catch (error) {
            next(error);
        }
    }

    async deleteExpense(req, res, next) {
        const expenseId = req.params.expenseId;
        try {
            const expense = await ExpenseService.deleteExpense(expenseId);
            const receiptId = expense.receipt;
            await ReceiptService.deleteReceipt(receiptId);
            return res.success({ expense }, 'Expense deleted successfully', 200);
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new ExpenseController();