module.exports = function convert_uuencode(str) {
    //       discuss at: https://locutus.io/php/convert_uuencode/
    //      original by: Ole Vrijenhoek
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Ole Vrijenhoek
    //        example 1: convert_uuencode("test\ntext text\r\n")
    //        returns 1: "0=&5S=`IT97AT('1E>'0-\"@\n`\n"
    var isScalar = require('../var/is_scalar');
    var chr = function (c) {
        return String.fromCharCode(c);
    };
    if (!str || str === '') {
        return chr(0);
    }
    else if (!isScalar(str)) {
        return false;
    }
    var c = 0;
    var u = 0;
    var i = 0;
    var a = 0;
    var encoded = '';
    var tmp1 = '';
    var tmp2 = '';
    var bytes = {};
    // divide string into chunks of 45 characters
    var chunk = function () {
        bytes = str.substr(u, 45).split('');
        for (i in bytes) {
            bytes[i] = bytes[i].charCodeAt(0);
        }
        return bytes.length || 0;
    };
    while ((c = chunk()) !== 0) {
        u += 45;
        // New line encoded data starts with number of bytes encoded.
        encoded += chr(c + 32);
        // Convert each char in bytes[] to a byte
        for (i in bytes) {
            tmp1 = bytes[i].toString(2);
            while (tmp1.length < 8) {
                tmp1 = '0' + tmp1;
            }
            tmp2 += tmp1;
        }
        while (tmp2.length % 6) {
            tmp2 = tmp2 + '0';
        }
        for (i = 0; i <= (tmp2.length / 6) - 1; i++) {
            tmp1 = tmp2.substr(a, 6);
            if (tmp1 === '000000') {
                encoded += chr(96);
            }
            else {
                encoded += chr(parseInt(tmp1, 2) + 32);
            }
            a += 6;
        }
        a = 0;
        tmp2 = '';
        encoded += '\n';
    }
    // Add termination characters
    encoded += chr(96) + '\n';
    return encoded;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydF91dWVuY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9jb252ZXJ0X3V1ZW5jb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBRSxHQUFHO0lBQzdDLDZEQUE2RDtJQUM3RCxtQ0FBbUM7SUFDbkMseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCxtQ0FBbUM7SUFDbkMsNERBQTREO0lBQzVELG9EQUFvRDtJQUVwRCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUUxQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDbkIsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQy9CLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNkO1NBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUVkLDZDQUE2QztJQUM3QyxJQUFJLEtBQUssR0FBRztRQUNWLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkMsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQ2YsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUMsQ0FBQTtJQUVELE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVQLDZEQUE2RDtRQUM3RCxPQUFPLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUV0Qix5Q0FBeUM7UUFDekMsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFO1lBQ2YsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUE7YUFDbEI7WUFDRCxJQUFJLElBQUksSUFBSSxDQUFBO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBO1NBQ2xCO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN4QixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZDO1lBQ0QsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNQO1FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNMLElBQUksR0FBRyxFQUFFLENBQUE7UUFDVCxPQUFPLElBQUksSUFBSSxDQUFBO0tBQ2hCO0lBRUQsNkJBQTZCO0lBQzdCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBRXpCLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQSJ9