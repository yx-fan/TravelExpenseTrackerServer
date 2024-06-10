const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;