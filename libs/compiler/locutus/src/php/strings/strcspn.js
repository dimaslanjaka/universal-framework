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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY3Nwbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJjc3BuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTTtJQUN6RCwrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6QixtREFBbUQ7SUFDbkQsaUJBQWlCO0lBQ2pCLCtDQUErQztJQUMvQyxpQkFBaUI7SUFDakIsc0RBQXNEO0lBQ3RELGlCQUFpQjtJQUNqQiwyREFBMkQ7SUFDM0QsaUJBQWlCO0lBRWpCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBO0lBQ2xCLE1BQU0sR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ25FLElBQUksS0FBSyxHQUFHLENBQUM7UUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDekMsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDcEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNO1FBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEYsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQTtJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0QyxNQUFLO1NBQ047UUFDRCxFQUFFLElBQUksQ0FBQTtLQUNQO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==