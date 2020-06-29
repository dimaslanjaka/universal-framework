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
 * CodeMirror loader
 * @param id
 * @param mode
 * @param theme
 */
function loadCodemirror(element, mode, theme) {
    if (!(element instanceof HTMLTextAreaElement)) {
        console.error("element must be instanceof HTMLTextAreaElement");
        return null;
    }
    var scripts = ["/node_modules/codemirror/lib/codemirror.js"];
    if (mode) {
        if (typeof mode == "string") {
            scripts.push("/node_modules/codemirror/mode/" + mode + "/" + mode + ".js");
        }
        else if (Array.isArray(mode)) {
            mode.forEach(function (m) {
                scripts.push("/node_modules/codemirror/mode/" + m + "/" + m + ".js");
            });
        }
    }
    if (!theme) {
        var themes = [
            "3024-night",
            "abcdef",
            "ambiance",
            "base16-dark",
            "bespin",
            "blackboard",
            "cobalt",
            "colorforth",
            "dracula",
            "erlang-dark",
            "hopscotch",
            "icecoder",
            "isotope",
            "lesser-dark",
            "liquibyte",
            "material",
            "mbo",
            "mdn-like",
            "monokai",
        ];
        var theme = themes[Math.floor(Math.random() * themes.length)];
    }
    framework().async(function () {
        LoadScript(scripts, function () {
            loadCSS("/node_modules/codemirror/lib/codemirror.css", function () {
                var editor = CodeMirror.fromTextArea(element, {
                    lineNumbers: true,
                    mode: mode,
                });
                loadCSS("/node_modules/codemirror/theme/" + theme + ".css", function () {
                    editor.setOption("theme", theme);
                });
            });
        });
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
                if (isJSON(cookie)) {
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
 * @param {createElementOpt} options
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
        // @ts-ignore
        window.HTMLElement = Element;
    }
    if (options.childs && options.childs.length) {
        for (i = 0; i < options.childs.length; i++) {
            el.appendChild(options.childs[i] instanceof window.HTMLElement
                ? options.childs[i]
                : createElement(options.childs[i]));
        }
    }
    return el;
}
var html = /** @class */ (function () {
    function html() {
    }
    html.create = function (options) {
        /**
         * @param {createElementOpt}
         * @returns {createElement}
         */
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
    var l = String(b || 10).length - String(this).length + 1;
    return l > 0 ? new Array(l).join(c || "0") + this : this;
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
 * Is Node ?
 */
function isnode() {
    if (typeof module !== "undefined" && module.exports) {
        return true;
    }
}
/**
 * Make function async
 * @param callback
 */
function async_this(callback) {
    return new Promise(function (resolve, reject) {
        if (typeof callback == "function") {
            callback();
            resolve(true);
        }
        else {
            reject(new Error("callback is not function"));
        }
    });
}
/**
 * call_user_func
 * @param func function name
 */
function __call(func) {
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}
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
 * Get current function name
 */
function getFuncName() {
    return getFuncName.caller.name;
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
if (!isnode()) {
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
                if (isJSON(res)) {
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
            if (isJSON(res)) {
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
        console.log(getFuncName(), callback);
        var res;
        if (xhr.hasOwnProperty("responseJSON")) {
            res = xhr.responseJSON;
        }
        else if (xhr.hasOwnProperty("responseText")) {
            res = xhr.responseText;
            if (typeof res == "string" && !empty(res)) {
                //begin decode json
                if (isJSON(res)) {
                    res = JSON.parse(res);
                }
            }
        }
        if (callback) {
            if (typeof callback == "function") {
                callback(res);
            }
            else if (typeof callback == "string") {
                call_user_func(callback, window, res);
            }
            else {
                console.error("2nd parameters must be callback function, instead of " +
                    typeof callback);
            }
        }
    }
    function call_user_func(functionName, context, args) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
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
    /**
     * Handling form with ajax
     * @requires data-success success function name
     * @requires data-error error function name
     * @requires data-complete complete function name
     */
    function AjaxForm() {
        $(document).on("submit", "form", function (e) {
            e.preventDefault();
            var t = $(this);
            var sukses = t.data("success");
            var err = t.data("error");
            var complete = t.data("complete");
            var targetURL = t.attr("action");
            //console.log(targetURL, sukses, err, complete);
            if (!targetURL) {
                console.error("Target url of this form not exists");
                return;
            }
            ajx({
                url: targetURL,
                method: t.attr("method") || "POST",
                data: t.serialize(),
                headers: {
                    Accept: "application/json",
                    guid: guid(),
                },
            }, sukses, err, complete);
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
/// <reference path="alert.d.ts" />
/**
 * Bootstrap Alert Generator
 * @example createAlert(
  "[title] Opps!",
  "[description] Something went wrong",
  "[details] Here is a bunch of text about some stuff that happened.",
  "[mode|bg-color] danger",
  true, false,
  { position: "fixed", bottom: "15px", right: "15px" });
 */
function createAlert(
/**
 * Title alert
 */
title, 
/**
 * Summary description
 */
summary, 
/**
 * Another description
 */
details, 
/**
 * basic class bootstrap or you can insert color name
 */
severity, 
/**
 * can be closed ?
 */
dismissible, 
/**
 * auto closed ?
 */
autoDismiss, 
/**
 * Fill `CSSProperties` object or insert CSS object string
 * @example {position: 'fixed', top: '5px', right: '5px'}
 * @example 'position:fixed;top:10px;left:10px;'
 */
options) {
    if (severity == "error") {
        severity = "danger";
    }
    if (!$("style#alertcss")) {
        createStyle("#pageMessages {\n      position: fixed;\n      bottom: 15px;\n      right: 15px;\n      width: 30%;\n    }\n    \n    #pageMessages .alert {\n      position: relative;\n    }\n    \n    #pageMessages .alert .close {\n      position: absolute;\n      top: 5px;\n      right: 5px;\n      font-size: 1em;\n    }\n    \n    #pageMessages .alert .fa {\n      margin-right:.3em;\n    }", { id: "alertcss" });
    }
    if (!$("#pageMessages").length) {
        var style = "";
        if (typeof options == "string") {
            style = options;
        }
        else if (typeof options == "object") {
            if (options.length) {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        var value = options[key];
                        if (value && value.length) {
                            style += key + ": " + value + ";";
                        }
                    }
                }
            }
            else {
                style = "position: fixed;bottom: 15px;right: 15px;width: 30%;";
            }
        }
        $("body").append('<div id="pageMessages" style="' + style + '"></div>');
    }
    var iconMap = {
        info: "fa fa-info-circle",
        success: "fa fa-thumbs-up",
        warning: "fa fa-exclamation-triangle",
        danger: "fa ffa fa-exclamation-circle",
    };
    var iconAdded = false;
    var alertClasses = ["alert", "animated", "flipInX"];
    alertClasses.push("alert-" + severity.toLowerCase());
    if (dismissible) {
        alertClasses.push("alert-dismissible");
    }
    var msgIcon = $("<i />", {
        class: iconMap[severity],
    });
    var msg = $("<div />", {
        class: alertClasses.join(" "),
    });
    if (title) {
        var msgTitle = $("<h4 />", {
            html: title,
        }).appendTo(msg);
        if (!iconAdded) {
            msgTitle.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (summary) {
        var msgSummary = $("<strong />", {
            html: summary,
        }).appendTo(msg);
        if (!iconAdded) {
            msgSummary.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (details) {
        var msgDetails = $("<p />", {
            html: details,
        }).appendTo(msg);
        if (!iconAdded) {
            msgDetails.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (dismissible) {
        var msgClose = $("<span />", {
            class: "close",
            "data-dismiss": "alert",
            html: "<i class='fa fa-times-circle'></i>",
        }).appendTo(msg);
    }
    $("#pageMessages").prepend(msg);
    if (autoDismiss) {
        setTimeout(function () {
            msg.addClass("flipOutX");
            setTimeout(function () {
                msg.remove();
            }, 1000);
        }, 5000);
    }
}
/**
 * Create style css dynamic
 * @example css = 'h1 { background: red; }'
 * @example arributes = {id: 'customStyle', media: 'all'}
 * @param css
 */
function createStyle(css, attributes) {
    if (attributes === void 0) {
        attributes = null;
    }
    var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
    head.appendChild(style);
    style.type = "text/css";
    style.setAttribute("type", "text/css");
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            style.setAttribute(key, attributes[key]);
        }
    }
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    }
    else {
        style.appendChild(document.createTextNode(css));
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
     * Count Array/Object/String length
     * @param {any[]|string|object} data
     */
    count: function (data) {
        if (Array.isArray(data) || typeof data == "string") {
            return data.length;
        }
        else if (typeof data == "object") {
            return Object.keys(data).length;
        }
        else if (typeof data == "number") {
            return data;
        }
    },
    /**
     * Make async function
     * @param callback
     */
    async: function (callback) {
        return new Promise(function (resolve, reject) {
            if (typeof callback == "function") {
                callback();
            }
            resolve();
        });
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
if (!isnode()) {
    $(document).ready(function (e) {
        $(document).on("click", "[data-trigger]", function (e) {
            e.preventDefault();
            var t = $(this);
            switch (t.data("trigger")) {
                case "modal":
                    $(t.data("target")).modal("show");
                    break;
            }
        });
    });
}
if (typeof module == "undefined" && typeof jQuery != "undefined") {
    if (typeof console != "undefined")
        if (typeof console.log != "undefined") {
            console.olog = console.log;
        }
        else {
            console.olog = function () { };
        }
    console.log = function (message) {
        console.olog(message);
        if (!$("#debugConsole").length) {
            $("body").append('<div id="debugConsole" style="display:none"></div>');
        }
        if (typeof console_callback == "function") {
            console_callback(message);
        }
        else {
            $("#debugConsole").append("<p> <kbd>" + typeof message + "</kbd> " + message + "</p>");
        }
    };
}
/**
 * Datatables loader
 * @param callback
 */
function load_datatables(callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            LoadScript([
                "/assets/mdb-dashboard/js/addons/datatables.min.js",
                "/assets/mdb-dashboard/js/addons/datatables-select.min.js",
                "/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js",
                "/node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.min.js",
                "/node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
                "/node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
                "/node_modules/datatables.net-buttons/js/buttons.print.min.js",
            ], function () {
                loadCSS([
                    "/src/MVC/themes/assets/partial/datatables.min.css",
                    "/assets/mdb-dashboard/css/addons/datatables-select.min.css",
                    "/assets/mdb-dashboard/css/addons/datatables.min.css",
                    "https://cdn.datatables.net/responsive/2.2.5/css/responsive.dataTables.min.css",
                    "https://cdn.datatables.net/rowreorder/1.2.7/css/rowReorder.dataTables.min.css",
                ], null);
                datatables_init().then(function () {
                    $(".dataTables_length").addClass("bs-select");
                    $("div.dt-toolbar").html("");
                    if (typeof callback == "function") {
                        callback();
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
var datatables_ignited = false;
/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
function datatables_init() {
    return async_this(function () {
        if (datatables_ignited) {
            return console.log("datatables already ignited");
        }
        if (typeof jQuery.fn.dataTable != "undefined") {
            jQuery.fn.dataTable.ext.errMode = "none";
            jQuery.fn.dataTable.ext.buttons.refresh = {
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
            datatables_ignited = true;
        }
    });
}
/**
 * Scroll up after click pagination dt
 * @param target
 */
function pagination_up(target) {
    if (!(target instanceof jQuery)) {
        return console.error(getFuncName() + " target element not instance of jQuery");
    }
    target.on("page.dt", function () {
        $("html, body").animate({
            scrollTop: jQuery(".dataTables_wrapper").offset().top,
        }, "slow");
        $("thead tr th:first-child").focus().blur();
    });
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
if (!isnode() && is_localhost()) {
    $.ajax({
        url: '/superuser/theme/clean?latest=s'
    });
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
function isJSON(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
if (isnode()) {
    module.exports = isJSON;
}
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(urls, callback) {
    var loaded = null;
    var load = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var script;
            return __generator(this, function (_a) {
                script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.onreadystatechange = function () {
                    loaded = true;
                };
                script.onload = function () {
                    loaded = true;
                };
                script.onerror = function () {
                    throw "error while loading " + url;
                };
                script.onabort = function () {
                    throw "error while loading " + url;
                };
                script.oncancel = function () {
                    throw "error while loading " + url;
                };
                document.body.appendChild(script);
                return [2 /*return*/];
            });
        });
    };
    var run = function () {
        if (loaded) {
            console.log(getFuncName() + ("(" + urls[0] + ") running"));
            if (typeof callback == "function") {
                callback();
            }
        }
    };
    if (typeof urls == "string") {
        load(urls).then(run);
    }
    else if (Array.isArray(urls)) {
        load(urls[0]).then(function () {
            urls.shift();
            if (urls.length) {
                LoadScript(urls, callback);
            }
            else {
                run();
            }
        });
    }
}
/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href, callback) {
    var load = function (href) {
        var link = document.createElement("link");
        link.media = "print";
        link.rel = "stylesheet";
        link.href = href;
        link.onload = function () {
            link.media = "all";
            if (typeof callback == "function") {
                callback(link, href);
            }
        };
        document.head.appendChild(link);
    };
    if (typeof href == "string") {
        load(href);
    }
    else if (Array.isArray(href)) {
        href.forEach(function (item) {
            load(item);
        });
    }
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
/// <reference path="./globals.d.ts"/>
if (!isnode()) {
    /*
   <div class="progress">
   <div class="progress-bar progress-bar-success progress-bar-striped"
   role="progressbar" aria-valuenow="40" aria-valuemin="0"
   aria-valuemax="100" style="width: 40%">
   <span class="sr-only">40% Complete (success)</span>
   </div>
   </div>
   */
    if (typeof jQuery === "undefined") {
        throw new Error("jQuery progress timer requires jQuery");
    }
    /*!
     * jQuery lightweight plugin boilerplate
     * Original author: @ajpiano
     * Further changes, comments: @addyosmani
     * Licensed under the MIT license
     */
    (function ($, window, document, undefined) {
        "use strict";
        // undefined is used here as the undefined global
        // variable in ECMAScript 3 and is mutable (i.e. it can
        // be changed by someone else). undefined isn't really
        // being passed in so we can ensure that its value is
        // truly undefined. In ES5, undefined can no longer be
        // modified.
        // window and document are passed through as local
        // variables rather than as globals, because this (slightly)
        // quickens the resolution process and can be more
        // efficiently minified (especially when both are
        // regularly referenced in your plugin).
        // Create the defaults once
        var pluginName = "progressTimer";
        // The actual plugin constructor
        var Plugin = /** @class */ (function () {
            function Plugin(element, options) {
                this.defaults = {
                    //total number of seconds
                    timeLimit: 60,
                    //seconds remaining triggering switch to warning color
                    warningThreshold: 5,
                    //invoked once the timer expires
                    onFinish: function () { },
                    //bootstrap progress bar style at the beginning of the timer
                    baseStyle: "",
                    //bootstrap progress bar style in the warning phase
                    warningStyle: "progress-bar-danger",
                    //bootstrap progress bar style at completion of timer
                    completeStyle: "progress-bar-success",
                    //show html on progress bar div area
                    showHtmlSpan: true,
                    //set the error text when error occurs
                    errorText: "ERROR!",
                    //set the success text when succes occurs
                    successText: "100%",
                };
                this._defaults = this.defaults;
                this._name = pluginName;
                this.element = element;
                this.$elem = $(element);
                this.options = $.extend({}, this.defaults, options);
                this._defaults = this.defaults;
                this._name = pluginName;
                this.metadata = this.$elem.data("plugin-options");
            }
            Plugin.prototype.init = function () {
                var t = this;
                $(t.element).empty();
                t.span = $("<span/>");
                t.barContainer = $("<div>").addClass("progress");
                t.bar = $("<div>")
                    .addClass("progress-bar active progress-bar-striped")
                    .addClass(t.options.baseStyle)
                    .attr("role", "progressbar")
                    .attr("aria-valuenow", "0")
                    .attr("aria-valuemin", "0")
                    .attr("aria-valuemax", t.options.timeLimit);
                t.span.appendTo(t.bar);
                if (!t.options.showHtmlSpan) {
                    t.span.addClass("sr-only");
                }
                t.bar.appendTo(t.barContainer);
                t.barContainer.appendTo(t.element);
                t.start = new Date();
                t.limit = t.options.timeLimit * 1000;
                t.warningThreshold = t.options.warningThreshold * 1000;
                t.interval = window.setInterval(function () {
                    t._run.call(t);
                }, 250);
                t.bar.data("progress-interval", t.interval);
                return true;
            };
            Plugin.prototype._run = function () {
                var t = this;
                var elapsed = new Date().valueOf() - t.start.valueOf(), width = (elapsed / t.limit) * 100;
                t.bar.attr("aria-valuenow", width);
                t.bar.width(width + "%");
                var percentage = new Number(width.toFixed(2));
                if (percentage >= 100) {
                    percentage = 100;
                }
                if (t.options.showHtmlSpan) {
                    t.span.html(percentage + "%");
                }
                if (elapsed >= t.warningThreshold) {
                    t.bar
                        .removeClass(this.options.baseStyle)
                        .removeClass(this.options.completeStyle)
                        .addClass(this.options.warningStyle);
                }
                if (elapsed >= t.limit) {
                    t.complete.call(t);
                }
                return true;
            };
            Plugin.prototype.removeInterval = function () {
                var t = this, bar = $(".progress-bar", t.element);
                if (typeof bar.data("progress-interval") !== "undefined") {
                    var interval = bar.data("progress-interval");
                    window.clearInterval(interval);
                }
                return bar;
            };
            Plugin.prototype.destroy = function () {
                this.$elem.removeData();
            };
            Plugin.prototype.complete = function () {
                var t = this, bar = t.removeInterval.call(t), args = arguments;
                if (args.length !== 0 && typeof args[0] === "object") {
                    t.options = $.extend({}, t.options, args[0]);
                }
                bar
                    .removeClass(t.options.baseStyle)
                    .removeClass(t.options.warningStyle)
                    .addClass(t.options.completeStyle);
                bar.width("100%");
                if (t.options.showHtmlSpan) {
                    $("span", bar).html(t.options.successText);
                }
                bar.attr("aria-valuenow", 100);
                setTimeout(function () {
                    t.options.onFinish.call(bar);
                }, 500);
                t.destroy.call(t);
            };
            Plugin.prototype.error = function () {
                var t = this, bar = t.removeInterval.call(t), args = arguments;
                if (args.length !== 0 && typeof args[0] === "object") {
                    t.options = $.extend({}, t.options, args[0]);
                }
                bar.removeClass(t.options.baseStyle).addClass(t.options.warningStyle);
                bar.width("100%");
                if (t.options.showHtmlSpan) {
                    $("span", bar).html(t.options.errorText);
                }
                bar.attr("aria-valuenow", 100);
                setTimeout(function () {
                    t.options.onFinish.call(bar);
                }, 500);
                t.destroy.call(t);
            };
            return Plugin;
        }());
        Plugin.prototype.constructor = Plugin;
        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function (options) {
            var args = arguments;
            if (options === undefined || typeof options === "object") {
                // Creates a new plugin instance
                return this.each(function () {
                    if (!$.data(this, "plugin_" + pluginName)) {
                        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                    }
                });
            }
            else if (typeof options === "string" &&
                options[0] !== "_" &&
                options !== "init") {
                // Call a public plugin method (not starting with an underscore) and different
                // from the "init" one
                if (Array.prototype.slice.call(args, 1).length === 0 &&
                    $.inArray(options, $.fn[pluginName].getters) !== -1) {
                    // If the user does not pass any arguments and the method allows to
                    // work as a getter then break the chainability so we can return a value
                    // instead the element reference.
                    var instance = $.data(this[0], "plugin_" + pluginName);
                    return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                else {
                    // Invoke the specified method on each selected element
                    return this.each(function () {
                        var instance = $.data(this, "plugin_" + pluginName);
                        if (instance instanceof Plugin &&
                            typeof instance[options] === "function") {
                            instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                        }
                    });
                }
            }
        };
        $.fn[pluginName].getters = ["complete", "error"];
    })(jQuery, window, document, undefined);
}
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
/// <reference path="./Object.d.ts"/>
/**
 * SMARTFORM
 * @todo save form user input
 */
if (!(typeof module !== "undefined" && module.exports)) {
    /**
     * Element Counter
     */
    var Count = -1;
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
                    if (!(Count in formField)) {
                        /**
                         * @todo ID generator 6 digit alphanumerics
                         */
                        var id = Math.random().toString(20).substr(2, 6);
                        $(this).attr("id", id);
                        formField[Count] = id;
                        localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
                    }
                    else {
                        $(this).attr("id", formField[Count]);
                    }
                }
                catch (error) {
                    console.error(error);
                    console.log(formField, typeof formField);
                }
                /**
                 * Increase index offset
                 */
                Count++;
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
            Count++;
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
    var parser = document.createElement("a"), searchObject, queries, split, i;
    // Let the browser do the work
    parser.href = this.toString();
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
};
/**
 * Load css
 */
String.prototype.CSS = function () {
    var e = document.createElement("link");
    e.rel = "stylesheet";
    e.href = this.toString();
    var n = document.getElementsByTagName("head")[0];
    window.addEventListener
        ? window.addEventListener("load", function () {
            n.parentNode.insertBefore(e, n);
        }, !1)
        : window.attachEvent
            ? window.attachEvent("onload", function () {
                n.parentNode.insertBefore(e, n);
            })
            : (window.onload = function () {
                n.parentNode.insertBefore(e, n);
            });
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, "");
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
if (!isnode()) {
    if (typeof jQuery != "undefined") {
        var target = $(location).attr("hash");
        var offset = $(this).attr("data-offset")
            ? Number($(this).attr("data-offset"))
            : 0;
        if ($(target).length) {
            $("body,html").animate({
                scrollTop: $(target).offset().top - offset,
            }, 700);
        }
    }
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
    if ($("#logout").length) {
        $(document).one("click", "#logout", function (e) {
            e.preventDefault();
            jQuery.post(location.href, {
                logout: true,
            }, function () {
                jQuery.get($(this).attr("href"));
                window.location.reload(1);
            });
        });
    }
    /** Query URL */
    function getLocationHash() {
        var hash = window.location.hash.substr(1);
        var result = hash.split("&").reduce(function (result, item) {
            var parts = item.split("=");
            result[parts[0]] = parts[1];
            return result;
        }, {});
        if (hash.length > 1) {
            console.log(result);
        }
    }
    /** datetime-local */
    if (typeof dimas == "object" &&
        typeof framework().datetimelocal != "undefined") {
        framework().datetimelocal(undefined);
    }
    /** Progress bar */
    var elm = $("[countdown]");
    if (elm.length) {
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
    $(document.body).on("click", 'a[id="newtab"],[newtab],[data-newtab]', function (e) {
        e.preventDefault();
        var t = $(this);
        if (t.attr("href")) {
            if (t.data("newtab")) {
                //data-newtab hide referrer
                window
                    .open("http://href.li/?" + $(this).data("newtab"), "newtab")
                    .focus();
            }
            else {
                openInNewTab(t.attr("href"), t.data("name") ? t.data("name") : "_blank");
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2ZyYW1ld29yay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTO0lBQ25GLFNBQVMsS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVHLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07UUFDckQsU0FBUyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUMzRixTQUFTLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBRSxDQUFDLENBQUM7UUFDOUYsU0FBUyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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LEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUN4RCxLQUFLLENBQUM7d0JBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsU0FBUztvQkFDakQsS0FBSyxDQUFDO3dCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsU0FBUztvQkFDakQ7d0JBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLFNBQVM7eUJBQUU7d0JBQzVHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxNQUFNO3lCQUFFO3dCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUss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QUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsQ0FBQztJQUNELFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELENBQUM7SUFDRCxTQUFTLEVB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NUIsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDZixDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2YsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNmLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDZixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNQLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUI7SUFDRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUNELENBQUM7QUFDRCxzQ0FBc0M7QUFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ1g7Ozs7Ozs7O0tBUUM7SUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7S0FDNUQ7SUFDRDs7Ozs7T0FLRztJQUNILENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTO1FBQ3JDLFlBQVksQ0FBQztRQUNi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LENBQUM7UUFDdEMsTUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUc7SUFDcEIsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsSUFBSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUc7SUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUc7SUFDckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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