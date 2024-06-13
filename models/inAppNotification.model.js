const mongoose = require('mongoose');

const InAppNotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const InAppNotificationModel = mongoose.model('InAppNotification', InAppNotificationSchema);
module.exports = InAppNotificationModel;