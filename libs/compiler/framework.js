var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="./Array.d.ts"/>
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
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == "object") {
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
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function in_array(needle, haystack) {
    return inArray(needle, haystack);
}
/**
 * get all keys
 * @param haystack string etc
 */
function array_keys(haystack) {
    return Object.keys(haystack);
}
/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
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
    Array.prototype.every = function (fun /*, thisp */) {
        "use strict";
        var t, len, i, thisp;
        if (this == null) {
            throw new TypeError();
        }
        t = Object(this);
        len = t.length >>> 0;
        if (typeof fun !== "function") {
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
/**
 * Cookie Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @see http://localhost/src/Cookies/helper.php
 */
var Cookies = /** @class */ (function () {
    function Cookies() {
    }
    /**
     * Get cookie value by cookie name
     * @param c_name
     * @returns null if cookie not exists
     */
    Cookies.get = function (c_name) {
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
    };
    /**
     * Create cookie expiring in days
     * @param name cookie name
     * @param value cookie value
     * @param days days to expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
     */
    Cookies.set = function (name, value, expire, expire_type, path, callback) {
        var expires;
        if (expire) {
            var date = new Date();
            if (/^d$|day/s.test(expire_type)) {
                date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);
            }
            else if (/^m$|minute/s.test(expire_type)) {
                date.setTime(date.getTime() + expire * 60 * 1000);
            }
            else if (/^s$|second/s.test(expire_type)) {
                date.setTime(date.getTime() + expire * 1000);
            }
            else {
                date.setTime(date.getTime() + expire * 1000);
            }
            expires = "; expires=" + date.toUTCString();
        }
        else {
            expires = "";
        }
        var cookie_path = "/";
        if (typeof path == "string") {
            if (path.length > 0) {
                cookie_path = path;
            }
        }
        value = JSON.stringify(value);
        value = base64_encode(JSON.stringify(value));
        var formatted = name + "=" + value + expires + "; path=" + cookie_path;
        console.info("cookie formated: " + formatted);
        document.cookie = formatted;
        if (typeof callback == "function") {
            return callback(arguments);
        }
        return this.get(name);
    };
    /**
     * Call function if cookie name not set
     * @param name
     * @param value
     * @param expire Expires number (minutes)
     * @param callback Function callback to be executed one time
     */
    Cookies.one = function (name, value, expire, callback) {
        if (this.get(name) == null) {
            this.set(name, value, expire, "m", "/", callback);
        }
    };
    /**
     * decompress cookie
     * @param str
     */
    Cookies.decompress = function (str) {
        /*return pako.inflateRaw(str, {
          to: 'string'
        });*/
    };
    /**
     * compress cookie
     * @param str
     */
    Cookies.compress = function (str) {
        /*return pako.deflateRaw(str, {
          to: 'string'
        });*/
    };
    return Cookies;
}());
if (typeof module !== "undefined" && module.exports) {
    module.exports.Cookies = Cookies;
}
/**
 * @todo CryptoJS
 * @package https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
 */
var salt = "salt"; //salt
var iv = "1111111111111111"; //pass salt minimum length 12 chars
var iterations = "999"; //iterations
/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 */
function getKey(passphrase, salt) {
    if (typeof CryptoJS == "undefined")
        return;
    var key = CryptoJS.PBKDF2(passphrase, salt, {
        hasher: CryptoJS.algo.SHA256,
        keySize: 64 / 8,
        iterations: iterations,
    });
    return key;
}
/**
 * Encrypt function
 * @param {string} passphrase
 * @param {string} plainText
 */
function userJSEncrypt(passphrase, plainText) {
    if (typeof CryptoJS == "undefined")
        return;
    var key = getKey(passphrase, salt);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Decrypt function
 * @param {string} passphrase
 * @param {string} encryptedText
 */
function userJSDecrypt(passphrase, encryptedText) {
    if (typeof CryptoJS == "undefined")
        return;
    var key = getKey(passphrase, salt);
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
// another
/*var salt = 'salt';
  var iv = '1111111111111111';
  */
var iterations = "999";
/**
 * Crypto get key
 * @param {String} passphrase
 * @param {String} salt
 */
function CryptoK(passphrase, salt) {
    var key = CryptoJS.PBKDF2(passphrase, salt, {
        hasher: CryptoJS.algo.SHA256,
        keySize: 64 / 8,
        iterations: iterations,
    });
    return key;
}
/**
 * Crypto encrypt
 * @param {String} passphrase
 * @param {String} plainText
 * @param {String} salt
 * @param {String} iv
 */
function CryptoE(passphrase, plainText, salt, iv) {
    var key = CryptoK(passphrase, salt, iterations);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
/**
 * Crypto decrypt
 * @param {String} passphrase
 * @param {String} encryptedText
 * @param {String} salt
 * @param {String} iv
 */
function CryptoD(passphrase, encryptedText, salt, iv) {
    var key = CryptoK(passphrase, salt);
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
if (!(typeof module !== "undefined" && module.exports)) {
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
}
Date.prototype.isHourAgo = function (hour) {
    var hour = hour * 60 * 1000; /* ms */
    var hourago = Date.now() - hour;
    return hour > hourago;
};
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    //this.setHours(this.getHours()+h);
    return this;
};
Date.prototype.addHours2 = function (hrs) {
    this.setHours(this.getHours() + hrs);
    return this;
};
function datetime_local(date) {
    return new Date(date).toJSON().slice(0, 19);
}
/**
 * Detect is mobile
 */
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
/** Add one or more listeners to an element
 * @param element - DOM element to add listeners to
 * @param eventNames - space separated list of event names, e.g. 'click change'
 * @param listener - function to attach for each event as a listener
 */
function setEventListener(element, eventNames, listener) {
    eventNames.split(" ").forEach(function (e) {
        //element.addEventListener(e, listener, false);
        if (element.attachEvent) {
            if (e == "click") {
                e = "onclick";
            }
            element.attachEvent(e, listener);
        }
        else if (element.addEventListener) {
            element.addEventListener(e, listener, false);
        }
        else {
            console.error("cannot attach event to FAB wrapper");
        }
    });
}
/**
 * @class Generate unique id
 */
var GeneratorID = /** @class */ (function () {
    function GeneratorID() {
        this.rand = Math.floor(Math.random() * 26) + Date.now();
    }
    /**
     * Increase new id
     */
    GeneratorID.prototype.genId = function () {
        return this.rand++;
    };
    GeneratorID.prototype.getId = function () {
        this.genId();
        return jQuery.fn.jquery + "." + this.rand;
    };
    return GeneratorID;
}());
/**
 * @param {createElement} options
 */
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
    // IE 8 doesn"t have HTMLElement
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
var html = /** @class */ (function () {
    function html() {
    }
    html.create = function (options) {
        return createElement(options);
    };
    return html;
}());
Number.prototype.getMS = function (type) {
    var self = this;
    return this * 60 * 1000;
};
Number.prototype.addHour = function (source) {
    var self = this;
    var Hour = this * 60 * 1000; /* ms */
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
/**
 * @class Timer constructor
 * @example
 * const time = new Timer(() => console.log('hi'), 1000);
 * console.log(time instanceof Timer); // true
 */
var Timer = /** @class */ (function () {
    function Timer(callback, time) {
        this.timeId = null;
        this.timeId = setTimeout(callback, time);
    }
    Timer.prototype.clear = function () {
        clearTimeout(this.timeId);
    };
    return Timer;
}());
/**
 * check empty
 * @param str
 */
function empty(str) {
    var type = typeof str;
    if (type == "string" || type == "number") {
        str = str.toString().trim();
    }
    switch (str) {
        case "":
        case null:
        case false:
        case type == "undefined": //typeof (str) == "undefined"
            return true;
        default:
            return false;
    }
}
/**
 * call_user_func
 * @param functionName function name
 */
function ___call(functionName, context, args) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    if (typeof window[func] != "undefined") {
        window[func](arguments);
    }
}
/**
 * call_user_func
 * @param func function name
 */
function __call(func) {
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}
/**
 * Begin global toastr options
 */
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
    toastr.options.timeOut = 3000; // How long the toast will display without user interaction
    toastr.options.extendedTimeOut = 6000; // How long the toast will display after a user hovers over it
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
var randstr = function (length) {
    if (length === void 0) {
        length = 6;
    }
    return Math.random().toString(20).substr(2, length);
};
/**
 * Is Node ?
 */
function isnode() {
    if (typeof module !== "undefined" && module.exports) {
        return true;
    }
}
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * AJAX runner base
     */
    var AJAX = null;
    /**
     * Ajax dump base
     */
    var dumpAjax = false;
    /**
     * Ajax indicator base
     */
    var indicatorAjax = false;
    var ajaxIDLoader_1 = "ajxLoader_" +
        Math.random().toString(36).substring(2) +
        Date.now().toString(36);
    if (!$("#" + ajaxIDLoader_1).length) {
        $("body").append('<div id="' +
            ajaxIDLoader_1 +
            '" style="position: fixed;z-index:9999;bottom:5px;left:5px;"><svg enable-background="new 0 0 40 40"height=40px id=loader-1 version=1.1 viewBox="0 0 40 40"width=40px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"fill=#000 opacity=0.2 /><path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
  C22.32,8.481,24.301,9.057,26.013,10.047z"fill=#000><animateTransform attributeName=transform attributeType=xml dur=0.5s from="0 20 20"repeatCount=indefinite to="360 20 20"type=rotate /></path></svg></div>');
        $("#" + ajaxIDLoader_1).fadeOut("fast");
    }
    jQuery.ajaxPrefilter(function (options) {
        indicatorAjax =
            typeof options.indicator == "boolean" && options.indicator === true;
        dumpAjax = typeof options.dump == "boolean" && options.dump === true;
        /**
         * Proxying begin
         */
        if (options.crossDomain && jQuery.support.cors) {
            var allowed = true;
            if (options.url.match(/\.html$/g)) {
                allowed = false;
            }
            if (options.url.match(/^\//)) {
                allowed = false;
            }
            if (options.hasOwnProperty("proxy") && !options.proxy) {
                allowed = false;
            }
            if (allowed) {
                var http = window.location.protocol === "http:" ? "http:" : "https:";
                if (typeof options.proxy == "string") {
                    options.url =
                        options.proxy.replace(/\/{1,99}$/s, "") + "/" + options.url;
                }
                else {
                    options.url = http + "//cors-anywhere.herokuapp.com/" + options.url;
                }
            }
        }
    });
    /*
  $(document).ajaxStart(function () {
  });
  */
    $(document).ajaxError(function (event, jqXHR, settings, errorThrown) {
        var content_type = jqXHR.getResponseHeader("Content-Type");
        if (typeof toastr != "undefined") {
            if (/json|text\/plain/s.test(content_type)) {
                toastr.error("Request failed. (" +
                    jqXHR.status +
                    " " +
                    jqXHR.statusText +
                    ") " +
                    errorThrown, "Request Info");
            }
        }
    });
    $(document).ajaxSend(function (event, xhr, settings) {
        if (settings.hasOwnProperty("indicator") && settings.indicator) {
            $("#" + ajaxIDLoader_1).fadeIn("fast");
        }
        if (dumpAjax) {
            toastr.info("Requesting...", "Request Info");
        }
        if (!settings.hasOwnProperty("method")) {
            settings.method = "POST";
        }
    });
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.hasOwnProperty("indicator") && settings.indicator) {
            $("#" + ajaxIDLoader_1).fadeOut("fast");
        }
        if (dumpAjax) {
            toastr.success("Request complete", "Request Info");
        }
        AJAX = null;
        $("#" + ajaxIDLoader_1).fadeOut("slow");
        var content_type = xhr.getResponseHeader("Content-Type"), res;
        if (xhr.hasOwnProperty("responseJSON")) {
            res = xhr.responseJSON;
        }
        else {
            res = xhr.responseText;
            if (typeof res == "string" &&
                !empty(res) &&
                /json|text\/plain/s.test(content_type)) {
                //begin decode json
                if (is_json(res)) {
                    res = JSON.parse(res);
                }
            }
        }
        if (typeof res == "object") {
            if (res.hasOwnProperty("redirect")) {
                this.location.replace(res.redirect);
                throw "Disabled";
            }
            if (res.hasOwnProperty("reload")) {
                location.href = location.href;
                throw "Disabled";
            }
        }
    });
    $(document).ajaxSuccess(function (event, request, settings) {
        var res;
        var content_type = request.getResponseHeader("Content-Type");
        if (request.hasOwnProperty("responseJSON")) {
            res = request.responseJSON;
        }
        else {
            res = request.responseText;
        }
        if (typeof res == "string" &&
            !empty(res) &&
            /json|text\/plain/s.test(content_type)) {
            //begin decode json
            if (is_json(res)) {
                res = JSON.parse(res);
            }
        }
        if (typeof res == "object" &&
            !settings.hasOwnProperty("silent") &&
            typeof toastr != "undefined" &&
            /json|javascript/s.test(content_type)) {
            var error = res.hasOwnProperty("error") && res.error ? true : false;
            var title = res.hasOwnProperty("title") ? res.title : "Unknown Title";
            var msg = res.hasOwnProperty("message") ? res.message : "Unknown Error";
            if (res.hasOwnProperty("error") && res.hasOwnProperty("message")) {
                if (error) {
                    toastr.error(msg, title);
                }
                else {
                    toastr.success(msg, title);
                }
            }
            else if (res.hasOwnProperty("message")) {
                toastr.info(msg, title);
            }
            if (res.hasOwnProperty("unauthorized")) {
                location.replace("/signin");
            }
        }
    });
    /*
  jQuery.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (typeof options.data != 'undefined' && !jQuery.isEmptyObject(options.data)) {
      jqXHR.setRequestHeader('timeStamp', new Date().getTime().toString());
    }
  });
  */
    function processAjaxForm(xhr, callback) {
        //var content_type = typeof xhr.getResponseHeader == 'function' ? xhr.getResponseHeader('Content-Type') : null, res;
        var res;
        if (xhr.hasOwnProperty("responseJSON")) {
            res = xhr.responseJSON;
        }
        else if (xhr.hasOwnProperty("responseText")) {
            res = xhr.responseText;
            if (typeof res == "string" && !empty(res)) {
                //begin decode json
                if (is_json(res)) {
                    res = JSON.parse(res);
                }
            }
        }
        if (callback) {
            if (typeof callback == "function") {
                callback(res);
            }
            else if (typeof callback == "string") {
                ___call(callback, window, res);
            }
            else {
                console.error("2nd parameters must be callback function, instead of " +
                    typeof callback);
            }
        }
    }
    /**
     * Custom ajax
     * @param settings ajax settings object
     */
    function ajx(settings, success, failed, complete) {
        settings.headers = {
            "unique-id": getUID(),
        };
        if (!settings.hasOwnProperty("indicator")) {
            settings.indicator = true;
        }
        if (!settings.hasOwnProperty("method")) {
            settings.method = "POST";
        }
        return $.ajax(settings)
            .done(function (data, textStatus, jqXHR) {
            processAjaxForm(jqXHR, success);
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            processAjaxForm(jqXHR, failed);
        })
            .always(function (jqXHR, textStatus, errorThrown) {
            processAjaxForm(jqXHR, complete);
        });
    }
    function AjaxForm() {
        $(document).on("submit", "form", function (e) {
            e.preventDefault();
            var t = $(this);
            var s = t.data("success"), er = t.data("error"), c = t.data("complete");
            ajx({
                url: t.attr("action"),
                method: t.attr("method"),
                data: t.serialize(),
            }, s, er, c);
        });
    }
    /**
     * process page asynchronously
     * @param source_cache url
     */
    function async_process(source_cache) {
        var xhr = new XMLHttpRequest();
        $.ajax({
            url: source_cache,
            method: "POST",
            silent: true,
            indicator: false,
            xhr: function () {
                return xhr;
            },
            headers: {
                Pragma: "no-cache",
                "Cache-Control": "no-cache",
                "Refresh-Cache": "true",
            },
            success: function (response) {
                $("html").html($("html", response).html());
                console.log(xhr.responseURL);
            },
        });
    }
}
var AjaxSchedulerInit = null;
var AjaxSchedulerRequests = [];
var AjaxSchedulerRunning = false;
/**
 * AJAX MANAGER
 * @todo handle ajax request queue
 * @see https://bit.ly/2Tz0wrf
 */
var ajaxScheduler = /** @class */ (function () {
    function ajaxScheduler() {
    }
    /**
     * Add ajax to queues
     * @param opt
     */
    ajaxScheduler.add = function (opt) {
        AjaxSchedulerRequests.push(opt);
    };
    /**
     * Remove ajax from queues
     * @param opt
     */
    ajaxScheduler.remove = function (opt) {
        if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
            AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
        }
    };
    /**
     * Run Ajax Scheduler
     */
    ajaxScheduler.run = function () {
        var self = this;
        var oriSuc;
        //console.log(AjaxSchedulerRequests.length);
        if (AjaxSchedulerRequests.length > 0) {
            oriSuc = AjaxSchedulerRequests[0].complete;
            AjaxSchedulerRequests[0].complete = function () {
                if (typeof oriSuc === "function") {
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
    };
    /**
     * Stop ajax scheduler
     */
    ajaxScheduler.stop = function () {
        AjaxSchedulerRequests = [];
        clearTimeout(AjaxSchedulerInit);
    };
    return ajaxScheduler;
}());
/**
 * RUN AJAX Scheduler
 * @param method POST, GET, HEAD, DELETE, OPTIONS, PATCH, PROPATCH
 * @description ajax request one by one
 * @todo scheduling any jquery ajax
 */
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
            "unique-id": getUID(),
            Accept: "application/json",
        },
        success: function (res) {
            if (typeof success == "function") {
                success(res);
            }
            else if (typeof success == "string") {
                ___call(success, window, res);
            }
            else {
                console.log(success + " isnt success callback, instead of " + typeof success);
            }
        },
        error: function (err) {
            if (typeof failed == "function") {
                failed(err);
            }
        },
        complete: function (res) {
            AJAX = null;
            if (typeof complete == "function") {
                complete(res);
            }
            //gexec('Ajax_Reload');
        },
    });
}
function ajaxFormSchedule() {
    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        var t = $(this);
        var s = t.data("success"), err = t.data("error"), c = t.data("complete");
        ajaxScheduler.add({
            url: t.attr("action"),
            method: t.attr("method"),
            data: t.serialize(),
            success: s,
            error: err,
            complete: c,
        });
    });
}
if (!isnode()) {
    if (typeof window != "undefined") {
        window.ajax = {};
    }
    else {
        var ajax_1 = {};
    }
    ajax.x = function () {
        if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp",
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
        if (method == "POST") {
            x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        x.send(data);
    };
    ajax.get = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        ajax.send(url + (query.length ? "?" + query.join("&") : ""), callback, "GET", null, async);
    };
    ajax.post = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        ajax.send(url, callback, "POST", query.join("&"), async);
    };
    function ajax() {
        return window.ajax;
    }
}
if (!(typeof module !== "undefined" && module.exports)) {
    var gtagID = "UA-106238155-1";
    var create_gtagscript = document.createElement("script");
    create_gtagscript.src =
        "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
    create_gtagscript.async = true;
    document.getElementsByTagName("body")[0].appendChild(create_gtagscript);
    var gtag = null;
    window.onload = function () {
        if (window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            gtag = function () {
                window.dataLayer.push(arguments);
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
                cookie_update: false,
                cookie_expires: 28 * 24 * 60 * 60,
            });
            var trackLinks = document.getElementsByTagName("a");
            for (var i = 0, len = trackLinks.length; i < len; i++) {
                trackLinks[i].onclick = function () {
                    if (!/^\#/gm.test(this.href) && !empty(this.href)) {
                        gtag("event", "click", {
                            event_category: "outbound",
                            event_label: this.href,
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
function typedKeys(o) {
    // type cast should be safe because that's what really Object.keys() does
    return Object.keys(o);
}
var ORIGIN = null;
if (isnode()) {
    var process_1 = require("process");
    ORIGIN = process_1.cwd();
}
else {
    ORIGIN = location.protocol + "//" + location.host + location.pathname;
}
var dimas = {
    /**
     * get current url without querystrings
     */
    url: ORIGIN,
    /**
     * framework captcha
     */
    captcha: {
        /**
         * DO NOT ASSIGN THIS
         */
        check: null,
        /**
         * Get current captcha id
         */
        id: function (header_name) {
            if (!dimas.captcha.check) {
                dimas.captcha.get(header_name);
            }
            return storage().get("captcha");
        },
        /**
         * Get current captcha from backend
         * And process it by jsonpCallback
         */
        get: function (header_name) {
            var _a;
            if (!dimas.captcha.check) {
                dimas.captcha.check = setTimeout(function () {
                    dimas.captcha.get(header_name);
                }, 60000);
            }
            var ua = md5(navigator.userAgent).rot13();
            var IP = ip.get(null);
            $.ajax({
                url: dimas.url + "?login=" + guid(),
                method: "POST",
                headers: (_a = {
                    Accept: "application/javascript"
                },
                    _a[header_name] = ua,
                    _a[IP.rot13()] = ua,
                    _a),
                dataType: "jsonp",
                jsonpCallback: "framework().captcha.jspCallback",
            });
        },
        callback: function (arg) { },
        /**
         * Captcha JSONP callback
         */
        jspCallback: function (res) {
            if (res.hasOwnProperty("captcha")) {
                storage().set("captcha", res.captcha.rot13());
                dimas.captcha.callback(storage().get("captcha"));
                dimas.captcha.listen();
            }
        },
        listener_started: null,
        /**
         * Form Captcha listener
         */
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
                //captcha.parents('form').find('[type="submit"]').one('click', function());
            });
        },
    },
    /**
     * Rupiah currency auto format
     */
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
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    isNumber: function (v) {
        return (!isNaN(parseInt(v.toString()) - parseFloat(v.toString())) &&
            /^\d+$/.test(v.toString()));
    },
    /**
     * strpad / startwith zero [0]
     * @param {number} val
     */
    strpad: function (val) {
        if (val >= 10) {
            return val;
        }
        else {
            return "0" + val;
        }
    },
    /**
     * Autofill datetime-local value
     */
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
    /**
     * Get cookie
     * @param string name cookie
     */
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
    /**
     * Odd or Even (Ganjil Genap);
     * @param type odd or even
     */
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
        //return hasil == (type == ('odd' || 'ganjil') ? 1 : 0);
        return hasil.toString() == type.toString();
    },
    /**
     * Set cookie
     * @param {String} name
     * @param {any} value
     * @param {number} hours
     */
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
    /**
     * Remove Cookie
     */
    rc: function (name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    },
    /**
     * Get Query name from current url
     */
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
    /**
     * Get js file from url
     * @param {String} url
     * @param {Function} callback
     */
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
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    pctdRUN: function (elm) {
        var tl = parseInt(elm.attr("countdown")) > 0 ? elm.attr("countdown") : 5, bs = elm.data("base") ? elm.data("base") : "bg-info", bw = elm.data("warning") ? elm.data("warning") : "bg-danger", bc = elm.data("success") ? elm.data("success") : "bg-success", countdown = elm.progressBarTimer({
            warningThreshold: 5,
            timeLimit: tl,
            // base style
            baseStyle: bs,
            // warning style
            warningStyle: bw,
            // complete style
            completeStyle: bc,
            // should the timer be smooth or stepping
            smooth: true,
            // striped progress bar
            striped: true,
            // animated stripes
            animated: true,
            // height of progress bar
            // 0 = default height
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
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
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
    /**
     * Parseurl just like as parse_url at php
     */
    parseurl: function (url) {
        var parser = document.createElement("a"), searchObject = {}, queries, split, i;
        // Let the browser do the work
        parser.href = url;
        // Convert query string to object
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
/**
 * Framework object initializer
 */
function framework() {
    return dimas;
}
var app = /** @class */ (function () {
    function app() {
    }
    app.setbase = function (path) {
        this.base = path;
    };
    app.direct = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scripts = document.querySelectorAll("script[src]");
        var last = scripts[scripts.length - 1];
        var lastsrc = last.getAttribute("src");
        var parsed = dimas.parseurl(lastsrc);
        args.forEach(function (src) {
            dimas.js("" + app.base + src + parsed.search, function () {
                console.log(src + " engine inbound");
            });
        });
    };
    app.load = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scripts = document.querySelectorAll("script[src]");
        var last = scripts[scripts.length - 1];
        var lastsrc = last.getAttribute("src");
        var parsed = dimas.parseurl(lastsrc);
        args.forEach(function (key, index) {
            console.log(key, app.base);
            var src = "";
            if (/^(ajx|ajaxjQuery|ajxjquery|ajquery)$/s.test(key)) {
                src = "ajaxJquery.js";
            }
            else if (/^(ajv|ajaxVanilla|ajaxv|avanilla)$/s.test(key)) {
                src = "ajaxVanilla.js";
            }
            if (src != "") {
                dimas.js("" + app.base + src + parsed.search, function () {
                    console.log(src + " engine inbound");
                });
            }
        });
    };
    app.base = "/src/MVC/themes/assets/js/";
    return app;
}());
if (typeof module !== "undefined" && module.exports) {
    module.exports.app = app;
    module.exports.dimas = dimas;
}
//app.direct('Array.js', 'Object.js', 'saver.js', 'user.js');
/**
 * base64 encoding
 * @param {string} str string raw
 */
function base64_encode(str) {
    // PROCESS
    var encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
    var encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}
/**
 * base64 decoding
 * @param {string} str base64 string
 */
function base64_decode(str) {
    // PROCESS
    var encodedWord = CryptoJS.enc.Base64.parse(str); // encodedWord via Base64.parse()
    var decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
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
/**
 * Disable debugger
 */
function bannedebug() {
    if (debug_run)
        return;
    debug_run = true;
    document.body.innerHTML =
        '<iframe frameborder="0" src="//www.webmanajemen.com" width="100%" height="100%"></iframe><a href="https://www.webmanajemen.com" id="DebuggeRedirect"></a>';
    if (!document.getElementById("DebuggeRedirect").click()) {
        setTimeout(function () {
            window.location.replace("https://www.webmanajemen.com");
        }, 5000);
    }
}
/**
 * Detect debugger using flooding loop
 */
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
            throw "you got banned";
        }
    }, 500);
}
/**
 * restrict debug
 * @param {Boolean} restrict
 */
function restrict_mode(restrict) {
    if (restrict) {
        console.clear();
        window["console"]["log"] = function () { };
        var threshold = 160;
        var devtools = {
            isOpen: false,
            orientation: undefined,
        };
        //console.log(devtools);
        setInterval(function () {
            var widthThreshold = window.outerWidth - window.innerWidth > threshold;
            var heightThreshold = window.outerHeight - window.innerHeight > threshold;
            var orientation = widthThreshold ? "vertical" : "horizontal";
            //console.log(widthThreshold, heightThreshold, orientation);
            if (!(heightThreshold && widthThreshold) &&
                ((window.Firebug &&
                    window.Firebug.chrome &&
                    window.Firebug.chrome.isInitialized) ||
                    widthThreshold ||
                    heightThreshold)) {
                if (!devtools.isOpen || devtools.orientation !== orientation) {
                    devtools.orientation = orientation;
                }
                //console.log('opened');
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
                console.error("devtools opened");
                //console.clear();
                bannedebug();
                debugger;
                throw "banned";
            }
        }, 500);
        /**
         * Hotkey disabler
         */
        document.onkeydown = function (e) {
            //prevent key F12
            if (event.keyCode == 123) {
                return false;
            }
            //prevent CTRL + Shift + I
            if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
                return false;
            }
            //prevent CTRL + Shift + J
            if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
                return false;
            }
            //prevent CTRL + Shift + C
            if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
                return false;
            }
            //prevent CTRL + U
            if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
                return false;
            }
        };
    }
}
if (!(typeof module !== "undefined" && module.exports)) {
    var restrict = !isMobile();
    //restrict = true;
    restrict = restrict && !is_localhost() && !is_development();
    //console.log('is restricted mode : ' + restrict);
    restrict_mode(restrict);
}
/**
 * Disqus loader which verifies the existence of `#disqus_thread` on
 * the web page and then prepares the disqus embed script to hook in
 * the document
 * @param disqus_shortname disqus username/shortname
 */
