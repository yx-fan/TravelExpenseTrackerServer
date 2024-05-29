const userModel = require('../../../../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../../../../utils/logger');
const customError = require('../../../../utils/customError');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    async register({name, email, password}) {
        try {
            let existUser = await userModel.findOne({ email });
            if (existUser) {
                throw new customError('User already exists', 400);
            }

            // Create a new user
            user = new userModel({ name, email, password,});

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken
            const payload = { user: { id: user._id }};
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (err) {
            logger.error(`Error registering user: ${err.message}`);
            throw new Error(err.message);
        }
    }
}

module.exports = new AuthService();