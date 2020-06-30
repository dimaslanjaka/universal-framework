module.exports = function str_repeat(input, multiplier) {
    //  discuss at: https://locutus.io/php/str_repeat/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Ian Carter (https://euona.com/)
    //   example 1: str_repeat('-=', 10)
    //   returns 1: '-=-=-=-=-=-=-=-=-=-='
    var y = '';
    while (true) {
        if (multiplier & 1) {
            y += input;
        }
        multiplier >>= 1;
        if (multiplier) {
            input += input;
        }
        else {
            break;
        }
    }
    return y;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3JlcGVhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfcmVwZWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLFVBQVU7SUFDckQsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxxRUFBcUU7SUFDckUsK0NBQStDO0lBQy9DLG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFFdEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDbEIsQ0FBQyxJQUFJLEtBQUssQ0FBQTtTQUNYO1FBQ0QsVUFBVSxLQUFLLENBQUMsQ0FBQTtRQUNoQixJQUFJLFVBQVUsRUFBRTtZQUNkLEtBQUssSUFBSSxLQUFLLENBQUE7U0FDZjthQUFNO1lBQ0wsTUFBSztTQUNOO0tBQ0Y7SUFDRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9