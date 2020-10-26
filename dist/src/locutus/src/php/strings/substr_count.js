module.exports = function substr_count(haystack, needle, offset, length) {
    //  discuss at: https://locutus.io/php/substr_count/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Thomas
    //   example 1: substr_count('Kevin van Zonneveld', 'e')
    //   returns 1: 3
    //   example 2: substr_count('Kevin van Zonneveld', 'K', 1)
    //   returns 2: 0
    //   example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10)
    //   returns 3: false
    var cnt = 0;
    haystack += '';
    needle += '';
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    if (needle.length === 0) {
        return false;
    }
    offset--;
    while ((offset = haystack.indexOf(needle, offset + 1)) !== -1) {
        if (length > 0 && (offset + needle.length) > length) {
            return false;
        }
        cnt++;
    }
    return cnt;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Vic3RyX2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUN0RSxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsc0JBQXNCO0lBQ3RCLHdEQUF3RDtJQUN4RCxpQkFBaUI7SUFDakIsMkRBQTJEO0lBQzNELGlCQUFpQjtJQUNqQiwrREFBK0Q7SUFDL0QscUJBQXFCO0lBRXJCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDZCxNQUFNLElBQUksRUFBRSxDQUFBO0lBQ1osSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUNYO0lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUNYO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsTUFBTSxFQUFFLENBQUE7SUFFUixPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzdELElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFO1lBQ25ELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxHQUFHLEVBQUUsQ0FBQTtLQUNOO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==