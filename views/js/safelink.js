
//config
var adlinkfly_url = 'https://safelinkblogger.com/';
var adlinkfly_api_token = '0dc9e139b72052f875492c67425f8766769b3bc7';
var adlinkfly_advert = 2;
var adlinkfly_exclude_domains = ['blog.akarmas.com', 'web-development.blogspot.com'];

//converter
function adlinkfly_get_url(e) {
  var n = document.createElement("a");
  return n.href = e, n
}

function adlinkfly_get_host_name(e) {
  return null == e || "" === e || e.match(/^\#/) ? "" : -1 === (e = adlinkfly_get_url(e)).href.search(/^http[s]?:\/\//) ? "" : e.href.split("/")[2].split(":")[0].toLowerCase()
}

function adlinkfly_base64_encode(e) {
  return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, n) {
    return String.fromCharCode("0x" + n)
  }))
}

function adlinkfly_get_wildcard_domains(e) {
  var n = [];
  for (i = 0; i < e.length; i++) e[i].match(/^\*\./) && n.push(e[i].replace(/^\*\./, ""));
  return n
}

function adlinkfly_match_wildcard_domain(e, n) {
  var l = adlinkfly_get_wildcard_domains(e);
  for (i = 0; i < l.length; i++)
    if (n.substr(-1 * l[i].length) === l[i]) return !0;
  return !1
}

function adlinkfly_domain_exist(e, n) {
  return e.indexOf(n) > -1 || adlinkfly_match_wildcard_domain(e, n)
}

document.addEventListener("DOMContentLoaded", function (e) {
  if ("undefined" != typeof adlinkfly_url && "undefined" != typeof adlinkfly_api_token) {
    var n = 1;
    "undefined" != typeof adlinkfly_advert && (2 == adlinkfly_advert && (n = 2), 0 == adlinkfly_advert && (n = 0));
    var l = document.getElementsByTagName("a");
    if ("undefined" == typeof adlinkfly_domains)
      if ("undefined" == typeof adlinkfly_exclude_domains);
      else
        for (t = 0; t < l.length; t++) {
          (a = adlinkfly_get_host_name(l[t].getAttribute("href"))).length > 0 && !1 === adlinkfly_domain_exist(adlinkfly_exclude_domains, a) ? l[t].href = adlinkfly_url + "full/?api=" + encodeURIComponent(adlinkfly_api_token) + "&url=" + adlinkfly_base64_encode(l[t].href) + "&type=" + encodeURIComponent(n) : "magnet:" === l[t].protocol && (l[t].href = adlinkfly_url + "full/?api=" + encodeURIComponent(adlinkfly_api_token) + "&url=" + adlinkfly_base64_encode(l[t].href) + "&type=" + encodeURIComponent(n))
        } else
      for (var t = 0; t < l.length; t++) {
        var a;
        (a = adlinkfly_get_host_name(l[t].getAttribute("href"))).length > 0 && adlinkfly_domain_exist(adlinkfly_domains, a) ? l[t].href = adlinkfly_url + "full/?api=" + encodeURIComponent(adlinkfly_api_token) + "&url=" + adlinkfly_base64_encode(l[t].href) + "&type=" + encodeURIComponent(n) : "magnet:" === l[t].protocol && (l[t].href = adlinkfly_url + "full/?api=" + encodeURIComponent(adlinkfly_api_token) + "&url=" + adlinkfly_base64_encode(l[t].href) + "&type=" + encodeURIComponent(n))
      }
  }
});
