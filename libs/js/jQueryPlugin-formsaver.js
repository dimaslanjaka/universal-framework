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
        if (typeof callback == 'function') {
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
var forEach = function (collection, callback, scope = null) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
        for (var prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                callback.call(scope, collection[prop], prop, collection);
            }
        }
    }
    else {
        for (var i = 0, len = collection.length; i < len; i++) {
            callback.call(scope, collection[i], i, collection);
        }
    }
};
var getClosest = function (elem, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
    }
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector))
            return elem;
    }
    return null;
};
var getDataOptions = function (options) {
    return !options ||
        !(typeof JSON === "object" && typeof JSON.parse === "function")
        ? {}
        : JSON.parse(options);
};
var eventHandler = function (event) {
    var toggle = event.target;
    var save = getClosest(toggle, settings.selectorSave);
    var del = getClosest(toggle, settings.selectorDelete);
    if (save) {
        event.preventDefault();
        formSaver.saveForm(save, save.getAttribute("data-form-save"), settings);
    }
    else if (del) {
        event.preventDefault();
        formSaver.deleteForm(del, del.getAttribute("data-form-delete"), settings);
    }
};
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");
var settings, forms;
var defaults = {
    selectorStatus: "[data-form-status]",
    selectorSave: "[data-form-save]",
    selectorDelete: "[data-form-delete]",
    selectorIgnore: "[data-form-no-save]",
    deleteClear: true,
    saveMessage: "Saved!",
    deleteMessage: "Deleted!",
    saveClass: "",
    deleteClass: "",
    initClass: "js-form-saver",
    callbackSave: function () { },
    callbackDelete: function () { },
    callbackLoad: function () { },
};
function extend_setting_form(...param) {
    var extended = defaults;
    var deep = false;
    var i = 0;
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
    }
    var merge = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (deep &&
                    Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                    extended[prop] = extend_setting_form(extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    for (; i < arguments.length; i++) {
        merge(arguments[i]);
    }
    return extended;
}
class formSaver {
    static saveForm(btn, formID, options, event = null) {
        var overrides = getDataOptions(btn ? btn.getAttribute("data-options") : null);
        var merged = extend_setting_form(settings || defaults, options || {}, overrides);
        var settings = merged;
        var form = document.querySelector(formID);
        var formSaverID = "formSaver-" + form.id;
        var formSaverData = {};
        var formFields = form.elements;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        var prepareField = function (field) {
            if (!getClosest(field, settings.selectorIgnore)) {
                if (field.type.toLowerCase() === "radio" ||
                    field.type.toLowerCase() === "checkbox") {
                    if (field.checked === true) {
                        formSaverData[field.name + field.value] = "on";
                    }
                }
                else if (field.type.toLowerCase() !== "hidden" &&
                    field.type.toLowerCase() !== "submit") {
                    if (field.value && field.value !== "") {
                        formSaverData[field.name] = field.value;
                    }
                }
            }
        };
        var displayStatus = function (status, saveMessage, saveClass) {
            status.innerHTML =
                saveClass === ""
                    ? "<div>" + saveMessage + "</div>"
                    : '<div class="' + saveClass + '">' + saveMessage + "</div>";
        };
        forEach(formFields, function (field) {
            prepareField(field);
        });
        forEach(formStatus, function (status) {
            displayStatus(status, settings.saveMessage, settings.saveClass);
        });
        localStorage.setItem(formSaverID, JSON.stringify(formSaverData));
        settings.callbackSave(btn, form);
    }
    static deleteForm(btn, formID, options, event = null) {
        var overrides = getDataOptions(btn ? btn.getAttribute("data-options") : {});
        var settings = extend_setting_form(settings || defaults, options || {}, overrides);
        var form = document.querySelector(formID);
        var formSaverID = "formSaver-" + form.id;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        var formMessage = settings.deleteClass === ""
            ? "<div>" + settings.deleteMessage + "</div>"
            : '<div class="' +
                settings.deleteClass +
                '">' +
                settings.deleteMessage +
                "</div>";
        var displayStatus = function () {
            if (settings.deleteClear === true || settings.deleteClear === "true") {
                sessionStorage.setItem(formSaverID + "-formSaverMessage", formMessage);
                location.reload(false);
            }
            else {
                forEach(formStatus, function (status) {
                    status.innerHTML = formMessage;
                });
            }
        };
        localStorage.removeItem(formSaverID);
        displayStatus();
        settings.callbackDelete(btn, form);
    }
    loadForm(form, options) {
        var settings = extend_setting_form(settings || defaults, options || {});
        var formSaverID = "formSaver-" + form.id;
        var formSaverData = JSON.parse(localStorage.getItem(formSaverID));
        var formFields = form.elements;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        var populateField = function (field) {
            if (formSaverData) {
                if (field.type.toLowerCase() === "radio" ||
                    field.type.toLowerCase() === "checkbox") {
                    if (formSaverData[field.name + field.value] === "on") {
                        field.checked = true;
                    }
                }
                else if (field.type.toLowerCase() !== "hidden" &&
                    field.type.toLowerCase() !== "submit") {
                    if (formSaverData[field.name]) {
                        field.value = formSaverData[field.name];
                    }
                }
            }
        };
        var displayStatus = function (status) {
            status.innerHTML = sessionStorage.getItem(formSaverID + "-formSaverMessage");
            sessionStorage.removeItem(formSaverID + "-formSaverMessage");
        };
        forEach(formFields, function (field) {
            populateField(field);
        });
        forEach(formStatus, function (status) {
            displayStatus(status);
        });
        settings.callbackLoad(form);
    }
    destroy() {
        if (!settings)
            return;
        document.documentElement.classList.remove(settings.initClass);
        document.removeEventListener("click", eventHandler, false);
        settings = null;
        forms = null;
    }
    init(options) {
        if (!isBrowser())
            return;
        this.destroy();
        settings = extend_setting_form(defaults, options || {});
        forms = document.forms;
        document.documentElement.className +=
            (document.documentElement.className ? " " : "") + settings.initClass;
        forEach(forms, function (form) {
            this.loadForm(form, settings);
        });
        document.addEventListener("click", eventHandler, false);
    }
    auto() {
        formsaver();
    }
}
if (typeof makeid == "undefined") {
    function makeid(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
console.log(`is browser : ${isBrowser()}`);
if (isBrowser()) {
    (function () {
        const isJqueryLoaded = typeof jQuery != "undefined";
        console.log(`is jQuery loaded : ${isJqueryLoaded}`);
        if (isJqueryLoaded) {
            console.log("Apply plugin smartform jQuery");
            var Count = -1;
            var storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
            var formField;
            var formSaved = localStorage.getItem(storageKey.toString());
            if (!formSaved) {
                formField = [];
            }
            else {
                formField = JSON.parse(formSaved);
            }
            var uniqueid = makeid(5);
            (function ($) {
                $.fn.getIDName = function () {
                    if (!$(this).attr("id") || $(this).attr("id") == "") {
                        try {
                            if (!(Count in formField)) {
                                var id = Math.random().toString(20).substr(2, 6);
                                $(this).attr("id", id);
                                formField[Count] = id;
                                localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
                            }
                            else {
                                $(this).attr("id", formField[Count]);
                            }
                        }
                        catch (error) {
                            console.error(error);
                            console.log(formField, typeof formField);
                        }
                        Count++;
                    }
                    if ($(this).attr("aria-autovalue")) {
                        $(this).val(uniqueid);
                    }
                    return ("[" +
                        location.pathname.replace(/\/$/, "") +
                        "/" +
                        $(this).prop("tagName") +
                        "/" +
                        $(this).attr("id") +
                        "/" +
                        $(this).attr("name") || "empty" + "]");
                };
                $.fn.smartForm = function () {
                    Count++;
                    if ($(this).attr("no-save")) {
                        return;
                    }
                    var t = $(this);
                    t.attr("aria-smartform", uniqueid);
                    var item;
                    var key = t.getIDName().toString();
                    var type = $(this).attr("type");
                    if (key) {
                        if (type === "checkbox") {
                            item = JSON.parse(localStorage.getItem(key));
                            if (item === null) {
                                return;
                            }
                            $(this).prop("checked", item);
                            return;
                        }
                        else if (type === "radio") {
                            item = localStorage.getItem(key) === "on";
                            $(this).prop("checked", item);
                            return;
                        }
                        else {
                            item = localStorage.getItem(key);
                            if (item === null || !item.toString().length) {
                                return;
                            }
                            $(this).val(item);
                        }
                    }
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
                $(document).bind("DOMNodeInserted", function () {
                    var t = $(this);
                    var val = localStorage.getItem(t.getIDName().toString());
                    var tag = t.prop("tagName");
                    var allowed = !t.attr("no-save") &&
                        t.attr("aria-smartform") &&
                        typeof tag != "undefined";
                    if (allowed && val) {
                        console.log(tag, allowed && val);
                        switch (t.prop("tagName")) {
                            case "SELECT":
                            case "INPUT":
                            case "TEXTAREA":
                                t.val(val);
                                break;
                        }
                    }
                });
                $(document).bind("DOMNodeRemoved", function () {
                    var t = $(this);
                    var allowed = !t.attr("no-save") && t.attr("aria-smartform");
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
                $(document).on("change", "select, input, textarea", function (e) {
                    var t = $(this);
                    var key = t.getIDName().toString();
                    var item = t.val();
                    var allowed = !t.attr("no-save") && t.attr("aria-smartform");
                    if (key && item !== "" && allowed) {
                        if (t.attr("type") == "checkbox") {
                            localStorage.setItem(key, t.is(":checked").toString());
                            console.log("save checkbox button ", $(this).offset());
                            return;
                        }
                        if (t.attr("type") == "radio" && t.attr("id")) {
                            $('[name="' + t.attr("name") + '"]').each(function (i, e) {
                                localStorage.setItem($(this).getIDName().toString(), "off");
                            });
                            setTimeout(() => {
                                localStorage.setItem(key, item.toString());
                                console.log("save radio button ", $(this).offset());
                            }, 500);
                            return;
                        }
                        localStorage.setItem(key, item.toString());
                    }
                });
                $(document).on("focus", "input,textarea,select", function () {
                    var t = $(this);
                    t.getIDName();
                    var aria = t.attr("aria-smartform");
                    if (aria && aria != uniqueid) {
                        t.smartForm();
                        t.attr("aria-smartform", uniqueid);
                    }
                });
            })(jQuery);
        }
    })();
}
function formsaver() {
    console.log("Starting smartform jQuery");
    var setglobal = function () {
        jQuery("input,textarea,select").each(function (i, el) {
            $(this).smartForm();
        });
    };
    setglobal();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5UGx1Z2luLWZvcm1zYXZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy9zbWFydGZvcm0vc3JjLyIsInNvdXJjZXMiOlsiYnVuZGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHO0lBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbEIsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1FBQ2IsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUN2QixJQUFJLEVBQUUsQ0FBQztLQUNkO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRSxRQUFRO0lBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFDSTtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtTQUNJO1FBQ0QsT0FBTyxTQUFTLENBQUM7S0FDcEI7QUFDTCxDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsR0FBRyxFQUFFLFdBQVc7SUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUNJO1FBQ0QsT0FBTyxXQUFXLENBQUM7S0FDdEI7QUFDTCxDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsR0FBRztJQUN0QixPQUFPLElBQUksQ0FB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