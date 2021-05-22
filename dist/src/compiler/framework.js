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
var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        if (cipherParams.iv)
            j.iv = cipherParams.iv.toString();
        if (cipherParams.salt)
            j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(j.ct),
        });
        if (j.iv)
            cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
        if (j.s)
            cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
        return cipherParams;
    },
};
/**
 * AES encrypt
 * @url /src/shim/Cipher.php
 * @param {text} text
 * @param {text} key
 */
function aesEncrypt(text, key) {
    var enc = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
        format: CryptoJSAesJson,
    }).toString();
    return base64_encode(enc);
}
/**
 * AES decrypt
 * @url /src/shim/Cipher.php
 * @param {text} encrypted
 * @param {text} key
 */
function aesDecrypt(encrypted, key) {
    var dec = base64_decode(encrypted);
    return JSON.parse(CryptoJS.AES.decrypt(dec, key, {
        format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8));
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
        var conf = {
            url: scripts,
            options: {
                type: "text/javascript"
            },
            callback: function () {
                loadCSS("/node_modules/codemirror/lib/codemirror.css", function () {
                    var editor = CodeMirror.fromTextArea(element, {
                        lineNumbers: true,
                        mode: mode,
                        /*
                            smartIndent: true,
                            lineWrapping: true,
                            showCursorWhenSelecting: true,
                            matchHighlight: true,*/
                    });
                    loadCSS("/node_modules/codemirror/theme/" + theme + ".css", function () {
                        editor.setOption("theme", theme);
                    });
                });
            },
        };
        LoadScript(conf);
    });
}
/**
 * Cookie Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @see http://localhost/src/Cookie/helper.php
 */
var Cookies = /** @class */ (function () {
    function Cookies() {
    }
    Cookies.logging = function () {
        if (empty(this.logged)) {
            Cookies.set("cl", JSON.stringify(this.logged), "1d");
        }
    };
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
                try {
                    return this.decompress(cookie);
                }
                catch (e) {
                    if (!in_array(c_name, this.logged)) {
                        this.logged.push(c_name);
                        console.error("fail to decode cookie " + c_name);
                    }
                    return cookie;
                }
            }
        }
        return null;
    };
    /**
     * Check cookie exists
     * @param c_name cookie name
     */
    Cookies.has = function (c_name) {
        return this.get(c_name) != null;
    };
    /**
     * Create cookie expiring in days
     * @param name cookie name
     * @param value cookie value
     * @param expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
     * @param path
     * @param callback
     */
    Cookies.set = function (name, value, expire, expire_type, path, callback) {
        if (expire_type === void 0) {
            expire_type = null;
        }
        if (path === void 0) {
            path = "/";
        }
        if (callback === void 0) {
            callback = null;
        }
        var expires;
        var date = new Date();
        if (expire_type != null && typeof expire == "number") {
            //console.log("expire instance of number");
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
        else if (typeof expire == "string") {
            //console.log(`expire instance of string`);
            if (/d$|day/s.test(expire)) {
                date.setTime(date.getTime() + parseNumber(expire) * 24 * 60 * 60 * 1000);
            }
            else if (/m$|minute/s.test(expire)) {
                date.setTime(date.getTime() + parseNumber(expire) * 60 * 1000);
            }
            else if (/s$|second/s.test(expire)) {
                date.setTime(date.getTime() + parseNumber(expire) * 1000);
            }
            else {
                date.setTime(date.getTime() + parseNumber(expire) * 1000);
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
        /*value = JSON.stringify(value);
        value = base64_encode(JSON.stringify(value));*/
        value = this.compress(value);
        var formatted = name + "=" + value + expires + "; path=" + cookie_path;
        console.info("cookie formatted: " + formatted);
        document.cookie = formatted;
        if (typeof callback == "function") {
            // eslint-disable-next-line prefer-rest-params
            return callback(arguments);
        }
        return this.get(name);
    };
    /**
     * Delete Cookie
     * @param name cookie name
     */
    Cookies.del = function (name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    };
    /**
     * Get all cookies
     */
    Cookies.all = function () {
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            cookies[(pair[0] + "").trim()] = Cookies.get((pair[0] + "").trim());
            /*
            try {
              cookies[(pair[0] + "").trim()] = Cookies.get((pair[0] + "").trim());
            } catch (e) {
              cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
            }
            */
        }
        //console.log(cookies.length, cookies);
        return cookies;
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
        return aesDecrypt(str, md5(location.host));
    };
    /**
     * compress cookie
     * @param str
     */
    Cookies.compress = function (str) {
        return aesEncrypt(str, md5(location.host));
    };
    Cookies.logged = [];
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
/**
 * Detect is mobile
 */
function isMobile() {
    var target = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(target) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(target.substr(0, 4))) {
        if (!Cookies.has("deviceInfo")) {
            if (typeof toastr != "undefined") {
                toastr.info("is Mobile", "Your Device");
            }
            else {
                console.log("isMobile");
            }
            Cookies.set("deviceInfo", "x", 1, "d", null, null);
        }
        return true;
    }
    else {
        if (!Cookies.has("deviceInfo")) {
            if (typeof toastr != "undefined") {
                toastr.info("is Desktop", "Your Device");
            }
            else {
                console.log("isDesktop");
            }
            Cookies.set("deviceInfo", "x", 1, "d", null, null);
        }
        return false;
    }
}
function get_device() {
    var unknown, width, height, screenSize, browser, version, majorVersion, mobile, os, osVersion, cookieEnabled, flashVersion = "-";
    if (!isnode()) {
        // screen
        if (screen.width) {
            width = screen.width ? screen.width : "";
            height = screen.height ? screen.height.toString() : "";
            screenSize += "" + width + " x " + height;
        }
        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        browser = navigator.appName;
        version = "" + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        // Opera
        if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browser = "Opera";
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf("OPR")) != -1) {
            browser = "Opera";
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
            browser = "Microsoft Edge";
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browser = "Microsoft Internet Explorer";
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browser = "Chrome";
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browser = "Safari";
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browser = "Firefox";
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf("Trident/") != -1) {
            browser = "Microsoft Internet Explorer";
            version = nAgt.substring(nAgt.indexOf("rv:") + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) <
            (verOffset = nAgt.lastIndexOf("/"))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(";")) != -1)
            version = version.substring(0, ix);
        if ((ix = version.indexOf(" ")) != -1)
            version = version.substring(0, ix);
        if ((ix = version.indexOf(")")) != -1)
            version = version.substring(0, ix);
        majorVersion = parseInt("" + version, 10);
        if (isNaN(majorVersion)) {
            version = "" + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        // mobile version
        mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
        // cookie
        cookieEnabled = navigator.cookieEnabled ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled =
                document.cookie.indexOf("testcookie") != -1 ? true : false;
        }
        // system
        var os = unknown;
        var clientStrings = [
            { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
            { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
            { s: "Windows Vista", r: /Windows NT 6.0/ },
            { s: "Windows Server 2003", r: /Windows NT 5.2/ },
            { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
            { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
            { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
            { s: "Windows 98", r: /(Windows 98|Win98)/ },
            { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
            {
                s: "Windows NT 4.0",
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
            },
            { s: "Windows CE", r: /Windows CE/ },
            { s: "Windows 3.11", r: /Win16/ },
            { s: "Android", r: /Android/ },
            { s: "Open BSD", r: /OpenBSD/ },
            { s: "Sun OS", r: /SunOS/ },
            { s: "Chrome OS", r: /CrOS/ },
            { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
            { s: "iOS", r: /(iPhone|iPad|iPod)/ },
            { s: "Mac OS X", r: /Mac OS X/ },
            { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: "QNX", r: /QNX/ },
            { s: "UNIX", r: /UNIX/ },
            { s: "BeOS", r: /BeOS/ },
            { s: "OS/2", r: /OS\/2/ },
            {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
            },
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }
        osVersion = unknown;
        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = "Windows";
        }
        switch (os) {
            case "Mac OS X":
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;
            case "Android":
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;
            case "iOS":
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                var calc = osVersion.exists(3) ? osVersion[3] : osVersion[0];
                osVersion = osVersion[1] + "." + osVersion[2] + "." + calc; //(osVersion[3] | 0);
                break;
        }
        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = "no check";
        if (typeof swfobject != "undefined") {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + "." + fv.minor + " r" + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }
    else {
        var terminal = require("os");
        os = terminal.platform();
        version = terminal.version();
    }
    return {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion,
    };
}
if (typeof module != "undefined") {
    module.exports.get_device = get_device;
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
if (typeof window != "undefined") {
    (function () {
        // I test for features at the beginning of the declaration instead of everytime that we have to add an event.
        if (document.addEventListener) {
            window.addEvent = function (elem, type, handler, useCapture) {
                elem.addEventListener(type, handler, !!useCapture);
                return handler; // for removal purposes
            };
            window.removeEvent = function (elem, type, handler, useCapture) {
                elem.removeEventListener(type, handler, !!useCapture);
                return true;
            };
        }
        else if (document.attachEvent) {
            window.addEvent = function (elem, type, handler) {
                type = "on" + type;
                // Bounded the element as the context
                // Because the attachEvent uses the window object to add the event and we don't want to polute it.
                var boundedHandler = function () {
                    return handler.apply(elem, arguments);
                };
                elem.attachEvent(type, boundedHandler);
                return boundedHandler; // for removal purposes
            };
            window.removeEvent = function (elem, type, handler) {
                type = "on" + type;
                elem.detachEvent(type, handler);
                return true;
            };
        }
        else {
            // FALLBACK ( I did some test for both your code and mine, the tests are at the bottom. )
            // I removed wrapping from your implementation and added closures and memoization.
            // Browser don't support W3C or MSFT model, go on with traditional
            window.addEvent = function (elem, type, handler) {
                type = "on" + type;
                // Applying some memoization to save multiple handlers
                elem.memoize = elem.memoize || {};
                // Just in case we haven't memoize the event type yet.
                // This code will be runned just one time.
                if (!elem.memoize[type]) {
                    elem.memoize[type] = { counter: 1 };
                    elem[type] = function () {
                        for (var key in nameSpace) {
                            if (nameSpace.hasOwnProperty(key)) {
                                if (typeof nameSpace[key] == "function") {
                                    nameSpace[key].apply(this, arguments);
                                }
                            }
                        }
                    };
                }
                /**
                 * Thanks to hoisting we can point to nameSpace variable above.
                 * Thanks to closures we are going to be able to access its value when the event is triggered.
                 * I used closures for the nameSpace because it improved 44% in performance in my laptop.
                 */
                var nameSpace = elem.memoize[type], id = nameSpace.counter++;
                nameSpace[id] = handler;
                // I return the id for us to be able to remove a specific function binded to the event.
                return id;
            };
            window.removeEvent = function (elem, type, handlerID) {
                type = "on" + type;
                // I remove the handler with the id
                if (elem.memoize && elem.memoize[type] && elem.memoize[type][handlerID])
                    elem.memoize[type][handlerID] = undefined;
                return true;
            };
        }
    })();
}
var STORAGE = /** @class */ (function () {
    function STORAGE() {
    }
    /**
     * Reflection class constructor
     * @see https://stackoverflow.com/questions/43431550/async-await-class-constructor
     * @param callback
     * @example
     * var myObj = new myClass();
     * myObj.init(function() {
     *    // inside here you can use myObj
     * });
     */
    STORAGE.prototype.init = function (callback) {
        // do something async and call the callback:
        callback.bind(this)();
    };
    /**
     * get localstorage by key
     * @param key
     */
    STORAGE.prototype.get = function (key) {
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
    };
    /**
     * Set localstorage key value
     * @param key
     * @param value
     */
    STORAGE.prototype.set = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    };
    /**
     * Check localstorage key exists
     * @param key
     */
    STORAGE.prototype.has = function (key) {
        return !!localStorage[key] && !!localStorage[key].length;
    };
    /**
     * Extend or set localstorage key
     * @param key
     * @param value
     */
    STORAGE.prototype.extend = function (key, value) {
        if (this.has(key)) {
            var _value = this.get(key);
            jQuery.extend(_value, JSON.parse(JSON.stringify(value)));
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    };
    /**
     * Remove localstorage key
     * @param key
     */
    STORAGE.prototype.remove = function (key) {
        localStorage.removeItem(key);
    };
    return STORAGE;
}());
/**
 * localStorage helper
 */
function storage() {
    return new STORAGE();
}
/// <reference path="globals.d.ts" />
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
String.prototype.truncate = function (n, useWordBoundary) {
    if (this.length <= n) {
        return this;
    }
    var subString = this.substr(0, n - 1); // the original check
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "&hellip;";
};
String.prototype.isEmpty = function () {
    if (this != null || typeof this != "undefined") {
        return this.length === 0 || !this.trim();
    }
    return false;
};
/// <reference path="globals.d.ts" />
/// <reference path="Object.d.ts" />
/// <reference path="../src/smartform/src/js/Object.d.ts"/>
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
        if (typeof callback == "function") {
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
Object.each = function (callback) {
    for (var key in this) {
        //callback.call(scope, key, this[key]);
        callback.call(this[key]);
    }
};
Object.isEmpty = function () {
    return this.length === 0;
};
/**
 * Join object to separated string
 * @param obj Object
 * @returns Joined string
 */
function object_join(obj) {
    return Object.keys(obj)
        .map(function (k) {
        return obj[k];
    })
        .join(",");
}
/**
 * Extend Object
 * @param arg1
 * @param arg2
 * @returns
 */
function extend_object(arg1, arg2) {
    var result = {};
    for (var prop in arg1) {
        if (arg1.hasOwnProperty(prop)) {
            // error when using --strictNullChecks
            result[prop] = arg1[prop];
        }
    }
    for (var prop in arg2) {
        if (arg2.hasOwnProperty(prop)) {
            // error when using --strictNullChecks
            result[prop] = arg2[prop];
        }
    }
    return result;
}
/* eslint-disable */
/// <reference path="./_Prototype-String.ts"/>
/// <reference path="./_Prototype-Object.ts"/>
// noinspection JSAnnotator
var cookie_ip = "ip".rot13();
var cookie_indicator = "status_ip".rot13();
/**
 * IP Address class
 * @class get, check, validate ip address
 */
var ip = /** @class */ (function () {
    function ip() {
    }
    /**
     * Reflection class constructor
     * @see https://stackoverflow.com/questions/43431550/async-await-class-constructor
     * @param callback
     * @example
     * var myObj = new myClass();
     * myObj.init(function() {
     *    // inside here you can use myObj
     * });
     */
    ip.prototype.init = function (callback) {
        // do something async and call the callback:
        callback.bind(this)();
    };
    /**
     * Check if the ip has been applied
     * @private
     */
    ip.status = function () {
        //if (value != null) if (!value.isEmpty()) ip.save(value);
        return Cookies.has(cookie_indicator);
    };
    /**
     * Checks ip
     * @returns promises
     */
    ip.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.status())
                            return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cloudflare()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!this.status())
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, this.l2io()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
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
        if (callback === void 0) {
            callback = null;
        }
        this.check().then(function () { });
        //console.log(this.status(null));
        var ips = this.storage.get(cookie_ip);
        //ips = Cookies.get(cookie_ip);
        if (typeof callback == "function") {
            return callback(ips);
        }
        return ips;
    };
    /**
     * Retrieve ip from ipapi.co
     */
    ip.ipapi = function () {
        return $.ajax({
            proxy: false,
            url: "//ipapi.co/json/",
            success: function (res) {
                if (typeof res == "object") {
                    this.storage.set("ip_info", res);
                    if (res.hasOwnProperty("ip")) {
                        ip.save(res.ip);
                    }
                }
            },
        });
    };
    /**
     * Retrieve api from l2.io
     */
    ip.l2io = function () {
        return $.ajax({
            proxy: false,
            url: "//l2.io/ip.json",
            success: function (res) {
                if (typeof res == "object") {
                    this.storage.set("ip_info", res);
                    if (res.hasOwnProperty("ip")) {
                        ip.save(res.ip);
                    }
                }
            },
        });
    };
    /**
     * Retrieve ip from cloudflare.com
     */
    ip.cloudflare = function () {
        return $.ajax({
            proxy: false,
            url: "//www.cloudflare.com/cdn-cgi/trace",
            success: function (str) {
                var regex = /ip\=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                var m = regex.exec(str);
                if (m != null) {
                    if (m.length > 0) {
                        ip.save(m[1]);
                    }
                }
            },
        });
    };
    /**
     * Save ip to cookie and localstorage
     * @param ip
     * @private
     */
    ip.save = function (ip) {
        Cookies.set(cookie_ip, ip, "1h", null, location.pathname);
        Cookies.set(cookie_indicator, String(ip), 5, "m", location.pathname, null);
        if (typeof localStorage != "undefined") {
            this.storage.set(cookie_ip, ip);
        }
    };
    ip.storage = new STORAGE();
    return ip;
}());
/**
 * Get unique id of machine
 */
function get_unique_id() {
    if (typeof localStorage != "undefined") {
        if (localStorage.getItem("ip") != null) {
            return localStorage.getItem("ip");
        }
    }
    if (typeof Cookies != "undefined") {
        if (Cookies.has("ip")) {
            return Cookies.get("ip");
        }
    }
    if (isnode()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var mac = JSON.stringify(require("os").networkInterfaces(), null, 2)
            .match(/"mac": ".*?"/g)
            .toString()
            .match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/g);
        if (mac.length > 0) {
            return mac[1];
        }
    }
    if (typeof location != "undefined") {
        if (location.hostname) {
            return location.hostname;
        }
    }
}
/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 */
function getParameterByName(name, url) {
    if (typeof URLSearchParams !== "undefined") {
        if (!window.location.search) {
            url = window.location.href;
        }
        var urlParams = new URLSearchParams(url);
        return urlParams.get(name);
    }
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/**
 * Autofill datetime-local value
 */
function datetimelocal(v) {
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
}
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
function array_filter(array) {
    return array.filter(function (el) {
        return el != null;
    });
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
    var tmpArray = [];
    for (x in arrayName) {
        if (x != key) {
            tmpArray[x] = arrayName[x];
        }
    }
    return tmpArray;
}
/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
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
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        array_shuffle: array_shuffle,
        array_keys: array_keys,
        in_array: in_array,
    };
}
/// <reference path="./globals.d.ts" />
Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0)
        return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};
