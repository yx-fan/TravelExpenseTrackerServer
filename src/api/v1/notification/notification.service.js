const InAppNotificationModel = require('../../../../models/inAppNotification.model');
const logger = require('../../../../utils/logger');

class NotificationService {

    async createNotification(user, message) {
        try {
            const notification = new InAppNotificationModel({
                user,
                message
            });
            await notification.save();
            return notification;
        } catch (err) {
            logger.error(`Error creating notification: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async getNotifications(user) {
        try {
            const notifications = await InAppNotificationModel.find({ user }).sort({ createdAt: -1 });
            return notifications;
        } catch (err) {
            logger.error(`Error getting notifications: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async deleteAllNotifications(user) {
        try {
            const notifications = await InAppNotificationModel.deleteMany({ user });
            return notifications;
        } catch (err) {
            logger.error(`Error deleting all notifications: ${err.message}`);
            throw new Error(err.message);
        }
    }

}

module.exports = new NotificationService();