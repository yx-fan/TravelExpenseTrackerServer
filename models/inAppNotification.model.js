const mongoose = require('mongoose');

const InAppNotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    note: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const InAppNotificationModel = mongoose.model('InAppNotification', InAppNotificationSchema);
module.exports = InAppNotificationModel;