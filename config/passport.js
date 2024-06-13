const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Find user by userId and attach user to req.user
        const user = await UserModel.findOne({ userId: jwt_payload.user.userId });
        if (!user) {
            return done(null, false);
        }
        done(null, user);  // Attach user to req.user
    } catch (err) {
        done(err, false);
    }
}))

module.exports = passport;