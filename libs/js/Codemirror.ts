/// <reference types="codemirror" />
/// <reference path="./Codemirror.d.ts" />
/// <reference path="./Codemirror-var.ts" />

let loadedTheme = null;
/**
 * CodeMirror script and style loader
 * @param opt
 */
function loadCodeMirrorScript(opt: {
    /**
     * @link https://codemirror.net/mode/
     */
    mode: CodeMirrorConfig["modes"];
    addons?: CodeMirrorConfig["addons"];
    theme?: CodeMirrorConfig["theme"];
    override?: CodeMirror.EditorConfiguration;
    callback?: () => any;
}) {
    const scripts = ["/node_modules/codemirror/lib/codemirror.js"];
    if (opt.mode) {
        if (Array.isArray(opt.mode)) {
            opt.mode.forEach(function (mode: string) {
                scripts.push(`/node_modules/codemirror/mode/${mode}/${mode}.js`);
            });
        }
    }

    if (opt.addons) {
        if (Array.isArray(opt.addons)) {
            opt.addons.forEach(function (addon: string) {
                let ons: typeof CodeMirrorAddon["CodeMirror-display-fullscreen"] = CodeMirrorAddon[addon];
                if (ons.hasOwnProperty("js")) {
                    scripts.push(ons.js);
                }
            });
        }
    }

    // load style codemirror
    loadCSS(
        [
            "/node_modules/codemirror/lib/codemirror.css",
            "/assets/css/codemirror/style.css",
            `/node_modules/codemirror/theme/${opt.theme}.css`,
        ],
        function () {
            // set loadedTheme
            loadedTheme = opt.theme;
        }
    );

    // load script codemirror
    const conf: LoadScriptOptions = {
        url: scripts,
        options: {
            type: "text/javascript",
        },
        callback: opt.callback,
    };
    LoadScript(conf);
}

/**
 * CodeMirror element initializer
 * @param opt
 */
function initCodeMirror(opt: {
    callback?: (el: HTMLTextAreaElement) => any;
    mode: CodeMirrorConfig["mode"];
    element: HTMLTextAreaElement;
    override?: CodeMirror.EditorConfiguration;
}) {
    let defaultOverride: CodeMirror.EditorConfiguration = {
        lineNumbers: true,
        mode: opt.mode,
        selectionsMayTouch: true,
        /*
         smartIndent: true,
         lineWrapping: true,
         showCursorWhenSelecting: true,
         matchHighlight: true,*/
    };
    defaultOverride = Object.assign(defaultOverride, opt.override);

    const editor = CodeMirror.fromTextArea(opt.element, defaultOverride);
    if (typeof loadedTheme == "string") editor.setOption("theme", loadedTheme);
    if (typeof opt.callback == "function") {
        opt.callback(opt.element);
    }
    return editor;
}

function codeMirrorRandomTheme() {
    const themes = [
        "3024-night",
        "abcdef",
        "ambiance",
        "base16-dark",
        "bespin",
        "blackboard",
        "cobalt",
        "colorforth",
        "dracula",
        "erlang-dark",
        "hopscotch",
        "icecoder",
        "isotope",
        "lesser-dark",
        "liquibyte",
        "material",
        "mbo",
        "mdn-like",
        "monokai",
    ];
    return <any>themes[Math.floor(Math.random() * themes.length)];
}
