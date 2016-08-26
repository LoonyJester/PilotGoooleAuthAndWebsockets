var express = require('express');
var router = express.Router();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function (passport) {
   router.get('/logout',
      function (req, res) {
         req.logout();
         res.redirect('/');
      });


   router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

   // the callback after google has authenticated the user
   router.get('/google/callback',
      passport.authenticate('google',
         {
            successRedirect: '/account/profile',
            failureRedirect: '/'
         }));

   router.get('/unlink/google',
      passport.isLoggedIn,
      function (req, res) {
         var user = req.user;
         user.google.token = undefined;
         user.save(function (err) {
            res.redirect('/account/profile');
         });
      });

   router.get('/profile', passport.isLoggedIn, function (req, res) {
      res.render('account/profile.jade', {
         user: req.user
      });
   });

   router.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
   });

   return router;
};




