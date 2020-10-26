module.exports = function setrawcookie(name, value, expires, path, domain, secure) {
    //  discuss at: https://locutus.io/php/setrawcookie/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: setcookie
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Michael
    //      note 1: This function requires access to the `window` global and is Browser-only
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: setrawcookie('author_name', 'Kevin van Zonneveld')
    //   returns 1: true
    if (typeof window === 'undefined') {
        return true;
    }
    if (typeof expires === 'string' && (/^\d+$/).test(expires)) {
        expires = parseInt(expires, 10);
    }
    if (expires instanceof Date) {
        expires = expires.toUTCString();
    }
    else if (typeof expires === 'number') {
        expires = (new Date(expires * 1e3)).toUTCString();
    }
    var r = [name + '=' + value];
    var i = '';
    var s = {
        expires: expires,
        path: path,
        domain: domain
    };
    for (i in s) {
        if (s.hasOwnProperty(i)) {
            // Exclude items on Object.prototype
            s[i] && r.push(i + '=' + s[i]);
        }
    }
    if (secure) {
        r.push('secure');
    }
    window.document.cookie = r.join(';');
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0cmF3Y29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL25ldHdvcmsvc2V0cmF3Y29va2llLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQ2hGLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCx1QkFBdUI7SUFDdkIsd0ZBQXdGO0lBQ3hGLG9EQUFvRDtJQUNwRCxrRUFBa0U7SUFDbEUsb0JBQW9CO0lBRXBCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxRCxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtLQUNoQztJQUVELElBQUksT0FBTyxZQUFZLElBQUksRUFBRTtRQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQ2hDO1NBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDdEMsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7S0FDbEQ7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUE7SUFDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUc7UUFDTixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQTtJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixvQ0FBb0M7WUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMvQjtLQUNGO0lBRUQsSUFBSSxNQUFNLEVBQUU7UUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2pCO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVwQyxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9