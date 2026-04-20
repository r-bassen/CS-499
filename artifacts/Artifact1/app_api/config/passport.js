const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user'); 

// Configure the local strategy for use by Passport.
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },

        // Verify username and password
        async (username, password, done) => {
            const q = await User.findOne({ email: username }).exec();

            // Check if user exists
            if (!q) {
                return done(null, false, {
                    message: "Incorrect username.",

                });
            }

            // Check if password is correct
            if (!q.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password.",
                });
            }
            return done(null, q);
        }
    )
);