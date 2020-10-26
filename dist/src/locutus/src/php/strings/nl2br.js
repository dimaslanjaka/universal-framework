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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmwyYnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9ubDJici5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEdBQUcsRUFBRSxPQUFPO0lBQzNDLDZDQUE2QztJQUM3QyxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLDhEQUE4RDtJQUM5RCx3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6Qiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELDBFQUEwRTtJQUMxRSxvREFBb0Q7SUFDcEQsOENBQThDO0lBQzlDLG1EQUFtRDtJQUNuRCxxREFBcUQ7SUFDckQsMkRBQTJEO0lBQzNELG9EQUFvRDtJQUNwRCxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUVsQix5RUFBeUU7SUFDekUsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUM5QyxPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsc0RBQXNEO0lBQ3RELElBQUksUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFFbkYsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQSJ9