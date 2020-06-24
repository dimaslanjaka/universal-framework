module.exports = function explode(delimiter, string, limit) {
    //  discuss at: https://locutus.io/php/explode/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: explode(' ', 'Kevin van Zonneveld')
    //   returns 1: [ 'Kevin', 'van', 'Zonneveld' ]
    if (arguments.length < 2 ||
        typeof delimiter === 'undefined' ||
        typeof string === 'undefined') {
        return null;
    }
    if (delimiter === '' ||
        delimiter === false ||
        delimiter === null) {
        return false;
    }
    if (typeof delimiter === 'function' ||
        typeof delimiter === 'object' ||
        typeof string === 'function' ||
        typeof string === 'object') {
        return {
            0: ''
        };
    }
    if (delimiter === true) {
        delimiter = '1';
    }
    // Here we go...
    delimiter += '';
    string += '';
    var s = string.split(delimiter);
    if (typeof limit === 'undefined')
        return s;
    // Support for limit
    if (limit === 0)
        limit = 1;
    // Positive limit
    if (limit > 0) {
        if (limit >= s.length) {
            return s;
        }
        return s
            .slice(0, limit - 1)
            .concat([s.slice(limit - 1)
                .join(delimiter)
        ]);
    }
    // Negative limit
    if (-limit >= s.length) {
        return [];
    }
    s.splice(s.length + limit);
    return s;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9leHBsb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLO0lBQ3pELCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsbURBQW1EO0lBQ25ELCtDQUErQztJQUUvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUN0QixPQUFPLFNBQVMsS0FBSyxXQUFXO1FBQ2hDLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSSxTQUFTLEtBQUssRUFBRTtRQUNsQixTQUFTLEtBQUssS0FBSztRQUNuQixTQUFTLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVU7UUFDakMsT0FBTyxTQUFTLEtBQUssUUFBUTtRQUM3QixPQUFPLE1BQU0sS0FBSyxVQUFVO1FBQzVCLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7U0FDTixDQUFBO0tBQ0Y7SUFDRCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFDdEIsU0FBUyxHQUFHLEdBQUcsQ0FBQTtLQUNoQjtJQUVELGdCQUFnQjtJQUNoQixTQUFTLElBQUksRUFBRSxDQUFBO0lBQ2YsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUVaLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFL0IsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXO1FBQUUsT0FBTyxDQUFDLENBQUE7SUFFMUMsb0JBQW9CO0lBQ3BCLElBQUksS0FBSyxLQUFLLENBQUM7UUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0lBRTFCLGlCQUFpQjtJQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDYixJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7UUFDRCxPQUFPLENBQUM7YUFDTCxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2pCLENBQUMsQ0FBQTtLQUNMO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUN0QixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQzFCLE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=