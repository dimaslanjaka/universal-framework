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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5fYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2luX2FycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTO0lBQzdELGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQsMkJBQTJCO0lBQzNCLGtEQUFrRDtJQUNsRCxxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvQkFBb0I7SUFDcEIsNkVBQTZFO0lBQzdFLHFCQUFxQjtJQUNyQiw0Q0FBNEM7SUFDNUMsbURBQW1EO0lBQ25ELG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsa0RBQWtEO0lBQ2xELHFCQUFxQjtJQUVyQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBO0lBRXhCLDRGQUE0RjtJQUM1Rix1REFBdUQ7SUFDdkQsOERBQThEO0lBQzlELElBQUksTUFBTSxFQUFFO1FBQ1YsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1lBQ3BCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUE7YUFDWjtTQUNGO0tBQ0Y7U0FBTTtRQUNMLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUNwQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUUsRUFBRSw2QkFBNkI7Z0JBQzFELE9BQU8sSUFBSSxDQUFBO2FBQ1o7U0FDRjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==