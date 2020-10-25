const GoogleScraper = require("google-scraper").GoogleScraper;
const request = require("request");

var hostPortRegexp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,5})/g;

function readProxiesFromString(
  string: string,
  callback: (arg0: any, arg1: any) => void
) {
  let matches: any[];
  while ((matches = hostPortRegexp.exec(string))) {
    var host = matches[1];
    var port = matches[2];
    callback(host, port);
  }
}

function readProxiesFromUrl(
  url: any,
  callback: (arg0: any, arg1: any) => void
) {
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

function findProxiesFromSearch(
  query: any,
  language: any,
  nbResults: any,
  callback: any
) {
  var options = {
    keyword: query,
    language: language,
    results: nbResults,
  };
  var scraper = new GoogleScraper(options);
  scraper.getGoogleLinks(function (urls: any) {
    readProxiesFromUrls(urls, callback);
  });
}

module.exports = {
  findProxiesFromSearch: findProxiesFromSearch,
};
