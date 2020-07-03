module.exports = function rtrim(str, charlist) {
    //  discuss at: https://locutus.io/php/rtrim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Erkekjetter
    //    input by: rem
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: rtrim('    Kevin van Zonneveld    ')
    //   returns 1: '    Kevin van Zonneveld'
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '\\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '').replace(re, '');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9ydHJpbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEdBQUcsRUFBRSxRQUFRO0lBQzVDLDZDQUE2QztJQUM3QyxvREFBb0Q7SUFDcEQsMkJBQTJCO0lBQzNCLG1CQUFtQjtJQUNuQixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQseUNBQXlDO0lBRXpDLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDbEQsT0FBTyxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRTFDLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRWhELE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUEifQ==