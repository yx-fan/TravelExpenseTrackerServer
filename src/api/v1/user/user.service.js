const userModel = require('../../../../model/user.model');
const customError = require('../../../../utils/customError');

class UserService {

    async findUserByEmail(email) {
        try {
            let user = await userModel.findOne({ email });
            return user;
        } catch (err) {
            logger.error(`Error getting user by email: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async createUser({ userId, email, password, emailVerified = false}) {
        try {
            let user = new userModel({ userId, email, password, emailVerified });
            user = await user.save();
            return user;
        } catch (err) {
            logger.error(`Error creating user: ${err.message}`);
            throw new Error(err.message);
        }
    }



}

module.exports = new UserService();