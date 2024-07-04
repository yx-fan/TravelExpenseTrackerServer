const mongoose = require('mongoose');
const TripModel = require('./trip.model');

const expenseSchema = new mongoose.Schema({
    category: { type: Number, required: true, default: 6},
    merchantName: { type: String, default: ''},
    date: { type: Date, default: '' },
    amount: { type: Number, default: 0},
    location: { type: String, default: '' },
    postalCode: { type: String, default: ''},
    description: { type: String, default: '' },
    longitude: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 },
    starred: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt', required: true},
    additionalImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdditionalImage' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

expenseSchema.post('save', async function (doc) {
   await updateTripTotals(doc.trip); 
})

expenseSchema.post('remove', async function (doc) {
    await updateTripTotals(doc.trip);
})

async function updateTripTotals(tripId) {
    const trip = await TripModel.findById(tripId);
    console.log(trip);
    const expenses = await ExpenseModel.find({ trip: tripId });
    trip.totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    trip.totalNumberOfExpenses = expenses.length;
    await trip.save();
}

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;