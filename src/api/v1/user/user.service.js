const NotificationService = require('../notification/notification.service');
const UserModel = require('../../../../models/user.model');
const customError = require('../../../../utils/customError');
const logger = require('../../../../utils/logger');

class UserService {

    async findUserByEmail(email) {
        try {
            let user = await UserModel.findOne({ email });
            return user;
        } catch (err) {
            logger.error(`Error getting user by email: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async createUser({ userId, email, password, emailVerified = false}) {
        try {
            let user = new UserModel({ userId, email, password, emailVerified });
            user = await user.save();

            // Create welcome notification
            await NotificationService.createNotification(user, 'Welcome to our app!');

            return user;
        } catch (err) {
            logger.error(`Error creating user: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async updateProfile(userId, profileData) {
        try {
            const user = await UserModel.findOneAndUpdate(
                { userId },
                { profile: profileData },
                { new: true }
            );
            return user ? user : null;
        } catch (err) {
            logger.error(`Error updating user profile: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async updateNotificationSettings(userId, notificationSettingsData) {
        try {
            const user = await UserModel.findOneAndUpdate(
                { userId },
                { notificationSettings: notificationSettingsData },
                { new: true }
            ); 
            return user ? user : null;
        } catch (err) {
            logger.error(`Error updating notification settings: ${err.message}`);
            throw new Error(err.message);
        }

    }

    async deleteUser(userId) {
        try {
            const user = await UserModel.findOneAndDelete(
                { userId }
            );
            return user ? user : null;
        } catch (err) {
            logger.error(`Error deleting user: ${err.message}`);
            throw new Error(err.message);
        }
    }



}

module.exports = new UserService();