function load_disqus(disqus_shortname) {
    // Prepare the trigger and target
    var disqus_trigger = $('#disqus_trigger'), disqus_target = $('#disqus_thread');
    // Load script asynchronously only when the trigger and target exist
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
var distance_already_calculated = [];
/**
 * find distance
 * @param target
 * @param callback
 */
function calculateDistance(target, callback) {
    if (distance_already_calculated.includes(target)) {
        return null;
    }
    distance_already_calculated.push(target);
    var mX, mY, distance, $element = $("#" + target);
    return $(document).on("mousemove click", function (e) {
        mX = e.pageX;
        mY = e.pageY;
        distance = calculatorDistance($element, mX, mY);
        return callback(distance);
    });
}
/**
 * calculate distance mouse x element
 * @param elem
 * @param mouseX
 * @param mouseY
 */
function calculatorDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
        Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)));
}
// A map of the entities we want to handle.
// The numbers on the left are the Unicode code point values; their
// matching named entity strings are on the right.
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
    // ...and lots and lots more, see http://www.w3.org/TR/REC-html40/sgml/entities.html
    "8364": "&euro;",
};
// The function to do the work.
// Accepts a string, returns a string with replacements made.
/**
 * Encode HTML string to HTML entities
 * @param {String} str
 */
function prepEntities(str) {
    // The regular expression below uses an alternation to look for a surrogate pair _or_
    // a single character that we might want to make an entity out of. The first part of the
    // alternation (the [\uD800-\uDBFF][\uDC00-\uDFFF] before the |), you want to leave
    // alone, it searches for the surrogates. The second part of the alternation you can
    // adjust as you see fit, depending on how conservative you want to be. The example
    // below uses [\u0000-\u001f\u0080-\uFFFF], meaning that it will match and convert any
    // character with a value from 0 to 31 ("control characters") or above 127 -- e.g., if
    // it's not "printable ASCII" (in the old parlance), convert it. That's probably
    // overkill, but you said you wanted to make entities out of things, so... :-);
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u001f\u0080-\uFFFF]/g, function (match) {
        var high, low, charValue, rep;
        // Get the character value, handling surrogate pairs
        if (match.length == 2) {
            // It's a surrogate pair, calculate the Unicode code point
            high = match.charCodeAt(0) - 0xd800;
            low = match.charCodeAt(1) - 0xdc00;
            charValue = high * 0x400 + low + 0x10000;
        }
        else {
            // Not a surrogate pair, the value *is* the Unicode code point
            charValue = match.charCodeAt(0);
        }
        // See if we have a mapping for it
        rep = entityMap[charValue];
        if (!rep) {
            // No, use a numeric entity. Here we brazenly (and possibly mistakenly);
            rep = "&#" + charValue + ";";
        }
        // Return replacement
        return rep;
    });
}
/**
 * php equivalent http_build_query
 * @param obj
 */
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
/**
 * Check current framework running at localhost
 */
