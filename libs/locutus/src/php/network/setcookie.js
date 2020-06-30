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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Y29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9uZXR3b3JrL3NldGNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUM3RSxpREFBaUQ7SUFDakQscUVBQXFFO0lBQ3JFLHVCQUF1QjtJQUN2Qiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELCtEQUErRDtJQUMvRCxvQkFBb0I7SUFFcEIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDckQsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3JGLENBQUMsQ0FBQSJ9