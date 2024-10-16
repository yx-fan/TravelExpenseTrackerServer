const express = require('express');
const AuthController = require('./auth.controller');
const passport = require('../../../../config/passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/auth/send-verification-email:
 *   post:
 *     summary: Send a verification email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               type:
 *                 type: string
 *                 enum: [register, forgot-password]
 *                 example: register
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       400:
 *         description: User with this email does not exist or already exists
 */
router.post('/send-verification-email', AuthController.sendVerificationEmail);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify email address
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email', AuthController.verifyEmail);


/**
 * @swagger
 * /api/v1/auth/check-email-verification:
 *   get:
 *     summary: Check if email is verified
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email address
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Email not verified
 *       500:
 *         description: Internal server error
 */
router.get('/check-email-verification', AuthController.checkEmailVerification);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: lawrence.yuxinfan@outlook.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/v1/auth/validate-token:
 *   get:
 *     summary: Validate JWT token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/validate-token', passport.authenticate('jwt', { session: false }), AuthController.validateToken);


/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Change password for forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: lawrence.yuxinfan@outlook.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', AuthController.changePassword);

module.exports = router;

