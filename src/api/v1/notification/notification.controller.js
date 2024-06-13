const NotificationService = require('./notification.service');

class NotificationController {

    async getNotifications(req, res) {
        try {
            const user = req.user;
            const notifications = await NotificationService.getNotifications(user);
            res.success({ notifications }, 'Notifications retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new NotificationController();