const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
      }
    )
  );
};
