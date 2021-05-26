function compile() {
    /**
     * @type {HTMLTextAreaElement}
     */
    var html = document.getElementById("html");
    /**
     * @type {HTMLTextAreaElement}
     */
    var css = document.getElementById("css");
    /**
     * @type {HTMLTextAreaElement}
     */
    var js = document.getElementById("js");
    /**
     * @type {HTMLIFrameElement}
     */
    let ifr = document.getElementById("code");
    var code = ifr.contentWindow.document;

    let onkeyup = function () {
        code.open();
        let result = "";
        if (html.value) result += html.value;
        if (css.value) result += "<style>" + css.value + "</style>";
        if (js.value.length > 0) result += "<script>" + js.value + "</script>";
        code.writeln(result);
        code.close();
    };

    [html, css, js].forEach(function (el) {
        el.addEventListener("keyup", onkeyup);
    });
}

compile();

formsaver();
