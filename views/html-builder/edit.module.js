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

$(`[data-toggle="tab"]`).on("click", function (e) {
    /**
     * @type {HTMLIFrameElement}
     */
    let ifr = document.getElementById("i-preview");
    var code = ifr.contentWindow.document;
    code.open();
    let result = "";
    if (editorhtml.getValue().length > 0) result += editorhtml.getValue();
    if (editorcss.getValue().length > 0) result += "<style>" + editorcss.getValue() + "</style>";
    if (editorjs.getValue().length > 0) result += "<scr" + "ipt>" + editorjs.getValue() + "</scr" + "ipt>";
    code.writeln(result);
    code.close();
    //resizeIFrameToFitContent(ifr, { width: false, height: false });
    //ifr.style = "height:" + ifr.contentWindow.document.body.scrollHeight + "px";
    //console.log(ifr.contentWindow.document.body.scrollHeight);
});

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
    let fjs = formatJs(editorjs.getValue());
    if (typeof fjs == "string") {
        editorjs.setValue(fjs);
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
