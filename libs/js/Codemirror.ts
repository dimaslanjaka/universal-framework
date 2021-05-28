/// <reference types="codemirror" />

/**
 * CodeMirror loader
 * @param id
 * @param mode
 * @param theme
 */
function loadCodemirror(options: {
    element: HTMLTextAreaElement;
    mode?: string | string[];
    theme?:
        | "3024-night"
        | "abcdef"
        | "ambiance"
        | "base16-dark"
        | "bespin"
        | "blackboard"
        | "cobalt"
        | "colorforth"
        | "dracula"
        | "erlang-dark"
        | "hopscotch"
        | "icecoder"
        | "isotope"
        | "lesser-dark"
        | "liquibyte"
        | "material"
        | "mbo"
        | "mdn-like"
        | "monokai";
    override?: CodeMirror.EditorConfiguration;
    callback?: (el: HTMLTextAreaElement) => any;
}) {
    let defaultOpt = { mode: null, theme: null, override: {} };
    options = Object.assign(defaultOpt, options);
    let mode = options.mode;
    if (!(options.element instanceof HTMLTextAreaElement)) {
        console.error("element must be instanceof HTMLTextAreaElement");
        return null;
    }
    const scripts = ["/node_modules/codemirror/lib/codemirror.js"];
    if (mode) {
        if (typeof mode == "string") {
            scripts.push(`/node_modules/codemirror/mode/${mode}/${mode}.js`);
        } else if (Array.isArray(mode)) {
            mode.forEach(function (m) {
                scripts.push(`/node_modules/codemirror/mode/${m}/${m}.js`);
            });
        }
    }
    if (!options.theme) {
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
        options.theme = <any>themes[Math.floor(Math.random() * themes.length)];
    }
    framework().async(function () {
        const conf: LoadScriptOptions = {
            url: scripts,
            options: {
                type: "text/javascript",
            },
            callback: function () {
                loadCSS(
                    ["/node_modules/codemirror/lib/codemirror.css", "/assets/css/codemirror/style.css"],
                    function () {
                        let defaultOverride: CodeMirror.EditorConfiguration = {
                            lineNumbers: true,
                            mode: mode,
                            /*
                         smartIndent: true,
                         lineWrapping: true,
                         showCursorWhenSelecting: true,
                         matchHighlight: true,*/
                        };
                        const editor = CodeMirror.fromTextArea(
                            options.element,
                            Object.assign(defaultOpt, defaultOverride)
                        );
                        loadCSS(`/node_modules/codemirror/theme/${options.theme}.css`, function () {
                            editor.setOption("theme", options.theme);
                            if (typeof options.callback == "function") {
                                options.callback(options.element);
                            }
                        });
                    }
                );
            },
        };
        LoadScript(conf);
    });
}
