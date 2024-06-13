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

}

module.exports = new NotificationService();