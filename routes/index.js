var express = require('express');
var router = express.Router();



// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '729752977457-05p52ts4knqqeljagpibl2sqlfko51n2.apps.googleusercontent.com';
var CLIENT_SECRET = '_Vzf2Ih1yjjQ23H_L1V-B7v6';
var REDIRECT_URL = 'http://localhost:1337/goauth/goauthcallback';

//var CLIENT_ID = 'YOUR CLIENT ID HERE';
//var CLIENT_SECRET = 'YOUR CLIENT SECRET HERE';
//var REDIRECT_URL = 'YOUR REDIRECT URL HERE';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var scopes = [
    'https://www.googleapis.com/auth/drive'
];


/* GET home page. */
router.get('/', function (req, res) {

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
        scope: scopes // If you only need one scope you can pass it as string 
    });

    res.render('index', { title: 'Google and WebSockets', oauthUrl : url });
});

module.exports = router;