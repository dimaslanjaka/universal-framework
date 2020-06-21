var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function arrayCompare(a1, a2) {
    if (a1.length != a2.length)
        return false;
    var length = a2.length;
    for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i])
            return false;
    }
    return true;
}
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == 'object') {
            if (arrayCompare(haystack[i], needle))
                return true;
        }
        else {
            if (haystack[i] == needle)
                return true;
        }
    }
    return false;
}
function in_array(needle, haystack) {
    return inArray(needle, haystack);
}
function array_keys(haystack) {
    return Object.keys(haystack);
}
function array_shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
if (!Array.prototype.every) {
    Array.prototype.every = function (fun) {
        'use strict';
        var t, len, i, thisp;
        if (this == null) {
            throw new TypeError();
        }
        t = Object(this);
        len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t)) {
                return false;
            }
        }
        return true;
    };
}
function array_filter(array) {
    return array.filter(function (el) {
        return el != null;
    });
}
class Cookies {
    static get(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                var cookie = unescape(document.cookie.substring(c_start, c_end));
                cookie = base64_decode(cookie);
                if (is_json(cookie)) {
                    return JSON.parse(cookie);
                }
                return cookie;
            }
        }
        return null;
    }
    static set(name, value, expire, expire_type, path, callback) {
        var expires;
        if (expire) {
            var date = new Date();
            if (/^d$|day/s.test(expire_type)) {
                date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
            }
            else if (/^m$|minute/s.test(expire_type)) {
                date.setTime(date.getTime() + (expire * 60 * 1000));
            }
            else if (/^s$|second/s.test(expire_type)) {
                date.setTime(date.getTime() + (expire * 1000));
            }
            else {
                date.setTime(date.getTime() + (expire * 1000));
            }
            expires = "; expires=" + date.toUTCString();
        }
        else {
            expires = "";
        }
        var cookie_path = '/';
        if (typeof path == 'string') {
            if (path.length > 0) {
                cookie_path = path;
            }
        }
        value = JSON.stringify(value);
        value = base64_encode(JSON.stringify(value));
        var formatted = name + "=" + value + expires + "; path=" + cookie_path;
        console.info(`cookie formated: ` + formatted);
        document.cookie = formatted;
        if (typeof callback == 'function') {
            return callback(arguments);
        }
        return this.get(name);
    }
    static one(name, value, expire, callback) {
        if (this.get(name) == null) {
            this.set(name, value, expire, 'm', '/', callback);
        }
    }
    static decompress(str) {
    }
    static compress(str) {
    }
}
$(window).bind("load", function () {
    if (typeof jQuery.fn.dataTable != "undefined") {
        $.fn.dataTable.ext.errMode = "none";
        $.fn.dataTable.ext.buttons.refresh = {
            extend: "collection",
            text: '<i class="fas fa-sync"></i>',
            className: "btn btn-info",
            action: function (e, dt, node, config) {
                dt.clear().draw();
                dt.ajax.reload();
            },
        };
        setTimeout(function () {
            $("button.dt-button").not(".btn").addClass("btn btn-info");
        }, 5000);
    }
});
Date.prototype.isHourAgo = function (hour) {
    var hour = hour * 60 * 1000;
    const hourago = Date.now() - hour;
    return hour > hourago;
};
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};
Date.prototype.addHours2 = function (hrs) {
    this.setHours(this.getHours() + hrs);
    return this;
};
function datetime_local(date) {
    return new Date(date).toJSON().slice(0, 19);
}
function isMobile() {
    var target = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(target) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(target.substr(0, 4))) {
        if (!Cookies.get('deviceInfo')) {
            if (typeof toastr != 'undefined') {
                toastr.info('is Mobile', 'Your Device');
            }
            else {
                console.log('isMobile');
            }
            Cookies.set('deviceInfo', 'x', 1, 'd', null, null);
        }
        return true;
    }
    else {
        if (!Cookies.get('deviceInfo')) {
            if (typeof toastr != 'undefined') {
                toastr.info('is Desktop', 'Your Device');
            }
            else {
                console.log('isDesktop');
            }
            Cookies.set('deviceInfo', 'x', 1, 'd', null, null);
        }
        return false;
    }
}
function createElement(options) {
    var el, a, i;
    if (!options.tagName) {
        el = document.createDocumentFragment();
    }
    else {
        el = document.createElement(options.tagName);
        if (options.className) {
            el.className = options.className;
        }
        if (options.attributes) {
            for (a in options.attributes) {
                el.setAttribute(a, options.attributes[a]);
            }
        }
        if (options.html !== undefined) {
            el.innerHTML = options.html;
        }
    }
    if (options.text) {
        el.appendChild(document.createTextNode(options.text));
    }
    if (window.HTMLElement === undefined) {
        window.HTMLElement = Element;
    }
    if (options.childs && options.childs.length) {
        for (i = 0; i < options.childs.length; i++) {
            el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]));
        }
    }
    return el;
}
class html {
    static create(options) {
        return createElement(options);
    }
}
Number.prototype.getMS = function (type) {
    var self = this;
    return this * 60 * 1000;
};
Number.prototype.addHour = function (source) {
    var self = this;
    var Hour = this * 60 * 1000;
    if (!source)
        source = new Date();
    return new Date(source.getTime() + Hour).getTime();
};
Number.prototype.AddZero = function (b, c) {
    var l = (String(b || 10).length - String(this).length) + 1;
    return l > 0 ? new Array(l).join(c || '0') + this : this;
};
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};
Object.child = function (str, callback) {
    var self = this;
    if (self.hasOwnProperty(str)) {
        if (typeof callback == 'function') {
            return callback(self[str]);
        }
        else {
            return true;
        }
    }
    else {
        return undefined;
    }
};
Object.alt = function (str, alternative) {
    var self = this;
    if (self.hasOwnProperty(str)) {
        return self[str];
    }
    else {
        return alternative;
    }
};
Object.has = function (str) {
    return this.hasOwnProperty(str);
};
class Timer {
    constructor(callback, time) {
        this.timeId = null;
        this.timeId = setTimeout(callback, time);
    }
    clear() {
        clearTimeout(this.timeId);
    }
}
function empty(str) {
    var type = typeof str;
    if (type == 'string' || type == 'number') {
        str = str.toString().trim();
    }
    switch (str) {
        case "":
        case null:
        case false:
        case type == "undefined":
            return true;
        default:
            return false;
    }
}
if (typeof toastr == 'object') {
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.showEasing = 'swing';
    toastr.options.hideEasing = 'linear';
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.positionClass = "toast-bottom-full-width";
    toastr.options.closeMethod = 'slideUp';
    toastr.options.preventDuplicates = true;
    toastr.options.closeButton = true;
    toastr.options.closeHtml = '<button><i class="fas fa-times"></i></button>';
    toastr.options.timeOut = 3000;
    toastr.options.extendedTimeOut = 6000;
    toastr.options.progressBar = true;
    toastr.options.escapeHtml = false;
}
function pageid(length) {
    if (!length) {
        length = 6;
    }
    ;
    return Math.random().toString(20).substr(2, length);
}
const randstr = (length = 6) => Math.random().toString(20).substr(2, length);
var AJAX = null;
var dumpAjax = false;
var indicatorAjax = false;
const ajaxIDLoader = "ajxLoader_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
if (!$('#' + ajaxIDLoader).length) {
    $('body').append('<div id="' + ajaxIDLoader + '" style="position: fixed;z-index:9999;bottom:5px;left:5px;"><svg enable-background="new 0 0 40 40"height=40px id=loader-1 version=1.1 viewBox="0 0 40 40"width=40px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"fill=#000 opacity=0.2 /><path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
  C22.32,8.481,24.301,9.057,26.013,10.047z"fill=#000><animateTransform attributeName=transform attributeType=xml dur=0.5s from="0 20 20"repeatCount=indefinite to="360 20 20"type=rotate /></path></svg></div>');
    $('#' + ajaxIDLoader).fadeOut('fast');
}
jQuery.ajaxPrefilter(function (options) {
    indicatorAjax = (typeof options.indicator == 'boolean' && options.indicator === true);
    dumpAjax = (typeof options.dump == 'boolean' && options.dump === true);
    if (options.crossDomain && jQuery.support.cors) {
        var allowed = true;
        if (options.url.match(/\.html$/g)) {
            allowed = false;
        }
        if (options.url.match(/^\//)) {
            allowed = false;
        }
        if (options.hasOwnProperty('proxy') && !options.proxy) {
            allowed = false;
        }
        if (allowed) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            if (typeof options.proxy == 'string') {
                options.url = options.proxy.replace(/\/{1,99}$/s, '') + '/' + options.url;
            }
            else {
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            }
        }
    }
});
$(document).ajaxError(function (event, jqXHR, settings, errorThrown) {
    var content_type = jqXHR.getResponseHeader('Content-Type');
    if (typeof toastr != 'undefined') {
        if (/json|text\/plain/s.test(content_type)) {
            toastr.error('Request failed. (' + jqXHR.status + ' ' + jqXHR.statusText + ') ' + errorThrown, 'Request Info');
        }
    }
});
$(document).ajaxSend(function (event, xhr, settings) {
    if (settings.hasOwnProperty('indicator') && settings.indicator) {
        $('#' + ajaxIDLoader).fadeIn('fast');
    }
    if (dumpAjax) {
        toastr.info('Requesting...', "Request Info");
    }
    if (!settings.hasOwnProperty('method')) {
        settings.method = 'POST';
    }
});
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.hasOwnProperty('indicator') && settings.indicator) {
        $('#' + ajaxIDLoader).fadeOut('fast');
    }
    if (dumpAjax) {
        toastr.success('Request complete', 'Request Info');
    }
    AJAX = null;
    $('#' + ajaxIDLoader).fadeOut('slow');
    var content_type = xhr.getResponseHeader('Content-Type'), res;
    if (xhr.hasOwnProperty('responseJSON')) {
        res = xhr.responseJSON;
    }
    else {
        res = xhr.responseText;
        if (typeof res == 'string' && !empty(res) && /json|text\/plain/s.test(content_type)) {
            if (is_json(res)) {
                res = JSON.parse(res);
            }
        }
    }
    if (typeof res == 'object') {
        if (res.hasOwnProperty('redirect')) {
            this.location.replace(res.redirect);
            throw "Disabled";
        }
        if (res.hasOwnProperty('reload')) {
            location.href = location.href;
            throw "Disabled";
        }
    }
});
$(document).ajaxSuccess(function (event, request, settings) {
    var res;
    var content_type = request.getResponseHeader('Content-Type');
    if (request.hasOwnProperty('responseJSON')) {
        res = request.responseJSON;
    }
    else {
        res = request.responseText;
    }
    if (typeof res == 'string' && !empty(res) && /json|text\/plain/s.test(content_type)) {
        if (is_json(res)) {
            res = JSON.parse(res);
        }
    }
    if (typeof res == 'object' && !settings.hasOwnProperty('silent') && typeof toastr != 'undefined' && /json|javascript/s.test(content_type)) {
        var error = res.hasOwnProperty('error') && res.error ? true : false;
        var title = res.hasOwnProperty('title') ? res.title : 'Unknown Title';
        var msg = res.hasOwnProperty('message') ? res.message : 'Unknown Error';
        if (res.hasOwnProperty('error') && res.hasOwnProperty('message')) {
            if (error) {
                toastr.error(msg, title);
            }
            else {
                toastr.success(msg, title);
            }
        }
        else if (res.hasOwnProperty('message')) {
            toastr.info(msg, title);
        }
        if (res.hasOwnProperty('unauthorized')) {
            location.replace('/signin');
        }
    }
});
function processAjaxForm(xhr, callback) {
    var res;
    if (xhr.hasOwnProperty('responseJSON')) {
        res = xhr.responseJSON;
    }
    else if (xhr.hasOwnProperty('responseText')) {
        res = xhr.responseText;
        if (typeof res == 'string' && !empty(res)) {
            if (is_json(res)) {
                res = JSON.parse(res);
            }
        }
    }
    if (callback) {
        if (typeof callback == 'function') {
            callback(res);
        }
        else if (typeof callback == 'string') {
            call_user_func(callback, window, res);
        }
        else {
            console.error('2nd parameters must be callback function, instead of ' + typeof callback);
        }
    }
}
function ajx(settings, success, failed, complete) {
    settings.headers = {
        'unique-id': getUID()
    };
    if (!settings.hasOwnProperty('indicator')) {
        settings.indicator = true;
    }
    if (!settings.hasOwnProperty('method')) {
        settings.method = 'POST';
    }
    return $.ajax(settings).done(function (data, textStatus, jqXHR) {
        processAjaxForm(jqXHR, success);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        processAjaxForm(jqXHR, failed);
    }).always(function (jqXHR, textStatus, errorThrown) {
        processAjaxForm(jqXHR, complete);
    });
}
function AjaxForm() {
    $(document).on('submit', 'form', function (e) {
        e.preventDefault();
        var t = $(this);
        var s = t.data('success'), er = t.data('error'), c = t.data('complete');
        ajx({
            url: t.attr('action'),
            method: t.attr('method'),
            data: t.serialize()
        }, s, er, c);
    });
}
function async_process(source_cache) {
    var xhr = new XMLHttpRequest();
    $.ajax({
        url: source_cache,
        method: 'POST',
        silent: true,
        indicator: false,
        xhr: function () {
            return xhr;
        },
        headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Refresh-Cache': 'true'
        },
        success: function (response) {
            $("html").html($("html", response).html());
            console.log(xhr.responseURL);
        }
    });
}
var AjaxSchedulerInit = null;
var AjaxSchedulerRequests = [];
var AjaxSchedulerRunning = false;
class ajaxScheduler {
    static add(opt) {
        AjaxSchedulerRequests.push(opt);
    }
    ;
    static remove(opt) {
        if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
            AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
        }
    }
    ;
    static run() {
        var self = this;
        var oriSuc;
        if (AjaxSchedulerRequests.length > 0) {
            oriSuc = AjaxSchedulerRequests[0].complete;
            AjaxSchedulerRequests[0].complete = function () {
                if (typeof (oriSuc) === 'function') {
                    oriSuc();
                }
                AjaxSchedulerRequests.shift();
                self.run.apply(self, []);
            };
            $.ajax(AjaxSchedulerRequests[0]);
        }
        else {
            AjaxSchedulerInit = setTimeout(function () {
                self.run.apply(self, []);
            }, 1000);
        }
        return true;
    }
    static stop() {
        AjaxSchedulerRequests = [];
        clearTimeout(AjaxSchedulerInit);
    }
}
function ajaxRun(url, method, data, success, failed, complete) {
    if (!AjaxSchedulerRunning) {
        ajaxScheduler.run();
        AjaxSchedulerRunning = true;
    }
    return ajaxScheduler.add({
        url: url,
        method: method,
        timeout: 30000,
        data: data,
        indicator: true,
        headers: {
            'unique-id': getUID(),
            'Accept': 'application/json'
        },
        success: function (res) {
            if (typeof success == 'function') {
                success(res);
            }
            else if (typeof success == 'string') {
                call_user_func(success, window, res);
            }
            else {
                console.log(success + ' isnt success callback, instead of ' + typeof success);
            }
        },
        error: function (err) {
            if (typeof failed == 'function') {
                failed(err);
            }
        },
        complete: function (res) {
            AJAX = null;
            if (typeof complete == 'function') {
                complete(res);
            }
        }
    });
}
function ajaxFormSchedule() {
    $(document).on('submit', 'form', function (e) {
        e.preventDefault();
        var t = $(this);
        var s = t.data('success'), err = t.data('error'), c = t.data('complete');
        ajaxScheduler.add({
            url: t.attr('action'),
            method: t.attr('method'),
            data: t.serialize(),
            success: s,
            error: err,
            complete: c
        });
    });
}
window.ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];
    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        }
        catch (e) { }
    }
    return xhr;
};
ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText);
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data);
};
ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
};
ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async);
};
function ajax() {
    return window.ajax;
}
var gtagID = 'UA-106238155-1';
var create_gtagscript = document.createElement('script');
create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
create_gtagscript.async = true;
document.getElementsByTagName('body')[0].appendChild(create_gtagscript);
var gtag = null;
window.onload = function () {
    if (window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        gtag = function () {
            window.dataLayer.push(arguments);
        };
        gtag('js', new Date());
        gtag('config', gtagID, {
            'page_title': document.title,
            'page_path': location.pathname
        });
        gtag('event', 'page_view', {
            'send_to': gtagID
        });
        gtag('config', 'UA-106238155-1', {
            'cookie_prefix': 'GoogleAnalystics',
            'cookie_domain': location.host,
            'cookie_update': false,
            'cookie_expires': 28 * 24 * 60 * 60
        });
        var trackLinks = document.getElementsByTagName('a');
        for (var i = 0, len = trackLinks.length; i < len; i++) {
            trackLinks[i].onclick = function () {
                if (!/^\#/gm.test(this.href) && !empty(this.href)) {
                    gtag("event", "click", {
                        event_category: "outbound",
                        event_label: this.href,
                        transport_type: "beacon"
                    });
                }
            };
        }
    }
};
function analys(event_action, event_label, event_category, event_value, event_callback) {
    var conf = {
        'event_label': event_label,
        'event_category': event_category,
        'value': event_value,
        'event_callback': (typeof event_callback == 'function' ? event_callback : false)
    };
    return gtag('event', event_action, conf);
}
function typedKeys(o) {
    return Object.keys(o);
}
var dimas = {
    url: location.protocol + "//" + location.host + location.pathname,
    captcha: {
        check: null,
        id: function (header_name) {
            if (!dimas.captcha.check) {
                dimas.captcha.get(header_name);
            }
            return storage().get("captcha");
        },
        get: function (header_name) {
            if (!dimas.captcha.check) {
                dimas.captcha.check = setTimeout(() => {
                    dimas.captcha.get(header_name);
                }, 60000);
            }
            var ua = md5(navigator.userAgent).rot13();
            var IP = ip.get(null);
            $.ajax({
                url: dimas.url + "?login=" + guid(),
                method: "POST",
                headers: {
                    Accept: "application/javascript",
                    [header_name]: ua,
                    [IP.rot13()]: ua,
                },
                dataType: "jsonp",
                jsonpCallback: "framework().captcha.jspCallback",
            });
        },
        callback: function (arg) { },
        jspCallback: function (res) {
            if (res.hasOwnProperty("captcha")) {
                storage().set("captcha", res.captcha.rot13());
                dimas.captcha.callback(storage().get("captcha"));
                dimas.captcha.listen();
            }
        },
        listener_started: null,
        listen: function () {
            if (dimas.captcha.listener_started) {
                return null;
            }
            dimas.captcha.listener_started = new Date().toISOString();
            return $(document).on("focus", "form[captcha]", function (e) {
                var captcha = $(this).find('[name="captcha"]');
                if (!captcha.length) {
                    $(this).append('<input type="hidden" name="captcha" id="' + guid() + '" />');
                    captcha = $(this).find('[name="captcha"]');
                }
                if (captcha.length) {
                    captcha.val(storage().get("captcha").rot13());
                }
                var form = captcha.parents("form");
                var button = form.find('[type="submit"]');
                form.one("submit", function (e) {
                    e.preventDefault();
                    console.log("submit with captcha");
                    button.prop("disabled", true);
                    framework().captcha.callback = function () {
                        button.prop("disabled", false);
                    };
                    framework().captcha.get(null);
                    form.off("submit");
                });
            });
        },
    },
    rp: function (angka, prefix) {
        if (!prefix) {
            prefix = "Rp. ";
        }
        var number_string = angka.toString().replace(/[^,\d]/g, ""), split = number_string.split(","), sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), ribuan = split[0].substr(sisa).match(/\d{3}/gi);
        if (ribuan) {
            var separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }
        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return !prefix ? rupiah : prefix + " " + rupiah;
    },
    isNumber: function (v) {
        return (!isNaN(parseInt(v.toString()) - parseFloat(v.toString())) &&
            /^\d+$/.test(v.toString()));
    },
    strpad: function (val) {
        if (val >= 10) {
            return val;
        }
        else {
            return "0" + val;
        }
    },
    datetimelocal: function (v) {
        var d = !v ? new Date() : new Date(v);
        $("input[type=datetime-local]").val(d.getFullYear() +
            "-" +
            this.strpad(d.getMonth() + 1) +
            "-" +
            this.strpad(d.getDate()) +
            "T" +
            this.strpad(d.getHours()) +
            ":" +
            this.strpad(d.getMinutes()));
    },
    gc: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
        }
        return null;
    },
    oddoreven: function (n, type) {
        if (!type) {
            type = "odd";
        }
        var time = !n ? new Date().getDay() : Number(n);
        if (!/^-{0,1}\d+jQuery/.test(time.toString())) {
            alert("arguments is not number, please remove quote");
            return null;
        }
        var hasil = time % 2;
        var type = /^(odd|ganjil)$/.test(type) ? "1" : "0";
        return hasil.toString() == type.toString();
    },
    sc: function (name, value, hours) {
        var expires = "";
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + hours * 3600 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    allcookies: function () {
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            var str = pair[0].trim();
            cookies[str] = unescape(pair.slice(1).join("="));
        }
        return cookies;
    },
    rc: function (name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    },
    getquery: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    },
    recode: function (content, passcode) {
        var result = [];
        var str = "";
        var codesArr = JSON.parse(content);
        var passLen = passcode.length;
        for (var i = 0; i < codesArr.length; i++) {
            var passOffset = i % passLen;
            var calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
            result.push(calAscii);
        }
        for (var i = 0; i < result.length; i++) {
            var ch = String.fromCharCode(result[i]);
            str += ch;
        }
        return str;
    },
    js: function (url, callback) {
        var pel = document.body || document.head;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (typeof callback == "function")
            script.onreadystatechange = callback;
        script.onload = callback;
        pel.appendChild(script);
    },
    pctdRUN: function (elm) {
        var tl = parseInt(elm.attr("countdown")) > 0 ? elm.attr("countdown") : 5, bs = elm.data("base") ? elm.data("base") : "bg-info", bw = elm.data("warning") ? elm.data("warning") : "bg-danger", bc = elm.data("success") ? elm.data("success") : "bg-success", countdown = elm.progressBarTimer({
            warningThreshold: 5,
            timeLimit: tl,
            baseStyle: bs,
            warningStyle: bw,
            completeStyle: bc,
            smooth: true,
            striped: true,
            animated: true,
            height: 0,
            onFinish: function () {
                var callback = elm.data("callback");
                if (callback) {
                    var xn = window[callback];
                    if (typeof xn == "function") {
                        var x = eval(callback);
                        x();
                    }
                    else {
                        console.log(callback + " isn't function ");
                    }
                }
            },
            label: {
                show: true,
                type: "percent",
            },
            autoStart: true,
        });
        return countdown;
    },
    pctd: function (elm) {
        var t = this;
        if (typeof progressBarTimer == "undefined") {
            this.js("https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js", function () {
                t.pctdRUN(elm);
            });
        }
        else {
            window.onload = function (params) {
                dimas.pctdRUN(elm);
            };
        }
    },
    parseurl: function (url) {
        var parser = document.createElement("a"), searchObject = {}, queries, split, i;
        parser.href = url;
        queries = parser.search.replace(/^\?/, "").split("&");
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split("=");
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash,
            protohost: parser.protocol + "//" + parser.host,
        };
    },
};
function framework() {
    return dimas;
}
class app {
    static setbase(path) {
        this.base = path;
    }
    static direct(...args) {
        var scripts = document.querySelectorAll("script[src]");
        var last = scripts[scripts.length - 1];
        var lastsrc = last.getAttribute("src");
        var parsed = dimas.parseurl(lastsrc);
        args.forEach(function (src) {
            dimas.js(`${app.base}${src}${parsed.search}`, function () {
                console.log(`${src} engine inbound`);
            });
        });
    }
    static load(...args) {
        var scripts = document.querySelectorAll("script[src]");
        var last = scripts[scripts.length - 1];
        var lastsrc = last.getAttribute("src");
        var parsed = dimas.parseurl(lastsrc);
        args.forEach(function (key, index) {
            console.log(key, app.base);
            let src = "";
            if (/^(ajx|ajaxjQuery|ajxjquery|ajquery)$/s.test(key)) {
                src = "ajaxJquery.js";
            }
            else if (/^(ajv|ajaxVanilla|ajaxv|avanilla)$/s.test(key)) {
                src = "ajaxVanilla.js";
            }
            if (src != "") {
                dimas.js(`${app.base}${src}${parsed.search}`, function () {
                    console.log(`${src} engine inbound`);
                });
            }
        });
    }
}
app.base = "/src/MVC/themes/assets/js/";
function base64_encode(str) {
    const encodedWord = CryptoJS.enc.Utf8.parse(str);
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
    return encoded;
}
function base64_decode(str) {
    const encodedWord = CryptoJS.enc.Base64.parse(str);
    const decoded = CryptoJS.enc.Utf8.stringify(encodedWord);
    return decoded;
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
var debug_run = null;
function bannedebug() {
    if (debug_run)
        return;
    debug_run = true;
    document.body.innerHTML = '<iframe frameborder="0" src="//www.webmanajemen.com" width="100%" height="100%"></iframe><a href="https://www.webmanajemen.com" id="DebuggeRedirect"></a>';
    if (!document.getElementById('DebuggeRedirect').click()) {
        setTimeout(function () {
            window.location.replace('https://www.webmanajemen.com');
        }, 5000);
    }
}
function debug_detect() {
    setInterval(function () {
        var startTime = performance.now(), check, diff;
        for (check = 0; check < 1000; check++) {
            console.log(check);
            console.clear();
        }
        diff = performance.now() - startTime;
        if (diff > 200) {
            bannedebug();
            debugger;
            throw 'you got banned';
        }
    }, 500);
}
var restrict = !isMobile();
restrict = restrict && !is_localhost() && !is_development();
restrict_mode(restrict);
function restrict_mode(restrict) {
    if (restrict) {
        console.clear();
        window['console']['log'] = function () { };
        var threshold = 160;
        var devtools = {
            isOpen: false,
            orientation: undefined
        };
        setInterval(function () {
            var widthThreshold = window.outerWidth - window.innerWidth > threshold;
            var heightThreshold = window.outerHeight - window.innerHeight > threshold;
            var orientation = widthThreshold ? 'vertical' : 'horizontal';
            if (!(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
                    widthThreshold || heightThreshold)) {
                if (!devtools.isOpen || devtools.orientation !== orientation) {
                    devtools.orientation = orientation;
                }
                devtools.isOpen = true;
                devtools.orientation = orientation;
            }
            else {
                if (devtools.isOpen) {
                    devtools.isOpen = false;
                    devtools.orientation = undefined;
                }
                devtools.isOpen = false;
                devtools.orientation = undefined;
            }
            if (devtools.isOpen) {
                console.error('devtools opened');
                bannedebug();
                debugger;
                throw 'banned';
            }
        }, 500);
        document.onkeydown = function (e) {
            if (event.keyCode == 123) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                return false;
            }
        };
    }
}
function load_disqus(disqus_shortname) {
    var disqus_trigger = $('#disqus_trigger'), disqus_target = $('#disqus_thread');
    if (disqus_target.length) {
        framework().js('//' + disqus_shortname + '.disqus.com/embed.js', null);
        disqus_trigger.remove();
    }
    else {
        if (typeof toastr != 'undefined') {
            toastr.error('disqus container not exists', 'disqus comment');
        }
    }
}
function http_build_query(obj) {
    if (typeof obj != "object") {
        throw "http_build_query need parameter of object instead of " + typeof obj;
    }
    var queryString = Object.keys(obj)
        .map(function (key) {
        return key + "=" + obj[key];
    })
        .join("&");
    return queryString;
}
const guxid = (Math.random().toString(16) + "000000000").substr(2, 8);
function guid() {
    function _p8(s) {
        var p = guxid;
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}
jQuery.guid = function () {
    function _p8(s) {
        var p = guxid;
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
};
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
class ip {
    static status(value) {
        if (value === true) {
            Cookies.set('status_ip'.rot13(), String(value), 5, 'm', location.pathname, null);
        }
        return Cookies.get('status_ip'.rot13());
    }
    ;
    static check() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ipapi();
            if (!this.status(null)) {
                yield this.l2io();
            }
            if (this.status(null)) {
                console.log(this.get(null));
            }
        });
    }
    static get(callback) {
        if (!this.status(null)) {
            this.check();
        }
        console.log(this.status(null));
        var ips = storage().get('ip');
        if (typeof callback == 'function') {
            return callback(ips);
        }
        return ips;
    }
    static ipapi() {
        var self = this;
        return $.ajax({
            proxy: false,
            url: 'https://ipapi.co/json/',
            success: function (res) {
                if (typeof res == 'object') {
                    storage().set('ip_info', res);
                    if (res.hasOwnProperty('ip')) {
                        storage().set('ip', res.ip);
                        self.status(true);
                    }
                }
            }
        });
    }
    static l2io() {
        var self = this;
        return $.ajax({
            proxy: false,
            url: 'https://l2.io/ip.json',
            success: function (res) {
                if (typeof res == 'object') {
                    storage().set('ip_info', res);
                    if (res.hasOwnProperty('ip')) {
                        storage().set('ip', res.ip);
                        self.status(true);
                    }
                }
            }
        });
    }
}
function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    ;
    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    ;
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
;
var reCaptcha = {
    gexec_count: 0,
    key: '6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie',
    js: function (url, callback) {
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
    },
    set_key: function (key) {
        reCaptcha.key = key;
    },
    start: function () {
        reCaptcha.reCaptcha_buttons(true, function () {
            reCaptcha.js('https://www.google.com/recaptcha/api.js?render=' + reCaptcha.key + '&render=explicit', function () {
                grecaptcha.ready(function () {
                    var msg = 'first_start_' + location.href.replace(/[^a-zA-Z0-9 ]/g, '_').replace(/\_{2,99}/g, '_').replace(/\_$/g, '');
                    reCaptcha.exec(msg);
                });
            });
        });
    },
    init: function () {
        if (typeof jQuery == 'undefined' || typeof jQuery == 'undefined') {
            reCaptcha.js('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', reCaptcha.start);
        }
        else {
            reCaptcha.start();
        }
    },
    retry_count: 0,
    exec: function (action, retry, callback) {
        if (typeof gtag == 'function') {
            gtag('event', 'recaptcha', {
                'action': action
            });
        }
        if (typeof grecaptcha == 'undefined' || typeof grecaptcha.execute != 'function') {
            if (typeof toastr == 'undefined') {
                console.error('recaptcha not loaded');
            }
            else {
                toastr.error('recaptcha not loaded, retrying...', 'captcha information');
            }
            for (let index = 0; index < 3; index++) {
                reCaptcha.exec(action, true);
                if (index == 3 - 1) {
                    toastr.error('recaptcha has reached limit', 'captcha information');
                }
            }
            return;
        }
        else if (retry) {
            if (typeof toastr == 'undefined') {
                console.info('recaptcha loaded successfully');
            }
            else {
                toastr.success('recaptcha loaded successfully', 'captcha information');
            }
        }
        reCaptcha.gexec_count++;
        var execute = grecaptcha.execute(reCaptcha.key, {
            'action': action || 'location.href'
        });
        if (!execute) {
            if (typeof toastr != 'undefined') {
                toastr.error('failed getting token');
            }
            return;
        }
        if (execute) {
            execute.then(function (token) {
                reCaptcha.reCaptcha_buttons(false, null);
                reCaptcha.insert(token);
                if (typeof callback == 'function') {
                    callback(token);
                }
            });
        }
    },
    insert: function (token) {
        framework().sc('token', token, 1);
        if (typeof jQuery == 'undefined') {
            console.log('jQuery Not Loaded');
            reCaptcha.js('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', function () {
                reCaptcha.distribute_token(token);
            });
        }
        else {
            reCaptcha.distribute_token(token);
        }
    },
    distribute_token: function (token) {
        var form = $('form');
        form.each(function (i, el) {
            var fg = $(this).find('[name="g-recaptcha-response"]');
            console.log(fg.length);
            if (!fg.length) {
                $('<input type="hidden" readonly value="' + token + '" name="g-recaptcha-response">').appendTo($(this));
            }
            else {
                fg.val(token);
            }
        });
    },
    get: function () {
        var gr = $('input[name="g-recaptcha-response"]');
        if (gr.length) {
            var vr = gr[0].getAttribute('value');
            return vr;
        }
        return null;
    },
    reCaptcha_buttons: function (reCaptcha_disable, callback) {
        $('button,[type="submit"],input').not('[data-recaptcha="no-action"]').not('[recaptcha-exclude]').each(function (i, e) {
            if ($(this).attr('type') == 'radio') {
                return;
            }
            if (reCaptcha_disable) {
                if ($(this).is(":disabled")) {
                    $(this).attr('recaptcha-exclude', makeid(5));
                }
            }
            $(this).prop('disabled', reCaptcha_disable);
        });
        if (typeof callback == 'function') {
            callback();
        }
    }
};
function recaptcha() {
    return reCaptcha;
}
var count = -1;
var storageKey = location.pathname.replace(/\/$/s, '') + '/formField';
var formField;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formField = [];
}
else {
    formField = JSON.parse(formSaved);
}
var uniqueid = guid();
(function ($) {
    $.fn.getIDName = function () {
        if (!$(this).attr('id') || $(this).attr('id') == '') {
            try {
                if (!(count in formField)) {
                    var id = Math.random().toString(20).substr(2, 6);
                    $(this).attr('id', id);
                    formField[count] = id;
                    localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
                }
                else {
                    $(this).attr('id', formField[count]);
                }
            }
            catch (error) {
                console.error(error);
                console.log(formField, typeof formField);
            }
            count++;
        }
        if ($(this).attr('aria-autovalue')) {
            $(this).val(uniqueid);
        }
        return '[' + location.pathname.replace(/\/$/, '') + '/' + $(this).prop('tagName') + '/' + $(this).attr("id") + '/' + $(this).attr("name") || 'empty' + ']';
    };
    $.fn.smartForm = function () {
        count++;
        if ($(this).attr('no-save')) {
            return;
        }
        var t = $(this);
        t.attr('aria-smartform', uniqueid);
        var item;
        var key = t.getIDName().toString();
        var type = $(this).attr('type');
        if (key) {
            if (type === 'checkbox') {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                $(this).prop('checked', item);
                return;
            }
            else if (type === 'radio') {
                item = localStorage.getItem(key) === 'on';
                $(this).prop('checked', item);
                return;
            }
            else {
                item = localStorage.getItem(key);
                if (item === null || !item.toString().length) {
                    return;
                }
                $(this).val(item);
            }
        }
    };
    $(document).bind("DOMNodeInserted", function () {
        var t = $(this);
        var val = localStorage.getItem(t.getIDName().toString());
        var tag = t.prop('tagName');
        var allowed = !t.attr('no-save') && t.attr('aria-smartform') && typeof tag != 'undefined';
        if (allowed && val) {
            console.log(tag, allowed && val);
            switch (t.prop('tagName')) {
                case 'SELECT':
                case 'INPUT':
                case 'TEXTAREA':
                    t.val(val);
                    break;
            }
        }
    });
    $(document).bind("DOMNodeRemoved", function () {
        var t = $(this);
        var allowed = !t.attr('no-save') && t.attr('aria-smartform');
        if (allowed) {
            switch (t.prop('tagName')) {
                case 'SELECT':
                case 'INPUT':
                case 'TEXTAREA':
                    t.off('change');
                    break;
            }
        }
    });
    $(document).on('change', 'select, input, textarea', function (e) {
        var t = $(this);
        var key = t.getIDName().toString();
        var item = t.val();
        var allowed = !t.attr('no-save') && t.attr('aria-smartform');
        if (key && item !== '' && allowed) {
            if (t.attr('type') == 'checkbox') {
                localStorage.setItem(key, t.is(':checked').toString());
                console.log('save checkbox button ', $(this).offset());
                return;
            }
            if (t.attr('type') == 'radio' && t.attr('id')) {
                $('[name="' + t.attr('name') + '"]').each(function (i, e) {
                    localStorage.setItem($(this).getIDName().toString(), 'off');
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    console.log('save radio button ', $(this).offset());
                }, 500);
                return;
            }
            localStorage.setItem(key, item.toString());
        }
    });
    $(document).on('focus', 'input,textarea,select', function () {
        var t = $(this);
        t.getIDName();
        var aria = t.attr('aria-smartform');
        if (aria && (aria != uniqueid)) {
            t.smartForm();
            t.attr('aria-smartform', uniqueid);
        }
    });
}(jQuery));
function smartform() {
    var setglobal = function () {
        $('input,textarea,select').each(function (i, el) {
            $(this).smartForm();
        });
    };
    setglobal();
}
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported('copy');
    var elOriginalText = el.attr('data-original-title');
    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'Copied!' : 'Whoops, not copied!';
            el.attr('data-original-title', msg);
            el.tooltip('show');
        }
        catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(copyTextArea);
        el.attr('data-original-title', elOriginalText);
    }
    else {
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}
var STORAGE = {
    get: function (key) {
        if (!this.has(key)) {
            return false;
        }
        var data = localStorage[key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    },
    set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    },
    has: function (key) {
        return !!localStorage[key] && !!localStorage[key].length;
    },
    extend: function (key, value) {
        if (this.has(key)) {
            var _value = this.get(key);
            jQuery.extend(_value, JSON.parse(JSON.stringify(value)));
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    },
    remove: function (key) {
        localStorage.removeItem(key);
    }
};
function storage() {
    return STORAGE;
}
String.prototype.parse_url = function () {
    var parser = document.createElement('a'), searchObject, queries, split, i;
    parser.href = this.toString();
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash,
        protohost: parser.protocol + '//' + parser.host
    };
};
String.prototype.CSS = function () {
    var e = document.createElement("link");
    e.rel = "stylesheet";
    e.href = this.toString();
    var n = document.getElementsByTagName("head")[0];
    window.addEventListener ? window.addEventListener("load", function () {
        n.parentNode.insertBefore(e, n);
    }, !1) : window.attachEvent ? window.attachEvent("onload", function () {
        n.parentNode.insertBefore(e, n);
    }) : window.onload = function () { n.parentNode.insertBefore(e, n); };
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
};
String.prototype.hexE = function () {
    var hex, i;
    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }
    return result;
};
String.prototype.hexD = function () {
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
};
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.rot13 = function () {
    return this.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};
