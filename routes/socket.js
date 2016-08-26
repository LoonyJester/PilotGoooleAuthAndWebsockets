var express = require('express');
var router = express.Router();


module.exports = function() {

    router.ws('/testws',
        function (ws, req) {
            if (!req.isAuthenticated()) {
                throw ("Not Authenticated");
            }


            ws.on('message',
                function (msg) {
                    var u = req.user;
                    console.log(msg);
                    console.log(req.user.google.name + ' (' + req.user.google.email + ')');
                    var p =process.memoryUsage();
                    p.username = req.user.google.name;
                    ws.send(JSON.stringify(p), function () { /* ignore errors */ });
                });
            console.log('socket', req.testing);
        });

    return router;
};