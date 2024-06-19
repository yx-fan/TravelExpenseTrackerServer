const ExpenseModel = require('../../../../models/expense.model');
const logger = require('../../../../utils/logger');

class ExpenseService {

    async getExpenses(user) {
        try {
            const expenses = await ExpenseModel.find({ user });
            return expenses;
        } catch (err) {
            logger.error(`Error getting expenses: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async getExpensesByTrip(user, trip) {
        try {
            const expenses = await ExpenseModel.find({ user, trip });
            return expenses;
        } catch (err) {
            logger.error(`Error getting expenses by trip: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async createExpense(user, trip, receipt, expenseData) {
        try {
            let category = expenseData.category;
            let merchantName = expenseData.merchantName ? expenseData.merchantName : '';
            let date = expenseData.date ? expenseData.date : '';
            let amount = expenseData.amount ? expenseData.amount : 0;
            let location = expenseData.location ? expenseData.location : '';
            let postalCode = expenseData.postalCode ? expenseData.postalCode : '';
            let description = expenseData.description ? expenseData.description : '';
            let latitude = expenseData.latitude ? expenseData.latitude : 0;
            let longitude = expenseData.longitude ? expenseData.longitude : 0;

            let expense = new ExpenseModel({
                category,
                merchantName,
                date,
                amount,
                location,
                postalCode,
                description,
                latitude,
                longitude,
                user: user,
                trip: trip,
                receipt: receipt
            });

            expense = await expense.save();
            return expense;
        } catch (err) {
            logger.error(`Error creating expense: ${err.message}`);
            throw new Error(err.message);
        }
    }

}

module.exports = new ExpenseService();