function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

(function() {
  // Load the script
  var script = document.createElement("script");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
  script.type = 'text/javascript';
  script.onload = function() {
    var $ = window.jQuery;
    if (!getCookie('ip')) {
      var apiList = ['https://ip.seeip.org/jsonip?', 'https://api.ipify.org/?format=json', 'https://api.myip.com/'];
      //var API = apiList[Math.floor(Math.random() * apiList.length)];
      for (var index = 0; index < apiList.length; index++) {
        var API = apiList[index];
        $.getJSON(API, function(r) {
          if (r.hasOwnProperty('ip')) {
            if (getCookie('ip') != r.ip) {
              setCookie('ip', r.ip, 1);
              $.post(location.href, {
                'set-ip': r.ip
              }, function() {
                location.reload(1);
              });
            }
          }
        });
      }
    } else {
      console.log(getCookie('ip'));
    }
  };
  document.getElementsByTagName("head")[0].appendChild(script);
})();