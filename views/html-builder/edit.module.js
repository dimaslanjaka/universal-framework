//import prettier from "https://unpkg.com/prettier@2.3.0/esm/standalone.mjs";
import prettier from "prettier";
import parserBabel from "/node_modules/prettier/esm/parser-babel.mjs";
import parserHtml from "/node_modules/prettier/esm/parser-html.mjs";

console.log(
    prettier.format("const html=/* HTML */ `<DIV> </DIV>`", {
        parser: "babel",
        plugins: [parserBabel, parserHtml],
    })
);
// Output: const html = /* HTML */ `<div></div>`;

let thtml = document.getElementById("thtml");
let tcss = document.getElementById("tcss");
let tjs = document.getElementById("tjs");
let name = getParameterByName("name", location.href);
console.log(name);
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
    });

loadCodemirror({
    element: thtml,
    theme: "dracula",
    override: {
        lineWrapping: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        value: thtml.value,
    },
});

$(`[data-toggle="tab"]`).on("click", function (e) {
    let href = $(this).attr("href");
    let area = $(href).children("textarea");
    setTimeout(() => {
        area.autoHeight();
    }, 700);
});
