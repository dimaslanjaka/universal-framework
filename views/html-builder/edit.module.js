import prettier from "prettier";
import parserBabel from "/node_modules/prettier/esm/parser-babel.mjs";
import parserHtml from "/node_modules/prettier/esm/parser-html.mjs";
import parserPostCss from "/node_modules/prettier/esm/parser-postcss.mjs";

/**
 * @type {HTMLTextAreaElement}
 */
let thtml = document.getElementById("thtml");
/**
 * @type {HTMLTextAreaElement}
 */
let tcss = document.getElementById("tcss");
/**
 * @type {HTMLTextAreaElement}
 */
let tjs = document.getElementById("tjs");
/**
 * @type {string}
 */
let name = getParameterByName("name", location.href);
/**
 * @type {CodeMirror.EditorFromTextArea}
 */
let editorhtml;
/**
 * @type {CodeMirror.EditorFromTextArea}
 */
let editorcss;
/**
 * @type {CodeMirror.EditorFromTextArea}
 */
let editorjs;

fetch("/html-builder/edit?fetch=" + name)
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        if (typeof data.js == "string") {
            tjs.value = data.js;
        }
        if (typeof data.css == "string") {
            tcss.value = data.css;
        }
        if (typeof data.html == "string") {
            thtml.value = data.html;
        }
    })
    .finally(function () {
        loadCodeMirrorScript({
            mode: ["css", "htmlmixed", "javascript", "xml"],
            addons: ["CodeMirror-fold-xml-fold", "CodeMirror-edit-matchtags"],
            theme: "dracula",
            callback: function () {
                /**
                 * @type {CodeMirror.EditorConfiguration}
                 */
                let ov = {
                    lineWrapping: true,
                    extraKeys: { "Ctrl-Space": "autocomplete", "Ctrl-J": "toMatchingTag" },
                    matchTags: { bothTags: true },
                };

                // Define an extended mixed-mode that understands vbscript and
                // leaves mustache/handlebars embedded templates in html mode
                var mixedMode = {
                    name: "htmlmixed",
                    scriptTypes: [
                        { matches: /\/x-handlebars-template|\/x-mustache/i, mode: null },
                        { matches: /(text|application)\/(x-)?vb(a|script)/i, mode: "vbscript" },
                    ],
                    htmlMode: true,
                };

                editorhtml = initCodeMirror({
                    element: thtml,
                    override: ov,
                    mode: mixedMode,
                });

                editorcss = initCodeMirror({ element: tcss, override: ov, mode: "css" });
                editorjs = initCodeMirror({ element: tjs, override: ov, mode: "javascript" });
            },
        });
    });

/*
$(`[data-toggle="tab"]`).on("click", function (e) {
    let href = $(this).attr("href");
    let area = $(href).children("textarea");
    setTimeout(() => {
        area.autoHeight();
    }, 700);
});
*/

$("#beautify").on("click", function (e) {
    e.preventDefault();
    let fhtml = formatHtml(editorhtml.getValue());
    if (typeof fhtml == "string") {
        editorhtml.setValue(fhtml);
    }
    let fcss = formatCss(editorcss.getValue());
    if (typeof fcss == "string") {
        editorcss.setValue(fcss);
    }
});

function formatHtml(str) {
    try {
        return prettier.format(str, {
            parser: "html",
            plugins: [parserHtml],
        });
    } catch (error) {
        toastr.error("Structure HTML Error " + error, "Prettier Failed");
    }
}

function formatCss(str) {
    try {
        return prettier.format(str, {
            parser: "css",
            plugins: [parserPostCss],
        });
    } catch (error) {
        toastr.error("Structure CSS Error " + error, "Prettier Failed");
    }
}

function formatJs(str) {
    return prettier.format(str, {
        parser: "babel",
        plugins: [parserBabel, parserHtml],
    });
}
