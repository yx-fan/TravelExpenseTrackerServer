const AuthService = require('./auth.service');
const UserService = require('../user/user.service');
const EmailVerificationService = require('./emailVerification.service');
const ProducerManager = require('../../../../messaging/producerManager.service');
const customError = require('../../../../utils/customError');
const logger = require('../../../../utils/logger');

const pendingVerifications = {}; // { email: { verified: false, type, expires: Date.now() + 3600000 }} type: register | forgot-password

class AuthController {

    constructor() {
        this._startCleanUpInterval();  // Clean up expired verification codes
    }

    async register(req, res, next) {

        const { email, password } = req.body;

        try {
            const verification = pendingVerifications[email];
            if (!verification || !verification.verified || verification.type !== 'register') {
                throw new customError('Email not verified for registration', 400);
            }

            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                throw new customError('User with this email already exists, please login', 400);
            }

            const token = await AuthService.register({email, password, emailVerified: true});

            // Remove email from pending verifications
            delete pendingVerifications[email];

            return res.status(201).json({ token });
        } catch (err) {
            next(err);
        }
    }

    async sendVerificationEmail(req, res, next) {

        const { email, type } = req.body;

        try {
            const existingUser = await UserService.findUserByEmail(email);
            if (type === 'register' && existingUser) {
                throw new customError('User with this email already exists, please login', 400);
            }

            if (type === 'forgot-password' && !existingUser) {
                throw new customError('User with this email does not exist', 400);
            }

            if (type !== 'register' && type !== 'forgot-password') {
                throw new customError('Invalid verification type', 400);
            }

            // Send task to email queue
            // This can help to reduce the response time of the API
            await ProducerManager.sendToQueue('email', { email, type });
            pendingVerifications[email] = { verified: false, type, expires: Date.now() + 3600000 };  // 1 hour
            return res.status(200).json({ message: 'Verification email sent' });
        } catch (err) {
            next(err);
        }
    }

    async verifyEmail(req, res, next) {

        const { token } = req.query;
        if (!token) {
            return next(new customError('Verification code required', 400));
        }

        try {
            const email = await EmailVerificationService.verifyEmail(token);
            if (pendingVerifications[email]) {
                pendingVerifications[email].verified = true;
            } else {
                throw new customError('Verification code not sent for this email', 400);
            }
            return res.status(200).json({ email });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {

        const { email, password } = req.body;

        try {
            const user = await UserService.findUserByEmail(email);
            if (!user) {
                throw new customError('Invalid email or password', 400);
            }
            const isMatch = await AuthService.comparePasswords(password, user.password);
            if (!isMatch) {
                throw new customError('Invalid email or password', 400);
            }
            const token = await AuthService.login(user);
            return res.status(200).json({ token });
        } catch (err) {
            next(err);
        }
    }

    _startCleanUpInterval() {
        setInterval(async () => {
            try {
                const now = Date.now();
                for (let email in pendingVerifications) {
                    if (pendingVerifications[email].expires < now) {
                        delete pendingVerifications[email];
                    }
                }
            } catch (err) {
                logger.error(`Error cleaning up expired verification codes: ${err.message}`);
            }
        }, 3600000);  // 1 hour
    }
}

module.exports = new AuthController();