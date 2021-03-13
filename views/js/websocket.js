/** websocket steam */
var socket, piutang_invoice = $('[id="piutang-inv"], [id="piutang-invoice"]'),
  pendapatan_invoice = $('[id="pendapatan-inv"], [id="pendapatan-invoice"]'),
  socket_debug = $('[id="socket-debug"]');
if (piutang_invoice.length || pendapatan_invoice.length || socket_debug.length) {
  socket_start();
}

function socket_start() {
  if (!socket) {
    console.log('WebSocket Started');
    socket = socket_server();
  }
  try {
    socket.onopen = function(msg) {
      //console.log('socket initialized');
    };
    socket.onmessage = function(msg) {
      var data = JSON.parse(msg.data);
      //console.log(data);
      if (piutang_invoice.length) {
        piutang_invoice.val(data.piutang_max_invoice).trigger('change');
      }
      if (pendapatan_invoice.length && typeof data.pendapatan_max_invoice != 'undefined') {
        pendapatan_invoice.val(data.pendapatan_max_invoice).trigger('change');
      }
      if (socket_debug.length && typeof data.debug != 'undefined') {
        var jd = JSON.stringify(data.debug);
        var c = '<pre style="width:100%;word-wrap:break-word;height:500px;">' + jd.replace("\n", '<br/>').replace('\n', '<br/>') + '</pre>';
        if (c != socket_debug.html()) {
          socket_debug.html(c);
        }
      }
    };
    socket.onclose = function(msg) {
      console.log({
        closed: socket
      });
    };
  } catch (ex) {
    console.log(ex);
  }
}

function socket_server() {
  console.log('Socket Initialized');
  var host;
  if (!!window.EventSource) {
    host = location.protocol + '//agc.io/ajax/server';
    var socket = new EventSource(host, { withCredentials: true });
  } else {
    host = 'wss://agc.io/ajax/server';
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