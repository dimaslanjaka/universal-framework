module.exports = function stristr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/stristr/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: stristr('Kevin van Zonneveld', 'Van')
    //   returns 1: 'van Zonneveld'
    //   example 2: stristr('Kevin van Zonneveld', 'VAN', true)
    //   returns 2: 'Kevin '
    var pos = 0;
    haystack += '';
    pos = haystack.toLowerCase()
        .indexOf((needle + '')
        .toLowerCase());
    if (pos === -1) {
        return false;
    }
    else {
        if (bool) {
            return haystack.substr(0, pos);
        }
        else {
            return haystack.slice(pos);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXN0ci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJpc3RyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJO0lBQ3ZELCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELHFEQUFxRDtJQUNyRCwrQkFBK0I7SUFDL0IsMkRBQTJEO0lBQzNELHdCQUF3QjtJQUV4QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFWCxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ2QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUU7U0FDekIsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNuQixXQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQ25CLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2QsT0FBTyxLQUFLLENBQUE7S0FDYjtTQUFNO1FBQ0wsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQy9CO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDM0I7S0FDRjtBQUNILENBQUMsQ0FBQSJ9