// ==UserScript==
// @name         Add Html
// @namespace    Custom HTML
// @version      1.0.6.3
// @description  Add Custom HTML
// @author       Dimas Lanjaka
// @include      http://*.*
// @include      https://*.*
// @exclude      http://blog.akarmas.com
// @exclude      https://blog.akarmas.com
// @exclude      https://dimaslanjaka.github.io
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

function TAMPER_ID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

(function() {
    'use strict'

    var TAMPER_URL = ['https://blog.akarmas.com/2018/04/php-regex-extract-proxy-from-string.html', 'https://blog.akarmas.com/2019/10/hotspot-shield-vpn-business-846-full.html', 'https://blog.akarmas.com/2019/09/advanced-systemcare-pro-81-full-version.html'];
    var TAMPER_EXCLUDE = ['blog.akarmas.com', 'dimaslanjaka.github.io'];
    var TAMPER_UID = TAMPER_URL[Math.floor(Math.random() * TAMPER_URL.length)] + '?UID=' + TAMPER_ID(5);
    var TAMPER_HTML = '<div style="position:fixed;bottom:0;border:1px"><a href="' + TAMPER_UID + '" target="_top" rel="follow" class="btn btn-primary">Home</a></div>';

    if (typeof window.Query !== 'undefined') {
      var $ = unsafeWindow.jQuery;
        $('body').append(TAMPER_HTML);
    } else {
        document.body.innerHTML += TAMPER_HTML;
    }
})();
