module.exports = function strcspn(str, mask, start, length) {
    //  discuss at: https://locutus.io/php/strcspn/
    // original by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Theriault
    //   example 1: strcspn('abcdefg123', '1234567890')
    //   returns 1: 7
    //   example 2: strcspn('123abc', '1234567890')
    //   returns 2: 0
    //   example 3: strcspn('abcdefg123', '1234567890', 1)
    //   returns 3: 6
    //   example 4: strcspn('abcdefg123', '1234567890', -6, -5)
    //   returns 4: 1
    start = start || 0;
    length = typeof length === 'undefined' ? str.length : (length || 0);
    if (start < 0)
        start = str.length + start;
    if (length < 0)
        length = str.length - start + length;
    if (start < 0 || start >= str.length || length <= 0 || e >= str.length)
        return 0;
    var e = Math.min(str.length, start + length);
    for (var i = start, lgth = 0; i < e; i++) {
        if (mask.indexOf(str.charAt(i)) !== -1) {
            break;
        }
        ++lgth;
    }
    return lgth;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY3Nwbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmNzcG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNO0lBQ3pELCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQseUJBQXlCO0lBQ3pCLG1EQUFtRDtJQUNuRCxpQkFBaUI7SUFDakIsK0NBQStDO0lBQy9DLGlCQUFpQjtJQUNqQixzREFBc0Q7SUFDdEQsaUJBQWlCO0lBQ2pCLDJEQUEyRDtJQUMzRCxpQkFBaUI7SUFFakIsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUE7SUFDbEIsTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDbkUsSUFBSSxLQUFLLEdBQUcsQ0FBQztRQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUN6QyxJQUFJLE1BQU0sR0FBRyxDQUFDO1FBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQTtJQUNwRCxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU07UUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNoRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RDLE1BQUs7U0FDTjtRQUNELEVBQUUsSUFBSSxDQUFBO0tBQ1A7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9