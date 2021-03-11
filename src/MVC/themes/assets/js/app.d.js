/// <reference path="../../../../../libs/js/Array.d.ts" />
/// <reference path="../../../../../libs/js/Object.d.ts" />
/// <reference path="../../../../../libs/js/jQuery.d.ts" />
/// <reference path="../../../../../libs/js/JQueryStatic.d.ts" />
/// <reference types="node" />
/// <reference types="jquery" />
declare function arrayCompare(a1: Array<any>, a2: Array<any>): boolean;
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
declare function inArray(needle: any, haystack: Array<any>): boolean;
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
declare function in_array(needle: any, haystack: Array<any>): boolean;
/**
 * get all keys
 * @param haystack string etc
 */
declare function array_keys(haystack: any): string[];
/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
declare function array_shuffle(a: Array<any>): any[];
declare function array_filter(array: []): never[];
/**
 * CodeMirror loader
 * @param id
 * @param mode
 * @param theme
 */
declare function loadCodemirror(element: HTMLTextAreaElement, mode: string | string[], theme: string): any;
/**
 * Cookie Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @see http://localhost/src/Cookies/helper.php
 */
declare class Cookies {
    /**
     * Get cookie value by cookie name
     * @param c_name
     * @returns null if cookie not exists
     */
    static get(c_name: string): string | Object | null;
    /**
     * Create cookie expiring in days
     * @param name cookie name
     * @param value cookie value
     * @param days days to expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
     */
    static set(name: string, value: any, expire: number, expire_type: string, path: string | any, callback: any | Function): any;
    /**
     * Call function if cookie name not set
     * @param name
     * @param value
     * @param expire Expires number (minutes)
     * @param callback Function callback to be executed one time
     */
    static one(name: string, value: any, expire: number, callback: Function): void;
    /**
     * decompress cookie
     * @param str
     */
    static decompress(str: string): void;
    /**
     * compress cookie
     * @param str
     */
    static compress(str: string): void;
}
/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 */
declare function getKey(passphrase: string, salt: string): CryptoJS.WordArray;
/**
 * Encrypt function
 * @param {string} passphrase
 * @param {string} plainText
 */
declare function userJSEncrypt(passphrase: string, plainText: string): string;
/**
 * Decrypt function
 * @param {string} passphrase
 * @param {string} encryptedText
 */
declare function userJSDecrypt(passphrase: string, encryptedText: string): string;
/**
 * Crypto get key
 * @param {String} passphrase
 * @param {String} salt
 */
declare function CryptoK(passphrase: string, salt: string): CryptoJS.WordArray;
/**
 * Crypto encrypt
 * @param {String} passphrase
 * @param {String} plainText
 * @param {String} salt
 * @param {String} iv
 */
declare function CryptoE(passphrase: string, plainText: string, salt: string, iv: string): string;
/**
 * Crypto decrypt
 * @param {String} passphrase
 * @param {String} encryptedText
 * @param {String} salt
 * @param {String} iv
 */
declare function CryptoD(passphrase: string, encryptedText: string, salt: string, iv: string): string;
/**
 * @todo CryptoJS
 * @package https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
 */
declare var salt: string;
declare var iv: string;
declare var iterations: string;
/**
 * Datatables loader
 * @param callback
 */
declare function load_datatables(callback: Function): Promise<void>;
/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
declare function datatables_init(): Promise<void>;
/**
 * Scroll up after click pagination dt
 * @param {JQuery} target
 */
declare function pagination_up(target: JQuery): void;
declare function datetime_local(date: any): string;
/**
 * Detect is mobile
 */
declare function isMobile(): boolean;
interface HTMLElement {
    [attachEvent: string]: any;
}
/** Add one or more listeners to an element
 * @param element - DOM element to add listeners to
 * @param eventNames - space separated list of event names, e.g. 'click change'
 * @param listener - function to attach for each event as a listener
 */
declare function setEventListener(element: HTMLElement, eventNames: "click" | "mouseover" | "submit" | "change", listener: EventListenerObject | Function | any): void;
/**
 * @class Generate unique id
 */
declare class GeneratorID {
    private rand;
    constructor();
    /**
     * Increase new id
     */
    genId(): number;
    getId(): string;
}
declare function createElement(params: createElementOpt): any;
/**
 * @param {createElement} options
 */
declare function createElement(options: typeof createElement): any;
declare class html {
    static create(options: any): any;
}
/**
 * Object management
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @todo easy object processing
 */
declare type NotFunction<T> = T extends Function ? never : T;
/**
 * @class Timer constructor
 * @example
 * const time = new Timer(() => console.log('hi'), 1000);
 * console.log(time instanceof Timer); // true
 */
declare class Timer {
    private timeId;
    constructor(callback: Function, time: number);
    clear(): void;
}
/**
 * check empty
 * @param str
 */
declare function empty(str: string | null | undefined | number | boolean): boolean;
/**
 * Get current function name
 */
declare function getFuncName(): string;
interface Window {
    [func: string]: any;
}
/**
 * call_user_func
 * @param functionName function name
 */
declare function ___call(functionName: string, context: Window, args: any): void;
/**
 * call_user_func
 * @param func function name
 */
declare function __call(func: string): void;
declare function pageid(length: number): string;
declare const randstr: (length?: number) => string;
/**
 * Is Node ?
 */
declare function isnode(): boolean;
declare var AjaxSchedulerInit: NodeJS.Timeout;
declare var AjaxSchedulerRequests: Array<any>;
declare var AjaxSchedulerRunning: Boolean;
/**
 * AJAX MANAGER
 * @todo handle ajax request queue
 * @see https://bit.ly/2Tz0wrf
 */
declare class ajaxScheduler {
    /**
     * Add ajax to queues
     * @param opt
     */
    static add(opt: JQueryAjaxSettings): void;
    /**
     * Remove ajax from queues
     * @param opt
     */
    static remove(opt: Object): void;
    /**
     * Run Ajax Scheduler
     */
    static run(): boolean;
    /**
     * Stop ajax scheduler
     */
    static stop(): void;
}
/**
 * RUN AJAX Scheduler
 * @param method POST, GET, HEAD, DELETE, OPTIONS, PATCH, PROPATCH
 * @description ajax request one by one
 * @todo scheduling any jquery ajax
 */
declare function ajaxRun(url: string, method: string, data: object, success: Function, failed: Function, complete: Function): void;
declare function ajaxFormSchedule(): void;
declare function ajax(): {
    (): any;
    x(): any;
    send(url: any, callback: any, method: any, data: any, async: any): void;
    get(url: any, data: any, callback: any, async: any): void;
    post(url: any, data: any, callback: any, async: any): void;
};
declare namespace ajax {
    function x(): any;
    function send(url: any, callback: any, method: any, data: any, async: any): void;
    function get(url: any, data: any, callback: any, async: any): void;
    function post(url: any, data: any, callback: any, async: any): void;
}
/**
 * Google analystic reporter
 * @param {String} event_action
 * @param {string} event_label
 * @param {string} event_category
 * @param {string} event_value
 * @param {Function|any} event_callback
 */
declare function analys(event_action: string, event_label: string, event_category: string, event_value: string, event_callback: Function | any): any;
declare var gtagID: string;
declare var create_gtagscript: HTMLScriptElement;
declare var gtag: any;
declare function typedKeys<T>(o: T): (keyof T)[];
declare var ORIGIN: any;
declare var dimas: {
    /**
     * get current url without querystrings
     */
    url: any;
    /**
     * framework captcha
     */
    captcha: {
        /**
         * DO NOT ASSIGN THIS
         */
        check: NodeJS.Timeout;
        /**
         * Get current captcha id
         */
        id: (header_name: string | null) => string;
        /**
         * Get current captcha from backend
         * And process it by jsonpCallback
         */
        get: (header_name: null | string) => void;
        callback: (arg?: any) => void;
        /**
         * Captcha JSONP callback
         */
        jspCallback: (res: {
            captcha: string;
        }) => void;
        listener_started: any;
        /**
         * Form Captcha listener
         */
        listen: () => JQuery<Document>;
    };
    /**
     * Make async function
     * @param callback
     */
    async: (callback: any) => Promise<unknown>;
    /**
     * Rupiah currency auto format
     */
    rp: (angka: number, prefix: string | any) => string;
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    isNumber: (v: string | number) => boolean;
    /**
     * strpad / startwith zero [0]
     * @param {number} val
     */
    strpad: (val: number) => string | number;
    /**
     * Autofill datetime-local value
     */
    datetimelocal: (v: string | number) => void;
    /**
     * Get cookie
     * @param string name cookie
     */
    gc: (name: string) => string;
    /**
     * Odd or Even (Ganjil Genap);
     * @param type odd or even
     */
    oddoreven: (n: string, type: string) => boolean;
    /**
     * Set cookie
     * @param {String} name
     * @param {any} value
     * @param {number} hours
     */
    sc: (name: string, value: any, hours: number) => void;
    allcookies: () => {
        [key: string]: any;
    };
    /**
     * Remove Cookie
     */
    rc: (name: string) => void;
    /**
     * Get Query name from current url
     */
    getquery: (variable: any) => string | false;
    recode: (content: string, passcode: string) => string;
    /**
     * Get js file from url
     * @param {String} url
     * @param {Function} callback
     */
    js: (url: string, callback: Function | any) => void;
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    pctdRUN: (elm: JQuery) => any;
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
    pctd: (elm: JQuery) => void;
    /**
     * Parseurl just like as parse_url at php
     */
    parseurl: (url: string) => {
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        searchObject: {
            [key: string]: any;
        };
        hash: string;
        protohost: string;
    };
};
/**
 * Framework object initializer
 */
