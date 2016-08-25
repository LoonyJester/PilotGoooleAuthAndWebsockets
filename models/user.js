var bcrypt   = require('bcrypt-nodejs');
var redis = require('redis').createClient();



var user = function (data) {

}


user.prototype = {

   save: function (cb) {
      redis.set('user' + user.id, JSON.stringify(user.google),
            function(err) {
               cb(err, null);
            });
   },
   get: function (id, cb) {
      redis.get('user' + user.id, 
          function (err, saveduser) {
              var gotted = new user();
              gotted.google = JSON.parse(user);
              gotted.id = user.id;
                cb(err, gotted);
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


modu.exports = member;