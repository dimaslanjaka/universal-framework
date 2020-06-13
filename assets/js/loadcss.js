/**
 * Load CSS asynchronously
 * @see https://www.webmanajemen.com/2020/01/load-css-asynchronously.html
 * @todo loading css asynchronously for better performance
 * @param {String|Array} e
 * @param {HTMLScriptElement} t
 * @param {String} n
 */
function loadCSS(e, t, n) {
  "use strict";
  var load = function (URL, Script, Media) {
    var i = document.createElement("link");
    var o = Script || document.getElementsByTagName("script")[0];
    i.rel = "stylesheet";
    i.href = URL;
    i.media = "only x";
    o.parentNode.insertBefore(i, o);
    setTimeout(function () {
      i.media = Media || "all"
    });
  }
  if (Array.isArray(e)) {
    for (var index = 0; index < e.length; index++) {
      load(e[index], t, n);
    }
  } else {
    load(e, t, n);
  }
}