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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2V4cGxvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUs7SUFDekQsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCxtREFBbUQ7SUFDbkQsK0NBQStDO0lBRS9DLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ3RCLE9BQU8sU0FBUyxLQUFLLFdBQVc7UUFDaEMsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQy9CLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLFNBQVMsS0FBSyxFQUFFO1FBQ2xCLFNBQVMsS0FBSyxLQUFLO1FBQ25CLFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFDcEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksT0FBTyxTQUFTLEtBQUssVUFBVTtRQUNqQyxPQUFPLFNBQVMsS0FBSyxRQUFRO1FBQzdCLE9BQU8sTUFBTSxLQUFLLFVBQVU7UUFDNUIsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU87WUFDTCxDQUFDLEVBQUUsRUFBRTtTQUNOLENBQUE7S0FDRjtJQUNELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtRQUN0QixTQUFTLEdBQUcsR0FBRyxDQUFBO0tBQ2hCO0lBRUQsZ0JBQWdCO0lBQ2hCLFNBQVMsSUFBSSxFQUFFLENBQUE7SUFDZixNQUFNLElBQUksRUFBRSxDQUFBO0lBRVosSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUUvQixJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVc7UUFBRSxPQUFPLENBQUMsQ0FBQTtJQUUxQyxvQkFBb0I7SUFDcEIsSUFBSSxLQUFLLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLENBQUE7SUFFMUIsaUJBQWlCO0lBQ2pCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNiLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxDQUFDLENBQUE7U0FDVDtRQUNELE9BQU8sQ0FBQzthQUNMLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDakIsQ0FBQyxDQUFBO0tBQ0w7SUFFRCxpQkFBaUI7SUFDakIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7SUFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUE7SUFDMUIsT0FBTyxDQUFDLENBQUE7QUFDVixDQUFDLENBQUEifQ==