jQuery.fn.autoHeight = function () {
    function autoHeight_(element) {
        return jQuery(element)
            .css({ 'height': 'auto', 'overflow-y': 'hidden' })
            .height(element.scrollHeight);
    }
    return this.each(function () {
        autoHeight_(this).on('input', function () {
            autoHeight_(this);
        });
    });
};
var UIDvalue = getUID();
function currentUID() {
    return UIDvalue;
}
function getUID() {
    return localStorage.getItem('uid');
}
function sign_uid(UID) {
    var url = location.protocol + '//' + location.host + location.pathname;
    if (typeof jQuery != 'undefined') {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            method: 'post',
            headers: {
                'Uid-Sign': guid()
            },
            data: {
                'uid_jsp': 1,
                'callback': 'saveUID',
                'uid': UID
            },
            silent: true,
            success: function (resdata) {
                console.log(resdata);
                if (resdata.hasOwnProperty('uid')) {
                    localStorage.setItem('uid', resdata.uid);
                }
            }
        });
    }
    else {
        ajax().post(url, {
            'uid_jsp': genUID(),
            'callback': 'saveUID',
            'uid': UID
        }, function (res) {
            console.log(res);
            eval(res);
        });
    }
}
var UIDcalled = false;
function checkUID(callback) {
    UIDvalue = getUID();
    if (isExpireUID()) {
        UIDvalue = genUID();
        sign_uid(UIDvalue);
    }
    if (!UIDcalled) {
        setTimeout(() => {
            checkUID();
        }, 60000);
        UIDcalled = true;
    }
    UIDvalue = getUID();
    if (typeof callback == 'function') {
        return callback(UIDvalue);
    }
    else {
        return UIDvalue;
    }
}
function isExpireUID() {
    if (typeof UIDForce == 'boolean' && UIDForce) {
        console.log("UID FORCED");
        delete UIDForce;
        return true;
    }
    else {
        var timeLeft = framework().gc('signature-timeleft');
        timeLeft = new Date(timeLeft).getTime();
        var date = new Date().getTime();
        var isExpired = timeLeft < date;
        if (isExpired) {
            return true;
        }
        return !localStorage.getItem('uid');
    }
}
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
function genUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function saveUID(data) {
    console.log(data);
    if (typeof data == 'object') {
        if (data.hasOwnProperty('uid')) {
            console.log(`${data.uid} was saved`);
            localStorage.setItem('uid', data.uid);
            var date = new Date();
            framework().sc('signature-timeleft', AddMinutesToDate(date, 5));
        }
    }
}
function getParameterByName(name, url) {
    if (typeof URLSearchParams !== 'undefined') {
        if (!window.location.search) {
            url = window.location.href;
        }
        const urlParams = new URLSearchParams(url);
        return urlParams.get(name);
    }
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
class user {
    constructor() {
        this.key = location.host + '/userdata';
    }
    all() {
        var data = storage().get(this.key);
        if (!data || data == '') {
            return undefined;
        }
        return data;
    }
    get(key) {
        try {
            var data = this.all();
            if (data !== undefined) {
                if (data.hasOwnProperty(key)) {
                    return data[key];
                }
            }
            console.log('user::get', data);
        }
        catch (error) {
            console.error('user::get', error);
            return undefined;
        }
    }
    fetch(callback) {
        const ini = this;
        return $.ajax({
            url: '/user',
            method: 'POST',
            silent: true,
            indicator: false,
            data: {
                check: true,
                user: true
            },
            success: function (res) {
                if (typeof res != 'object') {
                    return;
                }
                if (res) {
                    if (res.hasOwnProperty('id')) {
                        res.user_id = res.id;
                        res._ = new Date();
                    }
                    if (res.hasOwnProperty('username')) {
                        if (typeof callback == 'function') {
                            callback(res);
                        }
                    }
                }
                storage().set(ini.key, JSON.stringify(res));
                console.log('user::fetch', ini.all());
            }
        });
    }
}
const userc = new user();
if (typeof window.user === 'undefined') {
    window.user = userc;
}
jQuery.user = userc;
var textAreas = document.getElementsByTagName('textarea');
Array.prototype.forEach.call(textAreas, function (elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});
function is_localhost() {
    var is_local = location.host.match(/^localhost|^127|\.io$/s);
    return is_local;
}
function is_development() {
    return document.getElementsByTagName('html')[0].getAttribute('environtment') == 'development';
}
function forceSSL() {
    if (location.protocol !== 'https:' && !is_localhost()) {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
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
                error: `function ${func} is not registered`,
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
    for (let index = 0; index < 1000; index++) {
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
var socket;
function socket_start(host) {
    if (!host) {
        console.error('Host websocket empty');
        return;
    }
    if (!socket_check()) {
        console.log('WebSocket Started');
        socket = socket_server(host);
    }
    try {
        socket.onopen = function (msg) {
            console.log('socket initialized');
        };
        socket.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            console.log(data);
        };
        socket.onclose = function (msg) {
            console.log({
                closed: socket
            });
        };
    }
    catch (ex) {
        console.log(ex);
    }
}
function socket_server(host) {
    if (!host) {
        console.error('Host websocket empty');
        return;
    }
    console.log('Socket Initialized');
    if (!window.EventSource) {
        var socket = new EventSource(host);
    }
    else {
        var socket = new WebSocket(host);
    }
    return socket;
}
function socket_stop() {
    if (socket != null) {
        console.log("WebSocket Stopped");
        socket.close();
        socket = null;
    }
}
function socket_check() {
    return socket;
}
class ZLIB {
    static atos(arr) {
        for (var i = 0, l = arr.length, s = '', c; c = arr[i++];)
            s += String.fromCharCode(c > 0xdf && c < 0xf0 && i < l - 1 ?
                (c & 0xf) << 12 | (arr[i++] & 0x3f) << 6 | arr[i++] & 0x3f :
                c > 0x7f && i < l ?
                    (c & 0x1f) << 6 | arr[i++] & 0x3f :
                    c);
        return s;
    }
    static decompress(str) {
        var dec = this.atos(pako.ungzip(base64_decode(str)));
        console.log({
            'ZLIB.decompress': {
                target: str,
                result: dec
            }
        });
        return dec;
    }
    static compress(str) {
        var enc = pako.gzip(str, {
            to: 'string'
        });
        enc = base64_encode(enc);
        console.log({
            'ZLIB.compress': {
                target: str,
                result: enc
            }
        });
        return enc;
    }
}
//# sourceMappingURL=app.js.map