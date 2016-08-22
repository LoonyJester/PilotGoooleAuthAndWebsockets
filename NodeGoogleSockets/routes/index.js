var express = require('express');
var router = express.Router();





var CLIENT_ID = 'YOUR CLIENT ID HERE';
var CLIENT_SECRET = 'YOUR CLIENT SECRET HERE';
var REDIRECT_URL = 'YOUR REDIRECT URL HERE';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var scopes = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar'
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