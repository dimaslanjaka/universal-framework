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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHktc2NyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9wcm94eS1zY3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDOUQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLElBQU0sY0FBYyxHQUFHLGtEQUFrRCxDQUFDO0FBRTFFLFNBQVMscUJBQXFCLENBQUMsTUFBYyxFQUFFLFFBQXdDO0lBQ25GLElBQUksT0FBYyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzVDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN4QjtBQUNMLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLEdBQVEsRUFBRSxRQUF3QztJQUMxRSxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQXFCO1FBQ2xELElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNsQixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxJQUFXLEVBQUUsUUFBYTtJQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBUTtRQUMzQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxLQUFVLEVBQUUsUUFBYSxFQUFFLFNBQWMsRUFBRSxRQUFhO0lBQ25GLElBQU0sT0FBTyxHQUFHO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsUUFBUTtRQUNsQixPQUFPLEVBQUUsU0FBUztLQUNyQixDQUFDO0lBQ0YsSUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLElBQVM7UUFDdEMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDYixxQkFBcUIsRUFBRSxxQkFBcUI7Q0FDL0MsQ0FBQyJ9