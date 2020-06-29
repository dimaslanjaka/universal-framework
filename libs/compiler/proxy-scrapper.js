var GoogleScraper = require("google-scraper").GoogleScraper;
var request = require("request");
var hostPortRegexp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,5})/g;
function readProxiesFromString(string, callback) {
    var matches;
    while ((matches = hostPortRegexp.exec(string))) {
        var host = matches[1];
        var port = matches[2];
        callback(host, port);
    }
}
function readProxiesFromUrl(url, callback) {
    request(url, function (err, res) {
        if (!err && res.body) {
            readProxiesFromString(res.body, callback);
        }
    });
}
function readProxiesFromUrls(urls, callback) {
    urls.forEach(function (url) {
        readProxiesFromUrl(url, callback);
    });
}
function findProxiesFromSearch(query, language, nbResults, callback) {
    var options = {
        keyword: query,
        language: language,
        results: nbResults,
    };
    var scraper = new GoogleScraper(options);
    scraper.getGoogleLinks(function (urls) {
        readProxiesFromUrls(urls, callback);
    });
}
module.exports = {
    findProxiesFromSearch: findProxiesFromSearch,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHktc2NyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvcHJveHktc2NyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsYUFBYSxDQUFDO0FBQzlELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVuQyxJQUFJLGNBQWMsR0FBRyxrREFBa0QsQ0FBQztBQUV4RSxTQUFTLHFCQUFxQixDQUM1QixNQUFjLEVBQ2QsUUFBd0M7SUFFeEMsSUFBSSxPQUFjLENBQUM7SUFDbkIsT0FBTyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQ3pCLEdBQVEsRUFDUixRQUF3QztJQUV4QyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQXFCO1FBQ3BELElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNwQixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxJQUFXLEVBQUUsUUFBYTtJQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBUTtRQUM3QixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsS0FBVSxFQUNWLFFBQWEsRUFDYixTQUFjLEVBQ2QsUUFBYTtJQUViLElBQUksT0FBTyxHQUFHO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsUUFBUTtRQUNsQixPQUFPLEVBQUUsU0FBUztLQUNuQixDQUFDO0lBQ0YsSUFBSSxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLElBQVM7UUFDeEMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixxQkFBcUIsRUFBRSxxQkFBcUI7Q0FDN0MsQ0FBQyJ9