function updateStats(memuse) {
    document.getElementById('rss').innerHTML = memuse.rss;
    document.getElementById('heapTotal').innerHTML = memuse.heapTotal;
    document.getElementById('heapUsed').innerHTML = memuse.heapUsed;
}




setTimeout(function() {
        var ws = new WebSocket('ws://' + window.document.location.host + '/socket/testws');
        ws.onmessage = function(event) {
            updateStats(JSON.parse(event.data));
        };
        ws.onopen = function() {
            ws.send('test message');
        }
        

    },
    3000);