declare function framework(): {
    /**
     * get current url without querystrings
     */
    url: any;
    /**
     * framework captcha
     */
    captcha: {
        /**
         * DO NOT ASSIGN THIS
         */
        check: NodeJS.Timeout;
        /**
         * Get current captcha id
         */
        id: (header_name: string) => string;
        /**
         * Get current captcha from backend
         * And process it by jsonpCallback
         */
        get: (header_name: string) => void;
        callback: (arg?: any) => void;
        /**
         * Captcha JSONP callback
         */
        jspCallback: (res: {
            captcha: string;
        }) => void;
        listener_started: any;
        /**
         * Form Captcha listener
         */
        listen: () => JQuery<Document>;
    };
    /**
     * Make async function
     * @param callback
     */
    async: (callback: any) => Promise<unknown>;
    /**
     * Rupiah currency auto format
     */
    rp: (angka: number, prefix: any) => string;
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    isNumber: (v: string | number) => boolean;
    /**
     * strpad / startwith zero [0]
     * @param {number} val
     */
    strpad: (val: number) => string | number;
    /**
     * Autofill datetime-local value
     */
    datetimelocal: (v: string | number) => void;
    /**
     * Get cookie
     * @param string name cookie
     */
    gc: (name: string) => string;
    /**
     * Odd or Even (Ganjil Genap);
     * @param type odd or even
     */
    oddoreven: (n: string, type: string) => boolean;
    /**
     * Set cookie
     * @param {String} name
     * @param {any} value
     * @param {number} hours
     */
    sc: (name: string, value: any, hours: number) => void;
    allcookies: () => {
        [key: string]: any;
    };
    /**
     * Remove Cookie
     */
    rc: (name: string) => void;
    /**
     * Get Query name from current url
     */
    getquery: (variable: any) => string | false;
    recode: (content: string, passcode: string) => string;
    /**
     * Get js file from url
     * @param {String} url
     * @param {Function} callback
     */
    js: (url: string, callback: any) => void;
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    pctdRUN: (elm: JQuery<HTMLElement>) => any;
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
    pctd: (elm: JQuery<HTMLElement>) => void;
    /**
     * Parseurl just like as parse_url at php
     */
    parseurl: (url: string) => {
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        searchObject: {
            [key: string]: any;
        };
        hash: string;
        protohost: string;
    };
};
declare class app {
    static base: string;
    static setbase(path: string): void;
    static direct(...args: string[]): void;
    static load(...args: any[]): void;
}
/**
 * base64 encoding
 * @param {string} str string raw
 */
declare function base64_encode(str: string): string;
/**
 * base64 decoding
 * @param {string} str base64 string
 */
declare function base64_decode(str: string): string;
declare function b64EncodeUnicode(str: any): string;
declare function b64DecodeUnicode(str: any): string;
/**
 * Disable debugger
 */
declare function bannedebug(): void;
/**
 * Detect debugger using flooding loop
 */
declare function debug_detect(): void;
/**
 * restrict debug
 * @param {Boolean} restrict
 */
