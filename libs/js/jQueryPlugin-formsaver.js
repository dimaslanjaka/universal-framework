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
    constructor(el) {
        formSaver2.restore(el);
        if (formSaver2.is_jquery()) {
            formSaver2.jquery_listener();
        }
        else {
            formSaver2.vanilla_listener(el);
        }
    }
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
                if (formSaver2.debug)
                    console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio" && el.hasAttribute("id")) {
                $('[name="' + el.getAttribute("name") + '"]').each(function (i, e) {
                    localStorage.setItem(key, "off");
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    if (formSaver2.debug)
                        console.log("save radio button ", formSaver2.offset(el));
                }, 500);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            if (formSaver2.debug)
                console.log("save", key, localStorage.getItem(key));
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
    static vanilla_listener(el) {
        if (el.addEventListener) {
            el.addEventListener("change", function () {
                formSaver2.save(this);
            });
        }
        else if (el.attachEvent) {
            el.attachEvent("onchange", function () {
                formSaver2.save(this);
            });
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
                if (formSaver2.debug)
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
            if (formSaver2.debug)
                console.log("load", type, key, item);
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
formSaver2.debug = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5UGx1Z2luLWZvcm1zYXZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy9zbWFydGZvcm0vc3JjLyIsInNvdXJjZXMiOlsiX2FfT2JqZWN0LnRzIiwiX2NvbmYudHMiLCJfbFN0b3JhZ2UudHMiLCJmb3JtU2F2ZXIyLnRzIiwianF1ZXJ5LXNhdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHO0lBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsRUFDUixHQUFRLENBQUM7SUFDYixLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFDYixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQUUsSUFBSSxFQUFFLENBQUM7S0FDdkM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLFFBQVE7SUFDbEMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO0lBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtLQUNKO1NBQU07UUFDSCxPQUFPLFNBQVMsQ0FBQztLQUNwQjtBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLEVBQUUsV0FBVztJQUNuQyxJQUFJLElBQUksR0FBUSxJQUFJLENBQUM7SUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO1NBQU07UUFDSCxPQUFPLFdBQVcsQ0FBQztLQUN0QjtBQUNMLENB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