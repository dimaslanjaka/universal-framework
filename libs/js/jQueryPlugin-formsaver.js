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
     * Save values form
     * @param el
     * @returns
     */
    static save(el) {
        el = this.convertElement(el);
        var key = this.get_identifier(el);
        var item = el.value;
        var allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver");
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio" && el.hasAttribute("id")) {
                $('[name="' + el.getAttribute("name") + '"]').each(function (i, e) {
                    localStorage.setItem(key, "off");
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    console.log("save radio button ", formSaver2.offset(el));
                }, 500);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            //console.log('save', key, localStorage.getItem(key));
        }
    }
    /**
     * Get Offsets Element
     * @param el
     * @returns
     */
    static offset(el) {
        return el.getBoundingClientRect();
    }
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
    static restore(el) {
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
                console.log(`value checkbox ${item}`);
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
            //console.log('load', type, key, item);
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
                    formSaver2.restore($(this).get(0));
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
                $(document).on("focus", "input,textarea,select", function () {
                    var t = $(this);
                    t.getIDName();
                    var aria = t.attr("aria-formsaver");
                    if (aria && aria != uniqueid) {
                        t.smartForm();
                        t.attr("aria-formsaver", uniqueid);
                    }
                });
            })(jQuery);
        }
    })();
}
/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
function formsaver() {
    if (typeof jQuery != "undefined") {
        console.log("Starting smartform jQuery");
        if (typeof jQuery != "undefined") {
            jQuery("input,textarea,select").each(function (i, el) {
                $(this).smartForm();
            });
        }
    }
}
define("main", ["require", "exports", "./_conf", "./formSaver2", "./jquery-saver"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5UGx1Z2luLWZvcm1zYXZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy9zbWFydGZvcm0vc3JjLyIsInNvdXJjZXMiOlsiX2FfT2JqZWN0LnRzIiwiX2NvbmYudHMiLCJfbFN0b3JhZ2UudHMiLCJmb3JtU2F2ZXIyLnRzIiwianF1ZXJ5LXNhdmVyLnRzIiwibWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRztJQUN2QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQ1IsR0FBUSxDQUFDO0lBQ2IsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1FBQ2IsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUFFLElBQUksRUFBRSxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRSxRQUFRO0lBQ2xDLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztJQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtTQUFNO1FBQ0gsT0FBTyxTQUFTLENBQUM7S0FDcEI7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsR0FBRyxFQUFFLFdBQVc7SUFDbkMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO0lBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUFNO1FBQ0gsT0FBTyxXQUFXLENBQUM7S0FD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