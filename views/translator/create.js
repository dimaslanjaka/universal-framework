// noinspection JSUnresolvedVariable
z(function () {
    $("textarea").autoHeight();

    formsaver();

    $("#slang,#tolang").select2LangCountry();

    $("form").on("submit", function (e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            url: location.href,
            data: data,
            method: "POST",
            success: function (res) {
                console.log(res);
            },
        });
    });
})();

/**
 * Check background images
 * @param {JQuery<HTMLElement>} classFlags
 */
function checkBgImg(classFlags, callback) {
    //let classFlags = $("[class*='flag-icon-']");
    if (classFlags.length > 0) {
        for (let index = 0; index < classFlags.length; index++) {
            const el = classFlags[index];
            //console.log(el.getAttribute("class"));

            let bg = $(el).css("background-image");
            //console.log(bg);
            if (bg) {
                const src = bg.replace(/(^url\()|(\)$|["'])/g, "");

                if (src.length) {
                    //console.log(src);
                    let $img = $("<img>")
                        .attr("src", src)
                        .on("load", function () {
                            callback(src, `${src} loaded`);
                        });
                    $img.remove();
                }
            }
        }
    }
}
