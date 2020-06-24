module.exports = function strripos(haystack, needle, offset) {
    //  discuss at: https://locutus.io/php/strripos/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //    input by: saulius
    //   example 1: strripos('Kevin van Zonneveld', 'E')
    //   returns 1: 16
    haystack = (haystack + '')
        .toLowerCase();
    needle = (needle + '')
        .toLowerCase();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rycmlwb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Rycmlwb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDMUQsZ0RBQWdEO0lBQ2hELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELHVCQUF1QjtJQUN2QixvREFBb0Q7SUFDcEQsa0JBQWtCO0lBRWxCLFFBQVEsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDdkIsV0FBVyxFQUFFLENBQUE7SUFDaEIsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNuQixXQUFXLEVBQUUsQ0FBQTtJQUVoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNWLElBQUksTUFBTSxFQUFFO1FBQ1YsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsOERBQThEO1FBQ3JGLCtGQUErRjtRQUMvRixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaLENBQUMsSUFBSSxNQUFNLENBQUE7U0FDWjtLQUNGO1NBQU07UUFDTCxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2hCLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN2QjtJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7QUFDM0IsQ0FBQyxDQUFBIn0=