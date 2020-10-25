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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rycmlwb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJyaXBvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUMxRCxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLG9EQUFvRDtJQUNwRCxrQkFBa0I7SUFFbEIsUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUN2QixXQUFXLEVBQUUsQ0FBQTtJQUNoQixNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ25CLFdBQVcsRUFBRSxDQUFBO0lBRWhCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxNQUFNLEVBQUU7UUFDVixDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDYixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyw4REFBOEQ7UUFDckYsK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osQ0FBQyxJQUFJLE1BQU0sQ0FBQTtTQUNaO0tBQ0Y7U0FBTTtRQUNMLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDaEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==