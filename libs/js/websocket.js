/**
 * Simple Websocket javascript
 * @todo Live Data
 * @description Don't miss data that changes even for a second
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com
 * @see https://www.webmanajemen.com/p/simple-websocket.html Simple Web Socket
 */
var socket;

function socket_start(host) {
  if (!host) {
    console.error('Host websocket empty');
    return;
  }
  if (!socket_check()) {
    console.log('WebSocket Started');
    socket = socket_server(host);
  }
  try {
    // @ts-ignore
    socket.onopen = function(msg) {
      console.log('socket initialized');
    };
    socket.onmessage = function(msg) {
      var data = JSON.parse(msg.data);
      //do with data response
      console.log(data);
    };
    // @ts-ignore
    socket.onclose = function(msg) {
      console.log({
        closed: socket
      });
    };
  } catch (ex) {
    console.log(ex);
  }
}

function socket_server(host) {
  if (!host) {
    console.error('Host websocket empty');
    return;
  }
  console.log('Socket Initialized');
  if (!window.EventSource) {
    var socket = new EventSource(host);
  } else {
    // @ts-ignore
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