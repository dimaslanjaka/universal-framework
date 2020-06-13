function http_build_query(obj) {
    if (typeof obj != 'object') {
        throw "http_build_query need parameter of object instead of " + typeof obj;
    }
    var queryString = Object.keys(obj).map(function (key) {
        return key + '=' + obj[key];
    }).join('&');
    return queryString;
}
//# sourceMappingURL=function.js.map