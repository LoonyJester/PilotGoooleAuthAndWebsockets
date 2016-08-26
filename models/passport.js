﻿var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./user');

module.exports = function(passport) {

   passport.serializeUser(function (user, done) {
      done(null, user.id);
   });

   // used to deserialize the user
   passport.deserializeUser(function (id, done) {
      User.get(id, function (err, user) {
         done(err, user);
      });
   });


    passport.isLoggedIn = function(req, res, next) {
        if (req.isAuthenticated())
            return next();

        return res.redirect('/');
    };

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID: "729752977457-05p52ts4knqqeljagpibl2sqlfko51n2.apps.googleusercontent.com",
        clientSecret: "_Vzf2Ih1yjjQ23H_L1V-B7v6",
        callbackURL: "http://localhost:1337/account/google/callback",
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.get({ id : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();
                       newUser.google = {};
                       newUser.id    = profile.id;
                       newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));




}