const userModel = require('../../../../model/user.model');

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

}

module.exports = new UserService();