var count = -1;
var storageKey = location.pathname.replace(/\/$/s, '') + '/formField';
var formField;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formField = [];
}
else {
    formField = JSON.parse(formSaved);
}
var uniqueid = guid();
(function ($) {
    $.fn.getIDName = function () {
        if (!$(this).attr('id') || $(this).attr('id') == '') {
            try {
                if (!(count in formField)) {
                    var id = Math.random().toString(20).substr(2, 6);
                    $(this).attr('id', id);
                    formField[count] = id;
                    localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
                }
                else {
                    $(this).attr('id', formField[count]);
                }
            }
            catch (error) {
                console.error(error);
                console.log(formField, typeof formField);
            }
            count++;
        }
        if ($(this).attr('aria-autovalue')) {
            $(this).val(uniqueid);
        }
        return '[' + location.pathname.replace(/\/$/, '') + '/' + $(this).prop('tagName') + '/' + $(this).attr("id") + '/' + $(this).attr("name") || 'empty' + ']';
    };
    $.fn.smartForm = function () {
        count++;
        if ($(this).attr('no-save')) {
            return;
        }
        var t = $(this);
        t.attr('aria-smartform', uniqueid);
        var item;
        var key = t.getIDName().toString();
        var type = $(this).attr('type');
        if (key) {
            if (type === 'checkbox') {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                $(this).prop('checked', item);
                return;
            }
            else if (type === 'radio') {
                item = localStorage.getItem(key) === 'on';
                $(this).prop('checked', item);
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
    $(document).bind("DOMNodeInserted", function () {
        var t = $(this);
        var val = localStorage.getItem(t.getIDName().toString());
        var tag = t.prop('tagName');
        var allowed = !t.attr('no-save') && t.attr('aria-smartform') && typeof tag != 'undefined';
        if (allowed && val) {
            console.log(tag, allowed && val);
            switch (t.prop('tagName')) {
                case 'SELECT':
                case 'INPUT':
                case 'TEXTAREA':
                    t.val(val);
                    break;
            }
        }
    });
    $(document).bind("DOMNodeRemoved", function () {
        var t = $(this);
        var allowed = !t.attr('no-save') && t.attr('aria-smartform');
        if (allowed) {
            switch (t.prop('tagName')) {
                case 'SELECT':
                case 'INPUT':
                case 'TEXTAREA':
                    t.off('change');
                    break;
            }
        }
    });
    $(document).on('change', 'select, input, textarea', function (e) {
        var _this = this;
        var t = $(this);
        var key = t.getIDName().toString();
        var item = t.val();
        var allowed = !t.attr('no-save') && t.attr('aria-smartform');
        if (key && item !== '' && allowed) {
            if (t.attr('type') == 'checkbox') {
                localStorage.setItem(key, t.is(':checked').toString());
                console.log('save checkbox button ', $(this).offset());
                return;
            }
            if (t.attr('type') == 'radio' && t.attr('id')) {
                $('[name="' + t.attr('name') + '"]').each(function (i, e) {
                    localStorage.setItem($(this).getIDName().toString(), 'off');
                });
                setTimeout(function () {
                    localStorage.setItem(key, item.toString());
                    console.log('save radio button ', $(_this).offset());
                }, 500);
                return;
            }
            localStorage.setItem(key, item.toString());
        }
    });
    $(document).on('focus', 'input,textarea,select', function () {
        var t = $(this);
        t.getIDName();
        var aria = t.attr('aria-smartform');
        if (aria && (aria != uniqueid)) {
            t.smartForm();
            t.attr('aria-smartform', uniqueid);
        }
    });
}(jQuery));
function smartform() {
    var setglobal = function () {
        $('input,textarea,select').each(function (i, el) {
            $(this).smartForm();
        });
    };
    setglobal();
}
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported('copy');
    var elOriginalText = el.attr('data-original-title');
    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'Copied!' : 'Whoops, not copied!';
            el.attr('data-original-title', msg);
            el.tooltip('show');
        }
        catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(copyTextArea);
        el.attr('data-original-title', elOriginalText);
    }
    else {
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}
//# sourceMappingURL=saver.js.map