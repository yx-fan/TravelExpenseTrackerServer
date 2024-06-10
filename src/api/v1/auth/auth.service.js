const userModel = require('../../../../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('../../../../utils/logger');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    async register({email, password}) {
        try {
            // Create a new user
            let nickname = "user";
            let userId = crypto.createHash('sha256').update(email).digest('hex');
            let user = new userModel({ userId, nickname, email, password });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user
            user = await user.save();

            // Return jsonwebtoken
            const token = this._generateToken(user);
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
}

module.exports = new AuthService();