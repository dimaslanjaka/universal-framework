(function () {
    aenc(`Test ${formatDate()}`);

    $("#pass").on("keyup", function (e) {
        let pw = $(this).val();
        aenc(pw);
    });
})();

function getKey() {
    return document.getElementById("secret-key").value;
}

/**
 * encrypt
 * @param {string} text
 */
function aenc(text) {
    if (!text.length) text = "test";
    let key = getKey();

    $.ajax({
        url: "?encrypt-text",
        method: "POST",
        data: {
            enc: text,
            secret: getKey(),
            json: true,
        },
        success: function (res) {
            //console.log(res.result);
            document.getElementById("secret").textContent = res.secret;
            document.getElementById("encphp").textContent = res.result;
            document.getElementById("encjs").textContent = aesEncrypt(text, key);

            document.getElementById("jscode-encrypt").textContent = `aesEncrypt("${text}", "${key}");`;
            adec(res.result);
        },
    });
}

/**
 *
 * @param {string} text
 */
function adec(text) {
    let key = getKey();
    $.ajax({
        url: "?decrypt-text",
        method: "POST",
        data: {
            dec: text.length ? text : "test",
            secret: getKey(),
            json: true,
        },
        success: function (res) {
            document.getElementById("decjs").textContent = aesDecrypt(text, key);
            document.getElementById("decphp").textContent = res.result;

            document.getElementById("jscode-decrypt").textContent = `aesDecrypt("${text}", "${key}");`;
        },
    });
}

/**
 * @see https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 * @param {string|number|Date} date
 */
function formatDate(date) {
    var d;
    if (date instanceof Date) {
        d = date;
    } else if (typeof date == "string" || typeof date == "number") {
        d = new Date(date);
    } else {
        d = new Date();
    }
    var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}
