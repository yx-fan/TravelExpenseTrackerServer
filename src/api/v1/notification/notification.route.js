const express = require('express');
const NotificationController = require('./notification.controller');
const passport = require('../../../../config/passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management endpoints
 */

/**
 * @swagger
 * /api/v1/notification/notifications:
 *   get:
 *     summary: Get notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/notifications', passport.authenticate('jwt', { session: false }), NotificationController.getNotifications);

module.exports = router;