module.exports = function substr_compare(mainStr, str, offset, length, caseInsensitivity) {
    //  discuss at: https://locutus.io/php/substr_compare/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: strcasecmp, strcmp
    //   example 1: substr_compare("abcde", "bc", 1, 2)
    //   returns 1: 0
    if (!offset && offset !== 0) {
        throw new Error('Missing offset for substr_compare()');
    }
    if (offset < 0) {
        offset = mainStr.length + offset;
    }
    if (length && length > (mainStr.length - offset)) {
        return false;
    }
    length = length || mainStr.length - offset;
    mainStr = mainStr.substr(offset, length);
    // Should only compare up to the desired length
    str = str.substr(0, length);
    if (caseInsensitivity) {
        // Works as strcasecmp
        mainStr = (mainStr + '').toLowerCase();
        str = (str + '').toLowerCase();
        if (mainStr === str) {
            return 0;
        }
        return (mainStr > str) ? 1 : -1;
    }
    // Works as strcmp
    return ((mainStr === str) ? 0 : ((mainStr > str) ? 1 : -1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX2NvbXBhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3Vic3RyX2NvbXBhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsaUJBQWlCO0lBQ3ZGLHNEQUFzRDtJQUN0RCxvREFBb0Q7SUFDcEQsa0NBQWtDO0lBQ2xDLG1EQUFtRDtJQUNuRCxpQkFBaUI7SUFFakIsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtLQUN2RDtJQUVELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNkLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtLQUNqQztJQUVELElBQUksTUFBTSxJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUU7UUFDaEQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFFMUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3hDLCtDQUErQztJQUMvQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDM0IsSUFBSSxpQkFBaUIsRUFBRTtRQUNyQixzQkFBc0I7UUFDdEIsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3RDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUM5QixJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUE7U0FDVDtRQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEM7SUFDRCxrQkFBa0I7SUFDbEIsT0FBTyxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQSJ9