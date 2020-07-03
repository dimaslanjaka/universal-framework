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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX2NvbXBhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdWJzdHJfY29tcGFyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxpQkFBaUI7SUFDdkYsc0RBQXNEO0lBQ3RELG9EQUFvRDtJQUNwRCxrQ0FBa0M7SUFDbEMsbURBQW1EO0lBQ25ELGlCQUFpQjtJQUVqQixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0tBQ3ZEO0lBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQ2pDO0lBRUQsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRTtRQUNoRCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUUxQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDeEMsK0NBQStDO0lBQy9DLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMzQixJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLHNCQUFzQjtRQUN0QixPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDdEMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzlCLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtZQUNuQixPQUFPLENBQUMsQ0FBQTtTQUNUO1FBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoQztJQUNELGtCQUFrQjtJQUNsQixPQUFPLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFBIn0=