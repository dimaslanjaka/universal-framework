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
    Cookies.logging = function () {
        if (empty(this.logged)) {
            Cookies.set("cl", JSON.stringify(this.logged), "1d");
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
        var nameOffset = void 0, verOffset = void 0, ix = void 0;
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
     * Gets ip
     * @param callback function callback(ip) or null return ip
     * @returns {String} ip or callback
     */
    ip.get = function (callback) {
        if (callback === void 0) {
            callback = null;
        }
        this.check().then(function () {
        });
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
var root;
//declare let global: any;
(function () {
    if (typeof global == "undefined" || (global && !global)) {
        global = this;
    }
    // Establish the root object, `window` in the browser, or `global` on the server.
    root = this;
})();
/**
 * Is Node ?
 */
function isnode() {
    return typeof module !== "undefined" && module.exports;
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
 * Console Controller
 */
var console_callback;
if (typeof console != "undefined") {
    if (typeof console.log != "undefined") {
        console.olog = console.log;
    }
    else {
        console.olog = function () {
        };
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
    var AJAX_1 = null;
    /**
     * Ajax dump base
     */
    var dumpAjax_1 = false;
    /**
     * Ajax indicator base
     */
    var indicatorAjax_1 = false;
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
        indicatorAjax_1 =
            typeof options.indicator == "boolean" && options.indicator === true;
        dumpAjax_1 = typeof options.dump == "boolean" && options.dump === true;
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
        if (dumpAjax_1) {
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
        if (dumpAjax_1) {
            toastr.success("Request complete", "Request Info");
        }
        AJAX_1 = null;
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
            //AJAX = null;
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
            catch (e) {
            }
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
/// <reference path="./globals.d.ts" />
var gtag = null;
if (!isnode()) {
    var gtagID_1 = siteConfig.google.analystics.id;
    var create_gtagscript = document.createElement("script");
    create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID_1;
    create_gtagscript.async = true;
    document.getElementsByTagName("body")[0].appendChild(create_gtagscript);
    window.onload = function () {
        if (window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            gtag = function () {
                window.dataLayer.push(arguments);
            };
            gtag("js", new Date());
            gtag("config", gtagID_1, {
                page_title: document.title,
                page_path: location.pathname,
            });
            gtag("event", "page_view", {
                send_to: gtagID_1,
            });
            gtag("config", "UA-106238155-1", {
                cookie_prefix: "GoogleAnalystics",
                cookie_domain: location.host,
                cookie_update: false,
                cookie_expires: 28 * 24 * 60 * 60,
            });
            var trackLinks = document.getElementsByTagName("a");
            var _loop_1 = function (i, len) {
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
                _loop_1(i, len);
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
                type: "percent",
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
        callback: function (arg) {
        },
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
/// <reference path="./../js/globals.d.ts" />
/**
 * @see https://gist.githubusercontent.com/tmrk/4aa3cf285360526a98b2115d63e0cafd/raw/5e74803dcf33923257d081433ec92ba93765e3f3/countries.js
 * @global
 * iso countries
 */
var isoCountries = [
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
 * iso languanges using wikipedia data
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
 * Get ISO Langs
 * @returns
 */
function getIsoLangs() {
    for (var key in isoLangs) {
        if (Object.prototype.hasOwnProperty.call(isoLangs, key)) {
            isoLangs[key].id = key;
            isoLangs[key].text = isoLangs[key].nativeName;
            isoLangs[key].img = "/server/img/flag?code=" + key;
        }
    }
    return Object.values(isoLangs);
}
function select2Langs(selectLang, select2Opt) {
    if (select2Opt === void 0) {
        select2Opt = {};
    }
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");
    var defaultOpt = {
        placeholder: "Select Article Language",
        templateResult: function (data) {
            if (data.hasOwnProperty("loading") && data.loading)
                return data.text;
            return $("<img class=\"flag-icon\" src=\"/server/img/flag?code=" + data.id + "\" alt=\"Language " + data.id + "\"/><span style=\"margin-left:10px\">" + data.text + "</span>");
        },
        data: getIsoLangs(),
    };
    var newOpt = Object.assign(defaultOpt, select2Opt);
    selectLang.select2(newOpt);
}
/**
 * Get Countries ISO
 * @returns
 */
function getIsoCountries() {
    return isoCountries;
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
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");
    var isoCountries = [];
    isoCountries.forEach(function (country) {
        isoCountries.add(Object.assign(country, { id: country.alpha2, text: country.name }));
    });
    var defaultOpt = {
        placeholder: "Select a country",
        templateResult: function (country) {
            //console.log(country);
            if (country.hasOwnProperty("loading") && country.loading)
                return country.text;
            return $('<span class="flag-icon flag-icon-' +
                country.id.toString().toLowerCase() +
                ' flag-icon-squared"></span>' +
                '<span class="flag-text" style="margin-left: 10px">' +
                country.text +
                "</span>");
        },
        data: isoCountries,
    };
    var newOpt = Object.assign(defaultOpt, select2Opt);
    el.select2(newOpt);
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.getCountries = getIsoCountries;
    module.exports.getLangs = getIsoLangs();
}
else {
    (function ($) {
        $.fn.select2Country = function (select2Opt) {
            select2Country($(this), select2Opt);
        };
        $.fn.select2LangCountry = function (select2Opt) {
            select2Langs($(this), select2Opt);
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
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
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
if (!isnode()) {
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
var loadedCss = [];
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
        var hrefs_1 = href;
        if (!loadedCss.contains(hrefs_1[0])) {
            var link_1 = document.createElement("link");
            link_1.media = "print";
            link_1.rel = "stylesheet";
            link_1.href = cache.length ? hrefs_1[0] + "?cache=" + cache : hrefs_1[0];
            link_1.onload = function () {
                link_1.media = "all";
                hrefs_1.shift();
                loadedCss.add(hrefs_1[0]);
                if (!hrefs_1.length) {
                    if (typeof callback == "function") {
                        callback(link_1, href);
                    }
                }
                else {
                    loadCSS(hrefs_1, callback);
                }
            };
            document.head.appendChild(link_1);
        }
        else {
            hrefs_1.shift();
            loadCSS(hrefs_1, callback);
        }
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
if (!isnode()) {
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
if (!isnode()) {
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
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLElement) {
        if (typeof jQuery != "undefined") {
            return jQuery(element).css({ height: "auto", "overflow-y": "hidden" }).height(element.scrollHeight);
        }
    }
}
/**
 * jQuery plugin only works on browser language
 */
if (!isnode()) {
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
                    onFinish: function () {
                    },
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
                var percentage = Number(width.toFixed(2));
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
/// <reference path="./Object.d.ts" />
/// <reference path="./globals.d.ts" />
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
        else if (typeof ga == "function") {
            ga("event", "recaptcha", {
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
                var element_1 = document.createElement("script");
                element_1.src = "/node_modules/requirejs/require.js";
                element_1.onload = element_1.onreadystatechange = function () {
                    if (typeof requirejs != "undefined") {
                        console.log("requirejs ignited and loaded successfuly");
                        requirejs.config(require_config);
                    }
                    resolve(true);
                };
                document.body.appendChild(element_1);
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
            var element_2 = require_config.paths[key];
            if (name.includes(key)) {
                scripts_List.push(element_2 + ".js" + cache);
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
if (!isnode()) {
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
if (!isnode()) {
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
if (!isnode()) {
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
    if (typeof dimas == "object" && typeof framework().datetimelocal != "undefined") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZnJhbWV3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDbkYsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUNyRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzNGLFNBQVMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUM5RixTQUFTLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3hELEtBQUssQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRCxLQUFLLENBQUM7d0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRDt3QkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQUMsU0FBUzt5QkFBRTt3QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU07eUJBQUU7d0JBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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QUFTO1FBQ2YsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRSxLQUFLO1FBQ2IsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEtBQUs7UUFDYixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNE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QUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFF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TUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMs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TUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEU7O0dBRUc7QUFDSCxTQUFTLElBQUk7SUFDVCxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUNELElBQUksT0FBTyxNQUFNLElBQUksV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDM0MsTUFBTSxDQUFDLElBQUksR0FBRztRQUNWLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUM7Q0FD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QUMsR0FBRyxHQUFHLENBQUM7SUFDeEMsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLElBQUksQ0FBQztJQUNULElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLElBQUksQ0FBQztJQUNULElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRDs7Ozs7R0FLRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQUs7SUFDcEIsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNEOzs7Ozs7R0FNRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQUs7SUFDcEIsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDNUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtJQUNELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDaEU7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNs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