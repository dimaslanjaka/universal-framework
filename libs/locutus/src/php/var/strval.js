module.exports = function strval(str) {
    //  discuss at: https://locutus.io/php/strval/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: strval({red: 1, green: 2, blue: 3, white: 4})
    //   returns 1: 'Object'
    var gettype = require('../var/gettype');
    var type = '';
    if (str === null) {
        return '';
    }
    type = gettype(str);
    // Comment out the entire switch if you want JS-like
    // behavior instead of PHP behavior
    switch (type) {
        case 'boolean':
            if (str === true) {
                return '1';
            }
            return '';
        case 'array':
            return 'Array';
        case 'object':
            return 'Object';
    }
    return str;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvc3RydmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsR0FBRztJQUNuQyw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsNkRBQTZEO0lBQzdELHdCQUF3QjtJQUV4QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN2QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFFYixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFbkIsb0RBQW9EO0lBQ3BELG1DQUFtQztJQUNuQyxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssU0FBUztZQUNaLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDaEIsT0FBTyxHQUFHLENBQUE7YUFDWDtZQUNELE9BQU8sRUFBRSxDQUFBO1FBQ1gsS0FBSyxPQUFPO1lBQ1YsT0FBTyxPQUFPLENBQUE7UUFDaEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxRQUFRLENBQUE7S0FDbEI7SUFFRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9