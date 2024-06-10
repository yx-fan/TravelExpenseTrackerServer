const AuthService = require('./auth.service');
const UserService = require('../user/user.service');
const customError = require('../../../../utils/customError');

class AuthController {

    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                throw new customError('User with this email already exists, please login', 400);
            }
            const token = await AuthService.register({email, password});
            return res.status(201).json({ token });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
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
}

module.exports = new AuthController();