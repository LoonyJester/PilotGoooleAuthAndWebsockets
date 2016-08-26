var express = require('express');
var router = express.Router();


module.exports = function(passport) {

//    ws.applyTo(router);
//
    router.ws('/testws',
//        passport.isLoggedIn,
        function(ws, req) {
            ws.on('message',
                function(msg) {
                    console.log(msg);
                });
            console.log('socket', req.testing);
        });




//    app.ws('/socket/testws', function (ws, req) {
//    ws.on('message', function (msg) {
//        console.log(msg);
//    });
//    console.log('socket', req.testing);
//});




    return router;
};