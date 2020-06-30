module.exports = function ltrim(str, charlist) {
    //  discuss at: https://locutus.io/php/ltrim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Erkekjetter
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: ltrim('    Kevin van Zonneveld    ')
    //   returns 1: 'Kevin van Zonneveld    '
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '$1');
    var re = new RegExp('^[' + charlist + ']+', 'g');
    return (str + '')
        .replace(re, '');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvbHRyaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUUsUUFBUTtJQUM1Qyw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELDJCQUEyQjtJQUMzQixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCx5Q0FBeUM7SUFFekMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNsRCxPQUFPLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFeEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFFaEQsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSJ9