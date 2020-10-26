var source;

if (!!window.EventSource) {
  var source = new EventSource('/server/websocket/run');
} else {
  // Result to xhr polling :(
}

console.log(source);