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
/// <reference types="crypto-js" />
var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: "", s: "" };
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
 * @see /src/shim/Cipher.php
 * @param text
 * @param key
 * @returns
 */
function aesEncrypt(text, key) {
    var enc = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
        format: CryptoJSAesJson,
    }).toString();
    return base64_encode(enc);
}
/**
 * AES decrypt
 * @see /src/shim/Cipher.php
 * @param encrypted
 * @param key
 * @returns
 */
function aesDecrypt(encrypted, key) {
    var dec = base64_decode(encrypted);
    return JSON.parse(CryptoJS.AES.decrypt(dec, key, {
        format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8));
}
if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = {
        aesDecrypt: aesDecrypt,
        aesEncrypt: aesEncrypt,
    };
}
var CodeMirrorAddon = {
    "CodeMirror-comment-comment": {
        "js": "/node_modules/codemirror/addon/comment/comment.js"
    },
    "CodeMirror-comment-continuecomment": {
        "js": "/node_modules/codemirror/addon/comment/continuecomment.js"
    },
    "CodeMirror-dialog-dialog": {
        "css": "/node_modules/codemirror/addon/dialog/dialog.css",
        "js": "/node_modules/codemirror/addon/dialog/dialog.js"
    },
    "CodeMirror-display-autorefresh": {
        "js": "/node_modules/codemirror/addon/display/autorefresh.js"
    },
    "CodeMirror-display-fullscreen": {
        "css": "/node_modules/codemirror/addon/display/fullscreen.css",
        "js": "/node_modules/codemirror/addon/display/fullscreen.js"
    },
    "CodeMirror-display-panel": {
        "js": "/node_modules/codemirror/addon/display/panel.js"
    },
    "CodeMirror-display-placeholder": {
        "js": "/node_modules/codemirror/addon/display/placeholder.js"
    },
    "CodeMirror-display-rulers": {
        "js": "/node_modules/codemirror/addon/display/rulers.js"
    },
    "CodeMirror-edit-closebrackets": {
        "js": "/node_modules/codemirror/addon/edit/closebrackets.js"
    },
    "CodeMirror-edit-closetag": {
        "js": "/node_modules/codemirror/addon/edit/closetag.js"
    },
    "CodeMirror-edit-continuelist": {
        "js": "/node_modules/codemirror/addon/edit/continuelist.js"
    },
    "CodeMirror-edit-matchbrackets": {
        "js": "/node_modules/codemirror/addon/edit/matchbrackets.js"
    },
    "CodeMirror-edit-matchtags": {
        "js": "/node_modules/codemirror/addon/edit/matchtags.js"
    },
    "CodeMirror-edit-trailingspace": {
        "js": "/node_modules/codemirror/addon/edit/trailingspace.js"
    },
    "CodeMirror-fold-brace-fold": {
        "js": "/node_modules/codemirror/addon/fold/brace-fold.js"
    },
    "CodeMirror-fold-comment-fold": {
        "js": "/node_modules/codemirror/addon/fold/comment-fold.js"
    },
    "CodeMirror-fold-foldcode": {
        "js": "/node_modules/codemirror/addon/fold/foldcode.js"
    },
    "CodeMirror-fold-foldgutter": {
        "css": "/node_modules/codemirror/addon/fold/foldgutter.css",
        "js": "/node_modules/codemirror/addon/fold/foldgutter.js"
    },
    "CodeMirror-fold-indent-fold": {
        "js": "/node_modules/codemirror/addon/fold/indent-fold.js"
    },
    "CodeMirror-fold-markdown-fold": {
        "js": "/node_modules/codemirror/addon/fold/markdown-fold.js"
    },
    "CodeMirror-fold-xml-fold": {
        "js": "/node_modules/codemirror/addon/fold/xml-fold.js"
    },
    "CodeMirror-hint-anyword-hint": {
        "js": "/node_modules/codemirror/addon/hint/anyword-hint.js"
    },
    "CodeMirror-hint-css-hint": {
        "js": "/node_modules/codemirror/addon/hint/css-hint.js"
    },
    "CodeMirror-hint-html-hint": {
        "js": "/node_modules/codemirror/addon/hint/html-hint.js"
    },
    "CodeMirror-hint-javascript-hint": {
        "js": "/node_modules/codemirror/addon/hint/javascript-hint.js"
    },
    "CodeMirror-hint-show-hint": {
        "css": "/node_modules/codemirror/addon/hint/show-hint.css",
        "js": "/node_modules/codemirror/addon/hint/show-hint.js"
    },
    "CodeMirror-hint-sql-hint": {
        "js": "/node_modules/codemirror/addon/hint/sql-hint.js"
    },
    "CodeMirror-hint-xml-hint": {
        "js": "/node_modules/codemirror/addon/hint/xml-hint.js"
    },
    "CodeMirror-lint-coffeescript-lint": {
        "js": "/node_modules/codemirror/addon/lint/coffeescript-lint.js"
    },
    "CodeMirror-lint-css-lint": {
        "js": "/node_modules/codemirror/addon/lint/css-lint.js"
    },
    "CodeMirror-lint-html-lint": {
        "js": "/node_modules/codemirror/addon/lint/html-lint.js"
    },
    "CodeMirror-lint-javascript-lint": {
        "js": "/node_modules/codemirror/addon/lint/javascript-lint.js"
    },
    "CodeMirror-lint-json-lint": {
        "js": "/node_modules/codemirror/addon/lint/json-lint.js"
    },
    "CodeMirror-lint-lint": {
        "css": "/node_modules/codemirror/addon/lint/lint.css",
        "js": "/node_modules/codemirror/addon/lint/lint.js"
    },
    "CodeMirror-lint-yaml-lint": {
        "js": "/node_modules/codemirror/addon/lint/yaml-lint.js"
    },
    "CodeMirror-merge-merge": {
        "css": "/node_modules/codemirror/addon/merge/merge.css",
        "js": "/node_modules/codemirror/addon/merge/merge.js"
    },
    "CodeMirror-mode-loadmode": {
        "js": "/node_modules/codemirror/addon/mode/loadmode.js"
    },
    "CodeMirror-mode-multiplex": {
        "js": "/node_modules/codemirror/addon/mode/multiplex.js"
    },
    "CodeMirror-mode-multiplex_test": {
        "js": "/node_modules/codemirror/addon/mode/multiplex_test.js"
    },
    "CodeMirror-mode-overlay": {
        "js": "/node_modules/codemirror/addon/mode/overlay.js"
    },
    "CodeMirror-mode-simple": {
        "js": "/node_modules/codemirror/addon/mode/simple.js"
    },
    "CodeMirror-runmode-colorize": {
        "js": "/node_modules/codemirror/addon/runmode/colorize.js"
    },
    "CodeMirror-runmode-runmode-standalone": {
        "js": "/node_modules/codemirror/addon/runmode/runmode-standalone.js"
    },
    "CodeMirror-runmode-runmode": {
        "js": "/node_modules/codemirror/addon/runmode/runmode.js"
    },
    "CodeMirror-runmode-runmode.node": {
        "js": "/node_modules/codemirror/addon/runmode/runmode.node.js"
    },
    "CodeMirror-scroll-annotatescrollbar": {
        "js": "/node_modules/codemirror/addon/scroll/annotatescrollbar.js"
    },
    "CodeMirror-scroll-scrollpastend": {
        "js": "/node_modules/codemirror/addon/scroll/scrollpastend.js"
    },
    "CodeMirror-scroll-simplescrollbars": {
        "css": "/node_modules/codemirror/addon/scroll/simplescrollbars.css",
        "js": "/node_modules/codemirror/addon/scroll/simplescrollbars.js"
    },
    "CodeMirror-search-jump-to-line": {
        "js": "/node_modules/codemirror/addon/search/jump-to-line.js"
    },
    "CodeMirror-search-match-highlighter": {
        "js": "/node_modules/codemirror/addon/search/match-highlighter.js"
    },
    "CodeMirror-search-matchesonscrollbar": {
        "css": "/node_modules/codemirror/addon/search/matchesonscrollbar.css",
        "js": "/node_modules/codemirror/addon/search/matchesonscrollbar.js"
    },
    "CodeMirror-search-search": {
        "js": "/node_modules/codemirror/addon/search/search.js"
    },
    "CodeMirror-search-searchcursor": {
        "js": "/node_modules/codemirror/addon/search/searchcursor.js"
    },
    "CodeMirror-selection-active-line": {
        "js": "/node_modules/codemirror/addon/selection/active-line.js"
    },
    "CodeMirror-selection-mark-selection": {
        "js": "/node_modules/codemirror/addon/selection/mark-selection.js"
    },
    "CodeMirror-selection-selection-pointer": {
        "js": "/node_modules/codemirror/addon/selection/selection-pointer.js"
    },
    "CodeMirror-tern-tern": {
        "css": "/node_modules/codemirror/addon/tern/tern.css",
        "js": "/node_modules/codemirror/addon/tern/tern.js"
    },
    "CodeMirror-tern-worker": {
        "js": "/node_modules/codemirror/addon/tern/worker.js"
    },
    "CodeMirror-wrap-hardwrap": {
        "js": "/node_modules/codemirror/addon/wrap/hardwrap.js"
    }
};
/// <reference types="codemirror" />
/// <reference path="./Codemirror.d.ts" />
/// <reference path="./Codemirror-var.ts" />
var loadedTheme = null;
/**
 * CodeMirror script and style loader
 * @param opt
 */
