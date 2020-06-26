/**
 * Lazy load Adsense with customizable config
 * @type boolean alertAds show alert ads every page loaded with sweetalert. default true
 * @see https://sweetalert.js.org/docs/#content SweetAlert
 * @type string alertAds_html adsense HTML or other ads HTML string. default string
 * @type boolean VerifyLoadedAds verify adsense was loaded or not. default false
 * @author Dimas Lanjaka <dimascyber008@gmail.com>
 */
var alertAds = false;
var VerifyLoadedAds = true;
if (typeof alertAds == 'undefined') {
  var alertAds = true;
  if (typeof alertAds_html == 'undefined') {
    var alertAds_html = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7975270895217217" data-ad-slot="4894289831" data-ad-format="link" data-full-width-responsive="true"></ins>';
  }
}
if (typeof VerifyLoadedAds == 'undefined') {
  var VerifyLoadedAds = false;
}
(function () {
  if (typeof swal != 'undefined' && alertAds) {
    swal({
      title: 'Donate With Click ^_^',
      /*type: 'info',*/
      content: {
        element: 'div',
        attributes: {
          innerHTML: alertAds_html + '<li class="fas fa-link"></i> <a href="//web-manajemen.blogspot.com"><b>Website Development Indonesia</b></a> '
        }
      },
      buttons: {
        cancel: {
          text: " Bad!",
          value: null,
          visible: true,
          className: "fas fa-thumbs-down text-danger border border-danger bg-white",
          closeModal: true,
        },
        confirm: {
          text: " Great!",
          value: true,
          visible: true,
          className: "fas fa-thumbs-up text-success border border-success bg-white",
          closeModal: true
        }
      },
      closeOnEsc: false,
      closeOnClickOutside: false
    });
  }
  if (typeof RegexHost == 'undefined') {
    /**
     * @type RegExp RegexHost regex matching for exclude from adsense
     */
    var RegexHost = /^localhost|git\.io|agc\.io|^(\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b):?(\d{2,5})/gm;
  }
  var PushAdsense = function () {
    $('.adsbygoogle').each(function (i, obj) {
      if (!obj.hasAttribute('pushed')) {
        if (typeof VerifyLoadedAds != 'undefined' && VerifyLoadedAds) {
          if (obj.getElementsByTagName('iframe').length) return;
        }
        (adsbygoogle = window.adsbygoogle || []).push({});
        obj.setAttribute('pushed', 'true');
      }
    });
  }
  if (!location.host.match(RegexHost)) {
    if (typeof window.adsbygoogle == 'undefined') {
      var ad = document.createElement('script');
      ad.type = 'text/javascript';
      ad.setAttribute('async', true);
      ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      ad.setAttribute('data-ad-client', 'ca-pub-7975270895217217');
      var sc = document.getElementsByTagName('script')[0];
      sc.parentNode.insertBefore(ad, sc);
      ad.onload = PushAdsense;
    } else {
      PushAdsense();
    }
  }
})();