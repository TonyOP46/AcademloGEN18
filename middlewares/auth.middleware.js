const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'ac4d3ml0'
};

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then((user) => {
                if (user) {
                    done(null, tokenDecoded);
                } else {
                    done(null, false);
                }
            })
            .catch((err) => {
                done(err, false);
            });
    })
);

module.exports = passport;