Array.prototype.last = function (n) {
    if (!n) {
        if (this.length === 0)
            return undefined;
        return this[this.length - 1];
    }
    else {
        var start = this.length - n;
        if (start < 0)
            start = 0;
        return this.slice(start, this.length);
    }
};
Array.prototype.isEmpty = function () {
    return this.length === 0;
};
Array.prototype.range = function (start, end) {
    if (end < start) {
        return [];
    }
    return this.slice(start, end + 1);
};
Array.prototype.add = function (element) {
    this.push(element);
    return this;
};
Array.prototype.addAll = function (others) {
    others.foreach(function (e) {
        this.push(e);
    });
    return this;
};
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
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
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
Array.prototype.first = function (n) {
    if (!n) {
        if (this.length === 0)
            return undefined;
        return this[0];
    }
    else {
        if (this.length === 0)
            return [];
        return this.slice(0, n);
    }
};
Array.prototype.compact = function () {
    //var changes = false;
    for (var i = 0; i < this.length; i++) {
        // If element is non-existent, undefined or null, remove it.
        if (!this[i]) {
            this.splice(i, 1);
            i = i - 1;
            //changes = true;
        }
    }
    //if (!changes) return undefined;
    return this;
};
Array.prototype.deleteAt = function (index) {
    if (index < 0)
        index = this.length + index;
    // If element is non-existent, return undefined:
    if (!this.hasOwnProperty(index))
        return undefined;
    var elem = this[index];
    this.splice(index, 1);
    return elem;
};
Array.prototype.unset = function (value) {
    if (this.indexOf(value) != -1) {
        // Make sure the value exists
        this.splice(this.indexOf(value), 1);
    }
};
Array.prototype.exists = function (n) {
    return typeof this[n] !== "undefined";
};
if (!Array.prototype.hasOwnProperty("every")) {
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
/// <reference path="Date.d.ts" />
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
/**
 * Odd or Even (Ganjil Genap);
 * @param n
 * @param type odd or even
 */
function oddoreven(n, type) {
    if (!type) {
        type = "odd";
    }
    var time = !n ? new Date().getDay() : Number(n);
    if (!/^-?\d+jQuery/.test(time.toString())) {
        alert("arguments is not number, please remove quote");
        return null;
    }
    var hasil = time % 2;
    var rType = /^(odd|ganjil)$/.test(type) ? "1" : "0";
    //return hasil == (type == ('odd' || 'ganjil') ? 1 : 0);
    return hasil.toString() == rType.toString();
}
/**
 * strpad / startwith zero [0]
 * @param {number} val
 */
function strpad(val) {
    if (val >= 10) {
        return val;
    }
    else {
        return "0" + val;
    }
}
var siteConfig = { "google": { "key": "AIzaSyDgRnuOT2hP-KUOeQhGoLfOOPHCNYhznFI", "recaptcha": { "key": "6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF" }, "analystics": { "id": "UA-106238155-1" } } };
var isNode = typeof process === "object" && typeof window === "undefined";
var root;
(function () {
    if (typeof global == "undefined" || (global && !global)) {
        global = this;
    }
    // Establish the root object, `window` in the browser, or `global` on the server.
    root = this;
    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `_` to the
    // global object.
    if (typeof module !== "undefined" && module.exports) {
        isNode = true;
    }
})();
/**
 * Is Node ?
 */
function isnode() {
    return isNode;
}
/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
function getNativeClass(obj) {
    if (typeof obj === "undefined")
        return "undefined";
    if (obj === null)
        return "null";
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
}
/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
function getAnyClass(obj) {
    if (typeof obj === "undefined")
        return "undefined";
    if (obj === null)
        return "null";
    return obj.constructor.name;
}
if (isnode()) {
    module.exports.isnode = isnode;
}
else {
    global.isnode = isnode;
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
        window[func](args);
    }
    else if (context && context instanceof Window) {
        if (typeof context[func] != "undefined") {
            context[func](args);
        }
    }
    else {
        try {
            eval(functionName);
        }
        catch (error) {
            console.error(error);
            console.error(functionName + " is not function");
        }
    }
}
if (isnode()) {
    module.exports.___call = ___call;
}
else {
    global.___call = ___call;
}
/**
 * call_user_func
 * @param functionName
 * @param context
 * @param args
 */
