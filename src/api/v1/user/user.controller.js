const UserService = require('./user.service');
const NotificationService = require('../notification/notification.service');
const ReceiptService = require('../receipt/receipt.service');
const TripService = require('../trip/trip.service');
const ExpenseService = require('../expense/expense.service');
const customError = require('../../../../utils/customError');

class UserController {

    async getUserProfile(req, res, next) {
        try {
            const user = req.user
            res.success({ user }, 'User profile retrieved successfully', 200)
        } catch (err) {
            next(err);
        }
    }

    async updateUserProfile(req, res, next) {
        const userId = req.user.userId;
        const profileData = req.body;
        const allowedFields = ['nickname', 'avatar'];

        if (!Object.keys(profileData).every(key => allowedFields.includes(key))) {
            return res.error('Invalid fields for profile update', 400);
        }

        try {
            const updatedUser = await UserService.updateProfile(userId, profileData);
            if (!updatedUser) {
                return res.error('User not found', 404);
            }
            res.success({ user: updatedUser }, 'User profile updated successfully', 200);
        } catch (err) {
            next(err);
        }
    }

    async updateNotificationSettings(req, res, next) {
        const userId = req.user.userId;
        const notificationSettingsData = req.body;
        const allowedFields = ['emailNotifications', 'pushNotifications', 'inboxMessageToggle'];
        const allowedEmailFields = ['enabled', 'frequency'];
        const allowedPushFields = ['enabled', 'frequency'];
        const allowedInboxFields = ['enabled'];

        // Check for valid fields in notificationSettingsData
        if (!Object.keys(notificationSettingsData).every(key => allowedFields.includes(key))) {
            return res.error('Invalid fields for notification settings update', 400);
        }
    
        // Check for valid fields in emailNotifications, pushNotifications, and inboxMessageToggle
        if (notificationSettingsData.emailNotifications) {
            if (!Object.keys(notificationSettingsData.emailNotifications).every(key => allowedEmailFields.includes(key))) {
                return res.error('Invalid fields for email notifications update', 400);
            }
        }
    
        if (notificationSettingsData.pushNotifications) {
            if (!Object.keys(notificationSettingsData.pushNotifications).every(key => allowedPushFields.includes(key))) {
                return res.error('Invalid fields for push notifications update', 400);
            }
        }
    
        if (notificationSettingsData.inboxMessageToggle) {
            if (!Object.keys(notificationSettingsData.inboxMessageToggle).every(key => allowedInboxFields.includes(key))) {
                return res.error('Invalid fields for inbox message toggle update', 400);
            }
        }

        try {
            const updatedUser = await UserService.updateNotificationSettings(userId, notificationSettingsData);
            if (!updatedUser) {
                return res.error('User not found', 404);
            }
            res.success({ user: updatedUser }, 'Notification settings updated successfully', 200);
        } catch (err) {
            next(err);
        }
    }

    async deleteUserAndClearAllData(req, res, next) {
        const userId = req.user.userId;
        try {
            const deletedUser = await UserService.deleteUser(userId);
            if (!deletedUser) {
                return res.error('User not found', 404);
            }

            // Delete all notifications for user
            await NotificationService.deleteAllNotifications(deletedUser);

            // Delete all receipts for user
            await ReceiptService.deleteAllReceipts(deletedUser);

            // Delete all trips for user
            await TripService.deleteAllTrips(deletedUser);

            // Delete all expenses for user
            await ExpenseService.deleteAllExpenses(deletedUser);

            res.success({}, 'User deleted successfully', 200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();