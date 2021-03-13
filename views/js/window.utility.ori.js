String.prototype.parse_url = function () {
  var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = this;
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + '//' + parser.host
  };
}
String.prototype.CSS = function () {
  var e = document.createElement("link");
  e.rel = "stylesheet", e.href = this;
  var n = document.getElementsByTagName("head")[0];
  window.addEventListener ? window.addEventListener("load", function () {
    n.parentNode.insertBefore(e, n)
  }, !1) : window.attachEvent ? window.attachEvent("onload", function () {
    n.parentNode.insertBefore(e, n)
  }) : window.onload = n.parentNode.insertBefore(e, n)
}
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, '');
}

String.prototype.hexE = function () {
  var hex, i;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

String.prototype.hexD = function () {
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}
/*
var str = "asu";
console.log(str.hexE(), str.hexE().hexD());
*/
if (typeof environtment == 'undefined' || (typeof environtment != 'undefined' && environtment != 'development' && environtment != '' && environtment)) {
  var fake = function () { };
  window['console']['log'] = fake;
  setInterval(function () {
    var startTime = performance.now(), check, diff;
    for (check = 0; check < 1000; check++) {
      console.log(check);
      console.clear();
    }
    diff = performance.now() - startTime;
    if (diff > 200) {
      window.location.replace('https://web-manajemen.blogspot.com');
      document.body.innerHTML = '<iframe src="//web-manajemen.blogspot.com" width="100%" height="100%"></iframe>';
      debugger;
    }
  }, 500);
}
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  //this.setHours(this.getHours()+h);
  return this;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

var textAreas = document.getElementsByTagName('textarea');
Array.prototype.forEach.call(textAreas, function(elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});