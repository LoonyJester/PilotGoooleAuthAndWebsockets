var express = require('express');
var router = express.Router();


module.exports = function (expressWs) {

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

                    var w = expressWs;
                    var currnetId = req.user.id;
                    for (var i = 0; i < w.getWss().clients.length; i++) {
                        var u = w.getWss().clients[i].upgradeReq.user;
                        if (u.id !== currnetId) {
                            w.getWss().clients[i].send(JSON.stringify({ message: "Hello " + u.google.name + " from " + req.user.google.name + ' (' + req.user.google.email + ') at ' + new Date().toLocaleTimeString()}), function () { /* ignore errors */ });
                        }
                    }


                });
            console.log('socket', req.testing);
        });

    return router;
};