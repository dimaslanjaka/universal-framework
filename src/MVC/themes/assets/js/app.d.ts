/// <reference path="../../../../../libs/js/globals.d.ts" />
/// <reference path="../../../../../libs/js/Object.d.ts" />
/// <reference path="../../../../../libs/src/smartform/src/js/Object.d.ts" />
/// <reference path="../../../../../libs/js/Date.d.ts" />
/// <reference path="../../../../../libs/js/alert.d.ts" />
/// <reference types="jquery" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="datatables.net" />
/**
 * AES encrypt
 * @url /src/shim/Cipher.php
 * @param {text} text
 * @param {text} key
 */
declare function aesEncrypt(text: any, key: any): string;
/**
 * AES decrypt
 * @url /src/shim/Cipher.php
 * @param {text} encrypted
 * @param {text} key
 */
declare function aesDecrypt(encrypted: any, key: any): any;
declare namespace CryptoJSAesJson {
    function stringify(cipherParams: any): string;
    function parse(jsonStr: any): CryptoJS.lib.CipherParams;
}
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
 * @see http://localhost/src/Cookie/helper.php
 */
declare class Cookies {
    private static logged;
    private static logging;
    /**
     * Get cookie value by cookie name
     * @param c_name
     * @returns null if cookie not exists
     */
    static get(c_name: string): string | Object | null;
    /**
     * Check cookie exists
     * @param c_name cookie name
     */
    static has(c_name: string): boolean;
    /**
     * Create cookie expiring in days
     * @param name cookie name
     * @param value cookie value
     * @param expire
     * @param expire_type d = days, m = minutes, s = seconds, default seconds
     * @param path
     * @param callback
     */
    static set(name: string, value: any, expire: number | string, expire_type?: string | null, path?: string | any | null, callback?: any | Function | null): any;
    /**
     * Delete Cookie
     * @param name cookie name
     */
    static del(name: string): void;
    /**
     * Get all cookies
     */
    static all(): {};
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
    private static decompress;
    /**
     * compress cookie
     * @param str
     */
    private static compress;
}
/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 */
declare function getKey(passphrase: string, salt: string): CryptoJS.lib.WordArray;
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
declare function CryptoK(passphrase: string, salt: string): CryptoJS.lib.WordArray;
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
/**
 * @param {createElementOpt} options
 */
declare function createElement(options: createElementOpt): HTMLElement | DocumentFragment;
declare function createElement(params: createElementOpt): any;
declare class html {
    static create(options: any): any;
}
/**
 * Detect is mobile
 */
declare function isMobile(): boolean;
declare function get_device(): {
    screen: string;
    browser: string;
    browserVersion: string;
    browserMajorVersion: number;
    mobile: boolean;
    os: string;
    osVersion: string | RegExpExecArray | number[];
    cookies: boolean;
    flashVersion: string;
};
/** Add one or more listeners to an element
 * @param element - DOM element to add listeners to
 * @param eventNames - space separated list of event names, e.g. 'click change'
 * @param listener - function to attach for each event as a listener
 */
declare function setEventListener(element: HTMLElement, eventNames: "click" | "mouseover" | "submit" | "change", listener: EventListenerOrEventListenerObject): void;
declare class STORAGE {
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
    init(callback: Function): void;
    /**
     * get localstorage by key
     * @param key
     */
    get(key: string): any;
    /**
     * Set localstorage key value
     * @param key
     * @param value
     */
    set(key: string, value: any): void;
    /**
     * Check localstorage key exists
     * @param key
     */
    has(key: string): boolean;
    /**
     * Extend or set localstorage key
     * @param key
     * @param value
     */
    extend(key: string, value: string): void;
    /**
     * Remove localstorage key
     * @param key
     */
    remove(key: string): void;
}
/**
 * localStorage helper
 */
declare function storage(): STORAGE;
/**
 * Join object to separated string
 * @param obj Object
 * @returns Joined string
 */
declare function object_join(obj: object): string;
/**
 * Extend Object
 * @param arg1
 * @param arg2
 * @returns
 */
