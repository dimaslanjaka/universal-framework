function adaProxyAtauTidak() {
    var proxyHeader = 'via';
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send();
    var header = req.getResponseHeader(proxyHeader);
    if (header) {
        return true;
    }
    return false;
}

$('body').text(adaProxyAtauTidak() ? "Yes You're Behind Proxies" : "No Proxies Detected");
