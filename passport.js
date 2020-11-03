const CookieStrategy = require('passport-cookie').Strategy;

module.exports.Strategy = function Strategy (passport, db, token ) {
    passport.use(new CookieStrategy(
    function (token, done) {
        db.findOne({token: token}, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            return done(null, user);
        });
    }
))
}