declare function extend_object<T1 extends object, T2 extends object>(arg1: T1, arg2: T2): T1 & T2;
interface ipapi_response {
    ip: "114.4.83.195";
    city: "Jakarta";
    region: "Jakarta";
    region_code: "JK";
    country: "ID";
    country_code: "ID";
    country_code_iso3: "IDN";
    country_capital: "Jakarta";
    country_tld: ".id";
    country_name: "Indonesia";
    continent_code: "AS";
    in_eu: false;
    postal: null;
    latitude: -6.1741;
    longitude: 106.8296;
    timezone: "Asia/Jakarta";
    utc_offset: "+0700";
    country_calling_code: "+62";
    currency: "IDR";
    currency_name: "Rupiah";
    languages: "id,en,nl,jv";
    country_area: 1919440.0;
    country_population: 242968342.0;
    asn: "AS4761";
    org: "INDOSAT Internet Network Provider";
}
declare const cookie_ip: string;
declare const cookie_indicator: string;
/**
 * IP Address class
 * @class get, check, validate ip address
 */
declare class ip {
    static storage: STORAGE;
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
    init(callback: Function): void;
    /**
     * Check if the ip has been applied
     * @private
     */
    private static status;
    /**
     * Checks ip
     * @returns promises
     */
    private static check;
    /**
     * Gets ip
     * @param callback function callback(ip) or null return ip
     * @returns {String} ip or callback
     */
    static get(callback?: Function): string;
    /**
     * Retrieve ip from ipapi.co
     */
    static ipapi(): JQuery.jqXHR<any>;
    /**
     * Retrieve api from l2.io
     */
    static l2io(): JQuery.jqXHR<any>;
    /**
     * Retrieve ip from cloudflare.com
     */
    static cloudflare(): JQuery.jqXHR<any>;
    /**
     * Save ip to cookie and localstorage
     * @param ip
     * @private
     */
    private static save;
}
/**
 * Get unique id of machine
 */
declare function get_unique_id(): string | Object;
/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 */
declare function getParameterByName(name: string, url: string | null): string;
/**
 * Autofill datetime-local value
 */
declare function datetimelocal(v?: string | number): void;
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
declare function array_filter(array: []): never[];
/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
declare function array_rand(arrays: any[], unique: any): {
    index: number;
    value: any;
};
/**
 * Array unique
 * @param {Array<any>} arrays
 */
declare function array_unique(arrays: any[]): any[];
/**
 *
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
declare function array_unset(arrayName: {
    [x: string]: any;
}, key: any): any[];
/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
declare function shuffle(array: Array<any>): any[];
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
declare function datetime_local(date: any): string;
declare interface Number {
    getMS(type: string): number;
    /**
     * Get X Hour from date
     * @return number ms from Date().getTime()
     * @example
     * get `1 hour from current Date()`
     * 1.addHour()
     * get `1 hour from spesific Date()`
     * 1.addHour(new Date('2020-06-04 01:10:53'))
     */
    addHour(source: Date | null): number;
    /**
     * add zero leading
     * @param add
     * @param target
     */
    AddZero(add: number, target: string): number;
}
/**
 * Odd or Even (Ganjil Genap);
 * @param n
 * @param type odd or even
 */
declare function oddoreven(n: string, type: string): boolean;
/**
 * strpad / startwith zero [0]
 * @param {number} val
 */
declare function strpad(val: number): string | number;
declare const siteConfig: {
    google: {
        key: string;
        recaptcha: {
            key: string;
        };
        analystics: {
            id: string;
        };
    };
};
/**
 * @file Console Controller
 */
interface Console {
    olog: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
}
declare var console_callback: any;
/**
 * Get stacktrace
 */
declare function stacktrace(): any;
declare var isNode: boolean;
declare var root: any;
declare var global: any;
/**
 * Is Node ?
 */
declare function isnode(): boolean;
/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
declare function getNativeClass(obj: any): any;
/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
declare function getAnyClass(obj: any): any;
/**
 * call_user_func
 * @param functionName function name
 */
declare function ___call(functionName: string, context?: Window, args?: any): void;
/**
 * call_user_func
 * @param functionName
 * @param context
 * @param args
 */
declare function call_user_func(functionName: string, context: Window & typeof globalThis, args: any): any;
/**
 * Make function async
 * @param callback
 */
declare function async_this(callback: Function): Promise<any>;
/**
 * call_user_func
 * @param func function name
 */
declare function __call(func: string): void;
/**
 * check empty
 * @param str
 */
declare function empty(str: string | object | Array<any> | boolean | null | undefined | number): number | boolean;
/**
 * Get current function name
 */
declare function getFuncName(): string;
/**
 * Is Development Mode
 */
declare function is_development(): boolean;
/**
 * Generate random string with length
 * @param length length to generate
 * @see https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a
 */
declare const generateRandomString: (length?: number) => string;
/**
 * Create uniqueid with prefix or suffix
 * @param prefix
 * @param suffix
 */
declare function uniqid(prefix: any, suffix: any): string;
/**
 * Get unique array
 * @param {any} value
 * @param {any} index
 * @param {any[]} self
 * @example dataArray.filter(onlyUnique)
 */
declare function onlyUnique(value: any, index: any, self: any[]): boolean;
/**
 * Parse string to float/number
 * @param total_amount_string string including numbers
 */
declare function parseNumber(total_amount_string: string): number;
declare function typedKeys<T>(o: T): (keyof T)[];
declare function pageid(length: number): string;
declare const randstr: (length?: number) => string;
/**
 * check string is json
 * @param {string} str
 * @description check validate json
 */
declare function isJSON(str: string): boolean;
declare function processAjaxForm(xhr: JQueryXHR, callback: string | Function): void;
/**
 * Custom ajax
 * @param settings ajax settings object
 */
declare function ajx(settings: JQueryAjaxSettings, success: null | Function, failed: null | Function, complete: null | Function): JQuery.jqXHR<any>;
/**
 * Handling form with ajax
 * @requires data-success success function name
 * @requires data-error error function name
 * @requires data-complete complete function name
 */
declare function AjaxForm(): void;
/**
 * process page asynchronously
 * @param source_cache url
 */
declare function async_process(source_cache: string): void;
/**
 * default ajax jquery request with unique ID
 * @param settings Jquery ajax settings
 */
declare function jAjax(settings: JQueryAjaxSettings): JQuery.jqXHR<any>;
declare var AjaxSchedulerInit: NodeJS.Timer;
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
 * Bootstrap Alert Generator
 * @example createAlert(
  "[title] Opps!",
  "[description] Something went wrong",
  "[details] Here is a bunch of text about some stuff that happened.",
  "[mode|bg-color] danger",
  true, false,
  { position: "fixed", bottom: "15px", right: "15px" });
 */
declare function createAlert(
/**
 * Title alert
 */
title: string, 
/**
 * Summary description
 */
summary: string, 
/**
 * Another description
 */
details: string, 
/**
 * basic class bootstrap or you can insert color name
 */
severity: "success" | "error" | "warning" | "info" | "danger", 
/**
 * can be closed ?
 */
dismissible: boolean, 
/**
 * auto closed ?
 */
autoDismiss: boolean, 
/**
 * Fill `CSSProperties` object or insert CSS object string
 * @example {position: 'fixed', top: '5px', right: '5px'}
 * @example 'position:fixed;top:10px;left:10px;'
 */
options: React.CSSProperties | string): void;
/**
 * Create style css dynamic
 * @example css = 'h1 { background: red; }'
 * @example arributes = {id: 'customStyle', media: 'all'}
 * @param css
 */
declare function createStyle(css: string, attributes?: {}): void;
declare let ORIGIN: any;
declare let IP: string;
declare class dimas {
    /**
     * get current url without querystrings
     */
    static url: any;
    static ip: any;
    static setIp(ip: any): void;
    static getIp(): any;
    /**
     * framework captcha
     */
    static captcha: {
        /**
         * DO NOT ASSIGN THIS
         */
        check: NodeJS.Timer;
        /**
         * Get current captcha id
         */
        id(header_name: string | null): string;
        /**
         * Get current captcha from backend
         * And process it by jsonpCallback
         */
        get(header_name: null | string): void;
        callback(arg?: any): void;
        /**
         * Captcha JSONP callback
         */
        jspCallback(res: {
            captcha: string;
        }): void;
        listener_started: any;
        /**
         * Form Captcha listener
         */
        listen(): JQuery<Document>;
    };
    /**
     * Count Array/Object/String length
     * @param {any[]|string|object} data
     */
    count(data: any[] | string | object): number;
    /**
     * Make async function
     * @param callback
     */
    async(callback: any): Promise<unknown>;
    /**
     * Check if variable is number / numeric
     * @param {String|Number} v
     */
    isNumber(v: string | number): boolean;
    /**
     * Check if valid url
     * @param url url address
     */
    isURL(url: string): boolean;
    /**
     * Check url is valid and reachable
     * @param url url address
     * @param callback callback function
     */
    isURLReachable(url: string, callback: (arg0: boolean, arg1: string) => any): void;
    /**
     * Get Query name from current url
     */
    getquery(variable: any): string | false;
    recode(content: string, passcode: string): string;
    /**
     * Countdown trigger
     * @param {JQuery} elm
     */
    pctdRUN(elm: JQuery): any;
    /**
     * Progress Countdown
     * @param {JQuery} elm
     */
    pctd(elm: JQuery): void;
    /**
     * Parseurl just like as parse_url at php
     */
    parseurl(url: string): {
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
}
/**
 * Framework object initializer
 */
declare function framework(): dimas;
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
 * Check if base64 is valid
 * @param {string} str
 */
declare function base64_valid(str: string): boolean;
/**
 * base64 decoding
 * @param {string} str base64 string
 */
declare function base64_decode(str: string): string;
declare function b64EncodeUnicode(str: any): string;
declare function b64DecodeUnicode(str: any): string;
declare namespace Base64 {
    const _keyStr: string;
    function encode(input: any): string;
    function decode(input: any): string;
    function _utf8_encode(string: any): string;
    function _utf8_decode(utftext: any): string;
}
declare function randomHex(): string;
/**
 * open in new tab
 * @param url
 * @param name
 */
declare function openInNewTab(url: string, name: string): void;
/**
 * Disabling button
 * @param t element of button
 */
declare function disable_button(t: JQuery<any> | HTMLButtonElement): void;
/**
 * Enabling button
 * @param t element of button
 */
declare function enable_button(t: JQuery<any> | HTMLButtonElement): void;
/**
 * @see https://gist.githubusercontent.com/tmrk/4aa3cf285360526a98b2115d63e0cafd/raw/5e74803dcf33923257d081433ec92ba93765e3f3/countries.js
 * @global
 */
declare const countries: {
    name: string;
    alpha2: string;
    alpha3: string;
    num3: string;
    subregion: string;
    region: string;
    continent: string;
}[];
/**
 * Get Countries ISO
 * @returns
 */
declare function getCountries(): {
    name: string;
    alpha2: string;
    alpha3: string;
    num3: string;
    subregion: string;
    region: string;
    continent: string;
}[];
/**
 * Select2 Country
 * @requires jQuery
 * @param el
 * @param select2Opt Select2 Options
 * @example
 * select2Country($("#selectID"), {placeholder:"Select Your Country"})
 */
declare function select2Country(el: JQuery<HTMLSelectElement> | JQuery<HTMLElement>, select2Opt?: Select2.Options<Select2.DataFormat | Select2.GroupedDataFormat, any>): void;
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
 * Force HTTPS
 */
declare function forceSSL(): void;
/**
 * json decode fails return false
 * @param  obj
 */
declare function json_decode(obj: string): any;
interface HTMLScriptAttribute {
    async?: boolean;
    defer?: boolean;
    /**
     * Script Type
     * @example
     * {type: "text/javascript"} // type="text/javascript"
     */
    type?: "application/json" | "text/plain" | "application/javascript" | "text/javascript";
}
interface LoadScriptOptions {
    url: string | string[];
    /**
     * Html script attributes
     */
    options?: HTMLScriptAttribute | null;
    /**
     * Callback after all scripts loaded
     */
    callback?: null | Function;
}
declare const LoadScriptLoaded: any[];
/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
declare function LoadScript(config: LoadScriptOptions): typeof LoadScriptLoaded;
/**
 * Load CSS async
 * @param href
 * @param callback
 */
declare function loadCSS(href: string | string[], callback?: any): void;
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
/**
 * Rupiah currency auto format
 */
declare function rp(angka: number, prefix?: string | any): string;
/**
 * Auto height textarea
 */
declare function autoHeight_(element: HTMLElement | JQuery<HTMLElement>): JQuery<any>;
declare function copyToClipboard(text: string, el: JQuery<HTMLElement>): void;
/**
 * Copy to clipboard
 */
declare function copyToClipboard(text: any, el: any): void;
declare function extend_setting_form(...param: any[]): SettingForm;
/**
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object|SettingForm}            Merged values of defaults and options
 */
declare function extend_setting_form(...param: any[]): any | SettingForm;
declare function formsaver(): void;
/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
declare function formsaver(): void;
/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists.
 * @private
 * @author Todd Motto
 * @link   https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function}              callback   Callback function for each iteration
 * @param {Array|Object|NodeList} [scope=null]      Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
