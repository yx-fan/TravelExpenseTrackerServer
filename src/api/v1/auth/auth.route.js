const express = require('express');
const AuthController = require('./auth.controller');
const router = express.Router();

// Register route
router.post('/register', AuthController.register);
router.post('/send-verification-email', AuthController.sendVerificationEmail);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/login', AuthController.login);

module.exports = router;