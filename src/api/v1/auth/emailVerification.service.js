const nodemailer = require('nodemailer');
const crypto = require('crypto');
const logger = require('../../../../utils/logger');
const dotenv = require('dotenv');
const customError = require('../../../../utils/customError');

dotenv.config();

class emailVerificationService {
    constructor () {
        // Verification tokens are stored in memory
        this.verificationTokens = {};  // { token: { email, expires } }
        this._startCleanUpInterval();  // Clean up expired tokens
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        })
    }

    async sendVerificationEmail(email, type) {
        
        const token = this._generateVerificationToken(email);
        let verificationLink;
        let subject;
        let text;

        // Generate verification link based on environment
        if (process.env.NODE_ENV === 'development') {
            verificationLink = `${process.env.LOCAL_BASE_URL}:${process.env.PORT}/api/v1/auth/verify-email?token=${token}`;
        } else {
            verificationLink = `${process.env.PROD_BASE_URL}/api/v1/auth/verify-email?token=${token}`;
        }

        // Set email subject and text based on type
        if (type === 'register') {
            subject = 'Email Verification';
            text = `Click the link to verify your email for registration: ${verificationLink}`;
        } else if (type === 'forgot-password') {
            subject = 'Password Reset';
            text = `Click the link to reset your password: ${verificationLink}`;
        } else {
            throw new customError('Invalid email verification type', 400);
        }

        // Send email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject,
            text,
        }

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (err) {
            logger.error(`Error sending verification email: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async verifyEmail(token) {

        const data = this.verificationTokens[token];
        
        try {
            if (!data || Date.now() > data.expires) {
                throw new customError('Invalid or expired token', 400);
            }
            delete this.verificationTokens[token];  // Remove token from memory if valid
            return data.email;
        } catch (err) {
            logger.error(`Error verifying email: ${err.message}`);
            throw new Error(err.message);
        }
    }

    _startCleanUpInterval() {
        setInterval(() => {
            try {
                const now = Date.now();
                for (let token in this.verificationTokens) {
                    if (this.verificationTokens[token].expires < now) {
                        delete this.verificationTokens[token];
                    }
                }
            } catch (err) {
                logger.error(`Error cleaning up expired tokens: ${err.message}`);
            }
        }, 3600000);  // 1 hour
    }

    _generateVerificationToken(email) {
        try {
            const token = crypto.randomBytes(32).toString('hex');
            this.verificationTokens[token] = { email, expires: Date.now() + 3600000 };  // 1 hour
            return token;
        } catch (err) {
            logger.error(`Error generating verification token: ${err.message}`);
            throw new Error(err.message);
        }
    }

}

module.exports = new emailVerificationService();