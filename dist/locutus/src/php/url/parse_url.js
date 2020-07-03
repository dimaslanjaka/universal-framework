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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3VybC9wYXJzZV91cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxHQUFHLEVBQUUsU0FBUztJQUNqRCxzREFBc0Q7SUFDdEQsc0VBQXNFO0lBQ3RFLHlEQUF5RDtJQUN6RCxtQ0FBbUM7SUFDbkMseUJBQXlCO0lBQ3pCLHlEQUF5RDtJQUN6RCwrRkFBK0Y7SUFDL0YsbUZBQW1GO0lBQ25GLDJGQUEyRjtJQUMzRiw0RUFBNEU7SUFDNUUsa0RBQWtEO0lBQ2xELCtDQUErQztJQUMvQyxrRkFBa0Y7SUFDbEYseUNBQXlDO0lBQ3pDLDJGQUEyRjtJQUMzRixtRUFBbUU7SUFDbkUsNEhBQTRIO0lBQzVILG1GQUFtRjtJQUNuRixtR0FBbUc7SUFDbkcsc0VBQXNFO0lBQ3RFLHNGQUFzRjtJQUN0RixzR0FBc0c7SUFDdEcsb0pBQW9KO0lBRXBKLElBQUksS0FBSyxDQUFBO0lBRVQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssQ0FBQTtJQUV2SCxJQUFJLEdBQUcsR0FBRztRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsV0FBVztRQUNYLFVBQVU7UUFDVixNQUFNO1FBQ04sTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1FBQ04sVUFBVTtRQUNWLE1BQU07UUFDTixXQUFXO1FBQ1gsTUFBTTtRQUNOLE9BQU87UUFDUCxVQUFVO0tBQ1gsQ0FBQTtJQUVELGdHQUFnRztJQUNoRyxJQUFJLE1BQU0sR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQztZQUNkLG9CQUFvQjtZQUNwQixnRkFBZ0Y7WUFDaEYsSUFBSTtZQUNKLG9FQUFvRTtTQUNyRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQztZQUNqQixvQkFBb0I7WUFDcEIsd0VBQXdFO1lBQ3hFLDBEQUEwRDtTQUMzRCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQztZQUNoQiwwQ0FBMEM7WUFDMUMsaUJBQWlCO1lBQ2pCLDZEQUE2RDtZQUM3RCx3RUFBd0U7WUFDeEUsNEJBQTRCO1NBQzdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ1osQ0FBQTtJQUVELElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDOUIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVYsT0FBTyxDQUFDLEVBQUUsRUFBRTtRQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNuQjtLQUNGO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO0tBQzVEO0lBRUQsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUE7UUFDaEksTUFBTSxHQUFHLDJCQUEyQixDQUFBO1FBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDZCxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN4QyxJQUFJLEVBQUUsRUFBRTtnQkFDTixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUE7S0FDSDtJQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUNqQixPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9