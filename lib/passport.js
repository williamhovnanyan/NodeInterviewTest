var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');

// load up the user model
var User = require('../app/models/user').User;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });


    passport.use(new FacebookStrategy(
        config.get('facebook'),
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'fb_id' : profile.id }, function(err, user) {

                    if(err)
                        return done(err);

                    // if the user is found, then log them in
                    if(user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();


                        // set all of the facebook information in our user model
                        newUser.fb_id    = profile.id; // set the users facebook id
                        newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.username = profile.emails[0].value;
                        newUser.profile_pic = profile.photos[0].value;

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });
    }));
};