declare function restrict_mode(restrict: boolean): void;
declare var debug_run: any;
declare var restrict: boolean;
/**
 * Disqus loader which verifies the existence of `#disqus_thread` on
 * the web page and then prepares the disqus embed script to hook in
 * the document
 * @param disqus_shortname disqus username/shortname
 */
declare function load_disqus(disqus_shortname: string): void;
declare const distance_already_calculated: string[];
/**
 * find distance
 * @param target
 * @param callback
 */
declare function calculateDistance(target: string, callback: (arg0: number) => any): JQuery<Document>;
/**
 * calculate distance mouse x element
 * @param elem
 * @param mouseX
 * @param mouseY
 */
declare function calculatorDistance(elem: JQuery, mouseX: number, mouseY: number): number;
/**
 * Encode HTML string to HTML entities
 * @param {String} str
 */
declare function prepEntities(str: string): string;
declare var entityMap: {
    160: string;
    161: string;
    162: string;
    163: string;
    164: string;
    165: string;
    166: string;
    167: string;
    168: string;
    169: string;
    8364: string;
};
/**
 * php equivalent http_build_query
 * @param obj
 */
declare function http_build_query(obj: Object): string;
/**
 * Check current framework running at localhost
 */
declare function is_localhost(): RegExpMatchArray;
/**
 * Is Development Mode
 */
declare function is_development(): boolean;
/**
 * Force HTTPS
 */
declare function forceSSL(): void;
/**
 * json decode fails return false
 * @param  obj
 */
declare function json_decode(obj: string): any;
/**
 * check string is json
 * @param str
 */
declare function isJSON(str: string): boolean;
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
declare function LoadScript(urls: string | string[], callback: null | Function): void;
/**
 * Load CSS async
 * @param href
 * @param callback
 */
declare function loadCSS(href: string | string[], callback: any): void;
declare const guxid: string;
/**
 * Get current unique global page user id
 */
declare function guid(): string;
/**
 * Generate UUID v4
 */
declare function uuidv4(): string;
declare function setInputFilter(textbox: any, inputFilter: any): void;
declare var INPT: NodeListOf<Element>;
declare var index: number;
declare var element: Element;
/** Format Rupiah */
declare var inputrp: JQuery<HTMLElement>;
declare class ip {
    private static status;
    /**
     * Checks ip
     * @returns promises
     */
    static check(): Promise<void>;
    /**
     * Gets ip
     * @param callback function callback(ip) or null return ip
     * @returns {String} ip or callback
     */
    static get(callback: Function | null): string;
    static ipapi(): JQuery.jqXHR<any>;
    static l2io(): JQuery.jqXHR<any>;
}
declare function md5(string: any): string;
interface progressBarTimer {
    warningThreshold: number;
}
/**
 * @see https://github.com/imalliar/jquery.progressBarTimer
 */
declare var progressBarTimer: progressBarTimer;
/**
 * Hidden reCaptcha v3 object initializer
 */
