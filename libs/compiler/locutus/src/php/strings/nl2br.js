module.exports = function nl2br(str, isXhtml) {
    //  discuss at: https://locutus.io/php/nl2br/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Philip Peterson
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Atli Þór
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Maximusya
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Reynier de la Rosa (https://scriptinside.blogspot.com.es/)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //   example 1: nl2br('Kevin\nvan\nZonneveld')
    //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
    //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false)
    //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true)
    //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
    //   example 4: nl2br(null)
    //   returns 4: ''
    // Some latest browsers when str is null return and unexpected null value
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    // Adjust comment to avoid issue on locutus.io display
    var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>';
    return (str + '')
        .replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmwyYnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvbmwyYnIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUUsT0FBTztJQUMzQyw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELCtCQUErQjtJQUMvQiw4REFBOEQ7SUFDOUQsd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFDekIsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCwwRUFBMEU7SUFDMUUsb0RBQW9EO0lBQ3BELDhDQUE4QztJQUM5QyxtREFBbUQ7SUFDbkQscURBQXFEO0lBQ3JELDJEQUEyRDtJQUMzRCxvREFBb0Q7SUFDcEQscUVBQXFFO0lBQ3JFLDJCQUEyQjtJQUMzQixrQkFBa0I7SUFFbEIseUVBQXlFO0lBQ3pFLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDOUMsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELHNEQUFzRDtJQUN0RCxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBRW5GLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2QsT0FBTyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUNuRCxDQUFDLENBQUEifQ==