const mongoose = require('mongoose');

const additionalImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true, unique: true},
    description: { type: String, default: '' },
    expense: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const AdditionalImageModel = mongoose.model('AdditionalImage', additionalImageSchema);

module.exports = AdditionalImageModel;