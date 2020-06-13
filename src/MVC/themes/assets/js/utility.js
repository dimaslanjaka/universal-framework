var textAreas = document.getElementsByTagName('textarea');
Array.prototype.forEach.call(textAreas, function (elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});
function is_localhost() {
    var is_local = location.host.match(/^localhost|^127|\.io$/s);
    return is_local;
}
function forceSSL() {
    if (location.protocol !== 'https:' && !is_localhost()) {
        location.replace("https:" + location.href.substring(location.protocol.length));
    }
}
function isNativeEvent(eventname) {
    return typeof document.body["on" + eventname] !== "undefined";
}
var events = {};
var original = window.addEventListener;
window.addEventListener = function (type, listener, useCapture) {
    events[type] = true;
    return original(type, listener, useCapture);
};
function hasEventBeenAdded(type) {
    return (type in events);
}
function call_user_func(functionName, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    if (context[func]) {
        return context[func].apply(context, args);
    }
    else if (window[func]) {
        return window[func](arguments);
    }
    else if (func != '') {
        try {
            var tmpFunc = new Function(func(arguments));
            tmpFunc();
        }
        catch (error) {
            return console.error({
                error: "function " + func + " is not registered",
                message: error
            });
        }
    }
}
function prevent_iframe() {
    if (top.location.href != self.location.href) {
        top.location.href = self.location.href;
    }
}
$(document).bind('keydown', function (e) {
    e = e || window.event;
    if (e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        toastr.info("CTRL+S disabled", "Hotkey");
        return false;
    }
    else if (e.keyCode == 82 && e.ctrlKey || e.keyCode == 116) {
        e.preventDefault();
        document.location.reload(true);
        return false;
    }
});
$('textarea').each(function (index, el) {
    if ($(this).val().toString().length)
        return;
    var placeholder = $(this).attr('placeholder');
    $(this).removeAttr('placeholder');
    var id = $(this).attr('id');
    if (!id || id.length == 0) {
        id = makeid(5);
        $(this).attr('id', id);
    }
    $(this).val(formatNewLines(placeholder));
    tafocus('#' + id, placeholder);
});
function tafocus(id, placeholder) {
    var count_newlines = countNewLines(placeholder);
    $(id).on('focus', function (e) {
        var count_length = $(this).val().length;
        if (count_length === count_newlines || $(this).val() == placeholder) {
            $(this).val('');
        }
    });
    $(id).on('blur', function (e) {
        var count_length = $(this).val().length;
        if (!count_length) {
            $(this).val(formatNewLines(placeholder));
        }
    });
}
function formatNewLines(placeholder) {
    for (var index_1 = 0; index_1 < 1000; index_1++) {
        if (!placeholder)
            break;
        placeholder = placeholder.replace('\\n', '\n');
        if (!placeholder.match(/\\n/g)) {
            break;
        }
    }
    return placeholder;
}
function countNewLines(placeholder) {
    if (!placeholder)
        return placeholder;
    var match = placeholder.match(/\\n/g) || '';
    return placeholder.length - match.length;
}
function isJSON(obj) {
    try {
        return JSON.parse(obj);
    }
    catch (error) {
        return false;
    }
}
function is_json(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function findDups(arr, callback) {
    var sorted_arr = arr.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results[i] = sorted_arr[i];
        }
    }
    if (typeof callback == 'function') {
        return callback(results);
    }
    else {
        return results;
    }
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function gexec(action, retry, callback) {
    recaptcha().exec(action, retry, callback);
}
function geToken() {
    return recaptcha().get();
}
function JavaScriptCaller(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                if (typeof callback == 'function') {
                    callback();
                }
            }
        };
    }
    else {
        script.onload = function () {
            if (typeof callback == 'function') {
                callback();
            }
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
var salt = 'salt';
var iv = '1111111111111111';
var iterations = '999';
function getKey(passphrase, salt) {
    if (typeof CryptoJS == 'undefined')
        return;
    var key = CryptoJS.PBKDF2(passphrase, salt, {
        hasher: CryptoJS.algo.SHA256,
        keySize: 64 / 8,
        iterations: iterations
    });
    return key;
}
function userJSEncrypt(passphrase, plainText) {
    if (typeof CryptoJS == 'undefined')
        return;
    var key = getKey(passphrase, salt);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv)
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
function userJSDecrypt(passphrase, encryptedText) {
    if (typeof CryptoJS == 'undefined')
        return;
    var key = getKey(passphrase, salt);
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv)
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
(function ($) {
    jQuery.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                this.value = "";
            }
        });
    };
}(jQuery));
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                this.value = "";
            }
        });
    });
}
if (typeof jQuery.fn.inputFilter != 'undefined') {
    $("input[type='number'], textarea[type='number'], [filter='number']").inputFilter(function (value) {
        if (typeof value == 'string') {
            return /^\d*$/.test(value);
        }
    });
}
else {
    var INPT = document.querySelectorAll("input[type='number'], textarea[type='number'], [filter='number']");
    for (var index = 0; index < INPT.length; index++) {
        var element = INPT[index];
        setInputFilter(element, function (value) {
            return /^\d*$/.test(value);
        });
    }
}
$(document).one('click', '#logout', function (e) {
    e.preventDefault();
    jQuery.post(location.href, {
        logout: true
    }, function () {
        jQuery.get($(this).attr('href'));
        window.location.reload(1);
    });
});
var modal = $('#modalAjax');
function e_modal_error(data) {
    console.log(typeof data);
    modal.find('[id="title"]').removeClass('tx-success').addClass('tx-danger').html('Failure!');
    modal.find('[id="desc"]').html(JSON.stringify(data));
    modal.find('#icon').addClass('ion-ios-close-circle-outline tx-danger').removeClass('ion-ios-checkmark-circle-outline tx-success');
    modal.find('.btn').removeClass('btn-success').addClass('btn-danger');
    modal.modal('show');
}
function e_modal_success(data) {
    modal.find('[id="title"]').removeClass('tx-danger').addClass('tx-success').html('Successfull!');
    modal.find('[id="desc"]').html(data);
    modal.find('#icon').removeClass('ion-ios-close-circle-outline tx-danger').addClass('ion-ios-checkmark-circle-outline tx-success');
    modal.find('.btn').removeClass('btn-danger').addClass('btn-success');
    modal.modal('show');
}
$('form[id^="ajax"]').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    var method = form.attr('method');
    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
            data = (data[0] || data);
            if (!data) {
                e_modal_error(data);
            }
            if (data.hasOwnProperty('success')) {
                e_modal_success(data.success);
            }
            else if (data.hasOwnProperty('error')) {
                e_modal_error(data.error);
            }
            else {
                e_modal_error(data);
            }
            if (data.hasOwnProperty('redirect')) {
                window.location.href = data.redirect;
            }
            else if (data.redirect || typeof redirect_to != 'undefined') {
                window.location.href = redirect_to;
            }
            if (data.hasOwnProperty('reset') && data.reset) {
                form.trigger('reset');
            }
            if (data.hasOwnProperty('refresh') && data.refresh) {
                window.location.reload(1);
            }
            if (typeof gexec != 'undefined') {
                gexec();
            }
        }
    });
});
var inputrp = $('[id="format-rupiah"]');
if (inputrp.length) {
    inputrp.on('keyup keydown change', function (e) {
        var t = $(this);
        var v = t.val();
        var n = t.next('.form-text, #rupiah');
        if (framework().isNumber(v.toString())) {
            var V = framework().rp(v);
            t.css('border-color', 'green');
            framework().enable_button(t, V);
        }
        else {
            var V = 'Bukan nomor';
            t.css('border-color', 'red');
            framework().disable_button(t, V);
        }
        if (n.length) {
            n.text(V);
        }
        else {
            $('<p id="rupiah" class="form-text text-muted">' + V + '</p>').insertAfter(t);
        }
    });
}
if (typeof dimas == 'object' && typeof framework().datetimelocal != 'undefined') {
    framework().datetimelocal(undefined);
}
var select_method = $('select[id="method"]');
if (select_method.length) {
    select_method.change(function () {
        var t = $(this), v = t.val(), r = t.next('input#rekening');
        if (v == 'debit') {
            if (r.length === 0) {
                $('<input type="text" class="form-control mt-2" name="rekening" placeholder="No rekening" id="rekening" required>').insertAfter(t).hide().show('slow');
            }
        }
        else {
            r.hide('slow', function (params) {
                setTimeout(function () {
                    r.remove();
                }, 1000);
            });
        }
    });
}
$(document).ready(function () {
    if (jQuery.fn.tooltip && $('[data-toggle="tooltip"]')) {
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]'
        });
        $('[data-toggle="tooltip-primary"]').tooltip({
            template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
        $('[data-toggle="tooltip-secondary"]').tooltip({
            template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
        $('[data-toggle="tooltip-danger"]').tooltip({
            template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }
    if (jQuery.fn.DataTable && $('#datatable1').length) {
        $('#datatable1').DataTable({
            responsive: true,
            language: {
                searchPlaceholder: 'Search...',
                sSearch: '',
                lengthMenu: '_MENU_ items/page',
            }
        });
    }
    var ds = $('.dataTables_length select');
    if (ds.length || ds.data('select2') || jQuery.fn.select2) {
        ds.select2({
            minimumResultsForSearch: Infinity
        });
    }
});
var hash = window.location.hash.substr(1);
var result = hash.split('&').reduce(function (result, item) {
    var parts = item.split('=');
    result[parts[0]] = parts[1];
    return result;
}, {});
if (hash.length > 1) {
    console.log(result);
}
var elm = $('[countdown]');
if (elm.length > 0) {
    elm.each(function (e) {
        var t = $(this);
        framework().pctd(t);
    });
}
$(document.body).on('click', '[data-redirect]', function (E) {
    var red = $(this).attr('data-redirect');
    if (red && red != '') {
        window.open(red, location.host).focus();
    }
});
if (typeof mask_link != 'undefined') {
    var L = ($('[data-linkify]').length ? $('[data-linkify]') : $(document.body));
    window.onload = function () {
        L.linkify({
            target: "_blank",
            attributes: null,
            className: 'linkified',
            format: function (value, type) {
                return value;
            },
            formatHref: function (href, type) {
                return '/youtube/s/' + btoa(CryptoJS.AES.encrypt(href, (typeof hash_pass != 'undefined' ? hash_pass : location.host)));
            },
        });
    };
}
var nwtb = $('[data-newtab]');
if (nwtb.length) {
    nwtb.click(function (e) {
        window.open('http://href.li/?' + $(this).data('newtab'), 'newtab').focus();
    });
}
var aform = $('[form]');
if (aform.length > 1) {
    aform.click(function (e) {
        e.preventDefault();
        var id_form = $(this).attr('form');
        if (typeof id_form != 'undefined') {
            var winame = document.getElementById(id_form).getAttribute('target');
            console.log('Submiting Form ID#' + id_form);
            window.open('', winame ? winame : 'FormDynamic').focus();
            document.getElementById($(this).attr('form')).submit();
        }
    });
}
function openInNewTab(url, name) {
    if (typeof url != 'undefined' && typeof name != 'undefined') {
        var win = window.open(url, name);
        win.focus();
    }
}
$(document.body).on('click', '[id="newtab"]', function (e) {
    e.preventDefault();
    if ($(this).attr('href')) {
        openInNewTab($(this).attr('href'), ($(this).data('name') ? $(this).data('name') : '_blank'));
    }
});
function get_currency_symbol(filter) {
    var amount = 0;
    var ident = navigator.language;
    var currency_type;
    switch (ident) {
        case 'de-DE':
            currency_type = 'EUR';
            break;
        case 'id-ID':
            currency_type = 'IDR';
            break;
        default:
            currency_type = 'USD';
            break;
    }
    var format = amount.toLocaleString(ident, {
        style: 'currency',
        currency: currency_type
    });
    return format.toString().replace('0,00', '');
}
var iterations = '999';
function CryptoK(passphrase, salt) {
    var key = CryptoJS.PBKDF2(passphrase, salt, {
        'hasher': CryptoJS.algo.SHA256,
        'keySize': 64 / 8,
        'iterations': iterations
    });
    return key;
}
function CryptoE(passphrase, plainText, salt, iv) {
    var key = CryptoK(passphrase, salt, iterations);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv)
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
function CryptoD(passphrase, encryptedText, salt, iv) {
    var key = CryptoK(passphrase, salt);
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv)
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
function GeneratorID() { }
;
GeneratorID.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
GeneratorID.prototype.genId = function () {
    return this.rand++;
};
GeneratorID.prototype.getId = function () {
    this.genId();
    return jQuery.fn.jquery + '.' + this.rand;
};
var GID = new GeneratorID();
var IV = Date.now();
var GI = GID.getId();
var ST = (location.host.replace('.', '') + GI).toUpperCase();
function createJSON(jsObj, tabs) {
    if (tabs) {
        return JSON.stringify(jsObj, null, "\t");
    }
    else {
        return JSON.stringify(jsObj, null, 4);
    }
}
function loadingio(text, callback, mode) {
    if (typeof text == 'undefined' || typeof text == 'boolean' || !text) {
        text = 'Please wait';
    }
    text.toString().toUpperCase();
    if (document.getElementById('loadingio-wrapper')) {
        if (mode == 'disabled' || mode == 'disable') {
            document.getElementById('loadingio-wrapper').classList.remove('running');
        }
        else if (typeof mode == 'undefined' || (typeof mode != 'undefined' && (mode == 'enable' || mode == 'enabled'))) {
            document.getElementById('loadingio-text').innerHTML = text;
            document.getElementById('loadingio-wrapper').classList.toggle('running');
        }
    }
    else {
        var elemDiv = document.createElement('div');
        elemDiv.innerHTML = '<div id="loadingio-wrapper" class="ld-over-full running"><span class="ld"><span class="ld ld-ball ld-bounce"></span><span id="loadingio-text" class="text pt-3">' + text + '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span></span></div>';
        document.body.appendChild(elemDiv);
    }
    if (typeof callback == 'function') {
        callback(arguments);
    }
}
function LoadScript(url, callback) {
    loadingio('Loading Script ' + url);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = function () {
        if (typeof callback == 'function') {
            loadingio('Readystate ' + url);
            callback();
        }
        loadingio(false, false, 'disable');
    };
    script.onload = function () {
        loadingio('Onload Script ' + url);
        if (typeof callback == 'function') {
            callback();
        }
        loadingio(false, false, 'disable');
    };
    document.body.appendChild(script);
    loadingio(false, false, 'disable');
}
function isAdmin(successcb, errorcb) {
    $.ajax({
        url: '/AGC/user/info',
        method: 'POST',
        beforeSend: function () {
            loadingio('Checking User');
        },
        success: function (rs) {
            if (typeof rs[0] != 'undefined') {
                rs = rs[0];
            }
            if (rs.admin === false) {
                if (typeof errorcb == 'function') {
                    errorcb(arguments);
                }
            }
            else {
                if (typeof successcb == 'function') {
                    successcb(arguments);
                }
            }
        },
        error: function (re) {
            console.log({
                error: re
            });
        },
        complete: function () {
            loadingio(false, false, 'disable');
        }
    });
}
function loadCSS(CSSFiles) {
    if (Array.isArray(CSSFiles)) {
        for (var x = 0; x < CSSFiles.length; x++) {
            createLink(CSSFiles[x]);
        }
    }
    else if (typeof CSSFiles == 'string') {
        createLink(CSSFiles);
    }
}
function createLink(CSSFile, type, rel) {
    if (!rel) {
        rel = "stylesheet";
    }
    if (!type) {
        type = "text/css";
    }
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", rel);
    fileref.setAttribute("type", type);
    fileref.setAttribute("href", CSSFile);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
function __call(func) {
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}
function parse_proxy(str) {
    var matchs, px = [];
    loadingio('Parsing proxies', function () {
        if (typeof str == 'string') {
            var regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]{1,6}/gm, match, proxyMatch;
            while (match = regex.exec(str)) {
                proxyMatch = match[0];
                if (proxyMatch.includes(':') && !inArray(proxyMatch, px)) {
                    px.push(proxyMatch);
                }
            }
            var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm, match, proxyMatch;
            while (match = regex.exec(str)) {
                proxyMatch = atob(match[1]);
                if (proxyMatch.includes(':') && !inArray(proxyMatch, px)) {
                    px.push(proxyMatch);
                }
            }
        }
        loadingio(null, null, 'disabled');
        return px;
    });
    return array_shuffle(array_unique(px));
}
function array_rand(arrays, unique) {
    if (unique) {
        arrays = array_unique(arrays);
    }
    var index = Math.floor(Math.random() * arrays.length);
    return {
        index: index,
        value: arrays[index]
    };
}
function array_unique(arrays) {
    return arrays.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    });
}
function array_unset(arrayName, key) {
    var x;
    var tmpArray = new Array();
    for (x in arrayName) {
        if (x != key) {
            tmpArray[x] = arrayName[x];
        }
    }
    return tmpArray;
}
var LoadingOpt;
function Loading(text, options) {
    if (typeof options == 'function') {
        options = {
            callback: options
        };
    }
    if (options === false || options === null || options == 'disable' || options == 'disabled') {
        options = {
            disable: true
        };
    }
    if (!options) {
        options = {
            position: 'center'
        };
    }
    else if (!options.hasOwnProperty('position')) {
        options.position = 'center';
    }
    if (typeof text == 'string') {
        text = {
            title: text,
            content: '',
            footer: ''
        };
    }
    switch (options.position) {
        case 'right':
            options.contentLoadingClass = '.loading-corner-right-text';
            options.bodyLoadingClass = 'loading-right';
            options.footerLoadingClass = '.loading-corner-right-footer';
            break;
        default:
            options.contentLoadingClass = '.modal-loading-text';
            options.bodyLoadingClass = 'loading';
            options.footerLoadingClass = '.modal-loading-footer';
            break;
    }
    LoadingOpt = options;
    $('body').addClass(options.bodyLoadingClass);
    if (options.disable || !text) {
        $('body').removeClass('loading loading-right');
    }
    else if (typeof text == 'string' || typeof text == 'number') {
        $(options.contentLoadingClass).html(text);
    }
    else if (typeof text == 'object') {
        if (text.hasOwnProperty('content')) {
            $(options.contentLoadingClass).html(text.content);
        }
        else if (text.hasOwnProperty('title')) {
            $(options.contentLoadingClass).html(text.title);
        }
        if (text.hasOwnProperty('footer')) {
            $(options.footerLoadingClass).html(text.footer).show();
        }
        else {
            $(options.footerLoadingClass).hide();
        }
    }
    if (options) {
        if (options.hasOwnProperty('callback')) {
            if (typeof options.callback == 'function') {
                return options.callback();
            }
        }
    }
}
function toogleClass(element, className) {
    return element.classList.toggle(className);
}
function UNIQUE_ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
;
function check_blogger(callback) {
    loadingio('Blogger initialize');
    jQuery.post('/AGC/blogger/index', {
        'test': true
    }, function (r) {
        if (r) {
            if (typeof r[0] != 'undefined') {
                r = r[0];
            }
            if (typeof r.message != 'undefined' && typeof r.type != 'undefined') {
                loadingio(null, null, 'disable');
                switch (r.type) {
                    case 'blogger_access':
                        swal({
                            title: 'Blogger access is required',
                            content: {
                                element: 'a',
                                attributes: {
                                    target: '_blank',
                                    href: r.message,
                                    innerHTML: 'Authenticate with blogger is required, click here to give blogger access'
                                }
                            }
                        });
                        break;
                    case 'blogger_id':
                        swal({
                            title: 'Blogger user ID is required',
                            content: {
                                element: 'a',
                                attributes: {
                                    target: '_blank',
                                    href: r.message,
                                    innerHTML: 'Blogger user ID required, you must add into your account manually here'
                                }
                            }
                        });
                        break;
                    case 'blog_id':
                        swal({
                            title: 'Blog ID is required',
                            content: {
                                element: 'a',
                                attributes: {
                                    target: '_blank',
                                    href: r.message,
                                    innerHTML: 'Blog ID required, you must add into your account manually here'
                                }
                            }
                        });
                        break;
                    case 'choose_blog':
                        var selectBlog = document.createElement('select');
                        selectBlog.className = 'form-control';
                        selectBlog.id = 'blogger-chooser';
                        if (typeof r.message != 'undefined' && r.message) {
                            for (var index = 0; index < r.message.length; index++) {
                                var element = r.message[index];
                                var option = document.createElement("option");
                                option.value = element.id;
                                option.text = element.name;
                                selectBlog.appendChild(option);
                            }
                            swal({
                                title: 'Choose your blog',
                                content: selectBlog,
                                closeOnClickOutside: false,
                                closeOnEsc: false,
                            }).then(function (c) {
                                jQuery.post('/AGC/blogger/index', {
                                    'bid-manual': $('select#blogger-chooser').val()
                                }, function (r) {
                                    if (typeof callback == 'function') {
                                        callback($('select#blogger-chooser').val());
                                    }
                                });
                            });
                        }
                        break;
                }
                console.log(r);
            }
        }
    });
}
function pseudo_builder(string) {
    if (string) {
        return string.replace(/[\W\s]/gm, '');
    }
}
function foreach(object, callback) {
    var key, value;
    Object.keys(object).forEach(function (key) {
        if (typeof callback == 'function') {
            callback(key, object[key]);
        }
    });
}
function getRandom(arr, n, callback) {
    var result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len) {
        var msg = "getRandom: more elements taken than available";
        alert(msg);
        throw new RangeError(msg);
    }
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    if (typeof callback == 'function') {
        return callback(result);
    }
    else {
        return result;
    }
}
var entityMap = {
    "160": "&nbsp;",
    "161": "&iexcl;",
    "162": "&#cent;",
    "163": "&#pound;",
    "164": "&#curren;",
    "165": "&#yen;",
    "166": "&#brvbar;",
    "167": "&#sect;",
    "168": "&#uml;",
    "169": "&copy;",
    "8364": "&euro;"
};
function prepEntities(str) {
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u001f\u0080-\uFFFF]/g, function (match) {
        var high, low, charValue, rep;
        if (match.length == 2) {
            high = match.charCodeAt(0) - 0xD800;
            low = match.charCodeAt(1) - 0xDC00;
            charValue = (high * 0x400) + low + 0x10000;
        }
        else {
            charValue = match.charCodeAt(0);
        }
        rep = entityMap[charValue];
        if (!rep) {
            rep = "&#" + charValue + ";";
        }
        return rep;
    });
}
//# sourceMappingURL=utility.js.map