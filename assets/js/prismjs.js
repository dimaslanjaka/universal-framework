//<![CDATA[
var WMI = {
  prismjs: {
    theme: 'prism-vs'
  }
}
/**
 * Load CSS asynchronously
 * @param string e css URL
 * @param HTMLScriptElement t
 * @param string n media css
 */
function loadCSS(e, t, n) {
  "use strict";
  var i = window.document.createElement("link");
  var o = t || window.document.getElementsByTagName("script")[0];
  i.rel = "stylesheet";
  i.href = e;
  i.media = "only x";
  o.parentNode.insertBefore(i, o);
  setTimeout(function() {
    i.media = n || "all"
  });
}
loadCSS('//raw.githack.com/PrismJS/prism-themes/master/themes/' + WMI.prismjs.theme + '.css');
var pre = document.querySelectorAll("pre"); //:not(:has(code))
//automated on single pre
if (pre.length) {
  for (var index = 0; index < pre.length; index++) {
    var element = pre[index];
    if (typeof element.parentNode != 'undefined' && typeof element.parentNode.classList != 'undefined' && element.parentNode.classList.contains('gist-data')) continue;
    if (!element.querySelectorAll('code').length) {
      element.innerHTML = '<code>' + element.innerHTML + '</code>';
    }
    var code = element.querySelectorAll('code');
    code[0].classList.toggle('language-markup');
    if (element.hasAttribute('lang')) {
      var lang = element.getAttribute('lang');
      if (lang != '') {
        if (lang == 'manual' || lang == 'disable') {
          code[0].classList.remove('language-markup');
        } else {
          code[0].classList.remove('language-markup');
          code[0].classList.toggle('language-' + lang);
        }
      }
    }
  }
}
/**
 * Load PrismJS Asynchronously
 */
function downloadJSAtOnload() {
  (function(scripts) {
    var i = 0,
      l = scripts.length;
    for (; i < l; ++i) {
      var element = document.createElement("script");
      element.src = (scripts[i]);
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(element);
    }
  })(['//cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js', '//cdnjs.cloudflare.com/ajax/libs/prism/1.12.2/prism.min.js']);
}
if (window.addEventListener) {
  window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", downloadJSAtOnload);
} else {
  window.onload = downloadJSAtOnload
};
//]]>