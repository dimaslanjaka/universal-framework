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
     * @param days days to expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
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
        //console.info(`cookie formated: ` + formatted);
        document.cookie = formatted;
        if (typeof callback == "function") {
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
    return ((useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "&hellip;");
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
/// <reference path="_Prototype-String.ts"/>
/// <reference path="_Prototype-Object.ts"/>
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
        this.check();
        //console.log(this.status(null));
        var ips = this.storage.get(cookie_ip);
        //ips = Cookies.get(cookie_ip);
        if (typeof callback == "function") {
            return callback(ips);
        }
        return ips;
    };
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
    var tmpArray = new Array();
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
            : st2(f.caller).concat([
                f.toString().split("(")[0].substring(9) +
                    "(" +
                    f.arguments.join(",") +
                    ")",
            ]);
    }
    return st2(arguments.callee.caller);
}
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
    return (document.getElementsByTagName("html")[0].getAttribute("environtment") ==
        "development");
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
else {
    global.generateRandomString = generateRandomString;
}
/**
 * Create uniqueid with prefix or suffix
 * @param prefix
 * @param suffix
 */
function uniqid(prefix, suffix) {
    return ((prefix ? prefix : "") +
        generateRandomString() +
        (suffix ? suffix : "")).toString();
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
    if (typeof total_amount_string != "undefined" ||
        total_amount_string != null) {
        total_amount_int = parseFloat(total_amount_string.replace(/,/g, ".")).toFixed(2);
    }
    return parseFloat(total_amount_int);
}
function typedKeys(o) {
    // type cast should be safe because that's what really Object.keys() does
    return Object.keys(o);
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
var ORIGIN = null;
if (isnode()) {
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
    /**
     * Disabling button
     * @param t element of button
     * @param V
     */
    dimas.prototype.disable_button = function (t, V) {
        if (V === void 0) {
            V = null;
        }
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
    };
    /**
     * Enabling button
     * @param t element of button
     * @param V
     */
    dimas.prototype.enable_button = function (t, V) {
        if (V === void 0) {
            V = null;
        }
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
    };
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
     * Rupiah currency auto format
     */
    dimas.prototype.rp = function (angka, prefix) {
        if (prefix === void 0) {
            prefix = null;
        }
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
    };
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    dimas.prototype.isNumber = function (v) {
        return (!isNaN(parseInt(v.toString()) - parseFloat(v.toString())) &&
            /^\d+$/.test(v.toString()));
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
     * strpad / startwith zero [0]
     * @param {number} val
     */
    dimas.prototype.strpad = function (val) {
        if (val >= 10) {
            return val;
        }
        else {
            return "0" + val;
        }
    };
    /**
     * Autofill datetime-local value
     */
    dimas.prototype.datetimelocal = function (v) {
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
    };
    /**
     * Get cookie
     * @param string name cookie
     */
    dimas.prototype.gc = function (name) {
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
    };
    /**
     * Odd or Even (Ganjil Genap);
     * @param type odd or even
     */
    dimas.prototype.oddoreven = function (n, type) {
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
    };
    /**
     * Set cookie
     * @param {String} name
     * @param {any} value
     * @param {number} hours
     */
    dimas.prototype.sc = function (name, value, hours) {
        var expires = "";
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + hours * 3600 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };
    dimas.prototype.allcookies = function () {
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            var str = pair[0].trim();
            cookies[str] = unescape(pair.slice(1).join("="));
        }
        return cookies;
    };
    /**
     * Remove Cookie
     */
    dimas.prototype.rc = function (name) {
        document.cookie = name + "=; Max-Age=-99999999;";
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
    };
    /**
     * Get js file from url
     * @param {String} url
     * @param {Function} callback
     */
    dimas.prototype.js = function (url, callback) {
        var pel = document.body || document.head;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (typeof callback == "function")
            script.onreadystatechange = callback;
        script.onload = callback;
        pel.appendChild(script);
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
        var t = this;
        if (typeof progressBarTimer == "undefined") {
            this.js("https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/js/jquery.progressBarTimer.js", function () {
                t.pctdRUN(elm);
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
            this.js("" + app.base + src + parsed.search, function () {
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
                this.js("" + app.base + src + parsed.search, function () {
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
        framework().js("//" + disqus_shortname + ".disqus.com/embed.js", null);
        disqus_trigger.remove();
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
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(urls, callback) {
    var loaded = [];
    if (typeof urls == "string") {
        urls = [urls];
    }
    if (!urls) {
        console.error("LoadScript must be load an javascript url");
    }
    if (Array.isArray(urls)) {
        var lists = urls;
        //console.log(`Script in queue ${lists.length}`);
        var callthis = function (event) {
            console.log(this.readyState, event);
            loaded.push(true);
            lists.shift();
            if (!lists.length) {
                callback();
            }
            if (lists.length) {
                LoadScript(lists, callback);
            }
        };
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = urls[0];
        script.async = true;
        script.defer = true;
        //console.info(`loading script(${script.src})`);
        script.onload = script.onreadystatechange = callthis;
        script.onerror = function () {
            loaded.push(false);
            console.error("error while loading " + script.src);
        };
        script.onabort = function () {
            loaded.push(false);
            console.error("error while loading " + script.src);
        };
        script.oncancel = function () {
            loaded.push(false);
            console.error("error while loading " + script.src);
        };
        document.body.appendChild(script);
    }
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
        inputrp.on("keyup keydown change", function (e) {
            var t = $(this);
            var v = t.val().toString();
            var n = t.next(".form-text, #rupiah");
            if (framework().isNumber(v.toString())) {
                var V = framework().rp(parseNumber(v));
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
    key: "6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie",
    /**
     * Javascript caller
     * @param {String} url
     * @param {Function} callback
     */
    js: function (url, callback) {
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
            reCaptcha.js("https://www.google.com/recaptcha/api.js?render=" +
                reCaptcha.key +
                "&render=explicit", function () {
                grecaptcha.ready(function () {
                    var msg = "first_start_" +
                        location.href
                            .replace(/[^a-zA-Z0-9 ]/g, "_")
                            .replace(/\_{2,99}/g, "_")
                            .replace(/\_$/g, "");
                    reCaptcha.exec(msg);
                });
            });
        });
    },
    /**
     * Initialize Recaptcha by defining jquery
     */
    init: function () {
        if (typeof jQuery == "undefined" || typeof jQuery == "undefined") {
            reCaptcha.js("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js", reCaptcha.start);
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
        if (typeof gtag == "function") {
            gtag("event", "recaptcha", {
                action: action,
            });
        }
        if (typeof grecaptcha == "undefined" ||
            typeof grecaptcha.execute != "function") {
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
        else if (retry) {
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
                //console.info(token);
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
        framework().sc("token", token, 1);
        if (typeof jQuery == "undefined") {
            console.log("jQuery Not Loaded");
            reCaptcha.js("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", function () {
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
        var form = $("form");
        form.each(function (i, el) {
            var fg = $(this).find('[name="g-recaptcha-response"]');
            console.log(fg.length);
            if (!fg.length) {
                $('<input type="hidden" readonly value="' +
                    token +
                    '" name="g-recaptcha-response">').appendTo($(this));
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
        "datatables.net-colreorder": requirejs_vendor +
            "/datatables.net-colreorder/js/dataTables.colReorder.min",
        "datatables.net-rowreorder": requirejs_vendor +
            "/datatables.net-rowreorder/js/dataTables.rowReorder.min",
        "datatables.net-scroller": requirejs_vendor + "/datatables.net-scroller/js/dataTables.scroller.min",
        "datatables.net-select": requirejs_vendor + "/datatables.net-select/js/dataTables.select.min",
        "datatables.net-responsive": requirejs_vendor +
            "/datatables.net-responsive/js/dataTables.responsive.min",
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
        LoadScript(scripts_List, callback);
    }
    else {
        LoadScript(scripts_List, function () {
            loadCSS(style_List, callback);
        });
    }
}
/**
 * Datatables loader
 * @param callback
 */
function load_datatables(callback) {
    LoadScript([
        "/assets/mdb-dashboard/js/addons/datatables.min.js",
        "/assets/mdb-dashboard/js/addons/datatables-select.min.js",
        //"/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js",
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
    if (!data.hasOwnProperty("defaultContent") &&
        exclude &&
        !exclude.includes("defaultContent")) {
        data.defaultContent = "<i>Not set</i>";
    }
    if (!data.hasOwnProperty("render") &&
        exclude &&
        !exclude.includes("render")) {
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
    dimas.setIp(ip.get());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZnJhbWV3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDbkYsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUNyRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzNGLFNBQVMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUM5RixTQUFTLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3hELEtBQUssQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRCxLQUFLLENBQUM7d0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRDt3QkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQUMsU0FBUzt5QkFBRTt3QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU07eUJBQUU7d0JBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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QUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5TSxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUNwRCxDQUFDLENBQUM7SUFDRjs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDbEMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FB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TUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBQ0QsSUFBSSxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUMzQyxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1YsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztDQUNMO0FBQ0Q7O0dBRUc7QUFDSCxTQUFTLE1BQU07SUFDWCxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckUsT0FBTyxDQUFDLENBQUMs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QUM7SUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDcEIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENB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