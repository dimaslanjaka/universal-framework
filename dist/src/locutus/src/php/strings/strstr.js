module.exports = function strstr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/strstr/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: strstr('Kevin van Zonneveld', 'van')
    //   returns 1: 'van Zonneveld'
    //   example 2: strstr('Kevin van Zonneveld', 'van', true)
    //   returns 2: 'Kevin '
    //   example 3: strstr('name@example.com', '@')
    //   returns 3: '@example.com'
    //   example 4: strstr('name@example.com', '@', true)
    //   returns 4: 'name'
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Ryc3RyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Ryc3RyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJO0lBQ3RELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLDBEQUEwRDtJQUMxRCx3QkFBd0I7SUFDeEIsK0NBQStDO0lBQy9DLDhCQUE4QjtJQUM5QixxREFBcUQ7SUFDckQsc0JBQXNCO0lBRXRCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDZCxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLE9BQU8sS0FBSyxDQUFBO0tBQ2I7U0FBTTtRQUNMLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUMvQjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzNCO0tBQ0Y7QUFDSCxDQUFDLENBQUEifQ==