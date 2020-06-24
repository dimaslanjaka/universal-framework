module.exports = function strpbrk(haystack, charList) {
    //  discuss at: https://locutus.io/php/strpbrk/
    // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: Christoph
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: strpbrk('This is a Simple text.', 'is')
    //   returns 1: 'is is a Simple text.'
    for (var i = 0, len = haystack.length; i < len; ++i) {
        if (charList.indexOf(haystack.charAt(i)) >= 0) {
            return haystack.slice(i);
        }
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycGJyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJwYnJrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsUUFBUSxFQUFFLFFBQVE7SUFDbkQsK0NBQStDO0lBQy9DLGdFQUFnRTtJQUNoRSw4REFBOEQ7SUFDOUQseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCx1REFBdUQ7SUFDdkQsc0NBQXNDO0lBRXRDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDbkQsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0MsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pCO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9