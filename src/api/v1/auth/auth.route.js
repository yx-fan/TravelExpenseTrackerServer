const express = require('express');
const AuthController = require('./auth.controller');
const router = express.Router();

// Register route
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;