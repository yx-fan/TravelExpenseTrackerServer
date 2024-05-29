const AuthService = require('./auth.service');

class AuthController {

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const token = await AuthService.register({name, email, password});
            res.status(201).json({ token });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();