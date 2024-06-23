const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});

const CurrencyModel = mongoose.model('Currency', currencySchema);

module.exports = CurrencyModel;