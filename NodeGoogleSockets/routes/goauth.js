var express = require('express');
var router = express.Router();












/* GET users listing. */
router.get('/start', function (req, res) {
    getAccessToken(oauth2Client,
        function(p1, p2, p3) {
            res.send('oauth2Client');
        });
//    res.send('start get');
});

router.get('/goauthcallback', function (req, res) {
    res.send('get goauthcallback');
});



module.exports = router;