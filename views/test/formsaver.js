$("form").on("submit", function (e) {
    e.preventDefault();
});

$("select#country").select2Country();

/**
 * @type {HTMLCollection}
 */
var testInput = document.forms["test"].getElementsByTagName("input");
for (const key in testInput) {
    if (Object.hasOwnProperty.call(testInput, key)) {
        const input = testInput[key];
        new formSaver2(input, { debug: true });
    }
}
