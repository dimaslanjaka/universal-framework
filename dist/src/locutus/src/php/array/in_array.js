module.exports = function in_array(needle, haystack, argStrict) {
    //  discuss at: https://locutus.io/php/in_array/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: vlado houba
    // improved by: Jonas Sciangula Street (Joni2Back)
    //    input by: Billy
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld'])
    //   returns 1: true
    //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'})
    //   returns 2: false
    //   example 3: in_array(1, ['1', '2', '3'])
    //   example 3: in_array(1, ['1', '2', '3'], false)
    //   returns 3: true
    //   returns 3: true
    //   example 4: in_array(1, ['1', '2', '3'], true)
    //   returns 4: false
    var key = '';
    var strict = !!argStrict;
    // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
    // in just one for, in order to improve the performance
    // deciding wich type of comparation will do before walk array
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    }
    else {
        for (key in haystack) {
            if (haystack[key] == needle) { // eslint-disable-line eqeqeq
                return true;
            }
        }
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5fYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvaW5fYXJyYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVM7SUFDN0QsZ0RBQWdEO0lBQ2hELG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0Isa0RBQWtEO0lBQ2xELHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9CQUFvQjtJQUNwQiw2RUFBNkU7SUFDN0UscUJBQXFCO0lBQ3JCLDRDQUE0QztJQUM1QyxtREFBbUQ7SUFDbkQsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixrREFBa0Q7SUFDbEQscUJBQXFCO0lBRXJCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFFeEIsNEZBQTRGO0lBQzVGLHVEQUF1RDtJQUN2RCw4REFBOEQ7SUFDOUQsSUFBSSxNQUFNLEVBQUU7UUFDVixLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDcEIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQTthQUNaO1NBQ0Y7S0FDRjtTQUFNO1FBQ0wsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1lBQ3BCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sRUFBRSxFQUFFLDZCQUE2QjtnQkFDMUQsT0FBTyxJQUFJLENBQUE7YUFDWjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9