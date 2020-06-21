/// <reference path="../../../../../libs/js/Array.d.ts" />
/// <reference path="../../../../../libs/js/Object.d.ts" />
/// <reference path="../../../../../libs/js/jQuery.d.ts" />
/// <reference path="../../../../../libs/js/JQueryStatic.d.ts" />
/// <reference types="jquery" />
/// <reference types="node" />
declare function arrayCompare(a1: Array<any>, a2: Array<any>): boolean;
declare function inArray(needle: any, haystack: Array<any>): boolean;
declare function in_array(needle: any, haystack: Array<any>): boolean;
declare function array_keys(haystack: any): string[];
declare function array_shuffle(a: Array<any>): any[];
declare function array_filter(array: []): never[];
declare class Cookies {
    static get(c_name: string): string | Object | null;
    static set(name: string, value: any, expire: number, expire_type: string, path: string | any, callback: any | Function): any;
    static one(name: string, value: any, expire: number, callback: Function): void;
    static decompress(str: string): void;
    static compress(str: string): void;
}
declare function datetime_local(date: any): string;
declare function isMobile(): boolean;
declare function createElement(params: createElementOpt): any;
declare function createElement(options: typeof createElement): any;
declare class html {
    static create(options: any): any;
}
declare type NotFunction<T> = T extends Function ? never : T;
declare class Timer {
    private timeId;
    constructor(callback: Function, time: number);
    clear(): void;
}
declare function empty(str: string | null | undefined | number | boolean): boolean;
declare function pageid(length: number): string;
declare const randstr: (length?: number) => string;
declare var AJAX: any;
declare var dumpAjax: boolean;
declare var indicatorAjax: boolean;
declare const ajaxIDLoader: string;
declare function processAjaxForm(xhr: JQueryXHR, callback: string | Function): void;
declare function ajx(settings: JQueryAjaxSettings, success: null | Function, failed: null | Function, complete: null | Function): JQuery.jqXHR<any>;
declare function AjaxForm(): void;
declare function async_process(source_cache: string): void;
declare var AjaxSchedulerInit: NodeJS.Timeout;
declare var AjaxSchedulerRequests: Array<any>;
declare var AjaxSchedulerRunning: Boolean;
declare class ajaxScheduler {
    static add(opt: JQueryAjaxSettings): void;
    static remove(opt: Object): void;
    static run(): boolean;
    static stop(): void;
}
declare function ajaxRun(url: string, method: string, data: object, success: Function, failed: Function, complete: Function): void;
declare function ajaxFormSchedule(): void;
declare function ajax(): typeof ajax;
declare namespace ajax {
    function x(): any;
    function send(url: any, callback: any, method: any, data: any, async: any): void;
    function get(url: any, data: any, callback: any, async: any): void;
    function post(url: any, data: any, callback: any, async: any): void;
}
declare function analys(event_action: string, event_label: string, event_category: string, event_value: string, event_callback: Function | any): any;
declare var gtagID: string;
declare var create_gtagscript: HTMLScriptElement;
declare var gtag: any;
declare function typedKeys<T>(o: T): (keyof T)[];
declare var dimas: {
    url: string;
    captcha: {
        check: NodeJS.Timeout;
        id: (header_name: string | null) => string;
        get: (header_name: null | string) => void;
        callback: (arg?: any) => void;
        jspCallback: (res: {
            captcha: string;
        }) => void;
        listener_started: any;
        listen: () => JQuery<Document>;
    };
    rp: (angka: number, prefix: string | any) => string;
    isNumber: (v: string | number) => boolean;
    strpad: (val: number) => string | number;
    datetimelocal: (v: string | number) => void;
    gc: (name: string) => string;
    oddoreven: (n: string, type: string) => boolean;
    sc: (name: string, value: any, hours: number) => void;
    allcookies: () => {
        [key: string]: any;
    };
    rc: (name: string) => void;
    getquery: (variable: any) => string | false;
    recode: (content: string, passcode: string) => string;
    js: (url: string, callback: Function | any) => void;
    pctdRUN: (elm: JQuery) => any;
    pctd: (elm: JQuery) => void;
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
declare function framework(): {
    url: string;
    captcha: {
        check: NodeJS.Timeout;
        id: (header_name: string) => string;
        get: (header_name: string) => void;
        callback: (arg?: any) => void;
        jspCallback: (res: {
            captcha: string;
        }) => void;
        listener_started: any;
        listen: () => JQuery<Document>;
    };
    rp: (angka: number, prefix: any) => string;
    isNumber: (v: string | number) => boolean;
    strpad: (val: number) => string | number;
    datetimelocal: (v: string | number) => void;
    gc: (name: string) => string;
    oddoreven: (n: string, type: string) => boolean;
    sc: (name: string, value: any, hours: number) => void;
    allcookies: () => {
        [key: string]: any;
    };
    rc: (name: string) => void;
    getquery: (variable: any) => string | false;
    recode: (content: string, passcode: string) => string;
    js: (url: string, callback: any) => void;
    pctdRUN: (elm: JQuery<HTMLElement>) => any;
    pctd: (elm: JQuery<HTMLElement>) => void;
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
declare function base64_encode(str: string): any;
declare function base64_decode(str: string): any;
declare function b64EncodeUnicode(str: any): string;
declare function b64DecodeUnicode(str: any): string;
declare function bannedebug(): void;
declare function debug_detect(): void;
declare function restrict_mode(restrict: boolean): void;
declare var debug_run: any;
declare var restrict: boolean;
declare function load_disqus(disqus_shortname: string): void;
declare function http_build_query(obj: Object): string;
declare const guxid: string;
declare function guid(): string;
declare function uuidv4(): string;
declare class ip {
    private static status;
    static check(): Promise<void>;
    static get(callback: Function | null): string;
    static ipapi(): JQuery.jqXHR<any>;
    static l2io(): JQuery.jqXHR<any>;
}
declare function md5(string: any): string;
interface progressBarTimer {
    warningThreshold: number;
}
declare var progressBarTimer: progressBarTimer;
declare function recaptcha(): {
    gexec_count: number;
    key: string;
    js: (url: string, callback: Function) => void;
    set_key: (key: string) => void;
    start: () => void;
    init: () => void;
    retry_count: number;
    exec: (action: any, retry: any, callback: any) => void;
    insert: (token: string) => void;
    distribute_token: (token: string) => void;
    get: () => string;
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
declare var reCaptcha: {
    gexec_count: number;
    key: string;
    js: (url: string, callback: Function) => void;
    set_key: (key: string) => void;
    start: () => void;
    init: () => void;
    retry_count: number;
    exec: (action: any, retry: any, callback: any) => void;
    insert: (token: string) => void;
    distribute_token: (token: string) => void;
    get: () => string;
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
declare var count: number;
declare var storageKey: String;
declare var formField: object | Array<any>;
declare var formSaved: string;
declare var uniqueid: string;
declare function smartform(): void;
declare function copyToClipboard(text: string, el: JQuery): void;
declare function storage(): {
    get: (key: string) => any;
    set: (key: string, value: string | Array | Object) => void;
    has: (key: string) => boolean;
    extend: (key: string, value: string) => void;
    remove: (key: string) => void;
};
declare var STORAGE: {
    get: (key: string) => any;
    set: (key: string, value: string | Array | Object) => void;
    has: (key: string) => boolean;
    extend: (key: string, value: string) => void;
    remove: (key: string) => void;
};
interface String {
    match(matcher: {
        [Symbol.match](string: string): RegExpMatchArray | null;
    }): RegExpMatchArray | null;
    replace(searchValue: {
        [Symbol.replace](string: string, replaceValue: string): string;
    }, replaceValue: string): string;
    replace(searchValue: {
        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    }, replacer: (substring: string, ...args: any[]) => string): string;
    search(searcher: {
        [Symbol.search](string: string): number;
    }): number;
    split(splitter: {
        [Symbol.split](string: string, limit?: number): string[];
    }, limit?: number): string[];
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
    CSS: () => void;
    hexE: () => string;
    hexD: () => string;
    capitalize: () => string;
    rot13: () => string;
}
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}
declare function currentUID(): string;
declare function getUID(): string;
declare function sign_uid(UID: string): void;
declare function checkUID(callback: Function | any): string;
declare function isExpireUID(): boolean;
declare function AddMinutesToDate(date: any, minutes: any): Date;
declare function genUID(): string;
declare function saveUID(data: Object): void;
declare var UIDvalue: string;
declare var UIDcalled: boolean;
declare function getParameterByName(name: string, url: string | null): string;
declare class user {
    key: string;
    all(): undefined | object | any;
    get(key: string): any;
    fetch(callback: Function | null): JQuery.jqXHR<any>;
}
interface Window {
    user: user;
}
declare const userc: user;
declare function is_localhost(): RegExpMatchArray;
declare function is_development(): boolean;
declare function forceSSL(): void;
declare function isNativeEvent(eventname: any): boolean;
declare function hasEventBeenAdded(type: any): boolean;
declare function call_user_func(functionName: string, context: Window, ...args: any[]): any;
declare function prevent_iframe(): void;
declare function tafocus(id: string, placeholder: string): void;
declare function formatNewLines(placeholder: string): string;
declare function countNewLines(placeholder: string): string | number;
declare function isJSON(obj: string): any;
declare function is_json(str: string): boolean;
declare function findDups(arr: Array<any>, callback: Function): any;
declare function makeid(length: number): string;
declare function gexec(action: any, retry: any, callback: any): void;
declare function geToken(): string;
declare function JavaScriptCaller(url: string, callback: Function): void;
declare function getKey(passphrase: string, salt: string): any;
declare function userJSEncrypt(passphrase: string, plainText: string): any;
declare function userJSDecrypt(passphrase: string, encryptedText: string): any;
declare function setInputFilter(textbox: any, inputFilter: any): void;
declare function e_modal_error(data: any): void;
declare function e_modal_success(data: any): void;
declare function openInNewTab(url: any, name: any): void;
declare function get_currency_symbol(filter: any): string;
declare function CryptoK(passphrase: string, salt: string): any;
declare function CryptoE(passphrase: string, plainText: string, salt: string, iv: string): any;
declare function CryptoD(passphrase: string, encryptedText: string, salt: string, iv: string): any;
declare function GeneratorID(): void;
declare class GeneratorID {
    rand: number;
    genId(): number;
    getId(): string;
}
declare function createJSON(jsObj: any, tabs: boolean): string;
declare function loadingio(text: any, callback: any, mode: any, ...args: any[]): void;
declare function LoadScript(url: any, callback: any): void;
declare function isAdmin(successcb: any, errorcb: any): void;
declare function loadCSS(CSSFiles: string): void;
declare function createLink(CSSFile: any, type: any, rel: any): void;
declare function __call(func: string, ...args: any[]): void;
declare function parse_proxy(str: string): Array<any>;
declare function array_rand(arrays: Array<any>, unique: boolean): {
    index: number;
    value: any;
};
declare function array_unique(arrays: Array<any>): any[];
declare function array_unset(arrayName: Array<any>, key: string | number): any[];
declare function Loading(text: {
    title: string;
    content: string;
    footer: string;
}, options: {
    callback: Function;
    position: string;
    disable: boolean;
}): any;
declare function toogleClass(element: Element, className: string): boolean;
declare function UNIQUE_ID(): string;
declare function check_blogger(callback: Function): void;
declare function pseudo_builder(string: string): string;
declare function foreach(object: Object, callback: Function): void;
declare function getRandom(arr: Array<any>, n: number, callback: Function): any;
declare function prepEntities(str: string): string;
declare var textAreas: HTMLCollectionOf<HTMLTextAreaElement>;
declare var events: {};
declare var original: {
    <K extends "error" | "abort" | "submit" | "message" | "input" | "progress" | "select" | "focus" | "change" | "resize" | "scroll" | "click" | "contextmenu" | "dblclick" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop" | "keydown" | "keypress" | "keyup" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "blur" | "focusin" | "focusout" | "afterprint" | "beforeprint" | "beforeunload" | "canplay" | "canplaythrough" | "compassneedscalibration" | "devicelight" | "devicemotion" | "deviceorientation" | "deviceorientationabsolute" | "durationchange" | "emptied" | "ended" | "hashchange" | "invalid" | "load" | "loadeddata" | "loadedmetadata" | "loadstart" | "mousewheel" | "MSGestureChange" | "MSGestureDoubleTap" | "MSGestureEnd" | "MSGestureHold" | "MSGestureStart" | "MSGestureTap" | "MSInertiaStart" | "MSPointerCancel" | "MSPointerDown" | "MSPointerEnter" | "MSPointerLeave" | "MSPointerMove" | "MSPointerOut" | "MSPointerOver" | "MSPointerUp" | "offline" | "online" | "orientationchange" | "pagehide" | "pageshow" | "pause" | "play" | "playing" | "popstate" | "ratechange" | "readystatechange" | "reset" | "seeked" | "seeking" | "stalled" | "storage" | "suspend" | "timeupdate" | "unload" | "volumechange" | "vrdisplayactivate" | "vrdisplayblur" | "vrdisplayconnect" | "vrdisplaydeactivate" | "vrdisplaydisconnect" | "vrdisplayfocus" | "vrdisplaypointerrestricted" | "vrdisplaypointerunrestricted" | "vrdisplaypresentchange" | "waiting" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "cancel" | "close" | "cuechange" | "gotpointercapture" | "lostpointercapture" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "securitypolicyviolation" | "selectionchange" | "selectstart" | "toggle" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "wheel" | "languagechange" | "messageerror" | "rejectionhandled" | "unhandledrejection">(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
} & typeof addEventListener;
declare var salt: string;
declare var iv: string;
declare var iterations: string;
declare var INPT: NodeListOf<Element>;
declare var index: number;
declare var element: Element;
declare var modal: JQuery<HTMLElement>;
declare var inputrp: JQuery<HTMLElement>;
declare var select_method: JQuery<HTMLElement>;
declare var hash: string;
declare var result: {};
declare var elm: JQuery<HTMLElement>;
declare var L: JQuery<HTMLElement>;
declare var nwtb: JQuery<HTMLElement>;
declare var aform: JQuery<HTMLElement>;
declare var GID: GeneratorID;
declare var IV: number;
declare var GI: string;
declare var ST: string;
declare var LoadingOpt: any;
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
declare function socket_start(host: any): void;
declare function socket_server(host: any): EventSource;
declare function socket_stop(): void;
declare function socket_check(): any;
declare var socket: any;
declare class ZLIB {
    static atos(arr: Uint8Array): string;
    static decompress(str: any): string;
    static compress(str: any): any;
}
