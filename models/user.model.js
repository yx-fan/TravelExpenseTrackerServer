const mongoose = require('mongoose');
const { profile } = require('winston');

const NotificationSettingsSchema = new mongoose.Schema({
    emailNotifications: { 
        enabled: { type: Boolean, default: true },
        frequency: { type: String, default: 'weekly' },
    },
    pushNotifications: { 
        enabled: { type: Boolean, default: true },
        frequency: { type: String, default: 'instant' },
    },
    inboxMessageToggle: {
        enabled: { type: Boolean, default: true },
    },
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
    nickname: { type: String, default: 'user' },
    avatar: { type: String },
}, { _id: false });

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    nickname: { type: String, required: true, default: 'user' },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    profile: { type: ProfileSchema, default: () => ({}) },
    notificationSettings: { type: NotificationSettingsSchema, default: () => ({}) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field whenever a document is saved
UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;