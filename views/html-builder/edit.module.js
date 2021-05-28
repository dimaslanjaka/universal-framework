//import prettier from "https://unpkg.com/prettier@2.3.0/esm/standalone.mjs";
import prettier from "prettier";
import parserBabel from "https://unpkg.com/prettier@2.3.0/esm/parser-babel.mjs";
import parserHtml from "https://unpkg.com/prettier@2.3.0/esm/parser-html.mjs";

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
let name = getParameterByName("name");
fetch("/html-builder/edit?fetch=" + name)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (typeof data.css == "string") {
            tcss.value = data.css;
        }
        if (typeof data.html == "string") {
            thtml.value = data.html;
        }
    });

loadCodemirror(thtml);

$(`[data-toggle="tab"]`).on("click", function (e) {
    let href = $(this).attr("href");
    let area = $(href).children("textarea");
    setTimeout(() => {
        area.autoHeight();
    }, 700);
});