function is_localhost() {
    var is_local = location.host.match(/^localhost|^127|\.io$/s);
    return is_local;
}
/**
 * Is Development Mode
 */
function is_development() {
    return (document.getElementsByTagName("html")[0].getAttribute("environtment") ==
        "development");
}
/**
 * Force HTTPS
 */
function forceSSL() {
    if (location.protocol !== "https:" && !is_localhost()) {
        location.replace("https:" + location.href.substring(location.protocol.length));
    }
}
/**
 * json decode fails return false
 * @param  obj
 */
function json_decode(obj) {
    try {
        return JSON.parse(obj);
    }
    catch (error) {
        return false;
    }
}
/**
 * check string is json
 * @param str
 */
function is_json(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
var guxid = (Math.random().toString(16) + "000000000").substr(2, 8);
/**
 * Get current unique global page user id
 */
function guid() {
    function _p8(s) {
        var p = guxid;
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}
if (typeof jQuery != "undefined" && !isnode()) {
    jQuery.guid = function () {
        function _p8(s) {
            var p = guxid;
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8(false) + _p8(true) + _p8(true) + _p8(false);
    };
}
/**
 * Generate UUID v4
 */
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * jQuery Extender
     */
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
    })(jQuery);
    // Restricts input for the given textbox to the given inputFilter function.
    function setInputFilter(textbox, inputFilter) {
        [
            "input",
            "keydown",
            "keyup",
            "mousedown",
            "mouseup",
            "select",
            "contextmenu",
            "drop",
        ].forEach(function (event) {
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
    //Filter number only
    if (typeof jQuery.fn.inputFilter != "undefined") {
        $("input[type='number'], textarea[type='number'], [filter='number']").inputFilter(function (value) {
            if (typeof value == "string") {
                return /^\d*$/.test(value);
            }
        });
    }
    else {
        var INPT = document.querySelectorAll("input[type='number'], textarea[type='number'], [filter='number']");
        for (var index = 0; index < INPT.length; index++) {
            var element = INPT[index];
            setInputFilter(element, function (value) {
                return /^\d*$/.test(value); // Allow digits and '.' only, using a RegExp
            });
        }
    }
}
if (!(typeof module !== "undefined" && module.exports)) {
    /** Format Rupiah */
    var inputrp = $('[id="format-rupiah"]');
    if (inputrp.length) {
        inputrp.on("keyup keydown change", function (e) {
            var t = $(this);
            var v = t.val();
            var n = t.next(".form-text, #rupiah");
            if (framework().isNumber(v.toString())) {
                var V = framework().rp(v);
                t.css("border-color", "green");
                framework().enable_button(t, V);
            }
            else {
                var V = "Bukan nomor";
                t.css("border-color", "red");
                framework().disable_button(t, V);
            }
            if (n.length) {
                n.text(V);
            }
            else {
                $('<p id="rupiah" class="form-text text-muted">' + V + "</p>").insertAfter(t);
            }
        });
    }
}
var ip = /** @class */ (function () {
    function ip() {
    }
    ip.status = function (value) {
        if (value === true) {
            Cookies.set('status_ip'.rot13(), String(value), 5, 'm', location.pathname, null);
        }
        return Cookies.get('status_ip'.rot13());
    };
    ;
    /**
     * Checks ip
     * @returns promises
     */
    ip.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipapi()];
                    case 1:
                        _a.sent();
                        if (!!this.status(null))
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.l2io()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (this.status(null)) {
                            console.log(this.get(null));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets ip
     * @param callback function callback(ip) or null return ip
     * @returns {String} ip or callback
     */
    ip.get = function (callback) {
        if (!this.status(null)) {
            this.check();
        }
        console.log(this.status(null));
        var ips = storage().get('ip');
        if (typeof callback == 'function') {
            return callback(ips);
        }
        return ips;
    };
    ip.ipapi = function () {
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
    };
    ip.l2io = function () {
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
    };
    return ip;
}());
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
    /**
     * @type {Number} counter executions
     */
    gexec_count: 0,
    key: '6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie',
    /**
     * Javascript caller
     * @param {String} url
     * @param {Function} callback
     */
    js: function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE
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
        else { //Others
            script.onload = function () {
                if (typeof callback == 'function') {
                    callback();
                }
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: function (key) {
        reCaptcha.key = key;
    },
    /**
     * Start recaptcha
     */
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
    /**
     * Initialize Recaptcha by defining jquery
     */
    init: function () {
        if (typeof jQuery == 'undefined' || typeof jQuery == 'undefined') {
            reCaptcha.js('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', reCaptcha.start);
        }
        else {
            reCaptcha.start();
        }
    },
    retry_count: 0,
    /**
     * load or refreshing google recaptcha
     */
    exec: function (action, retry, callback) {
        //console.log('gtag is ' + typeof gtag);
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
            for (var index_1 = 0; index_1 < 3; index_1++) {
                reCaptcha.exec(action, true);
                if (index_1 == 3 - 1) {
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
            execute.then(
            /**
             * Process token string from recaptcha
             * and distribute it into all form elements
             * @param {String} token
             */
            function (token) {
                reCaptcha.reCaptcha_buttons(false, null);
                //console.info(token);
                reCaptcha.insert(token);
                if (typeof callback == 'function') {
                    callback(token);
                }
            });
        }
    },
    /**
     * Insert reCaptcha Token
     * @param {String} token
     */
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
    /**
     * Distribute reCaptcha Token
     * @param {String} token
     */
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
    /**
     * Get token recaptcha
     */
    get: function () {
        var gr = $('input[name="g-recaptcha-response"]');
        if (gr.length) {
            var vr = gr[0].getAttribute('value');
            return vr;
        }
        return null;
    },
    /**
     * Button Controller
     * @param {Boolean} reCaptcha_disable
     * @param {Function} callback
     */
    reCaptcha_buttons: function (reCaptcha_disable, callback) {
        //toastr.info((reCaptcha_disable ? "disabling" : "enabling") + " button", "Recaptcha initialize");
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
/**
 * Hidden reCaptcha v3 object initializer
 */
function recaptcha() {
    return reCaptcha;
}
/// <reference path="./Array.d.ts"/>
/// <reference path="./jQuery.d.ts"/>
/// <reference path="./JQueryStatic.d.ts"/>
/// <reference path="./Object.d.ts"/>
/**
 * SMARTFORM
 * @todo save form user input
 */
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * Element Counter
     */
    var count = -1;
    /**
     * Local Storage key
     */
    var storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
    /**
     * Element Indexer
     */
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
            //var native: HTMLElement = this;
            /**
             * @todo Adding attribute id if not have id
             */
            if (!$(this).attr("id") || $(this).attr("id") == "") {
                try {
                    if (!(count in formField)) {
                        /**
                         * @todo ID generator 6 digit alphanumerics
                         */
                        var id = Math.random().toString(20).substr(2, 6);
                        $(this).attr("id", id);
                        formField[count] = id;
                        localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
                    }
                    else {
                        $(this).attr("id", formField[count]);
                    }
                }
                catch (error) {
                    console.error(error);
                    console.log(formField, typeof formField);
                }
                /**
                 * Increase index offset
                 */
                count++;
            }
            if ($(this).attr("aria-autovalue")) {
                $(this).val(uniqueid);
            }
            return ("[" +
                location.pathname.replace(/\/$/, "") +
                "/" +
                $(this).prop("tagName") +
                "/" +
                $(this).attr("id") +
                "/" +
                $(this).attr("name") || "empty" + "]");
        };
        $.fn.smartForm = function () {
            count++;
            if ($(this).attr("no-save")) {
                return;
            }
            var t = $(this);
            //set indicator
            t.attr("aria-smartform", uniqueid);
            var item;
            var key = t.getIDName().toString();
            var type = $(this).attr("type");
            // begin restoration
            if (key) {
                // checkbox input button
                if (type === "checkbox") {
                    item = JSON.parse(localStorage.getItem(key));
                    if (item === null) {
                        return;
                    }
                    $(this).prop("checked", item);
                    return;
                }
                // radio input button
                else if (type === "radio") {
                    item = localStorage.getItem(key) === "on";
                    $(this).prop("checked", item);
                    return;
                }
                // input text number, textarea, or select
                else {
                    item = localStorage.getItem(key);
                    if (item === null || !item.toString().length) {
                        return;
                    }
                    $(this).val(item);
                }
                //console.log('load', type, key, item);
            }
        };
        // bind to new elements
        $(document).bind("DOMNodeInserted", function () {
            var t = $(this);
            var val = localStorage.getItem(t.getIDName().toString());
            var tag = t.prop("tagName");
            var allowed = !t.attr("no-save") &&
                t.attr("aria-smartform") &&
                typeof tag != "undefined";
            if (allowed && val) {
                console.log(tag, allowed && val);
                switch (t.prop("tagName")) {
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        t.val(val);
                        break;
                }
            }
        });
        // detach from removed elements
        $(document).bind("DOMNodeRemoved", function () {
            var t = $(this);
            var allowed = !t.attr("no-save") && t.attr("aria-smartform");
            if (allowed) {
                switch (t.prop("tagName")) {
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        t.off("change");
                        break;
                }
            }
        });
        //save value to localstorage
        $(document).on("change", "select, input, textarea", function (e) {
            var _this = this;
            var t = $(this);
            var key = t.getIDName().toString();
            var item = t.val();
            var allowed = !t.attr("no-save") && t.attr("aria-smartform");
            if (key && item !== "" && allowed) {
                if (t.attr("type") == "checkbox") {
                    localStorage.setItem(key, t.is(":checked").toString());
                    console.log("save checkbox button ", $(this).offset());
                    return;
                }
                if (t.attr("type") == "radio" && t.attr("id")) {
                    $('[name="' + t.attr("name") + '"]').each(function (i, e) {
                        localStorage.setItem($(this).getIDName().toString(), "off");
                    });
                    setTimeout(function () {
                        localStorage.setItem(key, item.toString());
                        console.log("save radio button ", $(_this).offset());
                    }, 500);
                    return;
                }
                localStorage.setItem(key, item.toString());
                //console.log('save', key, localStorage.getItem(key));
            }
        });
        $(document).on("focus", "input,textarea,select", function () {
            var t = $(this);
            t.getIDName();
            var aria = t.attr("aria-smartform");
            if (aria && aria != uniqueid) {
                t.smartForm();
                t.attr("aria-smartform", uniqueid);
            }
        });
    })(jQuery);
}
/**
 * Set all forms to be smart
 */
function smartform() {
    //set value from localstorage
    var setglobal = function () {
        $("input,textarea,select").each(function (i, el) {
            $(this).smartForm();
        });
    };
    setglobal();
    //setInterval(function () { }, 500);
}
/**
 * Copy to clipboard
 */
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported("copy");
    var elOriginalText = el.attr("data-original-title");
    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "Copied!" : "Whoops, not copied!";
            el.attr("data-original-title", msg);
            el.tooltip("show");
        }
        catch (err) {
            console.log("Oops, unable to copy");
        }
        document.body.removeChild(copyTextArea);
        el.attr("data-original-title", elOriginalText);
    }
    else {
        // Fallback if browser doesn't support .execCommand('copy')
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}
var STORAGE = {
    /**
     * get localstorage by key
     * @param {String} key
     */
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
    /**
     * Set localstorage key value
     * @param {String} key
     * @param {String|Array|Object} value
     */
    set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    },
    /**
     * Check localstorage key exists
     * @param {String} key
     */
    has: function (key) {
        return !!localStorage[key] && !!localStorage[key].length;
    },
    /**
     * Extend or set localstorage key
     * @param {String} key
     * @param {String} value
     */
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
    /**
     * Remove localstorage key
     * @param {String} key
     */
    remove: function (key) {
        localStorage.removeItem(key);
    }
};
/**
 * localStorage helper
 */
