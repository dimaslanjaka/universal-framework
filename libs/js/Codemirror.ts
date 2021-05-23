/**
 * CodeMirror loader
 * @param id
 * @param mode
 * @param theme
 */
function loadCodemirror(element: HTMLTextAreaElement, mode: string | string[], theme: string) {
    if (!(element instanceof HTMLTextAreaElement)) {
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
    if (!theme) {
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
        var theme = themes[Math.floor(Math.random() * themes.length)];
    }
    framework().async(function () {
        const conf: LoadScriptOptions = {
            url: scripts,
            options: {
                type: "text/javascript"
            },
            callback: function () {
                loadCSS("/node_modules/codemirror/lib/codemirror.css", function () {
                    const editor = CodeMirror.fromTextArea(element, {
                        lineNumbers: true,
                        mode: mode,
                        /*
                         smartIndent: true,
                         lineWrapping: true,
                         showCursorWhenSelecting: true,
                         matchHighlight: true,*/
                    });
                    loadCSS(`/node_modules/codemirror/theme/${theme}.css`, function () {
                        editor.setOption("theme", theme);
                    });
                });
            },
        };
        LoadScript(conf);
    });
}
