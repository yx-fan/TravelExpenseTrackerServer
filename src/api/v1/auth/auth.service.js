const UserService = require('../user/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('../../../../utils/logger');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    async register({email, password, emailVerified = false}) {

        let userId = this._generateUserId(email);

        try {
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt); 

            // Save user to database
            const user = await UserService.createUser({ userId, email, password, emailVerified });
        
            // Return jsonwebtoken
            const token = this._generateToken(user);
            logger.info(`User registered: ${user.email}`);
            return token;
        } catch (err) {
            logger.error(`Error registering user: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async comparePasswords(password, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (err) {
            logger.error(`Error comparing passwords: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async login(user) {
        try {
            const token = this._generateToken(user);
            logger.info(`User logged in: ${user.email}`);
            return token;
        } catch (err) {
            logger.error(`Error logging in user: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async _generateToken(user) {
        try {
            const payload = { user: { userId: user.userId } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (err) {
            logger.error(`Error generating token: ${err.message}`);
            throw new Error(err.message);
        }
    }

    _generateUserId(email) {
        try {
            const userId = crypto
                .createHash('sha256')
                .update(email)
                .digest('hex');  // Generate userId from email

            return userId;
        } catch (err) {
            logger.error(`Error generating userId: ${err.message}`);
            throw new Error(err.message);
        }
    }
}

module.exports = new AuthService();