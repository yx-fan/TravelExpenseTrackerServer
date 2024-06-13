const express = require('express');
const UserController = require('./user.controller');
const passport = require('../../../../config/passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.getUserProfile);

/**
 * @swagger
 * /api/v1/user/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: newNickname
 *               avatar:
 *                 type: string
 *                 example: http://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid fields for profile update
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch('/profile', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);

/**
 * @swagger
 * /api/v1/user/notification-settings:
 *   patch:
 *     summary: Update notification settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailNotifications:
 *                 type: object
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *                   frequency:
 *                     type: string
 *                     enum: [daily, weekly, monthly]
 *                     example: weekly
 *               pushNotifications:
 *                 type: object
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *                   frequency:
 *                     type: string
 *                     enum: [instant, daily, weekly]
 *                     example: instant
 *               inboxMessageToggle:
 *                 type: object
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Notification settings updated successfully
 *       400:
 *         description: Invalid fields for notification settings update
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch('/notification-settings', passport.authenticate('jwt', { session: false }), UserController.updateNotificationSettings);  


module.exports = router;