function call_user_func(functionName, context, args) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}
if (isnode()) {
    module.exports.call_user_func = call_user_func;
}
else {
    global.call_user_func = call_user_func;
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
if (isnode()) {
    module.exports.async_this = async_this;
}
else {
    global.async_this = async_this;
}
/**
 * call_user_func
 * @param func function name
 */
function __call(func) {
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}
if (isnode()) {
    module.exports.__call = __call;
}
else {
    global.__call = __call;
}
/**
 * check empty
 * @param str
 */
function empty(str) {
    var type = typeof str;
    if (typeof str == "boolean" || typeof str == "undefined" || str == null) {
        return true;
    }
    else if (typeof str == "object") {
        return str.length != 0;
    }
    else if (type == "string" || type == "number") {
        return str.toString().trim().length != 0;
    }
    else if (Array.isArray(str)) {
        return str.length;
    }
}
if (isnode()) {
    module.exports.empty = empty;
}
else {
    global.empty = empty;
}
/**
 * Get current function name
 */
function getFuncName() {
    return getFuncName.caller.name;
}
if (isnode()) {
    module.exports.getFuncName = getFuncName;
}
else {
    global.getFuncName = getFuncName;
}
/**
 * Is Development Mode
 */
function is_development() {
    return document.getElementsByTagName("html")[0].getAttribute("environtment") == "development";
}
if (isnode()) {
    module.exports.is_development = is_development;
}
else {
    global.is_development = is_development;
}
/**
 * Generate random string with length
 * @param length length to generate
 * @global
 * @see https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a
 */
var generateRandomString = function (length) {
    if (length === void 0) {
        length = 6;
    }
    return Math.random().toString(20).substr(2, length);
};
if (isnode()) {
    module.exports.generateRandomString = generateRandomString;
}
/**
 * Create uniqueid with prefix or suffix
 * @param prefix
 * @param suffix
 */
function uniqid(prefix, suffix) {
    return ((prefix ? prefix : "") + generateRandomString() + (suffix ? suffix : "")).toString();
}
if (isnode()) {
    module.exports.uniqid = uniqid;
}
else {
    global.uniqid = uniqid;
}
if (typeof now == "undefined") {
    function now() {
        return Date.now();
    }
    if (isnode()) {
        module.exports.now = now;
    }
    else {
        global.now = now;
    }
}
/**
 * Get unique array
 * @param {any} value
 * @param {any} index
 * @param {any[]} self
 * @example dataArray.filter(onlyUnique)
 */
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
/**
 * Parse string to float/number
 * @param total_amount_string string including numbers
 */
function parseNumber(total_amount_string) {
    var total_amount_int = "";
    if (typeof total_amount_string != "undefined" || total_amount_string != null) {
        total_amount_int = parseFloat(total_amount_string.replace(/,/g, ".")).toFixed(2);
    }
    return parseFloat(total_amount_int);
}
function typedKeys(o) {
    // type cast should be safe because that's what really Object.keys() does
    return Object.keys(o);
}
/// <reference path="./aacaller.ts" />
/**
 * @file Console Controller
 */
if (typeof console != "undefined") {
    if (typeof console.log != "undefined") {
        console.olog = console.log;
    }
    else {
        console.olog = function () { };
    }
}
if (typeof module == "undefined") {
    console.log = function () {
        var log = console.olog;
        var stack = new Error().stack;
        /**
         * Get Caller Location
         */
        var file = stack.split("\n")[2].split("/")[4].split("?")[0];
        /**
         * Get Caller Line
         */
        var line; //= stack.split("\n")[2].split(":")[5];
        var getline = stack.split("\n")[2].split(":");
        if (getline.exists(5)) {
            line = parseNumber(getline[5]);
            //log("number found in index 5", getline[5]);
        }
        else if (getline.exists(4)) {
            line = parseNumber(getline[4]);
            //log("number found in index 4", getline[4]);
        }
        else if (getline.exists(3)) {
            line = parseNumber(getline[3]);
            //log("number found in index 3", getline[3]);
        }
        /**
         * Get Caller Function Name
         */
        var caller;
        var caller_str = stack.split("\n")[2];
        var regex = /at\s(.*)\s\(/gm;
        caller = regex.exec(caller_str);
        if (caller != null && caller.length) {
            caller = caller[1];
        }
        /**
         * Create Prefix Log
         */
        var append = "";
        if (typeof file != "undefined") {
            append += file + "/";
        }
        if (caller != null && typeof caller != "undefined") {
            append += caller + "/";
        }
        if (typeof line != "undefined") {
            append += line + ":";
        }
        var input = [];
        if (arguments.length == 1) {
            input = arguments[0];
        }
        else {
            for (var index_1 = 0; index_1 < arguments.length; index_1++) {
                var arg = arguments[index_1];
                input.push(arg);
            }
        }
        var args;
        if (Array.hasOwnProperty("from")) {
            args = Array.from(arguments); // ES5
        }
        else {
            args = Array.prototype.slice.call(arguments);
        }
        args.unshift(append);
        log.apply(console, args);
        if (typeof jQuery != "undefined") {
            if (!$("#debugConsole").length) {
                $("body").append('<div id="debugConsole" style="display:none"></div>');
            }
            if (typeof console_callback == "function") {
                console_callback(input);
            }
            else {
                $("#debugConsole").append("<p> <kbd>" + typeof input + "</kbd> " + input + "</p>");
            }
        }
    };
}
else {
    /**
     * Consoler
     */
    [
        ["warn", "\x1b[35m"],
        ["error", "\x1b[31m"],
        ["log", "\x1b[2m"],
    ].forEach(function (pair) {
        var method = pair[0], reset = "\x1b[0m", color = "\x1b[36m" + pair[1];
        console[method] = console[method].bind(console, color, method.toUpperCase() + " [" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "]", reset);
    });
    console.error = (function () {
        var error = console.error;
        return function (exception) {
            if (typeof exception.stack !== "undefined") {
                error.call(console, exception.stack);
            }
            else {
                error.apply(console, arguments);
            }
        };
    })();
}
/**
 * Get stacktrace
 */
function stacktrace() {
    function st2(f) {
        return !f
            ? []
            : st2(f.caller).concat([f.toString().split("(")[0].substring(9) + "(" + f.arguments.join(",") + ")"]);
    }
    return st2(arguments.callee.caller);
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
 * check string is json
 * @param {string} str
 * @description check validate json
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
         * Ajax Proxying begin
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
            console.log(options);
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
}
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
        var targetURL = t.attr("action") || location.href; //fallback to current url
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
/**
 * default ajax jquery request with unique ID
 * @param settings Jquery ajax settings
 */
function jAjax(settings) {
    var defaultSet = {
        headers: {
            "Request-Date": new Date().getTime(),
            "Request-Id": Math.floor(Math.random() * 99999999 + 1),
        },
        xhrFields: {
            withCredentials: true,
        },
    };
    Object.keys(defaultSet).forEach(function (key) {
        settings[key] = defaultSet[key];
    });
    return $.ajax(settings);
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
        createStyle("#pageMessages {\n      position: fixed;\n      bottom: 15px;\n      right: 15px;\n      width: 30%;\n    }\n\n    #pageMessages .alert {\n      position: relative;\n    }\n\n    #pageMessages .alert .close {\n      position: absolute;\n      top: 5px;\n      right: 5px;\n      font-size: 1em;\n    }\n\n    #pageMessages .alert .fa {\n      margin-right:.3em;\n    }", { id: "alertcss" });
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
        class: iconMap[severity], // you need to quote "class" since it's a reserved keyword
    });
    var msg = $("<div />", {
        class: alertClasses.join(" "), // you need to quote "class" since it's a reserved keyword
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
/// <reference path="./globals.d.ts" />
if (!(typeof module !== "undefined" && module.exports)) {
    var gtagID = siteConfig.google.recaptcha.key;
    var create_gtagscript = document.createElement("script");
    create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
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
                cookie_expires: 28 * 24 * 60 * 60, // 28 days, in seconds
            });
            var trackLinks = document.getElementsByTagName("a");
            var _loop_1 = function () {
                var singleLink = trackLinks[i];
                singleLink.onclick = function () {
                    if (!/^\#/gm.test(singleLink.href) && !empty(singleLink.href)) {
                        gtag("event", "click", {
                            event_category: "outbound",
                            event_label: singleLink.href,
                            transport_type: "beacon",
                        });
                    }
                };
            };
            for (var i = 0, len = trackLinks.length; i < len; i++) {
                _loop_1();
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
/// <reference path="_Prototype-String.ts" />
var ORIGIN;
if (isnode()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var process_1 = require("process");
    ORIGIN = process_1.cwd();
}
else {
    ORIGIN = location.protocol + "//" + location.host + location.pathname;
}
var IP;
var dimas = /** @class */ (function () {
    function dimas() {
    }
    dimas.setIp = function (ip) {
        this.ip = ip;
        IP = ip;
    };
    dimas.getIp = function () {
        return this.ip;
    };
    /**
     * Count Array/Object/String length
     * @param {any[]|string|object} data
     */
    dimas.prototype.count = function (data) {
        if (Array.isArray(data) || typeof data == "string") {
            return data.length;
        }
        else if (typeof data == "object") {
            return Object.keys(data).length;
        }
        else if (typeof data == "number") {
            return data;
        }
    };
    /**
     * Make async function
     * @param callback
     */
    dimas.prototype.async = function (callback) {
        return new Promise(function (resolve, reject) {
            if (typeof callback == "function") {
                callback();
            }
            resolve(true);
        });
    };
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    dimas.prototype.isNumber = function (v) {
        return !isNaN(parseInt(v.toString()) - parseFloat(v.toString())) && /^\d+$/.test(v.toString());
    };
    /**
     * Check if valid url
     * @param url url address
     */
    dimas.prototype.isURL = function (url) {
        if (url.startsWith("/")) {
            console.log("url type is local");
            return true;
        }
        var result;
        try {
            result = new URL(url);
        }
        catch (_) {
            return false;
        }
        return result.protocol === "http:" || result.protocol === "https:";
    };
    /**
     * Check url is valid and reachable
     * @param url url address
     * @param callback callback function
     */
    dimas.prototype.isURLReachable = function (url, callback) {
        if (this.isURL(url)) {
            var myRequest = new Request(url);
            fetch(myRequest).then(function (response) {
                console.log(response.status + " - " + url);
                if (response.status == 200) {
                    callback(true, url);
                }
            });
        }
    };
    /**
     * Get Query name from current url
     */
    dimas.prototype.getquery = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    };
    dimas.prototype.recode = function (content, passcode) {
        var i;
        var result = [];
        var str = "";
        var codesArr = JSON.parse(content);
        var passLen = passcode.length;
        for (i = 0; i < codesArr.length; i++) {
            var passOffset = i % passLen;
            var calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
            result.push(calAscii);
        }
        for (i = 0; i < result.length; i++) {
            var ch = String.fromCharCode(result[i]);
            str += ch;
        }
        return str;
    };
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    dimas.prototype.pctdRUN = function (elm) {
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
                type: "percent", // or 'seconds' => 23/60
            },
            autoStart: true,
        });
        return countdown;
    };
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
    dimas.prototype.pctd = function (elm) {
        if (typeof progressBarTimer == "undefined") {
            LoadScript({
                url: "https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js",
                callback: function () {
                    this.pctdRUN(elm);
                },
            });
        }
        else {
            window.onload = function (params) {
                this.pctdRUN(elm);
            };
        }
    };
    /**
     * Parseurl just like as parse_url at php
     */
    dimas.prototype.parseurl = function (url) {
        return url.parse_url();
    };
    /**
     * get current url without querystrings
     */
    dimas.url = ORIGIN;
    dimas.ip = null;
    /**
     * framework captcha
     */
    dimas.captcha = {
        /**
         * DO NOT ASSIGN THIS
         */
        check: null,
        /**
         * Get current captcha id
         */
        id: function (header_name) {
            if (!this.captcha.check) {
                this.captcha.get(header_name);
            }
            return storage().get("captcha");
        },
        /**
         * Get current captcha from backend
         * And process it by jsonpCallback
         */
        get: function (header_name) {
            var _a;
            var _this = this;
            if (!this.captcha.check) {
                this.captcha.check = setTimeout(function () {
                    _this.captcha.get(header_name);
                }, 60000);
            }
            var ua = md5(navigator.userAgent).rot13();
            $.ajax({
                url: this.url + "?login=" + guid(),
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        callback: function (arg) { },
        /**
         * Captcha JSONP callback
         */
        jspCallback: function (res) {
            if (res.hasOwnProperty("captcha")) {
                storage().set("captcha", res.captcha.rot13());
                this.captcha.callback(storage().get("captcha"));
                this.captcha.listen();
            }
        },
        listener_started: null,
        /**
         * Form Captcha listener
         */
        listen: function () {
            if (this.captcha.listener_started) {
                return null;
            }
            this.captcha.listener_started = new Date().toISOString();
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
                    this.captcha.callback = function () {
                        button.prop("disabled", false);
                    };
                    this.captcha.get(null);
                    form.off("submit");
                });
                //captcha.parents('form').find('[type="submit"]').one('click', function());
            });
        },
    };
    return dimas;
}());
/**
 * Framework object initializer
 */