declare function forEach(collection: Array | any | NodeList, callback: Function, scope?: Array | any | NodeList): void;
/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
declare function getClosest(elem: Element, selector: string): boolean | Element;
/**
 * Convert data-options attribute into an object of key/value pairs
 * @private
 * @param {String} options Link-specific options as a data attribute string
 * @returns {Object}
 */
declare function getDataOptions(options: string): any;
/**
 * Handle events
 * @private
 */
declare function eventHandler(event: any): void;
/**
 * Is Browser (not node)
 */
declare var isBrowser: Function;
/**
 * Is Node (not browser)
 */
declare var isNode: Function;
declare var settings: any;
declare var forms: any;
declare namespace defaults {
    const selectorStatus: string;
    const selectorSave: string;
    const selectorDelete: string;
    const selectorIgnore: string;
    const deleteClear: boolean;
    const saveMessage: string;
    const deleteMessage: string;
    const saveClass: string;
    const deleteClass: string;
    const initClass: string;
    function callbackSave(): void;
    function callbackDelete(): void;
    function callbackLoad(): void;
}
declare class formSaver {
    /**
     * Save form data to localStorage
     * @public
     * @param  {Element} btn Button that triggers form save
     * @param  {Element} form The form to save
     * @param  {Object} options
     * @param  {Event} event
     */
    public static saveForm(btn: Element, formID: any, options: any, event?: Event): void;
    /**
     * Remove form data from localStorage
     * @public
     * @param  {Element} btn Button that triggers form delete
     * @param  {Element} form The form to remove from localStorage
     * @param  {Object} options
     * @param  {Event} event
     */
    public static deleteForm(btn: Element, formID: any, options: any, event?: Event): void;
    /**
     * Load form data from localStorage
     * @public
     * @param  {Element} form The form to get data for
     * @param  {Object} options
     */
    public loadForm(form: Element, options: any): void;
    /**
     * Destroy the current initialization.
     * @public
     */
    public destroy(): void;
    /**
     * Initialize Form Saver
     * @public
     * @param {Object} options User settings
     */
    public init(options: any): void;
    /**
     * Auto form saver
     */
    auto(): void;
}
/**
 * unique id generator
 * @param length digit number string
 * @returns random string
 */
declare function makeid(length: any): string;
/**
 * Add integers, wrapping at 2^32.
 * This uses 16-bit operations internally to work around bugs in interpreters.
 *
 * @param {number} x First integer
 * @param {number} y Second integer
 * @returns {number} Sum
 */
declare function safeAdd(x: number, y: number): number;
/**
 * Bitwise rotate a 32-bit number to the left.
 *
 * @param {number} num 32-bit number
 * @param {number} cnt Rotation count
 * @returns {number} Rotated number
 */
declare function bitRotateLeft(num: number, cnt: number): number;
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
declare function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number;
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
declare function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
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
declare function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
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
declare function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
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
declare function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 *
 * @param {Array} x Array of little-endian words
 * @param {number} len Bit length
 * @returns {Array<number>} MD5 Array
 */
declare function binlMD5(x: any[], len: number): Array<number>;
/**
 * Convert an array of little-endian words to a string
 *
 * @param {Array<number>} input MD5 Array
 * @returns {string} MD5 string
 */
declare function binl2rstr(input: Array<number>): string;
/**
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 *
 * @param {string} input Raw input string
 * @returns {Array<number>} Array of little-endian words
 */
