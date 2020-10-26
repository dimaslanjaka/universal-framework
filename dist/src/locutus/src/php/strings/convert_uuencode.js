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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydF91dWVuY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2NvbnZlcnRfdXVlbmNvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGdCQUFnQixDQUFFLEdBQUc7SUFDN0MsNkRBQTZEO0lBQzdELG1DQUFtQztJQUNuQyx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELG1DQUFtQztJQUNuQyw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBRXBELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBRTFDLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUNuQixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0IsQ0FBQyxDQUFBO0lBRUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2Q7U0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDaEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBRWQsNkNBQTZDO0lBQzdDLElBQUksS0FBSyxHQUFHO1FBQ1YsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDZixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQyxDQUFBO0lBRUQsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMxQixDQUFDLElBQUksRUFBRSxDQUFBO1FBRVAsNkRBQTZEO1FBQzdELE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBRXRCLHlDQUF5QztRQUN6QyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDZixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTthQUNsQjtZQUNELElBQUksSUFBSSxJQUFJLENBQUE7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUE7U0FDbEI7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3hCLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDckIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNuQjtpQkFBTTtnQkFDTCxPQUFPLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7YUFDdkM7WUFDRCxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ1A7UUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ0wsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNULE9BQU8sSUFBSSxJQUFJLENBQUE7S0FDaEI7SUFFRCw2QkFBNkI7SUFDN0IsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7SUFFekIsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=