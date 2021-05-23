const GoogleScraper = require("google-scraper").GoogleScraper;
const request = require("request");

const hostPortRegexp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,5})/g;

function readProxiesFromString(string: string, callback: (arg0: any, arg1: any) => void) {
    let matches: any[];
    while ((matches = hostPortRegexp.exec(string))) {
        const host = matches[1];
        const port = matches[2];
        callback(host, port);
    }
}

function readProxiesFromUrl(url: any, callback: (arg0: any, arg1: any) => void) {
    request(url, function (err: any, res: { body: string }) {
        if (!err && res.body) {
            readProxiesFromString(res.body, callback);
        }
    });
}

function readProxiesFromUrls(urls: any[], callback: any) {
    urls.forEach(function (url: any) {
        readProxiesFromUrl(url, callback);
    });
}

function findProxiesFromSearch(query: any, language: any, nbResults: any, callback: any) {
    const options = {
        keyword: query,
        language: language,
        results: nbResults,
    };
    const scraper = new GoogleScraper(options);
    scraper.getGoogleLinks(function (urls: any) {
        readProxiesFromUrls(urls, callback);
    });
}

module.exports = {
    findProxiesFromSearch: findProxiesFromSearch,
};
