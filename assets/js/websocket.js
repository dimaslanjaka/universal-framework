/**
 * Simple Websocket javascript
 * @todo Live Data
 * @description Don't miss data that changes even for a second
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com
 * @see https://www.webmanajemen.com/p/simple-websocket.html Simple Web Socket
 */
var socket = false;

function socket_start() {
  if (!socket_check()) {
    console.log('WebSocket Started');
    socket = socket_server();
  }
  try {
    socket.onopen = function (msg) {
      console.log('socket initialized');
    };
    socket.onmessage = function (msg) {
      var data = JSON.parse(msg.data);
      //do with data response
      console.log(data);
    };
    socket.onclose = function (msg) {
      console.log({ closed: socket });
    };
  }
  catch (ex) {
    console.log(ex);
  }
}

function socket_server() {
  console.log('Socket Initialized');
  var host = '/ajax/server';
  if (!window.EventSource) {
    var socket = new EventSource(host);
  } else {
    var socket = new WebSocket(host);
  }
  return socket;
}

function socket_stop() {
  if (socket != null) {
    console.log("WebSocket Stopped");
    socket.close();
    socket = null;
  }
}

function socket_check() {
  return socket;
}

