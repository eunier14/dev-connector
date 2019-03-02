const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_playload, done) => {
      // get the user that is been sent in the token
      User.findById(jwt_playload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, null);
        })
        .catch(err => console.log(err));
    })
  );
};
