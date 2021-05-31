// noinspection HtmlUnknownTarget

$(document).on("submit", "form", function (e) {
    e.preventDefault();
    const t = $(this).get(0);
    let serialize = serializeArray(t);
    userClass().login(serialize[0].value, serialize[1].value, function (err, data) {
        if (!err) {
            toastr.success("Login sucessfully", "Login information");
        }
    });
    gexec("login");
});

const userdata = new user();
userdata.fetch(function (res) {
    if (typeof res === "object") {
        if (res.hasOwnProperty("username")) {
            toastr.success(`<u><a href='/user/dashboard'>Go to Dashboard</a></u>`, "You has logged in", {
                timeOut: 5000,
            });
            console.log(res);
        }
    }
});

// activate recaptcha
recaptcha().init();
// activate formsaver whole documents
formsaver();
