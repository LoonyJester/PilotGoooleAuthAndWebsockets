var bcrypt   = require('bcrypt-nodejs');
var redis = require('redis').createClient();


var User = function() {

};

User.get = function(id, cb) {
   redis.get('user' + id,
      function (err, dbuser) {
         if (dbuser) {
            var gotted = new User();
            gotted.google = JSON.parse(dbuser);
            gotted.id = id;
            return cb(err, gotted);
         }
         return cb(err, null);
      });
};


User.prototype = {

   save: function (cb) {
      redis.set('user' + this.id, JSON.stringify(this.google),
            function(err) {
               cb(err, null);
            });
   },
   generateHash: function (password) {
       return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
   },

   // checking if password is valid
   validPassword: function (password) {
       return bcrypt.compareSync(password, this.local.password);
   }
};


module.exports = User;