declare function rstr2binl(input: string): Array<number>;
/**
 * Calculate the MD5 of a raw string
 *
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
declare function rstrMD5(s: string): string;
/**
 * Calculates the HMAC-MD5 of a key and some data (raw strings)
 *
 * @param {string} key HMAC key
 * @param {string} data Raw input string
 * @returns {string} Raw MD5 string
 */
declare function rstrHMACMD5(key: string, data: string): string;
/**
 * Convert a raw string to a hex string
 *
 * @param {string} input Raw input string
 * @returns {string} Hex encoded string
 */
declare function rstr2hex(input: string): string;
/**
 * Encode a string as UTF-8
 *
 * @param {string} input Input string
 * @returns {string} UTF8 string
 */
declare function str2rstrUTF8(input: string): string;
/**
 * Encodes input string as raw MD5 string
 *
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
declare function rawMD5(s: string): string;
/**
 * Encodes input string as Hex encoded string
 *
 * @param {string} s Input string
 * @returns {string} Hex encoded string
 */
declare function hexMD5(s: string): string;
/**
 * Calculates the raw HMAC-MD5 for the given key and data
 *
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
declare function rawHMACMD5(k: string, d: string): string;
/**
 * Calculates the Hex encoded HMAC-MD5 for the given key and data
 *
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
declare function hexHMACMD5(k: string, d: string): string;
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
declare function md5(string: string, key?: string, raw?: boolean): string;
interface progressBarTimer {
    warningThreshold: number;
}
/**
 * @see https://github.com/imalliar/jquery.progressBarTimer
 */
declare var progressBarTimer: progressBarTimer;
interface JQueryStatic {
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     *
     * @param selector A string containing a selector expression
     * @param context A DOM Element, Document, or jQuery to use as context
     * @see {@link https://api.jquery.com/jQuery/#jQuery-selector-context}
     */
    (selector: string, context?: Element | JQuery | string): JQuery;
}
declare const reCaptcha: {
    /**
     * @type {Number} counter executions
     */
    gexec_count: number;
    key: string;
    api: string;
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: (key: string) => any;
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
    exec: (action: any, retry?: boolean, callback?: (arg0: string) => void) => void;
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
 * Hidden reCaptcha v3 object initializer
 */
declare function recaptcha(): {
    /**
     * @type {Number} counter executions
     */
    gexec_count: number;
    key: string;
    api: string;
    /**
     * Set recaptcha site key
     * @param {String} key
     */
    set_key: (key: string) => any;
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
    exec: (action: any, retry?: boolean, callback?: (arg0: string) => void) => void;
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
declare const requirejs_vendor = "/node_modules";
declare const require_config: RequireConfig;
interface RequireConfig {
    css: object;
}
declare const dtpackage: () => string[];
declare var requirejs_ignited: boolean;
/**
 * Load requirejs
 */
declare function load_requirejs(): Promise<unknown>;
/**
 * Load Modules From node_modules folder
 * @param name
 * @param callback
 */
declare function load_module(name: string | string[], callback: Function): void;
/**
 * Datatables loader
 * @param callback
 */
declare function load_datatables(callback: Function): void;
declare var datatables_ignited: boolean;
/**
 * Datatables init
 * @todo disable error warning
 * @todo add refresh button
 */
declare function datatables_init(): Promise<unknown>;
declare var optimized_ids: any[];
/**
 * Optimize Material Datatables
 * @param id id table
 * @param callback additional function to optimizer
 */
declare function datatables_optimize(id: string, callback?: Function): void;
/**
 * Scroll up after click pagination dt
 * @param target
 */
declare function pagination_up(target: JQuery): void;
/**
 * Optimize Datatables Columns Options
 * @param data
 * @param exclude
 */
declare function datatables_colums_options(data?: DataTables.ColumnSettings, exclude?: string[]): void;
declare class ctable {
    private can_edit;
    private instance;
    constructor(config?: ctableOpt);
    private editable_run;
    private editable;
    create(id: string, where: string, data: string[]): void;
    add(table: string, data: any[]): void;
}
interface ctableOpt {
    editable?: boolean;
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
declare function getLocationHash(): void;
/** Progress bar */
declare var elm: JQuery<HTMLElement>;
/**
 * @type {JQuery<HTMLElement>} L
 */
declare var L: JQuery<HTMLElement>;
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
    static compress(str: any): any;
}
