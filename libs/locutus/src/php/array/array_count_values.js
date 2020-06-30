module.exports = function array_count_values(array) {
    //  discuss at: https://locutus.io/php/array_count_values/
    // original by: Ates Goral (https://magnetiq.com)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: sankai
    //    input by: Shingo
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ])
    //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
    //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" })
    //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
    //   example 3: array_count_values([ true, 4.2, 42, "fubar" ])
    //   returns 3: {42:1, "fubar":1}
    var tmpArr = {};
    var key = '';
    var t = '';
    var _getType = function (obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t === 'object') {
            t = 'array';
        }
        return t;
    };
    var _countValue = function (tmpArr, value) {
        if (typeof value === 'number') {
            if (Math.floor(value) !== value) {
                return;
            }
        }
        else if (typeof value !== 'string') {
            return;
        }
        if (value in tmpArr && tmpArr.hasOwnProperty(value)) {
            ++tmpArr[value];
        }
        else {
            tmpArr[value] = 1;
        }
    };
    t = _getType(array);
    if (t === 'array') {
        for (key in array) {
            if (array.hasOwnProperty(key)) {
                _countValue.call(this, tmpArr, array[key]);
            }
        }
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY291bnRfdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9jb3VudF92YWx1ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGtCQUFrQixDQUFFLEtBQUs7SUFDakQsMERBQTBEO0lBQzFELGlEQUFpRDtJQUNqRCxxREFBcUQ7SUFDckQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsb0RBQW9EO0lBQ3BELG9FQUFvRTtJQUNwRSw0Q0FBNEM7SUFDNUMsNEZBQTRGO0lBQzVGLDRDQUE0QztJQUM1Qyw4REFBOEQ7SUFDOUQsaUNBQWlDO0lBRWpDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVWLElBQUksUUFBUSxHQUFHLFVBQVUsR0FBRztRQUMxQixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUE7UUFDbEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNuQixJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDbEIsQ0FBQyxHQUFHLE9BQU8sQ0FBQTtTQUNaO1FBQ0QsT0FBTyxDQUFDLENBQUE7SUFDVixDQUFDLENBQUE7SUFFRCxJQUFJLFdBQVcsR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLO1FBQ3ZDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLE9BQU07YUFDUDtTQUNGO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEMsT0FBTTtTQUNQO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkQsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDaEI7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDbEI7SUFDSCxDQUFDLENBQUE7SUFFRCxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25CLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRTtRQUNqQixLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDakIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDM0M7U0FDRjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==