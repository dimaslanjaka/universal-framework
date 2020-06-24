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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0cmF3Y29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9uZXR3b3JrL3NldHJhd2Nvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUNoRixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLHdGQUF3RjtJQUN4RixvREFBb0Q7SUFDcEQsa0VBQWtFO0lBQ2xFLG9CQUFvQjtJQUVwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDaEM7SUFFRCxJQUFJLE9BQU8sWUFBWSxJQUFJLEVBQUU7UUFDM0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtLQUNoQztTQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQ3RDLE9BQU8sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQ2xEO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQzVCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksQ0FBQyxHQUFHO1FBQ04sT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsTUFBTTtLQUNmLENBQUE7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkIsb0NBQW9DO1lBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDL0I7S0FDRjtJQUVELElBQUksTUFBTSxFQUFFO1FBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNqQjtJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFcEMsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==