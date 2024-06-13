// tests/testRoutes.js
const express = require('express');
const router = express.Router();
const ProducerManager = require('../messaging/producerManager.service');
const testTesseract = require('../test/testTesseract');
const passport = require('../config/passport');

router.get('/error', (req, res, next) => {
    const err = new Error('This is a test error message');
    err.statusCode = 400;
    next(err);
});

router.get('/produce/:message', async (req, res) => {
    const message = req.params.message;
    await ProducerManager.sendToQueue('test', message);
    res.send('Test message sent to RabbitMQ');
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Authenticated');
});

router.get('/scanReceipt', async (req, res) => {
    const result = await testTesseract('./test/test.jpeg');
    res.send(result);
});


module.exports = router;
