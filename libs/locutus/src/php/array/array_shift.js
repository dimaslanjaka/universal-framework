module.exports = function array_shift(inputArr) {
    //  discuss at: https://locutus.io/php/array_shift/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Martijn Wieringa
    //      note 1: Currently does not handle objects
    //   example 1: array_shift(['Kevin', 'van', 'Zonneveld'])
    //   returns 1: 'Kevin'
    var _checkToUpIndices = function (arr, ct, key) {
        // Deal with situation, e.g., if encounter index 4 and try
        // to set it to 0, but 0 exists later in loop (need to
        // increment all subsequent (skipping current key, since
        // we need its value below) until find unused)
        if (arr[ct] !== undefined) {
            var tmp = ct;
            ct += 1;
            if (ct === key) {
                ct += 1;
            }
            ct = _checkToUpIndices(arr, ct, key);
            arr[ct] = arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };
    if (inputArr.length === 0) {
        return null;
    }
    if (inputArr.length > 0) {
        return inputArr.shift();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2hpZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3NoaWZ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsUUFBUTtJQUM3QyxtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxpREFBaUQ7SUFDakQsMERBQTBEO0lBQzFELHVCQUF1QjtJQUV2QixJQUFJLGlCQUFpQixHQUFHLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO1FBQzVDLDBEQUEwRDtRQUMxRCxzREFBc0Q7UUFDdEQsd0RBQXdEO1FBQ3hELDhDQUE4QztRQUM5QyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1lBQ1osRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNQLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDZCxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ1I7WUFDRCxFQUFFLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2hCO1FBRUQsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDLENBQUE7SUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQ3hCO0FBQ0gsQ0FBQyxDQUFBIn0=