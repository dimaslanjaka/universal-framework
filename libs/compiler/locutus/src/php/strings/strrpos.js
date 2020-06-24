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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycnBvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJycG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQ3pELCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCx1QkFBdUI7SUFDdkIsbURBQW1EO0lBQ25ELGtCQUFrQjtJQUNsQixtREFBbUQ7SUFDbkQsaUJBQWlCO0lBQ2pCLHNDQUFzQztJQUN0QyxxQkFBcUI7SUFDckIsc0NBQXNDO0lBQ3RDLGlCQUFpQjtJQUVqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNWLElBQUksTUFBTSxFQUFFO1FBQ1YsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsOERBQThEO1FBQ3JGLCtGQUErRjtRQUMvRixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaLENBQUMsSUFBSSxNQUFNLENBQUE7U0FDWjtLQUNGO1NBQU07UUFDTCxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2hCLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN2QjtJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7QUFDM0IsQ0FBQyxDQUFBIn0=