function storage() {
    return STORAGE;
}
String.prototype.parse_url = function () {
    var parser = document.createElement('a'), searchObject, queries, split, i;
    // Let the browser do the work
    parser.href = this.toString();
    // Convert query string to object
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
/**
 * Load css
 */
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
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * @see https://mdbootstrap.com/support/general/text-area-auto-grow/
     */
    jQuery.fn.autoHeight = function () {
        function autoHeight_(element) {
            return jQuery(element)
                .css({ height: "auto", "overflow-y": "hidden" })
                .height(element.scrollHeight);
        }
        return this.each(function () {
            autoHeight_(this).on("input", function () {
                autoHeight_(this);
            });
        });
    };
}
if (!(typeof module !== "undefined" && module.exports)) {
    var UIDvalue = getUID();
}
function currentUID() {
    return UIDvalue;
}
/**
 * Get uid saved in browser
 */
function getUID() {
    return localStorage.getItem('uid');
}
/**
 * Signing the uid
 * @param {String} UID
 */
function sign_uid(UID) {
    var url = location.protocol + '//' + location.host + location.pathname;
    //console.log(url);
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
/**
 * Check UID
 * @return {string} uid
 * @param {Function|any} callback
 */
function checkUID(callback) {
    UIDvalue = getUID();
    if (isExpireUID()) {
        UIDvalue = genUID();
        sign_uid(UIDvalue);
    }
    if (!UIDcalled) {
        setTimeout(function () {
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
        //console.log('uid is expired ' + isExpired);
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
/**
 *  Save uid
 * @param {Object} data
 */
function saveUID(data) {
    console.log(data);
    if (typeof data == 'object') {
        if (data.hasOwnProperty('uid')) {
            console.log(data.uid + " was saved");
            localStorage.setItem('uid', data.uid);
            var date = new Date();
            framework().sc('signature-timeleft', AddMinutesToDate(date, 5)); // 5 mins
            //location.reload();
        }
    }
}
/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 */
function getParameterByName(name, url) {
    if (typeof URLSearchParams !== 'undefined') {
        if (!window.location.search) {
            url = window.location.href;
        }
        var urlParams = new URLSearchParams(url);
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
/**
 * User framework
 */
var user = /** @class */ (function () {
    function user() {
        //constructor() { if (!this.all()) { this.fetch(null); } }
        this.key = location.host + "/userdata";
    }
    /**
     * Get all userdata
     */
    user.prototype.all = function () {
        var data = storage().get(this.key);
        if (!data || data == "") {
            return undefined;
        }
        return data;
    };
    /**
     * get userdata
     */
    user.prototype.get = function (key) {
        try {
            var data = this.all();
            if (data !== undefined) {
                if (data.hasOwnProperty(key)) {
                    return data[key];
                }
            }
            console.log("user::get", data);
        }
        catch (error) {
            console.error("user::get", error);
            return undefined;
        }
    };
    /**
     * fetch userdata
     */
    user.prototype.fetch = function (callback) {
        var ini = this;
        return $.ajax({
            url: "/user",
            method: "POST",
            silent: true,
            indicator: false,
            data: {
                check: true,
                user: true,
            },
            success: function (res) {
                if (typeof res != "object") {
                    return;
                }
                if (res) {
                    if (res.hasOwnProperty("id")) {
                        res.user_id = res.id;
                        res._ = new Date();
                    }
                    if (res.hasOwnProperty("username")) {
                        if (typeof callback == "function") {
                            callback(res);
                        }
                    }
                }
                storage().set(ini.key, JSON.stringify(res));
                console.log("user::fetch", ini.all());
            },
        });
    };
    return user;
}());
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * @typedef {user} userc
     */
    var userc = new user();
    if (typeof window.user === "undefined") {
        window.user = userc;
    }
    jQuery.user = userc;
}
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * @todo Auto replace placeholder textarea newLines
     */
    var textAreas = document.getElementsByTagName("textarea");
    Array.prototype.forEach.call(textAreas, function (elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, "\n");
    });
    /**
     * @todo Disable hotkey
     */
    $(document).bind("keydown", function (e) {
        e = e || window.event;
        if (e.ctrlKey && e.which == 83) {
            e.preventDefault();
            toastr.info("CTRL+S disabled", "Hotkey");
            return false;
        }
        else if ((e.keyCode == 82 && e.ctrlKey) || e.keyCode == 116) {
            e.preventDefault();
            document.location.reload(true);
            return false;
        }
    });
    /**
     * @todo Textarea placeholders
     */
    $("textarea").each(function (index, el) {
        if ($(this).val().toString().length)
            return;
        var placeholder = $(this).attr("placeholder");
        $(this).removeAttr("placeholder");
        var id = $(this).attr("id");
        if (!id || id.length == 0) {
            id = makeid(5);
            $(this).attr("id", id);
        }
        $(this).val(formatNewLines(placeholder));
        tafocus("#" + id, placeholder);
    });
    /**
     * @todo datatables select2 jquery tooltip
     */
    $(document).ready(function () {
        /** Tooltip */
        if (jQuery.fn.tooltip && $('[data-toggle="tooltip"]')) {
            $("body").tooltip({
                selector: '[data-toggle="tooltip"]',
            });
            //$('[data-toggle="tooltip"]').tooltip();
            // colored tooltip
            $('[data-toggle="tooltip-primary"]').tooltip({
                template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            });
            $('[data-toggle="tooltip-secondary"]').tooltip({
                template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            });
            $('[data-toggle="tooltip-danger"]').tooltip({
                template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            });
        }
        /** datatables */
        if (jQuery.fn.DataTable && $("#datatable1").length) {
            $("#datatable1").DataTable({
                responsive: true,
                language: {
                    searchPlaceholder: "Search...",
                    sSearch: "",
                    lengthMenu: "_MENU_ items/page",
                },
            });
        }
        /** Select2 */
        var ds = $(".dataTables_length select");
        if (typeof jQuery.fn.select2 != "undefined") {
            if (ds.length || ds.data("select2")) {
                ds.select2({
                    minimumResultsForSearch: Infinity,
                });
            }
        }
    });
}
/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
function tafocus(id, placeholder) {
    var count_newlines = countNewLines(placeholder);
    $(id).on("focus", function (e) {
        var count_length = $(this).val().length;
        if (count_length === count_newlines || $(this).val() == placeholder) {
            $(this).val("");
        }
    });
    $(id).on("blur", function (e) {
        var count_length = $(this).val().length;
        if (!count_length) {
            $(this).val(formatNewLines(placeholder));
        }
    });
}
/**
 * format new lines
 * @param {String} placeholder
 */
function formatNewLines(placeholder) {
    for (var index_2 = 0; index_2 < 1000; index_2++) {
        if (!placeholder)
            break;
        placeholder = placeholder.replace("\\n", "\n");
        if (!placeholder.match(/\\n/g)) {
            break;
        }
    }
    return placeholder;
}
/**
 * Count newLines
 * @param {String} placeholder
 */
function countNewLines(placeholder) {
    if (!placeholder)
        return placeholder;
    var match = placeholder.match(/\\n/g) || "";
    return placeholder.length - match.length;
}
/**
 * find duplicate array
 * @param {Array<any>} arr
 * @param {Function} callback
 */
function findDups(arr, callback) {
    var sorted_arr = arr.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results[i] = sorted_arr[i];
        }
    }
    if (typeof callback == "function") {
        return callback(results);
    }
    else {
        return results;
    }
}
//=========== Auto id
/**
 * Auto Generate ID
 * @param {Number} length
 */
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//=========== RECAPTCHA
/**
 * load or refreshing google recaptcha
 */
function gexec(action, retry, callback) {
    recaptcha().exec(action, retry, callback);
}
/**
 * Get token recaptcha
 */
function geToken() {
    return recaptcha().get();
}
/**
 * Javascript caller
 * @param {String} url
 * @param {Function} callback
 */
function JavaScriptCaller(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (typeof callback == "function") {
                    callback();
                }
            }
        };
    }
    else {
        //Others
        script.onload = function () {
            if (typeof callback == "function") {
                callback();
            }
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * Function initialization
 */
if (!isnode()) {
    $(document).one("click", "#logout", function (e) {
        e.preventDefault();
        jQuery.post(location.href, {
            logout: true,
        }, function () {
            jQuery.get($(this).attr("href"));
            window.location.reload(1);
        });
    });
    /** Query URL */
    var hash = window.location.hash.substr(1);
    var result = hash.split("&").reduce(function (result, item) {
        var parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
    }, {});
    if (hash.length > 1) {
        console.log(result);
    }
    /** datetime-local */
    if (typeof dimas == "object" &&
        typeof framework().datetimelocal != "undefined") {
        framework().datetimelocal(undefined);
    }
    /** Progress bar */
    var elm = $("[countdown]");
    if (elm.length > 0) {
        elm.each(function (e) {
            var t = $(this);
            framework().pctd(t);
        });
    }
    /** document body listener */
    $(document.body).on("click", "[data-redirect]", function (E) {
        var red = $(this).attr("data-redirect").toString();
        if (red && red.trim() != "") {
            window.open(red, location.host).focus();
        }
    });
    /** Linkify */
    if (typeof mask_link != "undefined") {
        /**
         * @type {JQuery<HTMLElement>} L
         */
        var L = $("[data-linkify]").length ? $("[data-linkify]") : $(document.body);
        window.onload = function () {
            L.linkify({
                target: "_blank",
                attributes: null,
                className: "linkified",
                format: function (value, type) {
                    return value;
                },
                formatHref: function (href, type) {
                    return ("/youtube/s/" +
                        btoa(CryptoJS.AES.encrypt(href, typeof hash_pass != "undefined" ? hash_pass : location.host)));
                },
            });
        };
    }
    /**
     * new tab links hide refferer
     */
    var nwtb = $("[data-newtab]");
    if (nwtb.length) {
        nwtb.click(function (e) {
            window
                .open("http://href.li/?" + $(this).data("newtab"), "newtab")
                .focus();
        });
    }
    /**
     * links new tab form submit
     */
    var aform = $("[form]");
    if (aform.length > 1) {
        aform.click(function (e) {
            e.preventDefault();
            var id_form = $(this).attr("form");
            if (typeof id_form != "undefined") {
                var winame = document.getElementById(id_form).getAttribute("target"); //reduce caching
                console.log("Submiting Form ID#" + id_form);
                window.open("", winame.length ? winame : "FormDynamic").focus();
                document.getElementById($(this).attr("form")).submit();
            }
            //w = window.open('', 'bagas31-post');
            //$('form#' + $(this).attr('form')).submit();
            //w.focus();
        });
    }
    /**
     * open in new tab
     */
    $(document.body).on("click", 'a[id="newtab"],[newtab]', function (e) {
        e.preventDefault();
        var t = $(this);
        if (t.attr("href")) {
            openInNewTab(t.attr("href"), t.data("name") ? t.data("name") : "_blank");
        }
    });
}
/**
 * open in new tab
 * @param {string} url
 * @param {string} name
 */
function openInNewTab(url, name) {
    if (typeof url != "undefined" && typeof name != "undefined") {
        var win = window.open(url, name);
        win.focus();
    }
}
/**
 * get currency symbol from navigator
 */
function get_currency_symbol() {
    var amount = 0;
    var ident = navigator.language;
    var currency_type;
    switch (ident) {
        case "de-DE":
            currency_type = "EUR";
            break;
        case "id-ID":
            currency_type = "IDR";
            break;
        default:
            currency_type = "USD";
            break;
    }
    var format = amount.toLocaleString(ident, {
        style: "currency",
        currency: currency_type,
    });
    return format.toString().replace("0,00", "");
}
/**
 * Create JSON
 * @param {any} jsObj
 * @param {boolean} tabs
 */
function createJSON(jsObj, tabs) {
    if (tabs) {
        return JSON.stringify(jsObj, null, "\t"); // stringify with tabs inserted at each level
    }
    else {
        return JSON.stringify(jsObj, null, 4); // stringify with 4 spaces at each level}
    }
}
function loadingio(text, callback, mode) {
    if (typeof text == "undefined" || typeof text == "boolean" || !text) {
        text = "Please wait";
    }
    text.toString().toUpperCase();
    if (document.getElementById("loadingio-wrapper")) {
        if (mode == "disabled" || mode == "disable") {
            document.getElementById("loadingio-wrapper").classList.remove("running");
        }
        else if (typeof mode == "undefined" ||
            (typeof mode != "undefined" && (mode == "enable" || mode == "enabled"))) {
            document.getElementById("loadingio-text").innerHTML = text;
            document.getElementById("loadingio-wrapper").classList.toggle("running");
        }
    }
    else {
        var elemDiv = document.createElement("div");
        elemDiv.innerHTML =
            '<div id="loadingio-wrapper" class="ld-over-full running"><span class="ld"><span class="ld ld-ball ld-bounce"></span><span id="loadingio-text" class="text pt-3">' +
                text +
                '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span></span></div>';
        document.body.appendChild(elemDiv);
    }
    if (typeof callback == "function") {
        callback(arguments);
    }
}
function LoadScript(url, callback) {
    loadingio("Loading Script " + url);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onreadystatechange = function () {
        if (typeof callback == "function") {
            loadingio("Readystate " + url);
            callback();
        }
        loadingio(false, false, "disable");
    };
    script.onload = function () {
        loadingio("Onload Script " + url);
        if (typeof callback == "function") {
            callback();
        }
        loadingio(false, false, "disable");
    };
    document.body.appendChild(script);
    loadingio(false, false, "disable");
}
/**
function target(a) {
    alert(a);
}

var o = {
    suffix: " World",
    target: function(s) { alert(s + this.suffix); }
};

__call("target", "Hello");

__call.call(o, "target", "Hello");
 */
/**
 * parse proxy from string
 * @param {string} str
 * @return {Array<any>} proxy list filtered
 */
function parse_proxy(str) {
    var matchs, px = [];
    loadingio("Parsing proxies", function () {
        /*
        while (match = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g.exec(str)) {
          console.log('Match: "' + match[0] + '" first group: -> "' + match[1] + '" second group -> ' + match[2]);
          if (typeof match[0] != 'undefined' && typeof match[2] != 'undefined' && !inArray(match[0], px)) {
            px.push(match[0]);
          }
        }
        */
        if (typeof str == "string") {
            var regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]{1,6}/gm, match, proxyMatch;
            while ((match = regex.exec(str))) {
                proxyMatch = match[0];
                //console.log(proxyMatch);
                if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
                    px.push(proxyMatch);
                }
            }
            var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm, match, proxyMatch;
            while ((match = regex.exec(str))) {
                proxyMatch = atob(match[1]);
                //console.log(proxyMatch);
                if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
                    px.push(proxyMatch);
                }
            }
        }
        loadingio(null, null, "disabled");
        return px;
    });
    return array_shuffle(array_unique(px));
}
/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
function array_rand(arrays, unique) {
    if (unique) {
        arrays = array_unique(arrays);
    }
    var index = Math.floor(Math.random() * arrays.length);
    return {
        index: index,
        value: arrays[index],
    };
}
/**
 * Array unique
 * @param {Array<any>} arrays
 */
