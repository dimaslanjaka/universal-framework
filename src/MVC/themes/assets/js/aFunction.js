function empty(str) {
    var type = typeof str;
    if (type == 'string' || type == 'number') {
        str = str.toString().trim();
    }
    switch (str) {
        case "":
        case null:
        case false:
        case type == "undefined":
            return true;
        default:
            return false;
    }
}
//# sourceMappingURL=aFunction.js.map