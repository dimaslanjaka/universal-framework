/// <reference path="./globals.d.ts" />

if (!(typeof module !== "undefined" && module.exports)) {
  var gtagID = siteConfig.google.recaptcha.key;
  var create_gtagscript = document.createElement("script");
  create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
  create_gtagscript.async = true;
  document.getElementsByTagName("body")[0].appendChild(create_gtagscript);

  var gtag: Window["gtag"] = null;
  window.onload = function () {
    if (window.dataLayer) {
      window.dataLayer = window.dataLayer || [];

      gtag = function () {
        (<any[]>window.dataLayer).push(arguments);
      };

      gtag("js", new Date());
      gtag("config", gtagID, {
        page_title: document.title,
        page_path: location.pathname,
      });
      gtag("event", "page_view", {
        send_to: gtagID,
      });
      gtag("config", "UA-106238155-1", {
        cookie_prefix: "GoogleAnalystics",
        cookie_domain: location.host,
        cookie_update: false, //true false update cookie every load
        cookie_expires: 28 * 24 * 60 * 60, // 28 days, in seconds
      });

      var trackLinks = document.getElementsByTagName("a");
      for (var i = 0, len = trackLinks.length; i < len; i++) {
        const singleLink = trackLinks[i];
        singleLink.onclick = function () {
          if (!/^\#/gm.test(singleLink.href) && !empty(singleLink.href)) {
            gtag("event", "click", {
              event_category: "outbound",
              event_label: singleLink.href,
              transport_type: "beacon",
            });
          }
        };
      }

      /*var elementsArray = document.querySelectorAll('b,iframe,ins,button,img,input,.adsense,#adsense,.ads,#ads,.ad_slot,.adsbygoogle,blockquote');
    elementsArray.forEach(function(elem) {
      elem.addEventListener("click", function(event) {
        var data = null;
        var clickon = "X: " + event.clientX + " - Y: " + event.clientY;

        dump = document.getElementById('positionTrack');

        if (dump) {
          data = this.tagName + '(' + clickon + ')';

          dump.textContent = data;
        }
        gtag("event", "ClickPosition", {
          'elements': data
        });
      });
    });*/
    }
  };

  /**
   * Google analystic reporter
   * @param {String} event_action
   * @param {string} event_label
   * @param {string} event_category
   * @param {string} event_value
   * @param {Function|any} event_callback
   */
  function analys(event_action, event_label, event_category, event_value, event_callback) {
    var conf = {
      event_label: event_label,
      event_category: event_category,
      value: event_value,
      event_callback: typeof event_callback == "function" ? event_callback : false,
    };
    return gtag("event", event_action, conf);
  }
}