function framework() {
    return new dimas();
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
        var parsed = framework().parseurl(lastsrc);
        args.forEach(function (src) {
            LoadScript({
                url: "" + app.base + src + parsed.search,
                callback: function () {
                    console.log(src + " engine inbound");
                },
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
        var parsed = framework().parseurl(lastsrc);
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
                LoadScript({
                    url: "" + app.base + src + parsed.search,
                    callback: function () {
                        console.log(src + " engine inbound");
                    },
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
 *
 *  Base64 encode / decode
 *  @see http://www.webtoolkit.info/
 *
 **/
var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output =
                output +
                    this._keyStr.charAt(enc1) +
                    this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) +
                    this._keyStr.charAt(enc4);
        }
        return output;
    },
    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if (c > 127 && c < 2048) {
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
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = (c1 = c2 = 0);
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
};
/**
 * base64 encoding
 * @param {string} str string raw
 */
function base64_encode(str) {
    // PROCESS
    //const encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
    //const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    var encoded = Base64.encode(str);
    return encoded;
}
/**
 * Check if base64 is valid
 * @param {string} str
 */
function base64_valid(str) {
    if (str == "" || str.trim() == "") {
        return false;
    }
    try {
        return btoa(atob(str)) == str;
    }
    catch (err) {
        return false;
    }
}
/**
 * base64 decoding
 * @param {string} str base64 string
 */
function base64_decode(str) {
    // PROCESS
    //const encodedWord = CryptoJS.enc.Base64.parse(str); // encodedWord via Base64.parse()
    //const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    var decoded = Base64.decode(str);
    return decoded;
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map
        .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(""));
}
//import * as bootstrap from "bootstrap";
//import $ from "jquery";
if (!isnode()) {
    $(document).ready(function (e) {
        // element with onload
        $("[onload]").each(function (i, el) {
            eval(el.getAttribute("onload"));
        });
        // button ajax
        $(document).on("click", 'button[id="ajax"][src]', function (e) {
            e.preventDefault();
            $.ajax({
                url: $(this).attr("src"),
                method: "POST",
                success: function (res) {
                    console.log(res);
                },
            });
        });
        // apply on element has attribute data-trigger
        $(document).on("click", "[data-trigger]", function (e) {
            e.preventDefault();
            var t = $(this);
            switch (t.data("trigger")) {
                case "modal":
                    var target = $(t.data("target"));
                    console.log("open modal " + t.data("target"));
                    if (target.length) {
                        target.modal("show");
                    }
                    break;
            }
        });
        //href hyperlink button
        $(document).on("click", "button[href].btn-link", function (e) {
            e.preventDefault();
            location.href = $(this).attr("href");
        });
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
        $(document).on("click", "[data-dismiss]", function (e) {
            var dataDismiss = $(this).data("dismiss");
            var dataCallback = $(this).data("callback");
            if (dataDismiss == "badge") {
                e.preventDefault();
                var parent1 = $(this).parents(".badge");
                if (parent1.length) {
                    parent1.remove();
                    if (dataCallback) {
                        ___call(dataCallback);
                    }
                }
            }
        });
        var randbg = $(".rand-bg-color");
        if (randbg.length) {
            randbg.each(function () {
                $(this).css({
                    background: "#" + randomHex(),
                    color: "#ffffff",
                });
            });
        }
    });
}
function randomHex() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
/**
 * open in new tab
 * @param url
 * @param name
 */
function openInNewTab(url, name) {
    if (typeof url != "undefined" && typeof name != "undefined") {
        var win = window.open(url, name);
        win.focus();
    }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Disabling button
 * @param t element of button
 */
function disable_button(t) {
    var el;
    if (t instanceof jQuery) {
        el = t.get();
    }
    else if (t instanceof HTMLButtonElement) {
        el = t;
    }
    if (typeof el != "undefined") {
        el.setAttribute("disabled", "true");
    }
}
/**
 * Enabling button
 * @param t element of button
 */
function enable_button(t) {
    var el;
    if (t instanceof jQuery) {
        el = t.get();
    }
    else if (t instanceof HTMLButtonElement) {
        el = t;
    }
    if (typeof el != "undefined") {
        el.removeAttribute("disabled");
    }
}
// noinspection TypeScriptRedundantGenericType
/**
 * @see https://gist.githubusercontent.com/tmrk/4aa3cf285360526a98b2115d63e0cafd/raw/5e74803dcf33923257d081433ec92ba93765e3f3/countries.js
 * @global
 */
var countries = [
    {
        name: "Afghanistan",
        alpha2: "AF",
        alpha3: "AFG",
        num3: "004",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Åland Islands",
        alpha2: "AX",
        alpha3: "ALA",
        num3: "248",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Albania",
        alpha2: "AL",
        alpha3: "ALB",
        num3: "008",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Algeria",
        alpha2: "DZ",
        alpha3: "DZA",
        num3: "012",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "American Samoa",
        alpha2: "AS",
        alpha3: "ASM",
        num3: "016",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Andorra",
        alpha2: "AD",
        alpha3: "AND",
        num3: "020",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Angola",
        alpha2: "AO",
        alpha3: "AGO",
        num3: "024",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Anguilla",
        alpha2: "AI",
        alpha3: "AIA",
        num3: "660",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Antigua and Barbuda",
        alpha2: "AG",
        alpha3: "ATG",
        num3: "028",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Argentina",
        alpha2: "AR",
        alpha3: "ARG",
        num3: "032",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Armenia",
        alpha2: "AM",
        alpha3: "ARM",
        num3: "051",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Aruba",
        alpha2: "AW",
        alpha3: "ABW",
        num3: "533",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Australia",
        alpha2: "AU",
        alpha3: "AUS",
        num3: "036",
        subregion: "053",
        region: "",
        continent: "009",
    },
    {
        name: "Austria",
        alpha2: "AT",
        alpha3: "AUT",
        num3: "040",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Azerbaijan",
        alpha2: "AZ",
        alpha3: "AZE",
        num3: "031",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Bahamas",
        alpha2: "BS",
        alpha3: "BHS",
        num3: "044",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Bahrain",
        alpha2: "BH",
        alpha3: "BHR",
        num3: "048",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Bangladesh",
        alpha2: "BD",
        alpha3: "BGD",
        num3: "050",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Barbados",
        alpha2: "BB",
        alpha3: "BRB",
        num3: "052",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Belarus",
        alpha2: "BY",
        alpha3: "BLR",
        num3: "112",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Belgium",
        alpha2: "BE",
        alpha3: "BEL",
        num3: "056",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Belize",
        alpha2: "BZ",
        alpha3: "BLZ",
        num3: "084",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Benin",
        alpha2: "BJ",
        alpha3: "BEN",
        num3: "204",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Bermuda",
        alpha2: "BM",
        alpha3: "BMU",
        num3: "060",
        subregion: "",
        region: "021",
        continent: "019",
    },
    {
        name: "Bhutan",
        alpha2: "BT",
        alpha3: "BTN",
        num3: "064",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Bolivia (Plurinational State of)",
        alpha2: "BO",
        alpha3: "BOL",
        num3: "068",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Bonaire, Sint Eustatius and Saba",
        alpha2: "BQ",
        alpha3: "BES",
        num3: "535",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Bosnia and Herzegovina",
        alpha2: "BA",
        alpha3: "BIH",
        num3: "070",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Botswana",
        alpha2: "BW",
        alpha3: "BWA",
        num3: "072",
        subregion: "018",
        region: "",
        continent: "002",
    },
    {
        name: "Brazil",
        alpha2: "BR",
        alpha3: "BRA",
        num3: "076",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "British Virgin Islands",
        alpha2: "VG",
        alpha3: "VGB",
        num3: "092",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Brunei Darussalam",
        alpha2: "BN",
        alpha3: "BRN",
        num3: "096",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Bulgaria",
        alpha2: "BG",
        alpha3: "BGR",
        num3: "100",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Burkina Faso",
        alpha2: "BF",
        alpha3: "BFA",
        num3: "854",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Burundi",
        alpha2: "BI",
        alpha3: "BDI",
        num3: "108",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Cabo Verde",
        alpha2: "CV",
        alpha3: "CPV",
        num3: "132",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Cambodia",
        alpha2: "KH",
        alpha3: "KHM",
        num3: "116",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Cameroon",
        alpha2: "CM",
        alpha3: "CMR",
        num3: "120",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Canada",
        alpha2: "CA",
        alpha3: "CAN",
        num3: "124",
        subregion: "",
        region: "021",
        continent: "019",
    },
    {
        name: "Cayman Islands",
        alpha2: "KY",
        alpha3: "CYM",
        num3: "136",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Central African Republic",
        alpha2: "CF",
        alpha3: "CAF",
        num3: "140",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Chad",
        alpha2: "TD",
        alpha3: "TCD",
        num3: "148",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Channel Islands",
        alpha2: "",
        alpha3: "",
        num3: "830",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Chile",
        alpha2: "CL",
        alpha3: "CHL",
        num3: "152",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "China",
        alpha2: "CN",
        alpha3: "CHN",
        num3: "156",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "China, Hong Kong Special Administrative Region",
        alpha2: "HK",
        alpha3: "HKG",
        num3: "344",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "China, Macao Special Administrative Region",
        alpha2: "MO",
        alpha3: "MAC",
        num3: "446",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "Colombia",
        alpha2: "CO",
        alpha3: "COL",
        num3: "170",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Comoros",
        alpha2: "KM",
        alpha3: "COM",
        num3: "174",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Congo",
        alpha2: "CG",
        alpha3: "COG",
        num3: "178",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Cook Islands",
        alpha2: "CK",
        alpha3: "COK",
        num3: "184",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Costa Rica",
        alpha2: "CR",
        alpha3: "CRI",
        num3: "188",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Cote d'Ivoire",
        alpha2: "CI",
        alpha3: "CIV",
        num3: "384",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Croatia",
        alpha2: "HR",
        alpha3: "HRV",
        num3: "191",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Cuba",
        alpha2: "CU",
        alpha3: "CUB",
        num3: "192",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Curaçao",
        alpha2: "CW",
        alpha3: "CUW",
        num3: "531",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Cyprus",
        alpha2: "CY",
        alpha3: "CYP",
        num3: "196",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Czech Republic",
        alpha2: "CZ",
        alpha3: "CZE",
        num3: "203",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Democratic People's Republic of Korea",
        alpha2: "KP",
        alpha3: "PRK",
        num3: "408",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "Democratic Republic of the Congo",
        alpha2: "CD",
        alpha3: "COD",
        num3: "180",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Denmark",
        alpha2: "DK",
        alpha3: "DNK",
        num3: "208",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Djibouti",
        alpha2: "DJ",
        alpha3: "DJI",
        num3: "262",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Dominica",
        alpha2: "DM",
        alpha3: "DMA",
        num3: "212",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Dominican Republic",
        alpha2: "DO",
        alpha3: "DOM",
        num3: "214",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Ecuador",
        alpha2: "EC",
        alpha3: "ECU",
        num3: "218",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Egypt",
        alpha2: "EG",
        alpha3: "EGY",
        num3: "818",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "El Salvador",
        alpha2: "SV",
        alpha3: "SLV",
        num3: "222",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Equatorial Guinea",
        alpha2: "GQ",
        alpha3: "GNQ",
        num3: "226",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Eritrea",
        alpha2: "ER",
        alpha3: "ERI",
        num3: "232",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Estonia",
        alpha2: "EE",
        alpha3: "EST",
        num3: "233",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Ethiopia",
        alpha2: "ET",
        alpha3: "ETH",
        num3: "231",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Faeroe Islands",
        alpha2: "FO",
        alpha3: "FRO",
        num3: "234",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Falkland Islands (Malvinas)",
        alpha2: "FK",
        alpha3: "FLK",
        num3: "238",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Fiji",
        alpha2: "FJ",
        alpha3: "FJI",
        num3: "242",
        subregion: "054",
        region: "",
        continent: "009",
    },
    {
        name: "Finland",
        alpha2: "FI",
        alpha3: "FIN",
        num3: "246",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "France",
        alpha2: "FR",
        alpha3: "FRA",
        num3: "250",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "French Guiana",
        alpha2: "GF",
        alpha3: "GUF",
        num3: "254",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "French Polynesia",
        alpha2: "PF",
        alpha3: "PYF",
        num3: "258",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Gabon",
        alpha2: "GA",
        alpha3: "GAB",
        num3: "266",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Gambia",
        alpha2: "GM",
        alpha3: "GMB",
        num3: "270",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Georgia",
        alpha2: "GE",
        alpha3: "GEO",
        num3: "268",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Germany",
        alpha2: "DE",
        alpha3: "DEU",
        num3: "276",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Ghana",
        alpha2: "GH",
        alpha3: "GHA",
        num3: "288",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Gibraltar",
        alpha2: "GI",
        alpha3: "GIB",
        num3: "292",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Greece",
        alpha2: "GR",
        alpha3: "GRC",
        num3: "300",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Greenland",
        alpha2: "GL",
        alpha3: "GRL",
        num3: "304",
        subregion: "",
        region: "021",
        continent: "019",
    },
    {
        name: "Grenada",
        alpha2: "GD",
        alpha3: "GRD",
        num3: "308",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Guadeloupe",
        alpha2: "GP",
        alpha3: "GLP",
        num3: "312",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Guam",
        alpha2: "GU",
        alpha3: "GUM",
        num3: "316",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Guatemala",
        alpha2: "GT",
        alpha3: "GTM",
        num3: "320",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Guernsey",
        alpha2: "GG",
        alpha3: "GGY",
        num3: "831",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Guinea",
        alpha2: "GN",
        alpha3: "GIN",
        num3: "324",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Guinea-Bissau",
        alpha2: "GW",
        alpha3: "GNB",
        num3: "624",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Guyana",
        alpha2: "GY",
        alpha3: "GUY",
        num3: "328",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Haiti",
        alpha2: "HT",
        alpha3: "HTI",
        num3: "332",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Holy See",
        alpha2: "VA",
        alpha3: "VAT",
        num3: "336",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Honduras",
        alpha2: "HN",
        alpha3: "HND",
        num3: "340",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Hungary",
        alpha2: "HU",
        alpha3: "HUN",
        num3: "348",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Iceland",
        alpha2: "IS",
        alpha3: "ISL",
        num3: "352",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "India",
        alpha2: "IN",
        alpha3: "IND",
        num3: "356",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Indonesia",
        alpha2: "ID",
        alpha3: "IDN",
        num3: "360",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Iran (Islamic Republic of)",
        alpha2: "IR",
        alpha3: "IRN",
        num3: "364",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Iraq",
        alpha2: "IQ",
        alpha3: "IRQ",
        num3: "368",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Ireland",
        alpha2: "IE",
        alpha3: "IRL",
        num3: "372",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Isle of Man",
        alpha2: "IM",
        alpha3: "IMN",
        num3: "833",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Israel",
        alpha2: "IL",
        alpha3: "ISR",
        num3: "376",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Italy",
        alpha2: "IT",
        alpha3: "ITA",
        num3: "380",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Jamaica",
        alpha2: "JM",
        alpha3: "JAM",
        num3: "388",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Japan",
        alpha2: "JP",
        alpha3: "JPN",
        num3: "392",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "Jersey",
        alpha2: "JE",
        alpha3: "JEY",
        num3: "832",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Jordan",
        alpha2: "JO",
        alpha3: "JOR",
        num3: "400",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Kazakhstan",
        alpha2: "KZ",
        alpha3: "KAZ",
        num3: "398",
        subregion: "143",
        region: "",
        continent: "142",
    },
    {
        name: "Kenya",
        alpha2: "KE",
        alpha3: "KEN",
        num3: "404",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Kiribati",
        alpha2: "KI",
        alpha3: "KIR",
        num3: "296",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Kuwait",
        alpha2: "KW",
        alpha3: "KWT",
        num3: "414",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Kyrgyzstan",
        alpha2: "KG",
        alpha3: "KGZ",
        num3: "417",
        subregion: "143",
        region: "",
        continent: "142",
    },
    {
        name: "Lao People's Democratic Republic",
        alpha2: "LA",
        alpha3: "LAO",
        num3: "418",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Latvia",
        alpha2: "LV",
        alpha3: "LVA",
        num3: "428",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Lebanon",
        alpha2: "LB",
        alpha3: "LBN",
        num3: "422",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Lesotho",
        alpha2: "LS",
        alpha3: "LSO",
        num3: "426",
        subregion: "018",
        region: "",
        continent: "002",
    },
    {
        name: "Liberia",
        alpha2: "LR",
        alpha3: "LBR",
        num3: "430",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Libya",
        alpha2: "LY",
        alpha3: "LBY",
        num3: "434",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "Liechtenstein",
        alpha2: "LI",
        alpha3: "LIE",
        num3: "438",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Lithuania",
        alpha2: "LT",
        alpha3: "LTU",
        num3: "440",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Luxembourg",
        alpha2: "LU",
        alpha3: "LUX",
        num3: "442",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Madagascar",
        alpha2: "MG",
        alpha3: "MDG",
        num3: "450",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Malawi",
        alpha2: "MW",
        alpha3: "MWI",
        num3: "454",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Malaysia",
        alpha2: "MY",
        alpha3: "MYS",
        num3: "458",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Maldives",
        alpha2: "MV",
        alpha3: "MDV",
        num3: "462",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Mali",
        alpha2: "ML",
        alpha3: "MLI",
        num3: "466",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Malta",
        alpha2: "MT",
        alpha3: "MLT",
        num3: "470",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Marshall Islands",
        alpha2: "MH",
        alpha3: "MHL",
        num3: "584",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Martinique",
        alpha2: "MQ",
        alpha3: "MTQ",
        num3: "474",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Mauritania",
        alpha2: "MR",
        alpha3: "MRT",
        num3: "478",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Mauritius",
        alpha2: "MU",
        alpha3: "MUS",
        num3: "480",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Mayotte",
        alpha2: "YT",
        alpha3: "MYT",
        num3: "175",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Mexico",
        alpha2: "MX",
        alpha3: "MEX",
        num3: "484",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Micronesia (Federated States of)",
        alpha2: "FM",
        alpha3: "FSM",
        num3: "583",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Monaco",
        alpha2: "MC",
        alpha3: "MCO",
        num3: "492",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Mongolia",
        alpha2: "MN",
        alpha3: "MNG",
        num3: "496",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "Montenegro",
        alpha2: "ME",
        alpha3: "MNE",
        num3: "499",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Montserrat",
        alpha2: "MS",
        alpha3: "MSR",
        num3: "500",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Morocco",
        alpha2: "MA",
        alpha3: "MAR",
        num3: "504",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "Mozambique",
        alpha2: "MZ",
        alpha3: "MOZ",
        num3: "508",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Myanmar",
        alpha2: "MM",
        alpha3: "MMR",
        num3: "104",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Namibia",
        alpha2: "NA",
        alpha3: "NAM",
        num3: "516",
        subregion: "018",
        region: "",
        continent: "002",
    },
    {
        name: "Nauru",
        alpha2: "NR",
        alpha3: "NRU",
        num3: "520",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Nepal",
        alpha2: "NP",
        alpha3: "NPL",
        num3: "524",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Netherlands",
        alpha2: "NL",
        alpha3: "NLD",
        num3: "528",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "New Caledonia",
        alpha2: "NC",
        alpha3: "NCL",
        num3: "540",
        subregion: "054",
        region: "",
        continent: "009",
    },
    {
        name: "New Zealand",
        alpha2: "NZ",
        alpha3: "NZL",
        num3: "554",
        subregion: "053",
        region: "",
        continent: "009",
    },
    {
        name: "Nicaragua",
        alpha2: "NI",
        alpha3: "NIC",
        num3: "558",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Niger",
        alpha2: "NE",
        alpha3: "NER",
        num3: "562",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Nigeria",
        alpha2: "NG",
        alpha3: "NGA",
        num3: "566",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Niue",
        alpha2: "NU",
        alpha3: "NIU",
        num3: "570",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Norfolk Island",
        alpha2: "NF",
        alpha3: "NFK",
        num3: "574",
        subregion: "053",
        region: "",
        continent: "009",
    },
    {
        name: "Northern Mariana Islands",
        alpha2: "MP",
        alpha3: "MNP",
        num3: "580",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Norway",
        alpha2: "NO",
        alpha3: "NOR",
        num3: "578",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Oman",
        alpha2: "OM",
        alpha3: "OMN",
        num3: "512",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Pakistan",
        alpha2: "PK",
        alpha3: "PAK",
        num3: "586",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "Palau",
        alpha2: "PW",
        alpha3: "PLW",
        num3: "585",
        subregion: "057",
        region: "",
        continent: "009",
    },
    {
        name: "Panama",
        alpha2: "PA",
        alpha3: "PAN",
        num3: "591",
        subregion: "013",
        region: "",
        continent: "019",
    },
    {
        name: "Papua New Guinea",
        alpha2: "PG",
        alpha3: "PNG",
        num3: "598",
        subregion: "054",
        region: "",
        continent: "009",
    },
    {
        name: "Paraguay",
        alpha2: "PY",
        alpha3: "PRY",
        num3: "600",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Peru",
        alpha2: "PE",
        alpha3: "PER",
        num3: "604",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Philippines",
        alpha2: "PH",
        alpha3: "PHL",
        num3: "608",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Pitcairn",
        alpha2: "PN",
        alpha3: "PCN",
        num3: "612",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Poland",
        alpha2: "PL",
        alpha3: "POL",
        num3: "616",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Portugal",
        alpha2: "PT",
        alpha3: "PRT",
        num3: "620",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Puerto Rico",
        alpha2: "PR",
        alpha3: "PRI",
        num3: "630",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Qatar",
        alpha2: "QA",
        alpha3: "QAT",
        num3: "634",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Republic of Korea",
        alpha2: "KR",
        alpha3: "KOR",
        num3: "410",
        subregion: "030",
        region: "",
        continent: "142",
    },
    {
        name: "Republic of Moldova",
        alpha2: "MD",
        alpha3: "MDA",
        num3: "498",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Réunion",
        alpha2: "RE",
        alpha3: "REU",
        num3: "638",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Romania",
        alpha2: "RO",
        alpha3: "ROU",
        num3: "642",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Russian Federation",
        alpha2: "RU",
        alpha3: "RUS",
        num3: "643",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Rwanda",
        alpha2: "RW",
        alpha3: "RWA",
        num3: "646",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Saint Helena",
        alpha2: "SH",
        alpha3: "SHN",
        num3: "654",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Saint Kitts and Nevis",
        alpha2: "KN",
        alpha3: "KNA",
        num3: "659",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Saint Lucia",
        alpha2: "LC",
        alpha3: "LCA",
        num3: "662",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Saint Martin (French part)",
        alpha2: "MF",
        alpha3: "MAF",
        num3: "663",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Saint Pierre and Miquelon",
        alpha2: "PM",
        alpha3: "SPM",
        num3: "666",
        subregion: "",
        region: "021",
        continent: "019",
    },
    {
        name: "Saint Vincent and the Grenadines",
        alpha2: "VC",
        alpha3: "VCT",
        num3: "670",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Saint-Barthélemy",
        alpha2: "BL",
        alpha3: "BLM",
        num3: "652",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Samoa",
        alpha2: "WS",
        alpha3: "WSM",
        num3: "882",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "San Marino",
        alpha2: "SM",
        alpha3: "SMR",
        num3: "674",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Sao Tome and Principe",
        alpha2: "ST",
        alpha3: "STP",
        num3: "678",
        subregion: "017",
        region: "",
        continent: "002",
    },
    {
        name: "Sark",
        alpha2: "",
        alpha3: "",
        num3: "680",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Saudi Arabia",
        alpha2: "SA",
        alpha3: "SAU",
        num3: "682",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Senegal",
        alpha2: "SN",
        alpha3: "SEN",
        num3: "686",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Serbia",
        alpha2: "RS",
        alpha3: "SRB",
        num3: "688",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Seychelles",
        alpha2: "SC",
        alpha3: "SYC",
        num3: "690",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Sierra Leone",
        alpha2: "SL",
        alpha3: "SLE",
        num3: "694",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Singapore",
        alpha2: "SG",
        alpha3: "SGP",
        num3: "702",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Sint Maarten (Dutch part)",
        alpha2: "SX",
        alpha3: "SXM",
        num3: "534",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Slovakia",
        alpha2: "SK",
        alpha3: "SVK",
        num3: "703",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "Slovenia",
        alpha2: "SI",
        alpha3: "SVN",
        num3: "705",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Solomon Islands",
        alpha2: "SB",
        alpha3: "SLB",
        num3: "090",
        subregion: "054",
        region: "",
        continent: "009",
    },
    {
        name: "Somalia",
        alpha2: "SO",
        alpha3: "SOM",
        num3: "706",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "South Africa",
        alpha2: "ZA",
        alpha3: "ZAF",
        num3: "710",
        subregion: "018",
        region: "",
        continent: "002",
    },
    {
        name: "South Sudan",
        alpha2: "SS",
        alpha3: "SSD",
        num3: "728",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Spain",
        alpha2: "ES",
        alpha3: "ESP",
        num3: "724",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Sri Lanka",
        alpha2: "LK",
        alpha3: "LKA",
        num3: "144",
        subregion: "034",
        region: "",
        continent: "142",
    },
    {
        name: "State of Palestine",
        alpha2: "PS",
        alpha3: "PSE",
        num3: "275",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Sudan",
        alpha2: "SD",
        alpha3: "SDN",
        num3: "729",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "Suriname",
        alpha2: "SR",
        alpha3: "SUR",
        num3: "740",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Svalbard and Jan Mayen Islands",
        alpha2: "SJ",
        alpha3: "SJM",
        num3: "744",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Swaziland",
        alpha2: "SZ",
        alpha3: "SWZ",
        num3: "748",
        subregion: "018",
        region: "",
        continent: "002",
    },
    {
        name: "Sweden",
        alpha2: "SE",
        alpha3: "SWE",
        num3: "752",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "Switzerland",
        alpha2: "CH",
        alpha3: "CHE",
        num3: "756",
        subregion: "155",
        region: "",
        continent: "150",
    },
    {
        name: "Syrian Arab Republic",
        alpha2: "SY",
        alpha3: "SYR",
        num3: "760",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Tajikistan",
        alpha2: "TJ",
        alpha3: "TJK",
        num3: "762",
        subregion: "143",
        region: "",
        continent: "142",
    },
    {
        name: "Thailand",
        alpha2: "TH",
        alpha3: "THA",
        num3: "764",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "The former Yugoslav Republic of Macedonia",
        alpha2: "MK",
        alpha3: "MKD",
        num3: "807",
        subregion: "039",
        region: "",
        continent: "150",
    },
    {
        name: "Timor-Leste",
        alpha2: "TL",
        alpha3: "TLS",
        num3: "626",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Togo",
        alpha2: "TG",
        alpha3: "TGO",
        num3: "768",
        subregion: "011",
        region: "",
        continent: "002",
    },
    {
        name: "Tokelau",
        alpha2: "TK",
        alpha3: "TKL",
        num3: "772",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Tonga",
        alpha2: "TO",
        alpha3: "TON",
        num3: "776",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Trinidad and Tobago",
        alpha2: "TT",
        alpha3: "TTO",
        num3: "780",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Tunisia",
        alpha2: "TN",
        alpha3: "TUN",
        num3: "788",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "Turkey",
        alpha2: "TR",
        alpha3: "TUR",
        num3: "792",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Turkmenistan",
        alpha2: "TM",
        alpha3: "TKM",
        num3: "795",
        subregion: "143",
        region: "",
        continent: "142",
    },
    {
        name: "Turks and Caicos Islands",
        alpha2: "TC",
        alpha3: "TCA",
        num3: "796",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Tuvalu",
        alpha2: "TV",
        alpha3: "TUV",
        num3: "798",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Uganda",
        alpha2: "UG",
        alpha3: "UGA",
        num3: "800",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Ukraine",
        alpha2: "UA",
        alpha3: "UKR",
        num3: "804",
        subregion: "151",
        region: "",
        continent: "150",
    },
    {
        name: "United Arab Emirates",
        alpha2: "AE",
        alpha3: "ARE",
        num3: "784",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "United Kingdom of Great Britain and Northern Ireland",
        alpha2: "GB",
        alpha3: "GBR",
        num3: "826",
        subregion: "154",
        region: "",
        continent: "150",
    },
    {
        name: "United Republic of Tanzania",
        alpha2: "TZ",
        alpha3: "TZA",
        num3: "834",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "United States of America",
        alpha2: "US",
        alpha3: "USA",
        num3: "840",
        subregion: "",
        region: "021",
        continent: "019",
    },
    {
        name: "United States Virgin Islands",
        alpha2: "VI",
        alpha3: "VIR",
        num3: "850",
        subregion: "029",
        region: "419",
        continent: "019",
    },
    {
        name: "Uruguay",
        alpha2: "UY",
        alpha3: "URY",
        num3: "858",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Uzbekistan",
        alpha2: "UZ",
        alpha3: "UZB",
        num3: "860",
        subregion: "143",
        region: "",
        continent: "142",
    },
    {
        name: "Vanuatu",
        alpha2: "VU",
        alpha3: "VUT",
        num3: "548",
        subregion: "054",
        region: "",
        continent: "009",
    },
    {
        name: "Venezuela (Bolivarian Republic of)",
        alpha2: "VE",
        alpha3: "VEN",
        num3: "862",
        subregion: "005",
        region: "",
        continent: "019",
    },
    {
        name: "Viet Nam",
        alpha2: "VN",
        alpha3: "VNM",
        num3: "704",
        subregion: "035",
        region: "",
        continent: "142",
    },
    {
        name: "Wallis and Futuna Islands",
        alpha2: "WF",
        alpha3: "WLF",
        num3: "876",
        subregion: "061",
        region: "",
        continent: "009",
    },
    {
        name: "Western Sahara",
        alpha2: "EH",
        alpha3: "ESH",
        num3: "732",
        subregion: "015",
        region: "",
        continent: "002",
    },
    {
        name: "Yemen",
        alpha2: "YE",
        alpha3: "YEM",
        num3: "887",
        subregion: "145",
        region: "",
        continent: "142",
    },
    {
        name: "Zambia",
        alpha2: "ZM",
        alpha3: "ZMB",
        num3: "894",
        subregion: "014",
        region: "",
        continent: "002",
    },
    {
        name: "Zimbabwe",
        alpha2: "ZW",
        alpha3: "ZWE",
        num3: "716",
        subregion: "014",
        region: "",
        continent: "002",
    },
];
/**
 * @author Phil Teare
 * @global
 * using wikipedia data
 */
var isoLangs = {
    ab: {
        name: "Abkhaz",
        nativeName: "аҧсуа",
    },
    aa: {
        name: "Afar",
        nativeName: "Afaraf",
    },
    af: {
        name: "Afrikaans",
        nativeName: "Afrikaans",
    },
    ak: {
        name: "Akan",
        nativeName: "Akan",
    },
    sq: {
        name: "Albanian",
        nativeName: "Shqip",
    },
    am: {
        name: "Amharic",
        nativeName: "አማርኛ",
    },
    ar: {
        name: "Arabic",
        nativeName: "العربية",
    },
    an: {
        name: "Aragonese",
        nativeName: "Aragonés",
    },
    hy: {
        name: "Armenian",
        nativeName: "Հայերեն",
    },
    as: {
        name: "Assamese",
        nativeName: "অসমীয়া",
    },
    av: {
        name: "Avaric",
        nativeName: "авар мацӀ, магӀарул мацӀ",
    },
    ae: {
        name: "Avestan",
        nativeName: "avesta",
    },
    ay: {
        name: "Aymara",
        nativeName: "aymar aru",
    },
    az: {
        name: "Azerbaijani",
        nativeName: "azərbaycan dili",
    },
    bm: {
        name: "Bambara",
        nativeName: "bamanankan",
    },
    ba: {
        name: "Bashkir",
        nativeName: "башҡорт теле",
    },
    eu: {
        name: "Basque",
        nativeName: "euskara, euskera",
    },
    be: {
        name: "Belarusian",
        nativeName: "Беларуская",
    },
    bn: {
        name: "Bengali",
        nativeName: "বাংলা",
    },
    bh: {
        name: "Bihari",
        nativeName: "भोजपुरी",
    },
    bi: {
        name: "Bislama",
        nativeName: "Bislama",
    },
    bs: {
        name: "Bosnian",
        nativeName: "bosanski jezik",
    },
    br: {
        name: "Breton",
        nativeName: "brezhoneg",
    },
    bg: {
        name: "Bulgarian",
        nativeName: "български език",
    },
    my: {
        name: "Burmese",
        nativeName: "ဗမာစာ",
    },
    ca: {
        name: "Catalan; Valencian",
        nativeName: "Català",
    },
    ch: {
        name: "Chamorro",
        nativeName: "Chamoru",
    },
    ce: {
        name: "Chechen",
        nativeName: "нохчийн мотт",
    },
    ny: {
        name: "Chichewa; Chewa; Nyanja",
        nativeName: "chiCheŵa, chinyanja",
    },
    zh: {
        name: "Chinese",
        nativeName: "中文 (Zhōngwén), 汉语, 漢語",
    },
    cv: {
        name: "Chuvash",
        nativeName: "чӑваш чӗлхи",
    },
    kw: {
        name: "Cornish",
        nativeName: "Kernewek",
    },
    co: {
        name: "Corsican",
        nativeName: "corsu, lingua corsa",
    },
    cr: {
        name: "Cree",
        nativeName: "ᓀᐦᐃᔭᐍᐏᐣ",
    },
    hr: {
        name: "Croatian",
        nativeName: "hrvatski",
    },
    cs: {
        name: "Czech",
        nativeName: "česky, čeština",
    },
    da: {
        name: "Danish",
        nativeName: "dansk",
    },
    dv: {
        name: "Divehi; Dhivehi; Maldivian;",
        nativeName: "ދިވެހި",
    },
    nl: {
        name: "Dutch",
        nativeName: "Nederlands, Vlaams",
    },
    en: {
        name: "English",
        nativeName: "English",
    },
    eo: {
        name: "Esperanto",
        nativeName: "Esperanto",
    },
    et: {
        name: "Estonian",
        nativeName: "eesti, eesti keel",
    },
    ee: {
        name: "Ewe",
        nativeName: "Eʋegbe",
    },
    fo: {
        name: "Faroese",
        nativeName: "føroyskt",
    },
    fj: {
        name: "Fijian",
        nativeName: "vosa Vakaviti",
    },
    fi: {
        name: "Finnish",
        nativeName: "suomi, suomen kieli",
    },
    fr: {
        name: "French",
        nativeName: "français, langue française",
    },
    ff: {
        name: "Fula; Fulah; Pulaar; Pular",
        nativeName: "Fulfulde, Pulaar, Pular",
    },
    gl: {
        name: "Galician",
        nativeName: "Galego",
    },
    ka: {
        name: "Georgian",
        nativeName: "ქართული",
    },
    de: {
        name: "German",
        nativeName: "Deutsch",
    },
    el: {
        name: "Greek, Modern",
        nativeName: "Ελληνικά",
    },
    gn: {
        name: "Guaraní",
        nativeName: "Avañeẽ",
    },
    gu: {
        name: "Gujarati",
        nativeName: "ગુજરાતી",
    },
    ht: {
        name: "Haitian; Haitian Creole",
        nativeName: "Kreyòl ayisyen",
    },
    ha: {
        name: "Hausa",
        nativeName: "Hausa, هَوُسَ",
    },
    he: {
        name: "Hebrew (modern)",
        nativeName: "עברית",
    },
    hz: {
        name: "Herero",
        nativeName: "Otjiherero",
    },
    hi: {
        name: "Hindi",
        nativeName: "हिन्दी, हिंदी",
    },
    ho: {
        name: "Hiri Motu",
        nativeName: "Hiri Motu",
    },
    hu: {
        name: "Hungarian",
        nativeName: "Magyar",
    },
    ia: {
        name: "Interlingua",
        nativeName: "Interlingua",
    },
    id: {
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
    },
    ie: {
        name: "Interlingue",
        nativeName: "Originally called Occidental; then Interlingue after WWII",
    },
    ga: {
        name: "Irish",
        nativeName: "Gaeilge",
    },
    ig: {
        name: "Igbo",
        nativeName: "Asụsụ Igbo",
    },
    ik: {
        name: "Inupiaq",
        nativeName: "Iñupiaq, Iñupiatun",
    },
    io: {
        name: "Ido",
        nativeName: "Ido",
    },
    is: {
        name: "Icelandic",
        nativeName: "Íslenska",
    },
    it: {
        name: "Italian",
        nativeName: "Italiano",
    },
    iu: {
        name: "Inuktitut",
        nativeName: "ᐃᓄᒃᑎᑐᑦ",
    },
    ja: {
        name: "Japanese",
        nativeName: "日本語 (にほんご／にっぽんご)",
    },
    jv: {
        name: "Javanese",
        nativeName: "basa Jawa",
    },
    kl: {
        name: "Kalaallisut, Greenlandic",
        nativeName: "kalaallisut, kalaallit oqaasii",
    },
    kn: {
        name: "Kannada",
        nativeName: "ಕನ್ನಡ",
    },
    kr: {
        name: "Kanuri",
        nativeName: "Kanuri",
    },
    ks: {
        name: "Kashmiri",
        nativeName: "कश्मीरी, كشميري‎",
    },
    kk: {
        name: "Kazakh",
        nativeName: "Қазақ тілі",
    },
    km: {
        name: "Khmer",
        nativeName: "ភាសាខ្មែរ",
    },
    ki: {
        name: "Kikuyu, Gikuyu",
        nativeName: "Gĩkũyũ",
    },
    rw: {
        name: "Kinyarwanda",
        nativeName: "Ikinyarwanda",
    },
    ky: {
        name: "Kirghiz, Kyrgyz",
        nativeName: "кыргыз тили",
    },
    kv: {
        name: "Komi",
        nativeName: "коми кыв",
    },
    kg: {
        name: "Kongo",
        nativeName: "KiKongo",
    },
    ko: {
        name: "Korean",
        nativeName: "한국어 (韓國語), 조선말 (朝鮮語)",
    },
    ku: {
        name: "Kurdish",
        nativeName: "Kurdî, كوردی‎",
    },
    kj: {
        name: "Kwanyama, Kuanyama",
        nativeName: "Kuanyama",
    },
    la: {
        name: "Latin",
        nativeName: "latine, lingua latina",
    },
    lb: {
        name: "Luxembourgish, Letzeburgesch",
        nativeName: "Lëtzebuergesch",
    },
    lg: {
        name: "Luganda",
        nativeName: "Luganda",
    },
    li: {
        name: "Limburgish, Limburgan, Limburger",
        nativeName: "Limburgs",
    },
    ln: {
        name: "Lingala",
        nativeName: "Lingála",
    },
    lo: {
        name: "Lao",
        nativeName: "ພາສາລາວ",
    },
    lt: {
        name: "Lithuanian",
        nativeName: "lietuvių kalba",
    },
    lu: {
        name: "Luba-Katanga",
        nativeName: "",
    },
    lv: {
        name: "Latvian",
        nativeName: "latviešu valoda",
    },
    gv: {
        name: "Manx",
        nativeName: "Gaelg, Gailck",
    },
    mk: {
        name: "Macedonian",
        nativeName: "македонски јазик",
    },
    mg: {
        name: "Malagasy",
        nativeName: "Malagasy fiteny",
    },
    ms: {
        name: "Malay",
        nativeName: "bahasa Melayu, بهاس ملايو‎",
    },
    ml: {
        name: "Malayalam",
        nativeName: "മലയാളം",
    },
    mt: {
        name: "Maltese",
        nativeName: "Malti",
    },
    mi: {
        name: "Māori",
        nativeName: "te reo Māori",
    },
    mr: {
        name: "Marathi (Marāṭhī)",
        nativeName: "मराठी",
    },
    mh: {
        name: "Marshallese",
        nativeName: "Kajin M̧ajeļ",
    },
    mn: {
        name: "Mongolian",
        nativeName: "монгол",
    },
    na: {
        name: "Nauru",
        nativeName: "Ekakairũ Naoero",
    },
    nv: {
        name: "Navajo, Navaho",
        nativeName: "Diné bizaad, Dinékʼehǰí",
    },
    nb: {
        name: "Norwegian Bokmål",
        nativeName: "Norsk bokmål",
    },
    nd: {
        name: "North Ndebele",
        nativeName: "isiNdebele",
    },
    ne: {
        name: "Nepali",
        nativeName: "नेपाली",
    },
    ng: {
        name: "Ndonga",
        nativeName: "Owambo",
    },
    nn: {
        name: "Norwegian Nynorsk",
        nativeName: "Norsk nynorsk",
    },
    no: {
        name: "Norwegian",
        nativeName: "Norsk",
    },
    ii: {
        name: "Nuosu",
        nativeName: "ꆈꌠ꒿ Nuosuhxop",
    },
    nr: {
        name: "South Ndebele",
        nativeName: "isiNdebele",
    },
    oc: {
        name: "Occitan",
        nativeName: "Occitan",
    },
    oj: {
        name: "Ojibwe, Ojibwa",
        nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
    },
    cu: {
        name: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        nativeName: "ѩзыкъ словѣньскъ",
    },
    om: {
        name: "Oromo",
        nativeName: "Afaan Oromoo",
    },
    or: {
        name: "Oriya",
        nativeName: "ଓଡ଼ିଆ",
    },
    os: {
        name: "Ossetian, Ossetic",
        nativeName: "ирон æвзаг",
    },
    pa: {
        name: "Panjabi, Punjabi",
        nativeName: "ਪੰਜਾਬੀ, پنجابی‎",
    },
    pi: {
        name: "Pāli",
        nativeName: "पाऴि",
    },
    fa: {
        name: "Persian",
        nativeName: "فارسی",
    },
    pl: {
        name: "Polish",
        nativeName: "polski",
    },
    ps: {
        name: "Pashto, Pushto",
        nativeName: "پښتو",
    },
    pt: {
        name: "Portuguese",
        nativeName: "Português",
    },
    qu: {
        name: "Quechua",
        nativeName: "Runa Simi, Kichwa",
    },
    rm: {
        name: "Romansh",
        nativeName: "rumantsch grischun",
    },
    rn: {
        name: "Kirundi",
        nativeName: "kiRundi",
    },
    ro: {
        name: "Romanian, Moldavian, Moldovan",
        nativeName: "română",
    },
    ru: {
        name: "Russian",
        nativeName: "русский язык",
    },
    sa: {
        name: "Sanskrit (Saṁskṛta)",
        nativeName: "संस्कृतम्",
    },
    sc: {
        name: "Sardinian",
        nativeName: "sardu",
    },
    sd: {
        name: "Sindhi",
        nativeName: "सिन्धी, سنڌي، سندھی‎",
    },
    se: {
        name: "Northern Sami",
        nativeName: "Davvisámegiella",
    },
    sm: {
        name: "Samoan",
        nativeName: "gagana faa Samoa",
    },
    sg: {
        name: "Sango",
        nativeName: "yângâ tî sängö",
    },
    sr: {
        name: "Serbian",
        nativeName: "српски језик",
    },
    gd: {
        name: "Scottish Gaelic; Gaelic",
        nativeName: "Gàidhlig",
    },
    sn: {
        name: "Shona",
        nativeName: "chiShona",
    },
    si: {
        name: "Sinhala, Sinhalese",
        nativeName: "සිංහල",
    },
    sk: {
        name: "Slovak",
        nativeName: "slovenčina",
    },
    sl: {
        name: "Slovene",
        nativeName: "slovenščina",
    },
    so: {
        name: "Somali",
        nativeName: "Soomaaliga, af Soomaali",
    },
    st: {
        name: "Southern Sotho",
        nativeName: "Sesotho",
    },
    es: {
        name: "Spanish; Castilian",
        nativeName: "español, castellano",
    },
    su: {
        name: "Sundanese",
        nativeName: "Basa Sunda",
    },
    sw: {
        name: "Swahili",
        nativeName: "Kiswahili",
    },
    ss: {
        name: "Swati",
        nativeName: "SiSwati",
    },
    sv: {
        name: "Swedish",
        nativeName: "svenska",
    },
    ta: {
        name: "Tamil",
        nativeName: "தமிழ்",
    },
    te: {
        name: "Telugu",
        nativeName: "తెలుగు",
    },
    tg: {
        name: "Tajik",
        nativeName: "тоҷикӣ, toğikī, تاجیکی‎",
    },
    th: {
        name: "Thai",
        nativeName: "ไทย",
    },
    ti: {
        name: "Tigrinya",
        nativeName: "ትግርኛ",
    },
    bo: {
        name: "Tibetan Standard, Tibetan, Central",
        nativeName: "བོད་ཡིག",
    },
    tk: {
        name: "Turkmen",
        nativeName: "Türkmen, Түркмен",
    },
    tl: {
        name: "Tagalog",
        nativeName: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔",
    },
    tn: {
        name: "Tswana",
        nativeName: "Setswana",
    },
    to: {
        name: "Tonga (Tonga Islands)",
        nativeName: "faka Tonga",
    },
    tr: {
        name: "Turkish",
        nativeName: "Türkçe",
    },
    ts: {
        name: "Tsonga",
        nativeName: "Xitsonga",
    },
    tt: {
        name: "Tatar",
        nativeName: "татарча, tatarça, تاتارچا‎",
    },
    tw: {
        name: "Twi",
        nativeName: "Twi",
    },
    ty: {
        name: "Tahitian",
        nativeName: "Reo Tahiti",
    },
    ug: {
        name: "Uighur, Uyghur",
        nativeName: "Uyƣurqə, ئۇيغۇرچە‎",
    },
    uk: {
        name: "Ukrainian",
        nativeName: "українська",
    },
    ur: {
        name: "Urdu",
        nativeName: "اردو",
    },
    uz: {
        name: "Uzbek",
        nativeName: "zbek, Ўзбек, أۇزبېك‎",
    },
    ve: {
        name: "Venda",
        nativeName: "Tshivenḓa",
    },
    vi: {
        name: "Vietnamese",
        nativeName: "Tiếng Việt",
    },
    vo: {
        name: "Volapük",
        nativeName: "Volapük",
    },
    wa: {
        name: "Walloon",
        nativeName: "Walon",
    },
    cy: {
        name: "Welsh",
        nativeName: "Cymraeg",
    },
    wo: {
        name: "Wolof",
        nativeName: "Wollof",
    },
    fy: {
        name: "Western Frisian",
        nativeName: "Frysk",
    },
    xh: {
        name: "Xhosa",
        nativeName: "isiXhosa",
    },
    yi: {
        name: "Yiddish",
        nativeName: "ייִדיש",
    },
    yo: {
        name: "Yoruba",
        nativeName: "Yorùbá",
    },
    za: {
        name: "Zhuang, Chuang",
        nativeName: "Saɯ cueŋƅ, Saw cuengh",
    },
};
/**
 * Get Countries ISO
 * @returns
 */
function getCountries() {
    return countries;
}
/**
 * Select2 Country
 * @requires jQuery
 * @param el
 * @param select2Opt Select2 Options
 * @example
 * select2Country($("#selectID"), {placeholder:"Select Your Country"})
 */
function select2Country(el, select2Opt) {
    if (select2Opt === void 0) {
        select2Opt = {};
    }
    "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css".CSS();
    var isoCountries = [];
    countries.forEach(function (country) {
        isoCountries.add(Object.assign(country, { id: country.alpha2, text: country.name }));
    });
    var defaultOpt = {
        placeholder: "Select a country",
        templateResult: function (country) {
            //console.log(country);
            if (!country.id) {
                return country.text;
            }
            var $country = $('<span class="flag-icon flag-icon-' +
                country.id.toString().toLowerCase() +
                ' flag-icon-squared"></span>' +
                '<span class="flag-text" style="margin-left: 10px">' +
                country.text +
                "</span>");
            return $country;
        },
        data: isoCountries,
    };
    var newOpt = Object.assign(defaultOpt, select2Opt);
    el.select2(newOpt);
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.countries = countries;
    module.exports.getCountries = getCountries;
}
else {
    (function ($) {
        $.fn.select2Country = function (select2Opt) {
            select2Country($(this), select2Opt);
        };
    })(jQuery);
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
    //restrict = false;
    restrict = restrict && !is_localhost() && !is_development();
    //console.log('is restricted mode : ' + restrict);
    restrict_mode(restrict);
}
if (!isnode()) {
    $.post = null;
    $.get = null;
    $.getJSON = null;
    $.getScript = null;
}
/**
 * Disqus loader which verifies the existence of `#disqus_thread` on
 * the web page and then prepares the disqus embed script to hook in
 * the document
 * @param disqus_shortname disqus username/shortname
 */
function load_disqus(disqus_shortname) {
    // Prepare the trigger and target
    var disqus_trigger = $("#disqus_trigger"), disqus_target = $("#disqus_thread");
    // Load script asynchronously only when the trigger and target exist
    if (disqus_target.length) {
        LoadScript({
            url: "//" + disqus_shortname + ".disqus.com/embed.js",
            callback: function () {
                disqus_trigger.remove();
            },
        });
    }
    else {
        if (typeof toastr != "undefined") {
            toastr.error("disqus container not exists", "disqus comment");
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
    "8364": "&euro;", // Last one must not have a comma after it, IE doesn't like trailing commas
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
/// <reference path="./_Prototype-Array.ts" />
/// <reference path="./_Prototype-Object.ts" />
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
    var is_local = location.host.match(/^localhost|^127|(apotek|php|git).io$/s);
    return is_local;
}
if (!isnode()) {
    if (is_localhost()) {
        setTimeout(function () {
            $.ajax({
                url: "/server/clean?latest=s&force=true",
            });
        }, 5000);
    }
    else {
        $.ajax({
            url: "/server/clean?latest=" + new Date(),
            silent: true,
            indicator: false,
        });
    }
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
if (isnode()) {
    module.exports = isJSON;
}
var LoadScriptLoaded = [];
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(config) {
    var urls = [];
    if (typeof config.url == "string") {
        urls.add(config.url);
    }
    else if (Array.isArray(config.url)) {
        urls.addAll(config.url);
    }
    var defaultConfig = {
        url: [],
        options: {
            type: "text/javascript",
        },
        callback: null,
    };
    config = Object.assign(defaultConfig, config);
    console.log("Script in queue " + urls.length);
    /**
     * Callback onreadystatechange
     * @description queue javascript calls
     * @param event
     */
    var callthis = function (event) {
        //console.log(this.readyState, event);
        // remove first url
        urls.shift();
        if (!urls.length) {
            config.callback();
        }
        else if (urls.length) {
            LoadScript({
                url: urls,
                options: config.options,
                callback: config.callback,
            });
        }
        //LoadScriptLoaded[urls[0]]["status"] = true;
    };
    if (!urls.isEmpty()) {
        var script_1 = document.createElement("script");
        // script src from first url
        script_1.src = urls[0];
        LoadScriptLoaded[urls[0]] = {
            status: undefined,
            onerror: undefined,
            onabort: undefined,
            oncancel: undefined,
        };
        if (typeof config.options == "object") {
            // add attriubutes options
            if (config.options.hasOwnProperty("async")) {
                script_1.async = config.options.async;
            }
            if (config.options.hasOwnProperty("defer")) {
                script_1.defer = config.options.defer;
            }
            if (config.options.hasOwnProperty("type")) {
                script_1.type = config.options.type;
            }
        }
        //console.info(`loading script(${script.src})`);
        script_1.onload = script_1.onreadystatechange = callthis;
        script_1.onerror = function () {
            LoadScriptLoaded[script_1.src]["onerror"] = false;
            console.error("error while loading " + script_1.src);
        };
        script_1.onabort = function () {
            LoadScriptLoaded[script_1.src]["onabort"] = false;
            console.error("error while loading " + script_1.src);
        };
        script_1.oncancel = function () {
            LoadScriptLoaded[script_1.src]["oncancel"] = false;
            console.error("error while loading " + script_1.src);
        };
        document.body.appendChild(script_1);
    }
    return LoadScriptLoaded;
}
/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href, callback) {
    if (typeof href == "string") {
        href = [href];
    }
    var htm = document.querySelector("html");
    var cache = htm.getAttribute("cache").toString().trim();
    if (Array.isArray(href)) {
        var hrefs = href;
        var link_1 = document.createElement("link");
        link_1.media = "print";
        link_1.rel = "stylesheet";
        link_1.href = cache.length ? hrefs[0] + "?cache=" + cache : hrefs[0];
        link_1.onload = function () {
            link_1.media = "all";
            hrefs.shift();
            if (!hrefs.length) {
                if (typeof callback == "function") {
                    callback(link_1, href);
                }
            }
            else {
                loadCSS(hrefs, callback);
            }
        };
        document.head.appendChild(link_1);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        inputrp.on("keyup keydown change", function (e) {
            var t = $(this);
            var v = t.val().toString();
            var n = t.next(".form-text, #rupiah");
            var V;
            if (framework().isNumber(v.toString())) {
                V = rp(parseNumber(v));
                t.css("border-color", "green");
                enable_button(t);
            }
            else {
                V = "Bukan nomor";
                t.css("border-color", "red");
                disable_button(t);
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
/**
 * Rupiah currency auto format
 */
function rp(angka, prefix) {
    if (prefix === void 0) {
        prefix = null;
    }
    if (!prefix) {
        prefix = "Rp. ";
    }
    // eslint-disable-next-line prefer-const
    var number_string = angka.toString().replace(/[^,\d]/g, ""), 
    // eslint-disable-next-line prefer-const
    split = number_string.split(","), 
    // eslint-disable-next-line prefer-const
    sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), 
    // eslint-disable-next-line prefer-const
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return !prefix ? rupiah : prefix + " " + rupiah;
}
/**
 * Auto height textarea
 */
function autoHeight_(element) {
    if (element instanceof HTMLTextAreaElement ||
        element instanceof HTMLElement) {
        if (typeof jQuery != "undefined") {
            return jQuery(element)
                .css({ height: "auto", "overflow-y": "hidden" })
                .height(element.scrollHeight);
        }
    }
}
/**
 * jQuery plugin only works on browser language
 */
if (!(typeof module !== "undefined" && module.exports)) {
    if (typeof jQuery != "undefined") {
        (function ($) {
            $.fn.hasAttr = function (name) {
                var attr = $(this).attr(name);
                return typeof attr !== typeof undefined && attr != null;
            };
            $.fn.autoHeight = function () {
                return this.each(function () {
                    autoHeight_(this).on("input", function () {
                        autoHeight_(this);
                    });
                });
            };
            $.fn.newTab = function () {
                var href = $(this).attr("href");
                var target = $(this).attr("target");
                $(this).on("click", function (e) {
                    e.preventDefault();
                    openInNewTab(href, target);
                });
            };
        })(jQuery);
    }
}
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/* global define */
/* eslint-disable strict */
/**
 * Add integers, wrapping at 2^32.
 * This uses 16-bit operations internally to work around bugs in interpreters.
 *
 * @param {number} x First integer
 * @param {number} y Second integer
 * @returns {number} Sum
 */
function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
/**
 * Bitwise rotate a 32-bit number to the left.
 *
 * @param {number} num 32-bit number
 * @param {number} cnt Rotation count
 * @returns {number} Rotated number
 */
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/**
 * Basic operation the algorithm uses.
 *
 * @param {number} q q
 * @param {number} a a
 * @param {number} b b
 * @param {number} x x
 * @param {number} s s
 * @param {number} t t
 * @returns {number} Result
 */
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
/**
 * Basic operation the algorithm uses.
 *
 * @param {number} a a
 * @param {number} b b
 * @param {number} c c
 * @param {number} d d
 * @param {number} x x
 * @param {number} s s
 * @param {number} t t
 * @returns {number} Result
 */
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
/**
 * Basic operation the algorithm uses.
 *
 * @param {number} a a
 * @param {number} b b
 * @param {number} c c
 * @param {number} d d
 * @param {number} x x
 * @param {number} s s
 * @param {number} t t
 * @returns {number} Result
 */
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
/**
 * Basic operation the algorithm uses.
 *
 * @param {number} a a
 * @param {number} b b
 * @param {number} c c
 * @param {number} d d
 * @param {number} x x
 * @param {number} s s
 * @param {number} t t
 * @returns {number} Result
 */
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
/**
 * Basic operation the algorithm uses.
 *
 * @param {number} a a
 * @param {number} b b
 * @param {number} c c
 * @param {number} d d
 * @param {number} x x
 * @param {number} s s
 * @param {number} t t
 * @returns {number} Result
 */
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 *
 * @param {Array} x Array of little-endian words
 * @param {number} len Bit length
 * @returns {Array<number>} MD5 Array
 */
function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
}
/**
 * Convert an array of little-endian words to a string
 *
 * @param {Array<number>} input MD5 Array
 * @returns {string} MD5 string
 */
function binl2rstr(input) {
    var i;
    var output = "";
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
    }
    return output;
}
/**
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 *
 * @param {string} input Raw input string
 * @returns {Array<number>} Array of little-endian words
 */
function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
}
/**
 * Calculate the MD5 of a raw string
 *
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
/**
 * Calculates the HMAC-MD5 of a key and some data (raw strings)
 *
 * @param {string} key HMAC key
 * @param {string} data Raw input string
 * @returns {string} Raw MD5 string
 */
function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
/**
 * Convert a raw string to a hex string
 *
 * @param {string} input Raw input string
 * @returns {string} Hex encoded string
 */
function rstr2hex(input) {
    var hexTab = "0123456789abcdef";
    var output = "";
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
}
/**
 * Encode a string as UTF-8
 *
 * @param {string} input Input string
 * @returns {string} UTF8 string
 */
function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
}
/**
 * Encodes input string as raw MD5 string
 *
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
}
/**
 * Encodes input string as Hex encoded string
 *
 * @param {string} s Input string
 * @returns {string} Hex encoded string
 */
function hexMD5(s) {
    return rstr2hex(rawMD5(s));
}
/**
 * Calculates the raw HMAC-MD5 for the given key and data
 *
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
/**
 * Calculates the Hex encoded HMAC-MD5 for the given key and data
 *
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
}
/**
 * Calculates MD5 value for a given string.
 * If a key is provided, calculates the HMAC-MD5 value.
 * Returns a Hex encoded string unless the raw argument is given.
 *
 * @param {string} string Input string
 * @param {string} [key] HMAC key
 * @param {boolean} [raw] Raw output switch
 * @returns {string} MD5 output
 */
function md5(string, key, raw) {
    if (!key) {
        if (!raw) {
            return hexMD5(string);
        }
        return rawMD5(string);
    }
    if (!raw) {
        return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
}
/*
  if (typeof define === "function" && define.amd) {
    define(function () {
      return md5;
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = md5;
  } else {
    $.md5 = md5;
  }
*/
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
    key: siteConfig.google.recaptcha.key,
    api: "https://www.google.com/recaptcha/api.js?render=" + this.key + "&render=explicit",
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: function (key) {
        reCaptcha.key = key;
        reCaptcha.api = "https://www.google.com/recaptcha/api.js?render=" + key + "&render=explicit";
        return reCaptcha;
    },
    /**
     * Start recaptcha
     */
    start: function () {
        reCaptcha.reCaptcha_buttons(true, function () {
            LoadScript({
                url: "https://www.google.com/recaptcha/api.js?render=" + reCaptcha.key + "&render=explicit",
                callback: function () {
                    grecaptcha.ready(function () {
                        var msg = "first_start_" +
                            location.href
                                .replace(/[^a-zA-Z0-9 ]/g, "_")
                                .replace(/\_{2,99}/g, "_")
                                .replace(/\_$/g, "");
                        reCaptcha.exec(msg);
                    });
                },
            });
        });
    },
    /**
     * Initialize Recaptcha by defining jquery
     */
    init: function () {
        if (typeof jQuery == "undefined" || typeof jQuery == "undefined") {
            LoadScript({
                url: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
                callback: reCaptcha.start,
            });
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
        if (retry === void 0) {
            retry = false;
        }
        if (callback === void 0) {
            callback = null;
        }
        //console.log('gtag is ' + typeof gtag);
        if (typeof gtag == "function") {
            gtag("event", "recaptcha", {
                action: action,
            });
        }
        if (typeof grecaptcha == "undefined" || typeof grecaptcha.execute != "function") {
            if (typeof toastr == "undefined") {
                console.error("recaptcha not loaded");
            }
            else {
                toastr.error("recaptcha not loaded, retrying...", "captcha information");
            }
            for (var index_2 = 0; index_2 < 3; index_2++) {
                reCaptcha.exec(action, true);
                if (index_2 == 3 - 1) {
                    toastr.error("recaptcha has reached limit", "captcha information");
                }
            }
            return;
        }
        if (retry) {
            if (typeof toastr == "undefined") {
                console.info("recaptcha loaded successfully");
            }
            else {
                toastr.success("recaptcha loaded successfully", "captcha information");
            }
        }
        reCaptcha.gexec_count++;
        var execute = grecaptcha.execute(reCaptcha.key, {
            action: action || "location.href",
        });
        if (!execute) {
            if (typeof toastr != "undefined") {
                toastr.error("failed getting token");
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
                console.info(token);
                reCaptcha.insert(token);
                if (typeof callback == "function") {
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
        //framework().sc("token", token, 1);
        if (typeof jQuery == "undefined") {
            console.log("jQuery Not Loaded");
            LoadScript({
                url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
                callback: function () {
                    reCaptcha.distribute_token(token);
                },
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
        var form = $("form");
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
            var vr = gr[0].getAttribute("value");
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
        $('button,[type="submit"],input')
            .not('[data-recaptcha="no-action"]')
            .not("[recaptcha-exclude]")
            .each(function (i, e) {
            if ($(this).attr("type") == "radio") {
                return;
            }
            if (reCaptcha_disable) {
                if ($(this).is(":disabled")) {
                    $(this).attr("recaptcha-exclude", makeid(5));
                }
            }
            $(this).prop("disabled", reCaptcha_disable);
        });
        if (typeof callback == "function") {
            callback();
        }
    },
};
/**
 * Hidden reCaptcha v3 object initializer
 */
function recaptcha() {
    return reCaptcha;
}
var requirejs_vendor = "/node_modules";
var require_config = {
    paths: {
        app: "../require",
        jquery: requirejs_vendor + "/jquery/dist/jquery.min",
        "jquery-ui": "//code.jquery.com/ui/1.11.4/jquery-ui",
        "jquery-migrate": "//code.jquery.com/jquery-migrate-git.min",
        //DataTables
        "datatables.net": requirejs_vendor + "/datatables.net/js/jquery.dataTables.min",
        "datatables.net-bs4": requirejs_vendor + "/datatables.net-bs4/js/datatables.bootstrap4.min",
        "datatables.net-autofill": requirejs_vendor + "/datatables.net-autofill/js/dataTables.autoFill.min",
        "datatables.net-buttons": requirejs_vendor + "/datatables.net-buttons/js/dataTables.buttons.min",
        "datatables.net-buttons-html5": requirejs_vendor + "/datatables.net-buttons/js/buttons.html5.min",
        "datatables.net-buttons-flash": requirejs_vendor + "/datatables.net-buttons/js/buttons.flash.min",
        "datatables.net-buttons-print": requirejs_vendor + "/datatables.net-buttons/js/buttons.print.min",
        "datatables.net-colreorder": requirejs_vendor + "/datatables.net-colreorder/js/dataTables.colReorder.min",
        "datatables.net-rowreorder": requirejs_vendor + "/datatables.net-rowreorder/js/dataTables.rowReorder.min",
        "datatables.net-scroller": requirejs_vendor + "/datatables.net-scroller/js/dataTables.scroller.min",
        "datatables.net-select": requirejs_vendor + "/datatables.net-select/js/dataTables.select.min",
        "datatables.net-responsive": requirejs_vendor + "/datatables.net-responsive/js/dataTables.responsive.min",
        "datatables.net-editor": "https://editor.datatables.net/extensions/Editor/js/dataTables.editor.min",
        //select2
        select2: requirejs_vendor + "/select2/dist/js/select2.full.min",
    },
    shim: {
        /**
         * jQuery Compatibility
         */
        jquery: {
            exports: "$",
        },
        "datatables.net": {
            deps: ["jquery"],
        },
    },
    css: {
        select2: requirejs_vendor + "/select2/dist/css/select2.min",
    },
};
var dtpackage = function () {
    return [
        "datatables.net",
        "datatables.net-colreorder",
        "datatables.net-rowreorder",
        "datatables.net-scroller",
        "datatables.net-select",
        "datatables.net-buttons",
        "datatables.net-buttons-html5",
    ];
};
var requirejs_ignited = false;
if (!isnode()) {
    function downloadRequireJS(win, event) {
        return new Promise(function (resolve) {
            console.log("Loading RequireJS using", event);
            if (!requirejs_ignited) {
                var element = document.createElement("script");
                element.src = "/node_modules/requirejs/require.js";
                element.onload = element.onreadystatechange = function () {
                    if (typeof requirejs != "undefined") {
                        console.log("requirejs ignited and loaded successfuly");
                        requirejs.config(require_config);
                    }
                    resolve(true);
                };
                document.body.appendChild(element);
            }
        });
    }
}
/**
 * Load requirejs
 */
function load_requirejs() {
    if (!requirejs_ignited) {
        console.info("RequireJS not loaded, loading them now");
        return downloadRequireJS();
    }
    else {
        console.info("RequireJS already ignited");
    }
}
/**
 * Load Modules From node_modules folder
 * @param name
 * @param callback
 */
function load_module(name, callback) {
    if (typeof name == "string") {
        name = [name];
    }
    var scripts_List = [];
    var style_List = [];
    var htm = document.querySelector("html");
    var cache = htm.getAttribute("cache").toString().trim();
    cache = cache.length ? "?cache=" + cache : "";
    for (var key in require_config.paths) {
        if (require_config.paths.hasOwnProperty(key)) {
            var element_1 = require_config.paths[key];
            if (name.includes(key)) {
                scripts_List.push(element_1 + ".js" + cache);
                if (require_config.css.hasOwnProperty(key)) {
                    style_List.push(require_config.css[key] + ".css");
                }
            }
        }
    }
    //console.log(scripts_List);
    if (!style_List.length) {
        LoadScript({ url: scripts_List, callback: callback });
    }
    else {
        LoadScript({
            url: scripts_List,
            callback: function () {
                loadCSS(style_List, callback);
            },
        });
    }
}
/**
 * Datatables loader
 * @param callback
 */
function load_datatables(callback) {
    LoadScript({
        url: [
            "/assets/mdb-dashboard/js/addons/datatables.min.js",
            "/assets/mdb-dashboard/js/addons/datatables-select.min.js",
            //"/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js",
            "/node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.min.js",
            "/node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
            "/node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
            "/node_modules/datatables.net-buttons/js/buttons.print.min.js",
        ],
        options: {
            type: "text/javascript",
        },
        callback: function () {
            loadCSS([
                "/src/MVC/themes/assets/partial/datatables.min.css",
                "/assets/mdb-dashboard/css/addons/datatables-select.min.css",
                "/assets/mdb-dashboard/css/addons/datatables.min.css",
                "https://cdn.datatables.net/responsive/2.2.5/css/responsive.dataTables.min.css",
                "https://cdn.datatables.net/rowreorder/1.2.7/css/rowReorder.dataTables.min.css",
            ], null);
            datatables_init().then(function () {
                var dtl = $(".dataTables_length");
                var toolbar = $("div.dt-toolbar");
                var button = $("button.dt-button").not(".btn");
                setTimeout(function () {
                    if (button.length) {
                        button.addClass("btn btn-info");
                    }
                    if (dtl.length) {
                        dtl.addClass("bs-select");
                    }
                    if (toolbar.length) {
                        toolbar.html("");
                    }
                }, 5000);
                if (typeof callback == "function") {
                    callback();
                }
            });
        },
    });
}
var datatables_ignited = false;
/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
function datatables_init() {
    return new Promise(function (resolve, reject) {
        if (datatables_ignited) {
            console.error("datatables already ignited");
        }
        else {
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
                console.info("datatables ignited successfully");
                datatables_ignited = true;
            }
            else {
                console.error("Datatables not loaded");
            }
        }
        resolve(true);
    });
}
var optimized_ids = [];
/**
 * Optimize Material Datatables
 * @param id id table
 * @param callback additional function to optimizer
 */
function datatables_optimize(id, callback) {
    if (optimized_ids.includes(id)) {
        console.error("Datatables #" + id + " already optimized");
        return;
    }
    optimized_ids.push(id);
    $("#" + id + "_wrapper")
        .add("#pkgList_wrapper")
        .find("label")
        .each(function () {
        $(this).parent().append($(this).children());
    });
    $("#" + id + "_wrapper .dataTables_filter")
        .find("input")
        .each(function () {
        var $this = $(this);
        $this.attr("placeholder", "Search");
        $this.removeClass("form-control-sm");
    });
    $("#" + id + "_wrapper .dataTables_length")
        .add("#pkgList_wrapper .dataTables_length")
        .addClass("d-flex flex-row");
    $("#" + id + "_wrapper .dataTables_filter")
        .add("#pkgList_wrapper .dataTables_filter")
        .addClass("md-form");
    $("#" + id + "_wrapper select")
        .add("#pkgList_wrapper select")
        .removeClass("custom-select custom-select-sm form-control form-control-sm");
    $("#" + id + "_wrapper select")
        .add("#pkgList_wrapper select")
        .addClass("mdb-select");
    if (typeof $.fn.materialSelect == "function") {
        $("#" + id + "_wrapper .mdb-select")
            .add("#pkgList_wrapper .mdb-select")
            .materialSelect();
    }
    $("#" + id + "_wrapper .dataTables_filter")
        .add("#pkgList_wrapper .dataTables_filter")
        .find("label")
        .remove();
    if (typeof callback == "function") {
        callback();
    }
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
/**
 * Optimize Datatables Columns Options
 * @param data
 * @param exclude
 */
function datatables_colums_options(data, exclude) {
    if (!data.hasOwnProperty("defaultContent") && exclude && !exclude.includes("defaultContent")) {
        data.defaultContent = "<i>Not set</i>";
    }
    if (!data.hasOwnProperty("render") && exclude && !exclude.includes("render")) {
        data.render = function (data, type, row, meta) {
            if (["string", "number"].includes(typeof data) || Array.isArray(data)) {
                if (!data.length) {
                    return data.defaultContent;
                }
            }
            if (!data) {
                return data.defaultContent;
            }
            else {
                return data;
            }
        };
    }
}
var ctable = /** @class */ (function () {
    function ctable(config) {
        this.can_edit = null;
        this.instance = null;
        this.editable_run = false;
        if (typeof config == "object") {
            if (config.hasOwnProperty("editable") && config.editable) {
                this.can_edit = true;
            }
        }
    }
    ctable.prototype.editable = function (activate) {
        var self = this;
        if (this.editable_run) {
            return;
        }
        if (activate && self.instance && self.instance.length) {
            this.editable_run = true;
            $(document).on("click", ".table-add", function (e) {
                e.preventDefault();
                var $clone = self.instance
                    .find("tr.addthis")
                    .clone(true)
                    .removeClass("d-none");
                self.instance.find("table").append($clone);
            });
            $(".table-remove").click(function () {
                $(this).parents("tr").detach();
            });
            $(".table-up").click(function () {
                var $row = $(this).parents("tr");
                if ($row.index() === 1)
                    return; // Don't go above the header
                $row.prev().before($row.get(0));
            });
            $(".table-down").click(function () {
                var $row = $(this).parents("tr");
                $row.next().after($row.get(0));
            });
        }
    };
    ctable.prototype.create = function (id, where, data) {
        var table = "<table id='" + id + "' class='table table-responsive' style=\"position:relative\"><thead><tr>";
        var self = this;
        for (var i = 0; i < data.length; i++) {
            table = table + "<th>" + data[i] + "</th>";
        }
        table = table + "</tr></thead><tbody></tbody></table>";
        document.getElementById(where).innerHTML += table;
        if (this.can_edit) {
            setTimeout(function () {
                self.instance = $("table#" + id);
                self.instance.append("<span class=\"table-add fas fa-plus text-success\" style=\"position: absolute;right:15px;top:15px;cursor:pointer\"></span>");
                self.instance.find("tbody").append("<tr class=\"addthis d-none\">\n        <td contenteditable=\"true\">Untitled</td>\n        <td contenteditable=\"true\">Undocumented</td>\n        <td><span class=\"table-remove fas fa-trash text-danger\" style=\"cursor:pointer\"></span></td><td> <span class=\"table-up fas fa-arrow-up text-info\" style=\"cursor:pointer\"></span> <span class=\"table-down fas fa-arrow-down text-info\" style=\"cursor:pointer\"></span> </td>\n      </tr>");
                self.editable(true);
            }, 500);
        }
    };
    ctable.prototype.add = function (table, data) {
        var row = "<tr>";
        for (var i = 0; i < data.length; i++) {
            var td = data[i];
            if (typeof td == "object" || Array.isArray(td)) {
                td = "<pre class=\"json\">" + JSON.stringify(td, null, 2) + "</pre>";
            }
            if (!this.can_edit) {
                row += "<td>" + td + "</td>";
            }
            else {
                row += '<td contenteditable="true">' + td + "</td>";
            }
        }
        if (this.can_edit) {
            row += "<td><span class=\"table-remove fas fa-trash text-danger\" style=\"cursor:pointer\"></span></td><td> <span class=\"table-up fas fa-arrow-up text-info\" style=\"cursor:pointer\"></span> <span class=\"table-down fas fa-arrow-down text-info\" style=\"cursor:pointer\"></span> </td>";
        }
        row += "</tr>";
        document
            .getElementById(table)
            .getElementsByTagName("tbody")[0].innerHTML += row;
    };
    return ctable;
}());
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
     * @param callback
     * @returns
     */
    user.prototype.fetch = function (callback) {
        var ini = this;
        return $.ajax({
            url: "/server/user",
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
    if (typeof window != "undefined" && typeof window.user === "undefined") {
        window.user = userc;
    }
    if (typeof jQuery != "undefined") {
        jQuery.user = userc;
    }
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
    for (var index_3 = 0; index_3 < 1000; index_3++) {
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
if (typeof window != "undefined") {
    ip.storage = new STORAGE();
    //dimas.setIp(ip.get());
    //console.log(`ip ${dimas.ip}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZnJhbWV3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDbkYsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUNyRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzNGLFNBQVMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUM5RixTQUFTLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3hELEtBQUssQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRCxLQUFLLENBQUM7d0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRDt3QkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQUMsU0FBUzt5QkFBRTt3QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU07eUJBQUU7d0JBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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SSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxF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aEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNB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QUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFDRCxJQUFJLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzNDLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDVixTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0NBQ0w7QUFDRDs7R0FFRztBQUNILFNBQVMsTUFBTTtJQUNYLE9BQU8sc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7UUFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FB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QUksQ0FBQztJQUNULElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRDs7Ozs7R0FLRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQUs7SUFDcEIsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDakMsS0FBSyxD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