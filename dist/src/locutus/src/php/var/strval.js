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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9zdHJ2YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxHQUFHO0lBQ25DLDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0Qsd0JBQXdCO0lBRXhCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3ZDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUViLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVuQixvREFBb0Q7SUFDcEQsbUNBQW1DO0lBQ25DLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1osSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNoQixPQUFPLEdBQUcsQ0FBQTthQUNYO1lBQ0QsT0FBTyxFQUFFLENBQUE7UUFDWCxLQUFLLE9BQU87WUFDVixPQUFPLE9BQU8sQ0FBQTtRQUNoQixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQTtLQUNsQjtJQUVELE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=