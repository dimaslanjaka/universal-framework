module.exports = function parse_url(str, component) {
    //       discuss at: https://locutus.io/php/parse_url/
    //      original by: Steven Levithan (https://blog.stevenlevithan.com)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //         input by: Lorenzo Pisani
    //         input by: Tony
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //           note 1: original by https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    //           note 1: blog post at https://blog.stevenlevithan.com/archives/parseuri
    //           note 1: demo at https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    //           note 1: Does not replace invalid characters with '_' as in PHP,
    //           note 1: nor does it return false with
    //           note 1: a seriously malformed URL.
    //           note 1: Besides function name, is essentially the same as parseUri as
    //           note 1: well as our allowing
    //           note 1: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    //        example 1: parse_url('https://user:pass@host/path?a=v#a')
    //        returns 1: {scheme: 'https', host: 'host', user: 'user', pass: 'pass', path: '/path', query: 'a=v', fragment: 'a'}
    //        example 2: parse_url('https://en.wikipedia.org/wiki/%22@%22_%28album%29')
    //        returns 2: {scheme: 'https', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
    //        example 3: parse_url('https://host.domain.tld/a@b.c/folder')
    //        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
    //        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar')
    //        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }
    var query;
    var mode = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.parse_url.mode') : undefined) || 'php';
    var key = [
        'source',
        'scheme',
        'authority',
        'userInfo',
        'user',
        'pass',
        'host',
        'port',
        'relative',
        'path',
        'directory',
        'file',
        'query',
        'fragment'
    ];
    // For loose we added one optional slash to post-scheme to catch file:/// (should restrict this)
    var parser = {
        php: new RegExp([
            '(?:([^:\\/?#]+):)?',
            '(?:\\/\\/()(?:(?:()(?:([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?',
            '()',
            '(?:(()(?:(?:[^?#\\/]*\\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)'
        ].join('')),
        strict: new RegExp([
            '(?:([^:\\/?#]+):)?',
            '(?:\\/\\/((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?',
            '((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)'
        ].join('')),
        loose: new RegExp([
            '(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?',
            '(?:\\/\\/\\/?)?',
            '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)',
            '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))',
            '(?:\\?([^#]*))?(?:#(.*))?)'
        ].join(''))
    };
    var m = parser[mode].exec(str);
    var uri = {};
    var i = 14;
    while (i--) {
        if (m[i]) {
            uri[key[i]] = m[i];
        }
    }
    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }
    if (mode !== 'php') {
        var name = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.parse_url.queryKey') : undefined) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        query = uri[key[12]] || '';
        query.replace(parser, function ($0, $1, $2) {
            if ($1) {
                uri[name][$1] = $2;
            }
        });
    }
    delete uri.source;
    return uri;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC91cmwvcGFyc2VfdXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRyxFQUFFLFNBQVM7SUFDakQsc0RBQXNEO0lBQ3RELHNFQUFzRTtJQUN0RSx5REFBeUQ7SUFDekQsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6Qix5REFBeUQ7SUFDekQsK0ZBQStGO0lBQy9GLG1GQUFtRjtJQUNuRiwyRkFBMkY7SUFDM0YsNEVBQTRFO0lBQzVFLGtEQUFrRDtJQUNsRCwrQ0FBK0M7SUFDL0Msa0ZBQWtGO0lBQ2xGLHlDQUF5QztJQUN6QywyRkFBMkY7SUFDM0YsbUVBQW1FO0lBQ25FLDRIQUE0SDtJQUM1SCxtRkFBbUY7SUFDbkYsbUdBQW1HO0lBQ25HLHNFQUFzRTtJQUN0RSxzRkFBc0Y7SUFDdEYsc0dBQXNHO0lBQ3RHLG9KQUFvSjtJQUVwSixJQUFJLEtBQUssQ0FBQTtJQUVULElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUE7SUFFdkgsSUFBSSxHQUFHLEdBQUc7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFdBQVc7UUFDWCxVQUFVO1FBQ1YsTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1FBQ04sTUFBTTtRQUNOLFVBQVU7UUFDVixNQUFNO1FBQ04sV0FBVztRQUNYLE1BQU07UUFDTixPQUFPO1FBQ1AsVUFBVTtLQUNYLENBQUE7SUFFRCxnR0FBZ0c7SUFDaEcsSUFBSSxNQUFNLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSSxNQUFNLENBQUM7WUFDZCxvQkFBb0I7WUFDcEIsZ0ZBQWdGO1lBQ2hGLElBQUk7WUFDSixvRUFBb0U7U0FDckUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUM7WUFDakIsb0JBQW9CO1lBQ3BCLHdFQUF3RTtZQUN4RSwwREFBMEQ7U0FDM0QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUM7WUFDaEIsMENBQTBDO1lBQzFDLGlCQUFpQjtZQUNqQiw2REFBNkQ7WUFDN0Qsd0VBQXdFO1lBQ3hFLDRCQUE0QjtTQUM3QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNaLENBQUE7SUFFRCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLE9BQU8sQ0FBQyxFQUFFLEVBQUU7UUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNSLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7S0FDRjtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtLQUM1RDtJQUVELElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtRQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFBO1FBQ2hJLE1BQU0sR0FBRywyQkFBMkIsQ0FBQTtRQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2QsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxFQUFFLEVBQUU7Z0JBQ04sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFBO0tBQ0g7SUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDakIsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==