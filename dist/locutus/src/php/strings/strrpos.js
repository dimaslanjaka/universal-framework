module.exports = function strrpos(haystack, needle, offset) {
    //  discuss at: https://locutus.io/php/strrpos/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //    input by: saulius
    //   example 1: strrpos('Kevin van Zonneveld', 'e')
    //   returns 1: 16
    //   example 2: strrpos('somepage.com', '.', false)
    //   returns 2: 8
    //   example 3: strrpos('baa', 'a', 3)
    //   returns 3: false
    //   example 4: strrpos('baa', 'a', 2)
    //   returns 4: 2
    var i = -1;
    if (offset) {
        i = (haystack + '')
            .slice(offset)
            .lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    }
    else {
        i = (haystack + '')
            .lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycnBvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cnJwb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDekQsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHVCQUF1QjtJQUN2QixtREFBbUQ7SUFDbkQsa0JBQWtCO0lBQ2xCLG1EQUFtRDtJQUNuRCxpQkFBaUI7SUFDakIsc0NBQXNDO0lBQ3RDLHFCQUFxQjtJQUNyQixzQ0FBc0M7SUFDdEMsaUJBQWlCO0lBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxNQUFNLEVBQUU7UUFDVixDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDYixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyw4REFBOEQ7UUFDckYsK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osQ0FBQyxJQUFJLE1BQU0sQ0FBQTtTQUNaO0tBQ0Y7U0FBTTtRQUNMLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDaEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==