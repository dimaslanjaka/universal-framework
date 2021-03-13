/** websocket steam */
var socket, piutang_invoice = $('[id="piutang-inv"], [id="piutang-invoice"]'), pendapatan_invoice = $('[id="pendapatan-inv"], [id="pendapatan-invoice"]'), socket_debug = $('[id="socket-debug"]');
if (piutang_invoice.length || pendapatan_invoice.length || socket_debug.length) {
  socket_start();
}
function socket_start() {
  if (!socket) {
    console.log('WebSocket Started');
    socket = socket_server();
  }
  try {
    socket.onopen = function (msg) {
      console.log('socket initialized');
    };
    socket.onmessage = function (msg) {
      var data = JSON.parse(msg.data);
      //console.log();
      if (piutang_invoice.length) {
        piutang_invoice.val(data.piutang_max_invoice).trigger('change');
      }
      if (pendapatan_invoice.length&&typeof data.pendapatan_max_invoice != 'undefined') {
        pendapatan_invoice.val(data.pendapatan_max_invoice).trigger('change');
      }
      if (socket_debug.length&&typeof data.debug != 'undefined'){
        socket_debug.html('<pre>'+JSON.stringify(data.debug)+'</pre>');
      }
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