declare function recaptcha(): {
    /**
     * @type {Number} counter executions
     */
    gexec_count: number;
    key: string;
    /**
     * Javascript caller
     * @param {String} url
     * @param {Function} callback
     */
    js: (url: string, callback: Function) => void;
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: (key: string) => void;
    /**
     * Start recaptcha
     */
    start: () => void;
    /**
     * Initialize Recaptcha by defining jquery
     */
    init: () => void;
    retry_count: number;
    /**
     * load or refreshing google recaptcha
     */
    exec: (action: any, retry: any, callback: any) => void;
    /**
     * Insert reCaptcha Token
     * @param {String} token
     */
    insert: (token: string) => void;
    /**
     * Distribute reCaptcha Token
     * @param {String} token
     */
    distribute_token: (token: string) => void;
    /**
     * Get token recaptcha
     */
    get: () => string;
    /**
     * Button Controller
     * @param {Boolean} reCaptcha_disable
     * @param {Function} callback
     */
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
declare var reCaptcha: {
    /**
     * @type {Number} counter executions
     */
    gexec_count: number;
    key: string;
    /**
     * Javascript caller
     * @param {String} url
     * @param {Function} callback
     */
    js: (url: string, callback: Function) => void;
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: (key: string) => void;
    /**
     * Start recaptcha
     */
    start: () => void;
    /**
     * Initialize Recaptcha by defining jquery
     */
    init: () => void;
    retry_count: number;
    /**
     * load or refreshing google recaptcha
     */
    exec: (action: any, retry: any, callback: any) => void;
    /**
     * Insert reCaptcha Token
     * @param {String} token
     */
    insert: (token: string) => void;
    /**
     * Distribute reCaptcha Token
     * @param {String} token
     */
    distribute_token: (token: string) => void;
    /**
     * Get token recaptcha
     */
    get: () => string;
    /**
     * Button Controller
     * @param {Boolean} reCaptcha_disable
     * @param {Function} callback
     */
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
/**
 * Set all forms to be smart
 */
declare function smartform(): void;
/**
 * Copy to clipboard
 */
declare function copyToClipboard(text: string, el: JQuery): void;
/**
 * localStorage helper
 */
declare function storage(): {
    /**
     * get localstorage by key
     * @param {String} key
     */
    get: (key: string) => any;
    /**
     * Set localstorage key value
     * @param {String} key
     * @param {String|Array|Object} value
     */
    set: (key: string, value: string | Array | any) => void;
    /**
     * Check localstorage key exists
     * @param {String} key
     */
    has: (key: string) => boolean;
    /**
     * Extend or set localstorage key
     * @param {String} key
     * @param {String} value
     */
    extend: (key: string, value: string) => void;
    /**
     * Remove localstorage key
     * @param {String} key
     */
    remove: (key: string) => void;
};
declare var STORAGE: {
    /**
     * get localstorage by key
     * @param {String} key
     */
    get: (key: string) => any;
    /**
     * Set localstorage key value
     * @param {String} key
     * @param {String|Array|Object} value
     */
    set: (key: string, value: string | Array | any) => void;
    /**
     * Check localstorage key exists
     * @param {String} key
     */
    has: (key: string) => boolean;
    /**
     * Extend or set localstorage key
     * @param {String} key
     * @param {String} value
     */
    extend: (key: string, value: string) => void;
    /**
     * Remove localstorage key
     * @param {String} key
     */
    remove: (key: string) => void;
};
interface String {
    /**
     * Matches a string an object that supports being matched against, and returns an array containing the results of that search.
     * @param matcher An object that supports being matched against.
     */
    match(matcher: {
        [Symbol.match](string: string): RegExpMatchArray | null;
    }): RegExpMatchArray | null;
    /**
     * Replaces text in a string, using an object that supports replacement within a string.
     * @param searchValue A object can search for and replace matches within a string.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replace(searchValue: {
        [Symbol.replace](string: string, replaceValue: string): string;
    }, replaceValue: string): string;
    /**
     * Replaces text in a string, using an object that supports replacement within a string.
     * @param searchValue A object can search for and replace matches within a string.
     * @param replacer A function that returns the replacement text.
     */
    replace(searchValue: {
        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    }, replacer: (substring: string, ...args: any[]) => string): string;
    /**
     * Finds the first substring match in a regular expression search.
     * @param searcher An object which supports searching within a string.
     */
    search(searcher: {
        [Symbol.search](string: string): number;
    }): number;
    /**
     * Split a string into substrings using the specified separator and return them as an array.
     * @param splitter An object that can split a string.
     * @param limit A value used to limit the number of elements returned in the array.
     */
    split(splitter: {
        [Symbol.split](string: string, limit?: number): string[];
    }, limit?: number): string[];
    /**
     * Parse url into part object
     */
    parse_url: () => {
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        searchObject: {};
        hash: string;
        protohost: string;
    };
    /**
     * Call css from url/path
     */
    CSS: () => void;
    /**
     * Hex encrypt
     */
    hexE: () => string;
    /**
     * Hex Decrypt
     */
    hexD: () => string;
    /**
     * Capitalize all first character string
     * @example [PHP] ucwords($string)
     */
    capitalize: () => string;
    /**
     * PHP str_rot13 equivalent
     */
    rot13: () => string;
}
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}
declare function currentUID(): string;
/**
 * Get uid saved in browser
 */
declare function getUID(): string;
/**
 * Signing the uid
 * @param {String} UID
 */
declare function sign_uid(UID: string): void;
/**
 * Check UID
 * @return {string} uid
 * @param {Function|any} callback
 */
declare function checkUID(callback: Function | any): string;
declare function isExpireUID(): boolean;
declare function AddMinutesToDate(date: any, minutes: any): Date;
declare function genUID(): string;
/**
 *  Save uid
 * @param {Object} data
 */
declare function saveUID(data: any): void;
declare var UIDvalue: string;
declare var UIDcalled: boolean;
/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 */
declare function getParameterByName(name: string, url: string | null): string;
/**
 * User framework
 */
declare class user {
    key: string;
    /**
     * Get all userdata
     */
    all(): undefined | object | any;
    /**
     * get userdata
     */
    get(key: string): any;
    /**
     * fetch userdata
     */
    fetch(callback: Function | null): JQuery.jqXHR<any>;
}
interface Window {
    user: user;
}
/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
declare function tafocus(id: string, placeholder: string): void;
/**
 * format new lines
 * @param {String} placeholder
 */
declare function formatNewLines(placeholder: string): string;
/**
 * Count newLines
 * @param {String} placeholder
 */
declare function countNewLines(placeholder: string): string | number;
/**
 * find duplicate array
 * @param {Array<any>} arr
 * @param {Function} callback
 */
declare function findDups(arr: Array<any>, callback: Function): any;
/**
 * Auto Generate ID
 * @param {Number} length
 */
declare function makeid(length: number): string;
/**
 * load or refreshing google recaptcha
 */
declare function gexec(action: any, retry: any, callback: any): void;
/**
 * Get token recaptcha
 */
declare function geToken(): string;
/**
 * Javascript caller
 * @param {String} url
 * @param {Function} callback
 */
declare function JavaScriptCaller(url: string, callback: Function): void;
/**
 * open in new tab
 * @param {string} url
 * @param {string} name
 */
declare function openInNewTab(url: string, name: string): void;
/**
 * get currency symbol from navigator
 */
declare function get_currency_symbol(): string;
/**
 * Create JSON
 * @param {any} jsObj
 * @param {boolean} tabs
 */
declare function createJSON(jsObj: any, tabs: boolean): string;
declare function loadingio(text: any, callback: any, mode: any, ...args: any[]): void;
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
declare function parse_proxy(str: string): Array<any>;
/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
declare function array_rand(arrays: Array<any>, unique: boolean): {
    index: number;
    value: any;
};
/**
 * Array unique
 * @param {Array<any>} arrays
 */
declare function array_unique(arrays: Array<any>): any[];
/**
 *
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
declare function array_unset(arrayName: Array<any>, key: string | number): any[];
/**
 * Add class if not exists
 * @param {Element} element element from DOM
 * @param {string} className class name
 */
declare function toogleClass(element: Element, className: string): boolean;
declare function UNIQUE_ID(): string;
/**
 * jQuery pseudo builder
 * @param {string} string
 */
declare function pseudo_builder(string: string): string;
/**
 * Loop key value of object
 * @param {Object} object
 * @param {Function} callback
 */
declare function foreach(object: any, callback: Function): void;
/**
 * Get multiple random element from array
 * @param {Array<any>} arr array sources
 * @param {Number} n maximum element to be in result
 * @param {Function} callback function to process result
 */
declare function getRandom(arr: Array<any>, n: number, callback: Function): any;
/**
 * @todo Auto replace placeholder textarea newLines
 */
declare var textAreas: HTMLCollectionOf<HTMLTextAreaElement>;
/** Query URL */
declare var hash: string;
declare var result: {};
/** Progress bar */
declare var elm: JQuery<HTMLElement>;
/**
 * @type {JQuery<HTMLElement>} L
 */
declare var L: JQuery<HTMLElement>;
/**
 * new tab links hide refferer
 */
declare var nwtb: JQuery<HTMLElement>;
/**
 * links new tab form submit
 */
declare var aform: JQuery<HTMLElement>;
declare function socket_start(host: any): void;
declare function socket_server(host: any): EventSource;
declare function socket_stop(): void;
declare function socket_check(): any;
/**
 * Simple Websocket javascript
 * @todo Live Data
 * @description Don't miss data that changes even for a second
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com
 * @see https://www.webmanajemen.com/p/simple-websocket.html Simple Web Socket
 */
declare var socket: any;
/**
 * ZLIB packer
 * @see http://localhost/src/ZLIB.php
 * @requires pako `npm i pako @types/pako`
 */
declare class ZLIB {
    /**
     * Base64 decode from php
     * @param {Uint8Array} arr
     */
    static atos(arr: Uint8Array): string;
    static decompress(str: any): string;
    static compress(str: any): string;
}