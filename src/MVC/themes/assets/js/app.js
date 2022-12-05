var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BotDetector {
    constructor(args) {
        const self = this;
        self.isBot = false;
        self.tests = {};
        const selectedTests = args.tests || [];
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.SCROLL) != -1) {
            self.tests[BotDetector.Tests.SCROLL] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.SCROLL] = true;
                    self.update();
                    self.unbindEvent(window, BotDetector.Tests.SCROLL, e);
                    self.unbindEvent(document, BotDetector.Tests.SCROLL, e);
                };
                self.bindEvent(window, BotDetector.Tests.SCROLL, e);
                self.bindEvent(document, BotDetector.Tests.SCROLL, e);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.MOUSE) != -1) {
            self.tests[BotDetector.Tests.MOUSE] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.MOUSE] = true;
                    self.update();
                    self.unbindEvent(window, BotDetector.Tests.MOUSE, e);
                };
                self.bindEvent(window, BotDetector.Tests.MOUSE, e);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.KEYUP) != -1) {
            self.tests[BotDetector.Tests.KEYUP] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.KEYUP] = true;
                    self.update();
                    self.unbindEvent(window, BotDetector.Tests.KEYUP, e);
                };
                self.bindEvent(window, BotDetector.Tests.KEYUP, e);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.SWIPE) != -1) {
            self.tests[BotDetector.Tests.SWIPE_TOUCHSTART] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.SWIPE_TOUCHSTART] = true;
                    self.update();
                    self.unbindEvent(document, BotDetector.Tests.SWIPE_TOUCHSTART);
                };
                self.bindEvent(document, BotDetector.Tests.SWIPE_TOUCHSTART);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_MOTION) != -1) {
            self.tests[BotDetector.Tests.DEVICE_MOTION] = function () {
                const e = function (event) {
                    if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
                        const userAgent = navigator.userAgent.toLowerCase();
                        const isAndroid = userAgent.indexOf("android") != -1;
                        const beta = isAndroid
                            ? event.rotationRate.beta
                            : Math.round(event.rotationRate.beta / 10) * 10;
                        const gamma = isAndroid
                            ? event.rotationRate.gamma
                            : Math.round(event.rotationRate.gamma / 10) * 10;
                        if (!self.lastRotationData) {
                            self.lastRotationData = {
                                beta: beta,
                                gamma: gamma,
                            };
                        }
                        else {
                            let movement = beta != self.lastRotationData.beta || gamma != self.lastRotationData.gamma;
                            if (isAndroid) {
                                movement = movement && (beta > 0.2 || gamma > 0.2);
                            }
                            const args = { beta: beta, gamma: gamma };
                            self.tests[BotDetector.Tests.DEVICE_MOTION] = movement;
                            self.update();
                            if (movement) {
                                self.unbindEvent(window, BotDetector.Tests.DEVICE_MOTION, e);
                            }
                        }
                    }
                    else {
                        self.tests[BotDetector.Tests.DEVICE_MOTION] = false;
                    }
                };
                self.bindEvent(window, BotDetector.Tests.DEVICE_MOTION, e);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_ORIENTATION) != -1) {
            self.tests[BotDetector.Tests.DEVICE_ORIENTATION] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.DEVICE_ORIENTATION] = true;
                    self.update();
                    self.unbindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION, e);
                };
                self.bindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION);
            };
        }
        if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_ORIENTATION_MOZ) != -1) {
            self.tests[BotDetector.Tests.DEVICE_ORIENTATION_MOZ] = function () {
                const e = function () {
                    self.tests[BotDetector.Tests.DEVICE_ORIENTATION_MOZ] = true;
                    self.update();
                    self.unbindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION_MOZ);
                };
                self.bindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION_MOZ);
            };
        }
        self.cases = {};
        self.timeout = args.timeout || 1000;
        self.callback = args.callback || null;
        self.detected = false;
    }
    update(notify = false) {
        const self = this;
        let count = 0;
        let tests = 0;
        for (const i in self.tests) {
            if (self.tests.hasOwnProperty(i)) {
                self.cases[i] = self.tests[i] === true;
                if (self.cases[i] === true) {
                    count++;
                }
            }
            tests++;
        }
        self.isBot = count == 0;
        self.allMatched = count == tests;
        if (notify !== false) {
            self.callback(self);
        }
    }
    bindEvent(e, type, handler) {
        if (e.addEventListener) {
            e.addEventListener(type, handler, false);
        }
        else if (e.attachEvent) {
            e.attachEvent("on" + type, handler);
        }
    }
    unbindEvent(e, type, handle) {
        if (e.removeEventListener) {
            e.removeEventListener(type, handle, false);
        }
        else {
            const evtName = "on" + type;
            if (e.detachEvent) {
                if (typeof e[evtName] === "undefined") {
                    e[type] = null;
                }
                e.detachEvent(evtName);
            }
        }
    }
    monitor() {
        const self = this;
        for (const i in this.tests) {
            if (this.tests.hasOwnProperty(i)) {
                this.tests[i].call();
            }
        }
        this.update(false);
        setTimeout(function () {
            self.update(true);
        }, self.timeout);
    }
}
BotDetector.Tests = {
    KEYUP: "keyup",
    MOUSE: "mousemove",
    SWIPE: "swipe",
    SWIPE_TOUCHSTART: "touchstart",
    SWIPE_TOUCHMOVE: "touchmove",
    SWIPE_TOUCHEND: "touchend",
    SCROLL: "scroll",
    GESTURE: "gesture",
    GYROSCOPE: "gyroscope",
    DEVICE_MOTION: "devicemotion",
    DEVICE_ORIENTATION: "deviceorientation",
    DEVICE_ORIENTATION_MOZ: "MozOrientation",
};
if (!isnode()) {
    module.exports.BotDetector = BotDetector;
}
/// <reference types="crypto-js" />
const CryptoJSAesJson = {
    stringify: function (cipherParams) {
        const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: "", s: "" };
        if (cipherParams.iv)
            j.iv = cipherParams.iv.toString();
        if (cipherParams.salt)
            j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        const j = JSON.parse(jsonStr);
        const cipherParams = CryptoJS.lib.CipherParams.create({
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
    const enc = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
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
    const dec = base64_decode(encrypted);
    return JSON.parse(CryptoJS.AES.decrypt(dec, key, {
        format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8));
}
if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = {
        aesDecrypt,
        aesEncrypt,
    };
}
const CodeMirrorAddon = {
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
let loadedTheme = null;
/**
 * CodeMirror script and style loader
 * @param opt
 */
function loadCodeMirrorScript(opt) {
    const scripts = ["/node_modules/codemirror/lib/codemirror.js"];
    if (opt.mode) {
        if (Array.isArray(opt.mode)) {
            opt.mode.forEach(function (mode) {
                scripts.push(`/node_modules/codemirror/mode/${mode}/${mode}.js`);
            });
        }
    }
    if (opt.addons) {
        if (Array.isArray(opt.addons)) {
            opt.addons.forEach(function (addon) {
                const ons = CodeMirrorAddon[addon];
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
        `/node_modules/codemirror/theme/${opt.theme}.css`,
    ], function () {
        // set loadedTheme
        loadedTheme = opt.theme;
    });
    // load script codemirror
    const conf = {
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
    let defaultOverride = {
        lineNumbers: true,
        mode: opt.mode,
        selectionsMayTouch: true,
    };
    defaultOverride = Object.assign(defaultOverride, opt.override);
    const editor = CodeMirror.fromTextArea(opt.element, defaultOverride);
    if (typeof loadedTheme == "string")
        editor.setOption("theme", loadedTheme);
    if (typeof opt.callback == "function") {
        opt.callback(opt.element);
    }
    return editor;
}
function codeMirrorRandomTheme() {
    const themes = [
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
class Cookies {
    /**
     * Get cookie value by cookie name
     * @param c_name
     * @returns null if cookie not exists
     */
    static get(c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                const cookie = unescape(document.cookie.substring(c_start, c_end));
                try {
                    return this.decompress(cookie);
                }
                catch (e) {
                    if (!in_array(c_name, this.logged)) {
                        this.logged.push(c_name);
                        console.error(`fail to decode cookie ${c_name}`);
                    }
                    return cookie;
                }
            }
        }
        return null;
    }
    /**
     * Check cookie exists
     * @param c_name cookie name
     */
    static has(c_name) {
        return this.get(c_name) != null;
    }
    /**
     * Create cookie expiring in days
     * @param name cookie name
     * @param value cookie value
     * @param expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
     * @param path
     * @param callback
     */
    static set(name, value, expire, expire_type = null, path = "/", callback = null) {
        let expires;
        const date = new Date();
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
        let cookie_path = "/";
        if (typeof path == "string") {
            if (path.length > 0) {
                cookie_path = path;
            }
        }
        /*value = JSON.stringify(value);
         value = base64_encode(JSON.stringify(value));*/
        value = this.compress(value);
        const formatted = name + "=" + value + expires + "; path=" + cookie_path;
        console.info(`cookie formatted: ` + formatted);
        document.cookie = formatted;
        if (typeof callback == "function") {
            // eslint-disable-next-line prefer-rest-params
            return callback(arguments);
        }
        return this.get(name);
    }
    /**
     * Delete Cookie
     * @param name cookie name
     */
    static del(name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    }
    /**
     * Get all cookies
     */
    static all() {
        const pairs = document.cookie.split(";");
        const cookies = {};
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split("=");
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
    }
    /**
     * Call function if cookie name not set
     * @param name
     * @param value
     * @param expire Expires number (minutes)
     * @param callback Function callback to be executed one time
     */
    static one(name, value, expire, callback) {
        if (this.get(name) == null) {
            this.set(name, value, expire, "m", "/", callback);
        }
    }
    static logging() {
        if (empty(this.logged)) {
            Cookies.set("cl", JSON.stringify(this.logged), "1d");
        }
    }
    /**
     * decompress cookie
     * @param str
     */
    static decompress(str) {
        return aesDecrypt(str, md5(location.host));
    }
    /**
     * compress cookie
     * @param str
     */
    static compress(str) {
        return aesEncrypt(str, md5(location.host));
    }
}
Cookies.logged = [];
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
class GeneratorID {
    constructor() {
        this.rand = Math.floor(Math.random() * 26) + Date.now();
    }
    /**
     * Increase new id
     */
    genId() {
        return this.rand++;
    }
    getId() {
        this.genId();
        return jQuery.fn.jquery + "." + this.rand;
    }
}
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
class html {
    static create(options) {
        /**
         * @param {createElementOpt}
         * @returns {createElement}
         */
        return createElement(options);
    }
}
/**
 * Detect is mobile
 */
function isMobile() {
    const target = navigator.userAgent || navigator.vendor || window.opera;
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
        const nVer = navigator.appVersion;
        const nAgt = navigator.userAgent;
        browser = navigator.appName;
        version = "" + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset, verOffset, ix;
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
        const clientStrings = [
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
        for (const id in clientStrings) {
            const cs = clientStrings[id];
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
            const fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + "." + fv.minor + " r" + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }
    else {
        const terminal = require("os");
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
                const boundedHandler = function () {
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
                        for (const key in nameSpace) {
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
    const arr = [];
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
/**
 * Transform {@link serializeArray} into object key value
 * @param obj
 * @see serializeArray
 * @returns
 */
function serializeArray2Object(obj) {
    const result = {};
    obj.forEach(function (item, i, arr) {
        //console.log(item);
        result[item.name] = item.value;
    });
    return result;
}
class STORAGE {
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
    init(callback) {
        // do something async and call the callback:
        callback.bind(this)();
    }
    /**
     * get localstorage by key
     * @param key
     */
    get(key) {
        if (!this.has(key)) {
            return false;
        }
        const data = localStorage[key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    /**
     * Set localstorage key value
     * @param key
     * @param value
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    }
    /**
     * Check localstorage key exists
     * @param key
     */
    has(key) {
        return !!localStorage[key] && !!localStorage[key].length;
    }
    /**
     * Extend or set localstorage key
     * @param key
     * @param value
     */
    extend(key, value) {
        if (this.has(key)) {
            const _value = this.get(key);
            jQuery.extend(_value, JSON.parse(JSON.stringify(value)));
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    }
    /**
     * Remove localstorage key
     * @param key
     */
    remove(key) {
        localStorage.removeItem(key);
    }
}
/**
 * localStorage helper
 */
function storage() {
    return new STORAGE();
}
/// <reference path="globals.d.ts" />
String.prototype.parse_url = function () {
    let parser = document.createElement("a"), searchObject, queries, split, i;
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
    const e = document.createElement("link");
    e.rel = "stylesheet";
    e.href = this.toString();
    const n = document.getElementsByTagName("head")[0];
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
    let hex, i;
    let result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }
    return result;
};
String.prototype.hexD = function () {
    let j;
    const hexes = this.match(/.{1,4}/g) || [];
    let back = "";
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
    const subString = this.substr(0, n - 1); // the original check
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
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};
Object.child = function (str, callback) {
    const self = this;
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
    const self = this;
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
    for (const key in this) {
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
    const result = {};
    for (const prop in arg1) {
        if (arg1.hasOwnProperty(prop)) {
            // error when using --strictNullChecks
            result[prop] = arg1[prop];
        }
    }
    for (const prop in arg2) {
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
const cookie_ip = "ip".rot13();
const cookie_indicator = "status_ip".rot13();
/**
 * IP Address class
 * @class get, check, validate ip address
 */
class ip {
    /**
     * Gets ip
     * @param callback function callback(ip) or null return ip
     * @returns {String} ip or callback
     */
    static get(callback = null) {
        this.check().then(function () {
        });
        //console.log(this.status(null));
        const ips = this.storage.get(cookie_ip);
        //ips = Cookies.get(cookie_ip);
        if (typeof callback == "function") {
            return callback(ips);
        }
        return ips;
    }
    /**
     * Retrieve ip from ipapi.co
     */
    static ipapi() {
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
    }
    /**
     * Retrieve api from l2.io
     */
    static l2io() {
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
    }
    /**
     * Retrieve ip from cloudflare.com
     */
    static cloudflare() {
        return $.ajax({
            proxy: false,
            url: "//www.cloudflare.com/cdn-cgi/trace",
            success: function (str) {
                const regex = /ip\=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                const m = regex.exec(str);
                if (m != null) {
                    if (m.length > 0) {
                        ip.save(m[1]);
                    }
                }
            },
        });
    }
    /**
     * Check if the ip has been applied
     * @private
     */
    static status() {
        //if (value != null) if (!value.isEmpty()) ip.save(value);
        return Cookies.has(cookie_indicator);
    }
    /**
     * Checks ip
     * @returns promises
     */
    static check() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.status())
                yield this.cloudflare();
            //if (!this.status()) await this.ipapi();
            if (!this.status())
                yield this.l2io();
            /*if (this.status()) {
             console.log(this.get(null));
             } */
        });
    }
    /**
     * Save ip to cookie and localstorage
     * @param ip
     * @private
     */
    static save(ip) {
        Cookies.set(cookie_ip, ip, "1h", null, location.pathname);
        Cookies.set(cookie_indicator, String(ip), 5, "m", location.pathname, null);
        if (typeof localStorage != "undefined") {
            this.storage.set(cookie_ip, ip);
        }
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
    init(callback) {
        // do something async and call the callback:
        callback.bind(this)();
    }
}
ip.storage = new STORAGE();
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
        const mac = JSON.stringify(require("os").networkInterfaces(), null, 2)
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
    const computed = window.getComputedStyle(field);
    // Calculate the height
    const height = parseFloat(computed.paddingTop) +
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
function getParameterByName(name, url = null) {
    if (typeof URLSearchParams !== "undefined") {
        if (!window.location.search) {
            url = window.location.href;
        }
        else {
            url = window.location.search;
        }
        const urlParams = new URLSearchParams(url);
        return urlParams.get(name);
    }
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
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
    const d = !v ? new Date() : new Date(v);
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
class Timer {
    constructor(callback, time) {
        this.timeId = null;
        this.timeId = setTimeout(callback, time);
    }
    clear() {
        clearTimeout(this.timeId);
    }
}
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
    const index = Math.floor(Math.random() * arrays.length);
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
    let x;
    const tmpArray = [];
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
    let currentIndex = array.length, temporaryValue, randomIndex;
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
    const length = a2.length;
    for (let i = 0; i < length; i++) {
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
    const length = haystack.length;
    for (let i = 0; i < length; i++) {
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
    let j, x, i;
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
function deepAssign(...objects) {
    // Make sure there are objects to merge
    const len = objects.length;
    if (len < 1)
        return;
    if (len < 2)
        return objects[0];
    // Merge all objects into first
    for (let i = 1; i < len; i++) {
        for (const key in objects[i]) {
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
        array_shuffle,
        array_keys,
        in_array,
        deepAssign,
    };
}
/// <reference path="./globals.d.ts" />
Array.prototype.shuffle = function () {
    let i = this.length, j, temp;
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
        let start = this.length - n;
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
    const self = this;
    others.forEach(function (e) {
        self.push(e);
    });
    return self;
};
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.unique = function () {
    const a = this.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
Array.prototype.contains = function (obj) {
    let i = this.length;
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
    for (let i = 0; i < this.length; i++) {
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
    const elem = this[index];
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
        let t, len, i, thisp;
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
    const hourago = Date.now() - hour;
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
    Document.prototype.listen = function (eventType, listener, options = {}) {
        if (this.addEventListener) {
            this.addEventListener(eventType, listener, options);
        }
        else if (this.attachEvent) {
            this.attachEvent("on" + eventType, listener, options);
        }
    };
}
Number.prototype.getMS = function (type) {
    const self = this;
    return this * 60 * 1000;
};
Number.prototype.addHour = function (source) {
    const self = this;
    const Hour = this * 60 * 1000; /* ms */
    if (!source)
        source = new Date();
    return new Date(source.getTime() + Hour).getTime();
};
Number.prototype.AddZero = function (b, c) {
    const l = String(b || 10).length - String(this).length + 1;
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
    const time = !n ? new Date().getDay() : Number(n);
    if (!/^-?\d+jQuery/.test(time.toString())) {
        alert("arguments is not number, please remove quote");
        return null;
    }
    const hasil = time % 2;
    const rType = /^(odd|ganjil)$/.test(type) ? "1" : "0";
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
const siteConfig = {
    google: {
        key: "AIzaSyDgRnuOT2hP-KUOeQhGoLfOOPHCNYhznFI",
        recaptcha: { key: "6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF" },
        analystics: { id: "UA-106238155-1" },
    },
};
let root;
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
    const namespaces = functionName.split(".");
    const func = namespaces.pop();
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
    const namespaces = functionName.split(".");
    const func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
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
    const type = typeof str;
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
const generateRandomString = function (length = 6) {
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
    let total_amount_int = "";
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
let console_callback;
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
        const log = console.olog;
        const stack = new Error().stack;
        /**
         * Get Caller Location
         */
        const file = stack.split("\n")[2].split("/")[4].split("?")[0];
        /**
         * Get Caller Line
         */
        let line; //= stack.split("\n")[2].split(":")[5];
        const getline = stack.split("\n")[2].split(":");
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
        let caller;
        const caller_str = stack.split("\n")[2];
        const regex = /at\s(.*)\s\(/gm;
        caller = regex.exec(caller_str);
        if (caller != null && caller.length) {
            caller = caller[1];
        }
        /**
         * Create Prefix Log
         */
        let append = "";
        if (typeof file != "undefined") {
            append += `${file}/`;
        }
        if (caller != null && typeof caller != "undefined") {
            append += `${caller}/`;
        }
        if (typeof line != "undefined") {
            append += `${line}:`;
        }
        let input = [];
        if (arguments.length == 1) {
            input = arguments[0];
        }
        else {
            for (let index = 0; index < arguments.length; index++) {
                const arg = arguments[index];
                input.push(arg);
            }
        }
        let args;
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
        const method = pair[0], reset = "\x1b[0m", color = "\x1b[36m" + pair[1];
        console[method] = console[method].bind(console, color, `${method.toUpperCase()} [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`, reset);
    });
    console.error = (function () {
        const error = console.error;
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
const randstr = (length = 6) => Math.random().toString(20).substr(2, length);
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
    let AJAX = null;
    /**
     * Ajax dump base
     */
    let dumpAjax = false;
    /**
     * Ajax indicator base
     */
    let indicatorAjax = false;
    const ajaxIDLoader = "ajxLoader_" +
        Math.random().toString(36).substring(2) +
        Date.now().toString(36);
    if (!$("#" + ajaxIDLoader).length) {
        $("body").append('<div id="' +
            ajaxIDLoader +
            '" style="position: fixed;z-index:9999;bottom:5px;left:5px;"><svg enable-background="new 0 0 40 40"height=40px id=loader-1 version=1.1 viewBox="0 0 40 40"width=40px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"fill=#000 opacity=0.2 /><path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
      C22.32,8.481,24.301,9.057,26.013,10.047z"fill=#000><animateTransform attributeName=transform attributeType=xml dur=0.5s from="0 20 20"repeatCount=indefinite to="360 20 20"type=rotate /></path></svg></div>');
        $("#" + ajaxIDLoader).fadeOut("fast");
    }
    jQuery.ajaxPrefilter(function (options) {
        indicatorAjax =
            typeof options.indicator == "boolean" && options.indicator === true;
        dumpAjax = typeof options.dump == "boolean" && options.dump === true;
        /**
         * Ajax Proxying begin
         */
        if (options.crossDomain && jQuery.support.cors) {
            let allowed = true;
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
                const http = window.location.protocol === "http:" ? "http:" : "https:";
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
        const content_type = jqXHR.getResponseHeader("Content-Type");
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
            $("#" + ajaxIDLoader).fadeIn("fast");
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
            $("#" + ajaxIDLoader).fadeOut("fast");
        }
        if (dumpAjax) {
            toastr.success("Request complete", "Request Info");
        }
        AJAX = null;
        $("#" + ajaxIDLoader).fadeOut("slow");
        let content_type = xhr.getResponseHeader("Content-Type"), res;
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
        let res;
        const content_type = request.getResponseHeader("Content-Type");
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
            const error = res.hasOwnProperty("error") && res.error ? true : false;
            const title = res.hasOwnProperty("title") ? res.title : "Unknown Title";
            const msg = res.hasOwnProperty("message") ? res.message : "Unknown Error";
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
    let res;
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
        const t = $(this);
        const sukses = t.data("success");
        const err = t.data("error");
        const complete = t.data("complete");
        const targetURL = t.attr("action") || location.href; //fallback to current url
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
    const xhr = new XMLHttpRequest();
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
    const defaultSet = {
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
let AjaxSchedulerInit = null;
let AjaxSchedulerRequests = [];
let AjaxSchedulerRunning = false;
/**
 * AJAX MANAGER
 * @todo handle ajax request queue
 * @see https://bit.ly/2Tz0wrf
 */
class ajaxScheduler {
    /**
     * Add ajax to queues
     * @param opt
     */
    static add(opt) {
        AjaxSchedulerRequests.push(opt);
    }
    /**
     * Remove ajax from queues
     * @param opt
     */
    static remove(opt) {
        if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
            AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
        }
    }
    /**
     * Run Ajax Scheduler
     */
    static run() {
        const self = this;
        let oriSuc;
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
    }
    /**
     * Stop ajax scheduler
     */
    static stop() {
        AjaxSchedulerRequests = [];
        clearTimeout(AjaxSchedulerInit);
    }
}
/**
 * RUN AJAX Scheduler
 * @param url
 * @param method POST, GET, HEAD, DELETE, OPTIONS, PATCH, PROPATCH
 * @param data
 * @param success
 * @param failed
 * @param complete
 * @description ajax request one by one
 * @todo scheduling any jquery ajax
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
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
                console.log(success + " isn't success callback, instead of " + typeof success);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
function ajaxFormSchedule() {
    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        const t = $(this);
        const s = t.data("success"), err = t.data("error"), c = t.data("complete");
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
        const ajax = {};
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
        createStyle(`#pageMessages {
      position: fixed;
      bottom: 15px;
      right: 15px;
      width: 30%;
    }

    #pageMessages .alert {
      position: relative;
    }

    #pageMessages .alert .close {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 1em;
    }

    #pageMessages .alert .fa {
      margin-right:.3em;
    }`, { id: "alertcss" });
    }
    if (!$("#pageMessages").length) {
        let style = "";
        if (typeof options == "string") {
            style = options;
        }
        else if (typeof options == "object") {
            if (options.length) {
                for (const key in options) {
                    if (options.hasOwnProperty(key)) {
                        const value = options[key];
                        if (value && value.length) {
                            style += `${key}: ${value};`;
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
    const iconMap = {
        info: "fa fa-info-circle",
        success: "fa fa-thumbs-up",
        warning: "fa fa-exclamation-triangle",
        danger: "fa ffa fa-exclamation-circle",
    };
    let iconAdded = false;
    const alertClasses = ["alert", "animated", "flipInX"];
    alertClasses.push("alert-" + severity.toLowerCase());
    if (dismissible) {
        alertClasses.push("alert-dismissible");
    }
    const msgIcon = $("<i />", {
        class: iconMap[severity],
    });
    const msg = $("<div />", {
        class: alertClasses.join(" "),
    });
    if (title) {
        const msgTitle = $("<h4 />", {
            html: title,
        }).appendTo(msg);
        if (!iconAdded) {
            msgTitle.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (summary) {
        const msgSummary = $("<strong />", {
            html: summary,
        }).appendTo(msg);
        if (!iconAdded) {
            msgSummary.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (details) {
        const msgDetails = $("<p />", {
            html: details,
        }).appendTo(msg);
        if (!iconAdded) {
            msgDetails.prepend(msgIcon);
            iconAdded = true;
        }
    }
    if (dismissible) {
        const msgClose = $("<span />", {
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
function createStyle(css, attributes = null) {
    const head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
    head.appendChild(style);
    style.type = "text/css";
    style.setAttribute("type", "text/css");
    for (const key in attributes) {
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
let gtag = null;
if (!isnode()) {
    const gtagID = siteConfig.google.analystics.id;
    const create_gtagscript = document.createElement("script");
    create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
    create_gtagscript.async = true;
    document.getElementsByTagName("body")[0].appendChild(create_gtagscript);
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
            const trackLinks = document.getElementsByTagName("a");
            for (let i = 0, len = trackLinks.length; i < len; i++) {
                const singleLink = trackLinks[i];
                singleLink.onclick = function () {
                    if (!/^\#/gm.test(singleLink.href) && !empty(singleLink.href)) {
                        gtag("event", "click", {
                            event_category: "outbound",
                            event_label: singleLink.href,
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
        const conf = {
            event_label: event_label,
            event_category: event_category,
            value: event_value,
            event_callback: typeof event_callback == "function" ? event_callback : false,
        };
        return gtag("event", event_action, conf);
    }
}
/// <reference path="_Prototype-String.ts" />
let ORIGIN;
if (isnode()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const process = require("process");
    ORIGIN = process.cwd();
}
else {
    ORIGIN = location.protocol + "//" + location.host + location.pathname;
}
let IP;
class dimas {
    static setIp(ip) {
        this.ip = ip;
        IP = ip;
    }
    static getIp() {
        return this.ip;
    }
    /**
     * Count Array/Object/String length
     * @param {any[]|string|object} data
     */
    count(data) {
        if (Array.isArray(data) || typeof data == "string") {
            return data.length;
        }
        else if (typeof data == "object") {
            return Object.keys(data).length;
        }
        else if (typeof data == "number") {
            return data;
        }
    }
    /**
     * Make async function
     * @param callback
     */
    async(callback) {
        return new Promise(function (resolve, reject) {
            if (typeof callback == "function") {
                callback();
            }
            resolve(true);
        });
    }
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    isNumber(v) {
        return !isNaN(parseInt(v.toString()) - parseFloat(v.toString())) && /^\d+$/.test(v.toString());
    }
    /**
     * Check if valid url
     * @param url url address
     */
    isURL(url) {
        if (url.startsWith("/")) {
            console.log("url type is local");
            return true;
        }
        let result;
        try {
            result = new URL(url);
        }
        catch (_) {
            return false;
        }
        return result.protocol === "http:" || result.protocol === "https:";
    }
    /**
     * Check url is valid and reachable
     * @param url url address
     * @param callback callback function
     */
    isURLReachable(url, callback) {
        if (this.isURL(url)) {
            const myRequest = new Request(url);
            fetch(myRequest).then(function (response) {
                console.log(`${response.status} - ${url}`);
                if (response.status == 200) {
                    callback(true, url);
                }
            });
        }
    }
    /**
     * Get Query name from current url
     */
    getquery(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
    recode(content, passcode) {
        let i;
        const result = [];
        let str = "";
        const codesArr = JSON.parse(content);
        const passLen = passcode.length;
        for (i = 0; i < codesArr.length; i++) {
            const passOffset = i % passLen;
            const calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
            result.push(calAscii);
        }
        for (i = 0; i < result.length; i++) {
            const ch = String.fromCharCode(result[i]);
            str += ch;
        }
        return str;
    }
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    pctdRUN(elm) {
        const tl = parseInt(elm.attr("countdown")) > 0 ? elm.attr("countdown") : 5, bs = elm.data("base") ? elm.data("base") : "bg-info", bw = elm.data("warning") ? elm.data("warning") : "bg-danger", bc = elm.data("success") ? elm.data("success") : "bg-success", countdown = elm.progressBarTimer({
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
            onFinish() {
                const callback = elm.data("callback");
                if (callback) {
                    const xn = window[callback];
                    if (typeof xn == "function") {
                        const x = eval(callback);
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
    }
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
    pctd(elm) {
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
    }
    /**
     * Parseurl just like as parse_url at php
     */
    parseurl(url) {
        return url.parse_url();
    }
}
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
    id(header_name) {
        if (!this.captcha.check) {
            this.captcha.get(header_name);
        }
        return storage().get("captcha");
    },
    /**
     * Get current captcha from backend
     * And process it by jsonpCallback
     */
    get(header_name) {
        if (!this.captcha.check) {
            this.captcha.check = setTimeout(() => {
                this.captcha.get(header_name);
            }, 60000);
        }
        const ua = md5(navigator.userAgent).rot13();
        $.ajax({
            url: this.url + "?login=" + guid(),
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback(arg) {
    },
    /**
     * Captcha JSONP callback
     */
    jspCallback(res) {
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
    listen() {
        if (this.captcha.listener_started) {
            return null;
        }
        this.captcha.listener_started = new Date().toISOString();
        return $(document).on("focus", "form[captcha]", function (e) {
            let captcha = $(this).find('[name="captcha"]');
            if (!captcha.length) {
                $(this).append('<input type="hidden" name="captcha" id="' + guid() + '" />');
                captcha = $(this).find('[name="captcha"]');
            }
            if (captcha.length) {
                captcha.val(storage().get("captcha").rot13());
            }
            const form = captcha.parents("form");
            const button = form.find('[type="submit"]');
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
/**
 * Framework object initializer
 */
function framework() {
    return new dimas();
}
class app {
    static setbase(path) {
        this.base = path;
    }
    static direct(...args) {
        const scripts = document.querySelectorAll("script[src]");
        const last = scripts[scripts.length - 1];
        const lastsrc = last.getAttribute("src");
        const parsed = framework().parseurl(lastsrc);
        args.forEach(function (src) {
            LoadScript({
                url: `${app.base}${src}${parsed.search}`,
                callback: function () {
                    console.log(`${src} engine inbound`);
                },
            });
        });
    }
    static load(...args) {
        const scripts = document.querySelectorAll("script[src]");
        const last = scripts[scripts.length - 1];
        const lastsrc = last.getAttribute("src");
        const parsed = framework().parseurl(lastsrc);
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
                LoadScript({
                    url: `${app.base}${src}${parsed.search}`,
                    callback: function () {
                        console.log(`${src} engine inbound`);
                    },
                });
            }
        });
    }
}
app.base = "/src/MVC/themes/assets/js/";
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
    const encoded = Base64.encode(str);
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
    const decoded = Base64.decode(str);
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
            const t = $(this);
            switch (t.data("trigger")) {
                case "modal":
                    var target = $(t.data("target"));
                    console.log(`open modal ${t.data("target")}`);
                    if (target.length) {
                        target.modal("show");
                    }
                    break;
            }
        });
        // fix tab-panel
        $('a[data-toggle="tab"]').on("click", function (e) {
            const id = $(this).attr("id");
            const target = $(`[aria-labelledby="${id}"]`);
            const tabContent = target.parent("[class*='tab-content']");
            const tabPane = tabContent.children("div[class*='tab-pane']");
            tabPane.each(function () {
                $(this).removeClass("active show");
            });
        });
        //href hyperlink
        $(document).on("click", "[data-href]", function (e) {
            e.preventDefault();
            const href = $(this).data("href");
            //console.log("click href " + href);
            location.href = href;
        });
        /**
         * open in new tab
         */
        $(document.body).on("click", 'a[id="newtab"],[newtab],[data-newtab]', function (e) {
            e.preventDefault();
            const t = $(this);
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
            const dataDismiss = $(this).data("dismiss");
            const dataCallback = $(this).data("callback");
            if (dataDismiss == "badge") {
                e.preventDefault();
                const parent1 = $(this).parents(".badge");
                if (parent1.length) {
                    parent1.remove();
                    if (dataCallback) {
                        ___call(dataCallback);
                    }
                }
            }
        });
        const randbg = $(".rand-bg-color");
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
        const win = window.open(url, name);
        win.focus();
    }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Disabling button
 * @param t element of button
 */
function disable_button(t) {
    let el;
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
    let el;
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
const isoCountries = [
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
const isoLangs = {
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
    for (const key in isoLangs) {
        if (Object.prototype.hasOwnProperty.call(isoLangs, key)) {
            isoLangs[key].id = key;
            isoLangs[key].text = isoLangs[key].nativeName;
            isoLangs[key].img = `/server/img/flag?code=${key}`;
        }
    }
    return Object.values(isoLangs);
}
/**
 * Select2 Language Country
 */
function select2Langs(selectLang, select2Opt = {}) {
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");
    const defaultOpt = {
        placeholder: "Select Article Language",
        templateResult: function (data) {
            if (data.hasOwnProperty("loading") && data.loading)
                return data.text;
            return $(`<img class="flag-icon" src="/server/img/flag?code=${data.id}" alt="Language ${data.id}"/><span style="margin-left:10px">${data.text}</span>`);
        },
        data: getIsoLangs(),
    };
    const newOpt = Object.assign(defaultOpt, select2Opt);
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
function select2Country(select2Country, select2Opt = {}) {
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");
    const newIso = [];
    isoCountries.forEach(function (country) {
        newIso.add(Object.assign(country, { id: country.alpha2, text: country.name }));
    });
    const defaultOpt = {
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
    const newOpt = Object.assign(defaultOpt, select2Opt);
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
    const disqus_trigger = $("#disqus_trigger"), disqus_target = $("#disqus_thread");
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
const distance_already_calculated = [];
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
    let mX, mY, distance, $element = $(`#${target}`);
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
    const queryString = Object.keys(obj)
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
    const is_local = location.host.match(/^localhost|^127|(apotek|php|git).io$/s);
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
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
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
const LoadScriptLoaded = [];
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(config) {
    const urls = [];
    if (typeof config.url == "string") {
        urls.add(config.url);
    }
    else if (Array.isArray(config.url)) {
        urls.addAll(config.url);
    }
    const defaultConfig = {
        url: [],
        options: {
            type: "text/javascript",
        },
        callback: null,
    };
    config = Object.assign(defaultConfig, config);
    console.log(`Script in queue ${urls.length}`);
    /**
     * Callback onreadystatechange
     * @description queue javascript calls
     * @param event
     */
    const callthis = function (event) {
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
        const script = document.createElement("script");
        // script src from first url
        script.src = urls[0];
        LoadScriptLoaded[urls[0]] = {
            status: undefined,
            onerror: undefined,
            onabort: undefined,
            oncancel: undefined,
        };
        if (typeof config.options == "object") {
            // add attriubutes options
            if (config.options.hasOwnProperty("async")) {
                script.async = config.options.async;
            }
            if (config.options.hasOwnProperty("defer")) {
                script.defer = config.options.defer;
            }
            if (config.options.hasOwnProperty("type")) {
                script.type = config.options.type;
            }
        }
        //console.info(`loading script(${script.src})`);
        script.onload = script.onreadystatechange = callthis;
        script.onerror = function () {
            LoadScriptLoaded[script.src]["onerror"] = false;
            console.error(`error while loading ${script.src}`);
        };
        script.onabort = function () {
            LoadScriptLoaded[script.src]["onabort"] = false;
            console.error(`error while loading ${script.src}`);
        };
        script.oncancel = function () {
            LoadScriptLoaded[script.src]["oncancel"] = false;
            console.error(`error while loading ${script.src}`);
        };
        document.body.appendChild(script);
    }
    return LoadScriptLoaded;
}
const loadedCss = [];
/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href, callback) {
    let hrefs;
    if (typeof href == "string") {
        hrefs = [href];
    }
    else {
        hrefs = href;
    }
    if (typeof hrefs[0] == "string" && !loadedCss.contains(hrefs[0])) {
        const link = document.createElement("link");
        link.media = "print";
        link.rel = "stylesheet";
        link.href = hrefs[0];
        link.onload = function () {
            link.media = "all";
            // add to index
            loadedCss.add(hrefs[0]);
            // remove added item to index
            hrefs.shift();
            // if the items is still there
            if (!hrefs.length) {
                if (typeof callback == "function") {
                    callback(link, href);
                }
            }
            else {
                loadCSS(hrefs, callback);
            }
        };
        document.head.appendChild(link);
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
function resizeIFrameToFitContent(iFrame, options = { width: true, height: true }) {
    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}
const guxid = (Math.random().toString(16) + "000000000").substr(2, 8);
/**
 * Get current unique global page user id
 */
function guid() {
    function _p8(s) {
        const p = guxid;
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}
if (typeof jQuery != "undefined" && !isnode()) {
    jQuery.guid = function () {
        function _p8(s) {
            const p = guxid;
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
        const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
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
    const inputrp = $('[id="format-rupiah"]');
    if (inputrp.length) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        inputrp.on("keyup keydown change", function (e) {
            const t = $(this);
            const v = t.val().toString();
            const n = t.next(".form-text, #rupiah");
            let V;
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
function rp(angka, prefix = null) {
    if (!prefix) {
        prefix = "Rp. ";
    }
    // eslint-disable-next-line prefer-const
    let number_string = angka.toString().replace(/[^,\d]/g, ""), 
    // eslint-disable-next-line prefer-const
    split = number_string.split(","), 
    // eslint-disable-next-line prefer-const
    sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), 
    // eslint-disable-next-line prefer-const
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        const separator = sisa ? "." : "";
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
                const attr = $(this).attr(name);
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
                const href = $(this).attr("href");
                const target = $(this).attr("target");
                $(this).on("click", function (e) {
                    e.preventDefault();
                    openInNewTab(href, target);
                });
            };
        })(jQuery);
    }
}
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
/**
 * unique id generator
 * @param length digit number string
 * @returns random string
 */
function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/**
 * Local Storage key
 */
const storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
let formFieldBuild;
const formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formFieldBuild = [];
}
else {
    formFieldBuild = JSON.parse(formSaved);
}
/**
 * Element Indexer
 */
const formField = formFieldBuild;
const uniqueid = makeid(5);
/**
 * check if running in browser
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
/**
 * Element Counter
 */
let Count = -1;
/// <reference path="./_a_Object.d.ts" />
if (typeof Storage == "undefined") {
    class Storage {
    }
}
class lStorage extends Storage {
    constructor(prefix = "") {
        super();
        this.prefix = "";
        this.prefix = prefix;
    }
    has(key) {
        return !!localStorage[this.prefix + key] && !!localStorage[this.prefix + key].length;
    }
    /**
     * See {@link localStorage.getItem}
     * @param key
     * @returns
     */
    get(key) {
        if (!this.has(this.prefix + key)) {
            return false;
        }
        var data = localStorage[this.prefix + key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(this.prefix + key, value);
        }
    }
    extend(key, value) {
        if (this.has(this.prefix + key)) {
            var _value = this.get(this.prefix + key);
            if (typeof jQuery != "undefined") {
                $.extend(_value, JSON.parse(JSON.stringify(value)));
            }
            this.set(this.prefix + key, _value);
        }
        else {
            this.set(this.prefix + key, value);
        }
    }
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }
}
/// <reference path='./_lStorage.ts' />
/// <reference path='./globals.d.ts' />
/// <reference path='./_conf.ts' />
const formSaver2Storage = {
    /**
     * See {@see localstorage.setItem}
     * @param key
     * @param value
     */
    set(key, value) {
        if (typeof value == "object" || Array.isArray(value))
            value = JSON.stringify(value);
        if (typeof value != "string")
            value = new String(value);
        localStorage.setItem(key, value);
    },
    get(key) {
        let value = localStorage.getItem(key);
        if (this.IsJsonString(value)) {
            value = JSON.parse(value);
        }
        if (value != null)
            return value;
    },
    IsJsonString(str) {
        if (str == null)
            return false;
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    },
};
class formSaver2 {
    /**
     * Get Offsets Element
     * @param el
     * @returns
     */
    static offset(el) {
        return el.getBoundingClientRect();
    }
    /**
     * jQuery event listener
     */
    static jquery_listener() {
        // bind to new elements
        $(document).bind("DOMNodeInserted", function () {
            switch ($(this).prop("tagName")) {
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    formSaver2.restore($(this).get(0));
                    break;
            }
        });
        // detach from removed elements
        $(document).bind("DOMNodeRemoved", function () {
            const t = $(this);
            const allowed = !t.attr("no-save") && t.attr("aria-formsaver");
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
            formSaver2.save(this);
        });
        // validate formsaver
        $(document).on("focus", "input,textarea,select", function () {
            const t = $(this);
            t.getIDName();
            const aria = t.attr("aria-formsaver");
            if (aria && aria != uniqueid) {
                console.log("aria id invalid");
                t.smartForm();
                t.attr("aria-formsaver", uniqueid);
            }
        });
    }
    /**
     * Pure javascript event listener
     */
    static vanilla_listener(el, callback) {
        if (el.addEventListener) {
            el.addEventListener("change", callback);
        }
        else if (el.attachEvent) {
            el.attachEvent("onchange", callback);
        }
    }
    /**
     * Is element has attribute ?
     * @param el
     * @param name
     * @returns
     */
    static hasAttribute(el, name) {
        return el.nodeType === 1 && el.hasAttribute(name);
    }
    static convertElement(el) {
        if (el instanceof jQuery) {
            el = el.get(0);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const nodeValid = el.nodeType === 1;
        return el;
    }
    /**
     * Restore form value
     * @param el
     * @param debug
     * @returns
     */
    static restore(el, debug = false) {
        el = this.convertElement(el);
        Count++;
        // skip no save
        if (el.hasAttribute("no-save"))
            return;
        el.setAttribute("aria-formsaver", uniqueid);
        let item;
        const key = this.get_identifier(el);
        const type = el.getAttribute("type");
        //console.log(`restoring ${key} ${type}`);
        // begin restoration
        if (key.length > 0) {
            // checkbox input button
            if (type === "checkbox") {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                if (debug)
                    console.log(`restore value checkbox[${key}] ${item}`);
                el.checked = item;
                return;
            }
            // radio input button
            else if (type === "radio") {
                let value = localStorage.getItem(key);
                if (formSaver2Storage.IsJsonString(value)) {
                    value = JSON.parse(value);
                }
                const ele = document.getElementsByName(el.getAttribute("name"));
                for (let i = 0; i < ele.length; i++)
                    ele[i].checked = false;
                setTimeout(function () {
                    if (value && typeof value == "object" && value.hasOwnProperty("index")) {
                        //ele.item(value.index).checked = true;
                        ele[value.index].checked = true;
                        if (debug)
                            console.log("restoring checkbox", value);
                    }
                }, 1000);
                //item = value === "on";
                //el.checked = item;
                return;
            }
            // input text number, textarea, or select
            else {
                item = localStorage.getItem(key);
                if (item === null || !item.toString().length) {
                    return;
                }
                el.value = item;
                // select2
                if (this.is_select2(el)) {
                    console.log(`restoring ${el.getAttribute("id")} which Initialized select2`);
                    $(el).val(item).trigger("change");
                }
            }
            //if (debug) console.log("load", type, key, item);
        }
    }
    /**
     * Save values form
     * @param el
     * @returns
     */
    static save(el, debug = false) {
        el = this.convertElement(el);
        const key = this.get_identifier(el);
        const item = el.value;
        const allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver") && el.hasAttribute("name");
        if (debug)
            console.log(`${el.tagName} ${key} ${allowed}`);
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                if (debug)
                    console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio") {
                const ele = document.getElementsByName(el.getAttribute("name"));
                const getVal = getCheckedValue(ele);
                const self = this;
                for (let checkboxIndex = 0; checkboxIndex < ele.length; checkboxIndex++) {
                    if (ele.hasOwnProperty(checkboxIndex)) {
                        const element = ele[checkboxIndex];
                        self.delete(element, debug);
                    }
                }
                setTimeout(function () {
                    localStorage.setItem(key, JSON.stringify(getVal));
                    if (debug)
                        console.log("save radio button ", getVal);
                }, 1000);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            //if (debug) console.log("save", key, localStorage.getItem(key));
        }
    }
    static delete(el, debug = false) {
        el = this.convertElement(el);
        const key = this.get_identifier(el);
        if (debug)
            console.log(`deleting ${key}`);
        localStorage.removeItem(key);
    }
    /**
     * Is Select2 Initialized ?
     * @param el
     * @returns
     */
    static is_select2(el) {
        return this.is_jquery() && $(el).data("select2");
    }
    /**
     * Is jQuery loaded?
     * @returns
     */
    static is_jquery() {
        return typeof jQuery != "undefined";
    }
    static get_identifier(el) {
        el = this.convertElement(el);
        if (!el.hasAttribute("id")) {
            if (!(Count in formField)) {
                const ID = makeid(5);
                el.setAttribute("id", ID);
                formField[Count] = ID;
                localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
            }
            else {
                el.setAttribute("id", formField[Count]);
            }
            /**
             * Increase index offset
             */
            Count++;
        }
        else if (el.getAttribute("id") == "null") {
            const ID = makeid(5);
            el.setAttribute("id", ID);
            formField[Count] = ID;
            localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
        }
        return location.pathname + el.getAttribute("id");
    }
    constructor(el, options) {
        const defaultOpt = {
            debug: false,
            method: "vanilla",
        };
        options = Object.assign(defaultOpt, options);
        //console.log(`init debug ${options.debug}`, el);
        if (typeof options.debug == "undefined") {
            options.debug = false;
            console.log(`change debug to false`);
        }
        formSaver2.restore(el, options.debug);
        if (options.method == "jquery" && formSaver2.is_jquery()) {
            formSaver2.jquery_listener();
        }
        else {
            formSaver2.vanilla_listener(el, function () {
                console.log(arguments);
                formSaver2.save(el, options.debug);
            });
        }
    }
}
/**
 * this will check the checked radio in a group, and return the value
 * @param el
 * @returns
 * @see https://stackoverflow.com/a/30389680
 * @example
 * var checkedbooking = getCheckedValue(document.getElementsByName('booking_type'));
 * console.log(checkedbooking); // {index: NumberIndexRadio, value: valueOfRadio}
 */
function getCheckedValue(el) {
    let result = {};
    for (let i = 0, length = el.length; i < length; i++) {
        if (el[i].checked) {
            result = { value: el[i].value, index: i, id: formSaver2.get_identifier(el[i]) };
        }
    }
    return result;
}
/// modify this to tell typescript compiler
/// <reference path="./_conf.ts" />
/// <reference path="./_a_Object.d.ts"/>
/// <reference path="./globals.d.ts"/>
/// <reference path="./index.d.ts"/>
/// <reference path="./formSaver2.ts" />
/**
 * SMARTFORM
 * @todo save form user input
 */
//console.log(`is browser : ${isBrowser()}`);
if (isBrowser()) {
    (function () {
        const isJqueryLoaded = typeof jQuery != "undefined";
        //console.log(`is jQuery loaded : ${isJqueryLoaded}`);
        if (isJqueryLoaded) {
            //console.log("Apply plugin smartform jQuery");
            (function ($) {
                $.fn.getIDName = function () {
                    if ($(this).attr("aria-autovalue")) {
                        $(this).val(uniqueid).trigger("change");
                    }
                    return formSaver2.get_identifier(this);
                };
                $.fn.has_attr = function (name) {
                    var attr = $(this).attr(name);
                    // For some browsers, `attr` is undefined; for others,
                    // `attr` is false.  Check for both.
                    return typeof attr !== "undefined" && attr !== false;
                };
                $.fn.smartForm = function () {
                    Count++;
                    new formSaver2($(this).get(0));
                };
                $.arrive = function (target, callback) {
                    if (target) {
                        $(target).bind("DOMNodeInserted", callback);
                    }
                    else {
                        if (typeof callback == "function") {
                            $(document).bind("DOMNodeInserted", callback);
                        }
                        else if (typeof target == "function") {
                            $(document).bind("DOMNodeInserted", target);
                        }
                    }
                };
            })(jQuery);
        }
    })();
}
/**
 * Set all forms to be saved with method vanilla
 * @todo save input fields into browser for reusable form
 * @param show_debug debug process saving and restoration
 */
function formsaver(show_debug = false) {
    if (typeof jQuery != "undefined") {
        if (show_debug)
            console.log("Starting smartform jQuery");
        if (typeof jQuery != "undefined") {
            jQuery("input,textarea,select").each(function (i, el) {
                new formSaver2(this, { debug: show_debug });
            });
        }
    }
}
/// <reference path="globals.d.ts" />
function linkify(string, buildHashtagUrl, includeW3, target, noFollow) {
    let relNoFollow = "";
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
                let match;
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
        const pluginName = "progressTimer";
        // The actual plugin constructor
        class Plugin {
            constructor(element, options) {
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
            init() {
                const t = this;
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
            }
            _run() {
                const t = this;
                const elapsed = new Date().valueOf() - t.start.valueOf(), width = (elapsed / t.limit) * 100;
                t.bar.attr("aria-valuenow", width);
                t.bar.width(width + "%");
                let percentage = Number(width.toFixed(2));
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
            }
            removeInterval() {
                const t = this, bar = $(".progress-bar", t.element);
                if (typeof bar.data("progress-interval") !== "undefined") {
                    const interval = bar.data("progress-interval");
                    window.clearInterval(interval);
                }
                return bar;
            }
            destroy() {
                this.$elem.removeData();
            }
            complete() {
                const t = this, bar = t.removeInterval.call(t), args = arguments;
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
            }
            error() {
                const t = this, bar = t.removeInterval.call(t), args = arguments;
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
            }
        }
        Plugin.prototype.constructor = Plugin;
        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function (options) {
            const args = arguments;
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
                    const instance = $.data(this[0], "plugin_" + pluginName);
                    return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                else {
                    // Invoke the specified method on each selected element
                    return this.each(function () {
                        const instance = $.data(this, "plugin_" + pluginName);
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
const reCaptcha = {
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
                        const msg = "first_start_" +
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
    exec: function (action, retry = false, callback = null) {
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
            for (let index = 0; index < 3; index++) {
                reCaptcha.exec(action, true);
                if (index == 3 - 1) {
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
        const execute = grecaptcha.execute(reCaptcha.key, {
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
        const form = $("form");
        form.each(function (i, el) {
            const fg = $(this).find('[name="g-recaptcha-response"]');
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
        const gr = $('input[name="g-recaptcha-response"]');
        if (gr.length) {
            const vr = gr[0].getAttribute("value");
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
const requirejs_vendor = "/node_modules";
const require_config = {
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
const dtpackage = function () {
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
const requirejs_ignited = false;
if (!isnode()) {
    function downloadRequireJS(win, event) {
        return new Promise(function (resolve) {
            console.log(`Loading RequireJS using`, event);
            if (!requirejs_ignited) {
                const element = document.createElement("script");
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
    const scripts_List = [];
    const style_List = [];
    const htm = document.querySelector("html");
    let cache = htm.getAttribute("cache").toString().trim();
    cache = cache.length ? "?cache=" + cache : "";
    for (const key in require_config.paths) {
        if (require_config.paths.hasOwnProperty(key)) {
            const element = require_config.paths[key];
            if (name.includes(key)) {
                scripts_List.push(element + ".js" + cache);
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
                const dtl = $(".dataTables_length");
                const toolbar = $("div.dt-toolbar");
                const button = $("button.dt-button").not(".btn");
                setTimeout(function () {
                    if (button.length) {
                        button.addClass("btn btn-info");
                    }
                    if (dtl.length) {
                        dtl.addClass("bs-select");
                    }
                    if (toolbar.length) {
                        toolbar.html(``);
                    }
                }, 5000);
                if (typeof callback == "function") {
                    callback();
                }
            });
        },
    });
}
let datatables_ignited = false;
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
const optimized_ids = [];
/**
 * Optimize Material Datatables
 * @param id id table
 * @param callback additional function to optimizer
 */
function datatables_optimize(id, callback) {
    if (optimized_ids.includes(id)) {
        console.error(`Datatables #${id} already optimized`);
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
        const $this = $(this);
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
class ctable {
    constructor(config) {
        this.can_edit = null;
        this.instance = null;
        this.editable_run = false;
        if (typeof config == "object") {
            if (config.hasOwnProperty("editable") && config.editable) {
                this.can_edit = true;
            }
        }
    }
    create(id, where, data) {
        let table = `<table id='${id}' class='table table-responsive' style="position:relative"><thead><tr>`;
        const self = this;
        for (let i = 0; i < data.length; i++) {
            table = table + "<th>" + data[i] + "</th>";
        }
        table = table + "</tr></thead><tbody></tbody></table>";
        document.getElementById(where).innerHTML += table;
        if (this.can_edit) {
            setTimeout(function () {
                self.instance = $(`table#${id}`);
                self.instance.append(`<span class="table-add fas fa-plus text-success" style="position: absolute;right:15px;top:15px;cursor:pointer"></span>`);
                self.instance.find("tbody").append(`<tr class="addthis d-none">
        <td contenteditable="true">Untitled</td>
        <td contenteditable="true">Undocumented</td>
        <td><span class="table-remove fas fa-trash text-danger" style="cursor:pointer"></span></td><td> <span class="table-up fas fa-arrow-up text-info" style="cursor:pointer"></span> <span class="table-down fas fa-arrow-down text-info" style="cursor:pointer"></span> </td>
      </tr>`);
                self.editable(true);
            }, 500);
        }
    }
    add(table, data) {
        let row = "<tr>";
        for (let i = 0; i < data.length; i++) {
            let td = data[i];
            if (typeof td == "object" || Array.isArray(td)) {
                td = `<pre class="json">${JSON.stringify(td, null, 2)}</pre>`;
            }
            if (!this.can_edit) {
                row += "<td>" + td + "</td>";
            }
            else {
                row += '<td contenteditable="true">' + td + "</td>";
            }
        }
        if (this.can_edit) {
            row += `<td><span class="table-remove fas fa-trash text-danger" style="cursor:pointer"></span></td><td> <span class="table-up fas fa-arrow-up text-info" style="cursor:pointer"></span> <span class="table-down fas fa-arrow-down text-info" style="cursor:pointer"></span> </td>`;
        }
        row += "</tr>";
        document
            .getElementById(table)
            .getElementsByTagName("tbody")[0].innerHTML += row;
    }
    editable(activate) {
        const self = this;
        if (this.editable_run) {
            return;
        }
        if (activate && self.instance && self.instance.length) {
            this.editable_run = true;
            $(document).on("click", ".table-add", function (e) {
                e.preventDefault();
                const $clone = self.instance
                    .find("tr.addthis")
                    .clone(true)
                    .removeClass("d-none");
                self.instance.find("table").append($clone);
            });
            $(".table-remove").click(function () {
                $(this).parents("tr").detach();
            });
            $(".table-up").click(function () {
                const $row = $(this).parents("tr");
                if ($row.index() === 1)
                    return; // Don't go above the header
                $row.prev().before($row.get(0));
            });
            $(".table-down").click(function () {
                const $row = $(this).parents("tr");
                $row.next().after($row.get(0));
            });
        }
    }
}
if (!isnode()) {
    if (typeof jQuery != "undefined") {
        const target = $(location).attr("hash");
        const offset = $(this).attr("data-offset")
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
            console.log(`${data.uid} was saved`);
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
class user {
    constructor() {
        //constructor() { if (!this.all()) { this.fetch(null); } }
        this.key = location.host + "/userdata";
    }
    /**
     * Get all userdata
     */
    all() {
        const data = storage().get(this.key);
        if (!data || data == "") {
            return undefined;
        }
        return data;
    }
    /**
     * get userdata
     */
    get(key) {
        try {
            const data = this.all();
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
    }
    /**
     * User login
     * @param user
     * @param pass
     * @param callback
     * @example
     * userClass().login('username', 'password', function (err, data) {
        console.log(arguments);
        if (!err){
            console.log('login successful');
        }
    });
     */
    login(user, pass, callback) {
        const data = new URLSearchParams();
        data.append("user", user);
        // todo: avoid local network sniffers, reversing password
        data.append("pass", pass.rot13());
        fetch("/server/user?login", {
            method: "post",
            body: data,
        })
            .then((response) => response.json())
            .then((response) => {
            if (typeof callback == "function") {
                callback(response.error, response);
            }
        });
    }
    /**
     * fetch userdata
     * @param callback
     * @returns
     */
    fetch(callback) {
        const ini = this;
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
    }
}
if (!isnode()) {
    const uclass = new user();
    /**
     * User Class
     */
    function userClass() {
        return uclass;
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
    for (let index = 0; index < 1000; index++) {
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
class ZLIB {
    /**
     * Base64 decode from php
     * @param {Uint8Array} arr
     */
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