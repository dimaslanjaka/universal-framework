var lazyadsense = false;
window.addEventListener("scroll", function () {
  if ((document.documentElement.scrollTop != 0 && lazyadsense === false) || (document.body.scrollTop != 0 && lazyadsense === false)) {
    (function () {
      var ad = document.createElement('script');
      ad.type = 'text/javascript';
      ad.async = true;
      ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      var sc = document.getElementsByTagName('script')[0];
      sc.parentNode.insertBefore(ad, sc);
      ad.onload = function (e) {
        console.log({adsense: e});
        $('.adsbygoogle').each(function (i, obj) {
          if (!obj.hasAttribute('pushed')) {
            (adsbygoogle = window.adsbygoogle || []).push({});
            obj.setAttribute('pushed', 'true');
          }
        });
      }
    })();
    lazyadsense = true;
  }
}, true);