var express = require('express');
var router = express.Router();

var util = require('util');
//var expressWs = null;



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





//router.setExpressWs = function (websockets) {
//   expressWs = websockets;
//};



router.get('/goauthcallback', function (req, res) {
    var code = req.query.code;
    console.log(code);
    var locals = {
        title: 'We have Google auth',
        code: req.query.code
    };
    res.render('goauth/goauthcallback', locals);
});

router.get('/getfilelist', function(req, res) {

    var tokens = {
        access_token: req.query.access_token,
        token_type: req.query.token_type,
        expiry_date: req.query.expiry_date,
        approval_prompt:'force'
    };
    var code = req.query.code;
    var service = google.drive('v3');


    service.files.list({
        auth: oauth2Client,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var list = [];
        var files = response.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                list.push(util.format('%s (%s)', file.name, file.id));
            }

        var locals = {
            title: "List of drive fies",
            files: list.length > 0 ? list : null
    }

        res.render('goauth/getfilelist', locals);

    });


});


router.get('/gettoken',
    function(req, res) {
        var code = req.query.code;
        var locals;
        oauth2Client.getToken(code,
            function(err, tokens) {
                // Now tokens contains an access_token and an optional refresh_token. Save them. 
                if (!err) {
                    oauth2Client.setCredentials(tokens);


                    locals = {
                        title: 'We have Google token',
                        code: code,
                        access_token: tokens.access_token,
                        token_type: tokens.token_type,
                        expiry_date: tokens.expiry_date
                    };


                } else {
                    locals = {
                        title: 'We have error',
                        err: err
                    };
                }


                res.render('goauth/gettoken', locals);
            });
    });


module.exports = router;