function updateStats(memuse) {
    document.getElementById('rss').innerHTML = memuse.rss;
    document.getElementById('heapTotal').innerHTML = memuse.heapTotal;
    document.getElementById('heapUsed').innerHTML = memuse.heapUsed;
    document.getElementById('username').innerHTML = memuse.username;
};

function addMessage(mes) {

    var iDiv = document.createElement('div');
    iDiv.innerHTML = mes.message;
     document.getElementById('messages').appendChild(iDiv);;
}
var ws = new WebSocket('ws://' + window.document.location.host + '/socket/testws');
ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    if (data.rss) {
        updateStats(data);
    } else {
        addMessage(data);
    }

};

var counter = 0;

startSpam = function () {
    setInterval(function () {
        ws.send('message ' + ++counter);
    },
        5000);
}

ws.onopen = function () {
    ws.send('start message');
    startSpam();
};

