/**
 * Autofill datetime-local value
 */
function datetimelocal(v?: string | number) {
    const d = !v ? new Date() : new Date(v);
    $("input[type=datetime-local]").val(
        d.getFullYear() +
        "-" +
        this.strpad(d.getMonth() + 1) +
        "-" +
        this.strpad(d.getDate()) +
        "T" +
        this.strpad(d.getHours()) +
        ":" +
        this.strpad(d.getMinutes())
    );
}