function array_unique(arrays) {
    return arrays.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    });
}
/**
 *
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
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
/**
 * Add class if not exists
 * @param {Element} element element from DOM
 * @param {string} className class name
 */
function toogleClass(element, className) {
    return element.classList.toggle(className);
}
function UNIQUE_ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
}
/**
 * jQuery pseudo builder
 * @param {string} string
 */
function pseudo_builder(string) {
    if (string) {
        return string.replace(/[\W\s]/gm, "");
    }
}
/**
 * Loop key value of object
 * @param {Object} object
 * @param {Function} callback
 */
function foreach(object, callback) {
    var key, value;
    Object.keys(object).forEach(function (key) {
        if (typeof callback == "function") {
            callback(key, object[key]);
        }
    });
    /*
      for ([key, value] of Object.entries(object)) {
        if (typeof callback == 'function'){
          callback(key, value);
        } else {
          console.log(key, value);
        }
      }
    */
}
/**
 * Get multiple random element from array
 * @param {Array<any>} arr array sources
 * @param {Number} n maximum element to be in result
 * @param {Function} callback function to process result
 */
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
    if (typeof callback == "function") {
        return callback(result);
    }
    else {
        return result;
    }
}
/**
 * Simple Websocket javascript
 * @todo Live Data
 * @description Don't miss data that changes even for a second
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com
 * @see https://www.webmanajemen.com/p/simple-websocket.html Simple Web Socket
 */
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
            //do with data response
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
/**
 * ZLIB packer
 * @see http://localhost/src/ZLIB.php
 * @requires pako `npm i pako @types/pako`
 */