function loadCodeMirrorScript(opt) {
    var scripts = ["/node_modules/codemirror/lib/codemirror.js"];
    if (opt.mode) {
        if (Array.isArray(opt.mode)) {
            opt.mode.forEach(function (mode) {
                scripts.push("/node_modules/codemirror/mode/" + mode + "/" + mode + ".js");
            });
        }
    }
    if (opt.addons) {
        if (Array.isArray(opt.addons)) {
            opt.addons.forEach(function (addon) {
                var ons = CodeMirrorAddon[addon];
                if (ons.hasOwnProperty("js")) {
                    scripts.push(ons.js);
                }
            });
        }
    }
    // load style codemirror
    loadCSS([
        "/node_modules/codemirror/lib/codemirror.css",
        "/assets/css/codemirror/style.css",
        "/node_modules/codemirror/theme/" + opt.theme + ".css",
    ], function () {
        // set loadedTheme
        loadedTheme = opt.theme;
    });
    // load script codemirror
    var conf = {
        url: scripts,
        options: {
            type: "text/javascript",
        },
        callback: opt.callback,
    };
    LoadScript(conf);
}
/**
 * CodeMirror element initializer
 * @param opt
 */
function initCodeMirror(opt) {
    var defaultOverride = {
        lineNumbers: true,
        mode: opt.mode,
        selectionsMayTouch: true,
        /*
         smartIndent: true,
         lineWrapping: true,
         showCursorWhenSelecting: true,
         matchHighlight: true,*/
    };
    defaultOverride = Object.assign(defaultOverride, opt.override);
    var editor = CodeMirror.fromTextArea(opt.element, defaultOverride);
    if (typeof loadedTheme == "string")
        editor.setOption("theme", loadedTheme);
    if (typeof opt.callback == "function") {
        opt.callback(opt.element);
    }
    return editor;
}
function codeMirrorRandomTheme() {
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
    return themes[Math.floor(Math.random() * themes.length)];
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
/// <reference lib="dom" />
/**
 * Serialize all form data into an array of key/value pairs
 * (c) 2020 Chris Ferdinandi, MIT License, [https://gomakethings.com]{@link https://gomakethings.com}
 * @param form The form to serialize
 * @return The serialized form data
 * @see [Codepen Demo]{@link https://codepen.io/cferdinandi/pen/VwvMdOG}
 * @see [Source Code]{@link https://vanillajstoolkit.com/helpers/serializearray/}
 * @example
 * var form = document.querySelector('#FormID');
 * var data = serializeArray(form);
 * console.log(data);
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
function serializeArray(form) {
    var arr = [];
    Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (!field.name || field.disabled || ["file", "reset", "submit", "button"].indexOf(field.type) > -1)
            return;
        if (field.type === "select-multiple") {
            Array.prototype.slice.call(field.options).forEach(function (option) {
                if (!option.selected)
                    return;
                arr.push({
                    name: field.name,
                    value: option.value,
                });
            });
            return;
        }
        if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked)
            return;
        arr.push({
            name: field.name,
            value: field.value,
        });
    });
    return arr;
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
/// <reference path="../src/smartform/src/js/_a_Object.d.ts"/>
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
 * Automatically expand a textarea as the user types
 * (c) 2021 Chris Ferdinandi, MIT License, [https://gomakethings.com]{@link https://gomakethings.com}
 * @param field The textarea
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function autoExpand(field) {
    // Reset field height
    field.style.height = 'inherit';
    // Get the computed styles for the element
    var computed = window.getComputedStyle(field);
    // Calculate the height
    var height = parseFloat(computed.paddingTop) +
        field.scrollHeight +
        parseFloat(computed.paddingBottom);
    field.style.height = height + 'px';
}
/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 * @see https://stackoverflow.com/a/901144
 * @returns
 * @example
 * ```js
 * // query string: ?foo=lorem&bar=&baz
 * var foo = getParameterByName('foo'); // "lorem"
 * var bar = getParameterByName('bar'); // "" (present with empty value)
 * var baz = getParameterByName('baz'); // "" (present with no value)
 * var qux = getParameterByName('qux'); // null (absent)
 * ```
 */
function getParameterByName(name, url) {
    if (url === void 0) {
        url = null;
    }
    if (typeof URLSearchParams !== "undefined") {
        if (!window.location.search) {
            url = window.location.href;
        }
        else {
            url = window.location.search;
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
 * Unset array
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
/**
 * Deep merge two or more objects into the first.
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param objects  The objects to merge together
 * @returns Merged values of defaults and options
 */
function deepAssign() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    // Make sure there are objects to merge
    var len = objects.length;
    if (len < 1)
        return;
    if (len < 2)
        return objects[0];
    // Merge all objects into first
    for (var i = 1; i < len; i++) {
        for (var key in objects[i]) {
            if (objects[i].hasOwnProperty(key)) {
                // If it's an object, recursively merge
                // Otherwise, push to key
                if (Object.prototype.toString.call(objects[i][key]) === "[object Object]") {
                    objects[0][key] = deepAssign(objects[0][key] || {}, objects[i][key]);
                }
                else {
                    objects[0][key] = objects[i][key];
                }
            }
        }
    }
    return arguments[0];
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        array_shuffle: array_shuffle,
        array_keys: array_keys,
        in_array: in_array,
        deepAssign: deepAssign,
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
    var self = this;
    others.forEach(function (e) {
        self.push(e);
    });
    return self;
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
if (typeof document != "undefined") {
    Document.prototype.listen = function (eventType, listener, options) {
        if (options === void 0) {
            options = {};
        }
        if (this.addEventListener) {
            this.addEventListener(eventType, listener, options);
        }
        else if (this.attachEvent) {
            this.attachEvent("on" + eventType, listener, options);
        }
    };
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
/**
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, [https://gomakethings.com]{@link https://gomakethings.com}
 * @param  {Object} obj The object
 * @return {String}     The object type
 * @see [Codepen]{@link https://codepen.io/cferdinandi/pen/aXzNze}
 * @see [Source]{@link https://vanillajstoolkit.com/helpers/truetypeof/}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function trueTypeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
var siteConfig = {
    google: {
        key: "AIzaSyDgRnuOT2hP-KUOeQhGoLfOOPHCNYhznFI",
        recaptcha: { key: "6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF" },
        analystics: { id: "UA-106238155-1" },
    },
};
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
                cookie_expires: 28 * 24 * 60 * 60, // 28 days, in seconds
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
/// <reference path="./globals.d.ts" />
/// <reference path="./_Prototype-Document.ts" />
/// <reference lib="dom" />
/// <reference path="./lib.dom.d.ts" />
if (!isnode() && typeof jQuery != "undefined") {
    (function ($) {
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
        // fix tab-panel
        $('a[data-toggle="tab"]').on("click", function (e) {
            var id = $(this).attr("id");
            var target = $("[aria-labelledby=\"" + id + "\"]");
            var tabContent = target.parent("[class*='tab-content']");
            var tabPane = tabContent.children("div[class*='tab-pane']");
            tabPane.each(function () {
                $(this).removeClass("active show");
            });
        });
        //href hyperlink
        $(document).on("click", "[data-href]", function (e) {
            e.preventDefault();
            var href = $(this).data("href");
            //console.log("click href " + href);
            location.href = href;
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
                    window.open("http://href.li/?" + $(this).data("newtab"), "newtab").focus();
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
    })(jQuery);
}
/*
if (!isnode()) {
    console.log("initializing document listener");
    document.listen(
        "click",
        function (event) {
            if (event.target.matches("[href]")) {
                event.preventDefault();
                console.log("works fine");
            }
        },
        false
    );
}
*/
/**
 * Random HEX
 * @returns HEX number without HASH(#)
 */
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
/// <reference path="./../src/smartform/src/js/globals.d.ts" />
/// <reference path="./globals.d.ts" />
/// <reference path="./../src/smartform/src/js/index.d.ts" />
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
/**
 * Select2 Language Country
 */
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
    //console.log(newOpt);
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
 * @param selectCountry
 * @param select2Opt Select2 Options
 * @example
 * select2Country($("#selectID"), {placeholder:"Select Your Country"})
 */
function select2Country(select2Country, select2Opt) {
    if (select2Opt === void 0) {
        select2Opt = {};
    }
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");
    var newIso = [];
    isoCountries.forEach(function (country) {
        newIso.add(Object.assign(country, { id: country.alpha2, text: country.name }));
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
        data: newIso,
    };
    var newOpt = Object.assign(defaultOpt, select2Opt);
    //console.log(newOpt);
    select2Country.select2(newOpt);
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
/// modify this to tell typescript compiler
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
 * @param obj
 * @returns
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
    var hrefs;
    if (typeof href == "string") {
        hrefs = [href];
    }
    else {
        hrefs = href;
    }
    if (typeof hrefs[0] == "string" && !loadedCss.contains(hrefs[0])) {
        var link_1 = document.createElement("link");
        link_1.media = "print";
        link_1.rel = "stylesheet";
        link_1.href = hrefs[0];
        link_1.onload = function () {
            link_1.media = "all";
            // add to index
            loadedCss.add(hrefs[0]);
            // remove added item to index
            hrefs.shift();
            // if the items is still there
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
    else {
        hrefs.shift();
        loadCSS(hrefs, callback);
    }
}
/**
 * Resize iframe to fit content
 * @param iFrame
 */
function resizeIFrameToFitContent(iFrame, options) {
    if (options === void 0) {
        options = { width: true, height: true };
    }
    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
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
/// <reference path="globals.d.ts" />
function linkify(string, buildHashtagUrl, includeW3, target, noFollow) {
    var relNoFollow = "";
    if (noFollow) {
        relNoFollow = ' rel="nofollow"';
    }
    if (string.toLowerCase().indexOf("www.") === 0 && includeW3) {
        string = '<a href="http://' + string + '" target="' + target + '"' + relNoFollow + ">" + string + "</a>";
    }
    else {
        string = '<a href="' + string + '" target="' + target + '"' + relNoFollow + ">" + string + "</a>";
    }
    if (buildHashtagUrl) {
        string = string.replace(/\B#(\w+)/g, "<a href=" + buildHashtagUrl("$1") + ' target="' + target + '"' + relNoFollow + ">#$1</a>");
    }
    return string;
}
if (!isnode()) {
    (function ($) {
        $.fn.linkify = function (opts) {
            return this.each(function () {
                var buildHashtagUrl;
                var includeW3 = true;
                var target = "_self";
                var noFollow = true;
                var regex = /((http|https|ftp)\:\/\/|\bw{3}\.)[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z\u00C0-\u017F0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*/gi;
                var txt = this.innerHTML;
                var output = "";
                var replacement;
                var matchLen;
                var lastIndex = 0;
                if (opts) {
                    if (typeof opts == "function") {
                        buildHashtagUrl = opts;
                    }
                    else {
                        if (typeof opts.hashtagUrlBuilder == "function") {
                            buildHashtagUrl = opts.hashtagUrlBuilder;
                        }
                        if (typeof opts.includeW3 == "boolean") {
                            includeW3 = opts.includeW3;
                        }
                        if (typeof opts.target == "string") {
                            target = opts.target;
                        }
                        if (typeof opts.noFollow == "boolean") {
                            noFollow = opts.noFollow;
                        }
                    }
                }
                var match;
                while ((match = regex.exec(txt)) !== null) {
                    matchLen = match[0].length;
                    replacement = linkify(match[0], buildHashtagUrl, includeW3, target, noFollow);
                    output += txt.substring(lastIndex, match.index + matchLen).replace(match[0], replacement);
                    lastIndex = match.index + matchLen;
                }
                // Include the rest of the text.
                if (lastIndex !== txt.length) {
                    output += txt.substring(lastIndex);
                }
                $(this).html(output);
            });
        };
    })(jQuery);
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
/// <reference types="@types/grecaptcha" />
/// <reference types="@types/google.analytics" />
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
     * User login
     * @param user
     * @param pass
     * @param callback
     * @example
     * userClass().login({user: 'username', pass: 'password', callback: function (err, data) {
        console.log(arguments);
        if (!err){
            console.log('login successful');
        }
    }});
     */
    user.prototype.login = function (opt) {
        if (opt === void 0) {
            opt = {
                recaptcha: null,
            };
        }
        var data = new URLSearchParams();
        data.append("user", opt.user);
        data.append("pass", opt.pass);
        fetch("/server/user?login", {
            method: "post",
            body: data,
        })
            .then(function (response) { return response.json(); })
            .then(function (response) {
            if (typeof opt.callback == "function") {
                opt.callback(response.error, response);
            }
        });
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
                if (typeof res !== "object") {
                    return;
                }
                if (res) {
                    if (res.hasOwnProperty("id")) {
                        res.user_id = res.id;
                        res._ = new Date();
                    }
                    if (res.hasOwnProperty("username")) {
                        if (typeof callback === "function") {
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
    var uclass_1 = new user();
    /**
     * User Class
     */
    function userClass() {
        return uclass_1;
    }
    if (typeof window !== "undefined" && typeof window.user === "undefined") {
        window.user = userClass();
    }
    if (typeof jQuery !== "undefined") {
        jQuery.user = userClass();
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
/**
 * Loading.io
 * @param {string} text
 * @param {Function} callback
 * @param {"enable" | "enabled" | "disable" | "disabled"} mode
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvZnJhbWV3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDbkYsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUNyRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzNGLFNBQVMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUM5RixTQUFTLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3hELEtBQUssQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRCxLQUFLLENBQUM7d0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxTQUFTO29CQUNqRDt3QkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQUMsU0FBUzt5QkFBRTt3QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU07eUJBQUU7d0JBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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RSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzlCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFDRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDOUIsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDOUIsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFDRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRztJQUNuQixvQkFBb0I7SUFDcEIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN4QyxJQUFJLENBQUMsQ0FBQztJQUNOLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLElBQUksQ0FBQztJQUNULElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENB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