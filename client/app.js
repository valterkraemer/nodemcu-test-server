(function() {
  var websocketConnected = document.getElementById('websocket-connected');
  var lastWebsocketMessage = document.getElementById('last-websocket-message');
  var sendMessageButton = document.getElementById('send-message');

  websocketConnected.textContent = 'false';
  
  var interval;
  var lastWebsocketMessageDate;

  sendMessageButton.onclick = sendMessage;

  var url = ((window.location.protocol === "https:") ? "wss" : "ws") + "://" + window.location.host;
  var ws = new WebSocket(url);

  ws.onopen = onopen;
  ws.onmessage = onmessage;
  ws.onclose = onclose;

  function onopen() {
    websocketConnected.textContent = 'true';
  }

  function onmessage(data) {
    updateLastWebsocketMessage();

    //ws.send(data);
  }

  function onclose() {
    websocketConnected.textContent = 'false';
  }

  function updateLastWebsocketMessage() {
    lastWebsocketMessageDate = new Date();
    
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(intervalFunction, 1000);
    intervalFunction();

    function intervalFunction() {
      var s = Math.floor((new Date() - lastWebsocketMessageDate) / 1000);

      lastWebsocketMessage.textContent = s + 's';
    }
  }

  function sendMessage() {
    ws.send(JSON.stringify({'text': 'hola'}));
  }

})();