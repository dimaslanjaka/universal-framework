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
function serializeArray(form: HTMLFormElement): { name: string; value: string }[] {
    const arr = [];
    Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (!field.name || field.disabled || ["file", "reset", "submit", "button"].indexOf(field.type) > -1) return;
        if (field.type === "select-multiple") {
            Array.prototype.slice.call(field.options).forEach(function (option) {
                if (!option.selected) return;
                arr.push({
                    name: field.name,
                    value: option.value,
                });
            });
            return;
        }
        if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked) return;
        arr.push({
            name: field.name,
            value: field.value,
        });
    });
    return arr;
}
