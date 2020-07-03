module.exports = function array_combine(keys, values) {
    //  discuss at: https://locutus.io/php/array_combine/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
    //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var newArray = {};
    var i = 0;
    // input sanitation
    // Only accept arrays or array-like objects
    // Require arrays to have a count
    if (typeof keys !== 'object') {
        return false;
    }
    if (typeof values !== 'object') {
        return false;
    }
    if (typeof keys.length !== 'number') {
        return false;
    }
    if (typeof values.length !== 'number') {
        return false;
    }
    if (!keys.length) {
        return false;
    }
    // number of elements does not match
    if (keys.length !== values.length) {
        return false;
    }
    for (i = 0; i < keys.length; i++) {
        newArray[keys[i]] = values[i];
    }
    return newArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY29tYmluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9jb21iaW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsSUFBSSxFQUFFLE1BQU07SUFDbkQscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsbUVBQW1FO0lBQ25FLHNEQUFzRDtJQUV0RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRVQsbUJBQW1CO0lBQ25CLDJDQUEyQztJQUMzQyxpQ0FBaUM7SUFDakMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDbkMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDaEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELG9DQUFvQztJQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNqQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDOUI7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUEifQ==