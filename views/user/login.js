// noinspection HtmlUnknownTarget

$(document).on("submit", "form", function (e) {
    e.preventDefault();
    const t = $(this).get(0);
    let serialize = serializeArray(t);
    serialize.forEach(function (fdata) {
        if (fdata.name){}
    });
    const data = new URLSearchParams();
    for (const pair of new FormData(t)) {
        data.append(pair[0], pair[1]);
    }

    fetch("/server/user?login", {
        method: "post",
        body: data,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        });

    /*
     var s = t.data("success"),
     er = t.data("error"),
     c = t.data("complete");
     $.ajax({
     url: t.attr("action"),
     method: t.attr("method"),
     data: t.serialize(),
     success: function (res) {
     console.log(res);
     },
     proxy: false,
     });
     */
    gexec("login");
});

const userdata = new user();
userdata.fetch(function (res) {
    if (typeof res === "object") {
        if (res.hasOwnProperty("username")) {
            toastr.success(`<a href='/user/dashboard'>Go to Dashboard</a>`, "You has logged in", { timeOut: 5000 });
            console.log(res);
        }
    }
});

// activate recaptcha
recaptcha().init();
// activate formsaver whole documents
formsaver();
