module.exports = function setcookie(name, value, expires, path, domain, secure) {
    //  discuss at: https://locutus.io/php/setcookie/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // bugfixed by: Andreas
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: setcookie('author_name', 'Kevin van Zonneveld')
    //   returns 1: true
    var setrawcookie = require('../network/setrawcookie');
    return setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Y29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL25ldHdvcmsvc2V0Y29va2llLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQzdFLGlEQUFpRDtJQUNqRCxxRUFBcUU7SUFDckUsdUJBQXVCO0lBQ3ZCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELG9CQUFvQjtJQUVwQixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUNyRCxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDckYsQ0FBQyxDQUFBIn0=