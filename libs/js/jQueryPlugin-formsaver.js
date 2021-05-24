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
if (typeof makeid == "undefined") {
    /**
     * unique id generator
     * @param length digit number string
     * @returns random string
     */
    var makeid = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
}
/**
 * Local Storage key
 */
var storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
var formFieldBuild;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formFieldBuild = [];
}
else {
    formFieldBuild = JSON.parse(formSaved);
}
/**
 * Element Indexer
 */
var formField = formFieldBuild;
var uniqueid = makeid(5);
/**
 * check if running in browser
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
/**
 * Element Counter
 */
var Count = -1;
/// <reference path="./_a_Object.d.ts" />
if (typeof Storage == "undefined") {
    class Storage {
    }
}
class lStorage extends Storage {
    constructor() {
        super();
    }
    has(key) {
        return !!localStorage[key] && !!localStorage[key].length;
    }
    /**
     * See {@link localStorage.getItem}
     * @param key
     * @returns
     */
    get(key) {
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
    }
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    }
    extend(key, value) {
        if (this.has(key)) {
            var _value = this.get(key);
            if (typeof jQuery != "undefined") {
                $.extend(_value, JSON.parse(JSON.stringify(value)));
            }
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}
/// <reference path='./_lStorage.ts' />
/// <reference path='./_conf.ts' />
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
            var t = $(this);
            var allowed = !t.attr("no-save") && t.attr("aria-formsaver");
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
            var t = $(this);
            t.getIDName();
            var aria = t.attr("aria-formsaver");
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
        let nodeValid = el.nodeType === 1;
        return el;
    }
    /**
     * Restore form value
     * @param el
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
        let key = this.get_identifier(el);
        var type = el.getAttribute("type");
        // begin restoration
        if (key) {
            // checkbox input button
            if (type === "checkbox") {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                if (debug)
                    console.log(`value checkbox[${key}] ${item}`);
                el.checked = item;
                return;
            }
            // radio input button
            else if (type === "radio") {
                item = localStorage.getItem(key) === "on";
                el.checked = item;
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
                    $(el).val(item).trigger("change");
                }
            }
            if (debug)
                console.log("load", type, key, item);
        }
    }
    /**
     * Save values form
     * @param el
     * @returns
     */
    static save(el, debug = false) {
        el = this.convertElement(el);
        var key = this.get_identifier(el);
        var item = el.value;
        var allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver");
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                if (debug)
                    console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio" && el.hasAttribute("id")) {
                $('[name="' + el.getAttribute("name") + '"]').each(function (i, e) {
                    localStorage.setItem(key, "off");
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    if (debug)
                        console.log("save radio button ", formSaver2.offset(el));
                }, 500);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            if (debug)
                console.log("save", key, localStorage.getItem(key));
        }
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
                let ID = makeid(5);
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
            let ID = makeid(5);
            el.setAttribute("id", ID);
            formField[Count] = ID;
            localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
        }
        return location.pathname + el.getAttribute("id");
    }
    constructor(el, options = {
        debug: false,
        method: "vanilla",
    }) {
        console.log(`init debug ${options.debug}`);
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
 * @param debug debug process saving and restoration
 */
function formsaver(debug = false) {
    if (typeof jQuery != "undefined") {
        if (debug)
            console.log("Starting smartform jQuery");
        if (typeof jQuery != "undefined") {
            jQuery("input,textarea,select").each(function (i, el) {
                new formSaver2(this, { debug: debug });
            });
        }
    }
}