var ZLIB = /** @class */ (function () {
    function ZLIB() {
    }
    /**
     * Base64 decode from php
     * @param {Uint8Array} arr
     */
    ZLIB.atos = function (arr) {
        for (var i = 0, l = arr.length, s = '', c; c = arr[i++];)
            s += String.fromCharCode(c > 0xdf && c < 0xf0 && i < l - 1 ?
                (c & 0xf) << 12 | (arr[i++] & 0x3f) << 6 | arr[i++] & 0x3f :
                c > 0x7f && i < l ?
                    (c & 0x1f) << 6 | arr[i++] & 0x3f :
                    c);
        return s;
    };
    ZLIB.decompress = function (str) {
        var dec = this.atos(pako.ungzip(base64_decode(str)));
        console.log({
            'ZLIB.decompress': {
                target: str,
                result: dec
            }
        });
        return dec;
    };
    ZLIB.compress = function (str) {
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
    };
    return ZLIB;
}());
//# sourceMappingURL=framework.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2ZyYW1ld29yay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTO0lBQ25GLFNBQVMsS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVHLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07UUFDckQsU0FBUyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUMzRixTQUFTLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBRSxDQUFDLENBQUM7UUFDOUYsU0FBUyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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LEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUN4RCxLQUFLLENBQUM7d0JBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsU0FBUztvQkFDakQsS0FBSyxDQUFDO3dCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsU0FBUztvQkFDakQ7d0JBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLFNBQVM7eUJBQUU7d0JBQzVHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxNQUFNO3lCQUFFO3dCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUss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Q1YsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztDQUNMO0FBQ0Q7O0dBRUc7QUFDSCxTQUFTLE1BQU07SUFDWCxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDcEQ7O09BRUc7SUFDSCxDQUFDLFVBQVUsQ0FBQztRQUNSLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxHQUFHLFVBQVUsV0FBVztZQUN6QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsK0RBQStELEVBQUU7Z0JBQzVFLElBQUksV0FBVyxDQUFDLElB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Q0FBQztJQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENB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Q0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2YsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNmLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDZixDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNQLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNQLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVB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