module.exports = function trim(str, charlist) {
    //  discuss at: https://locutus.io/php/trim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: mdsjack (https://www.mdsjack.bo.it)
    // improved by: Alexander Ermolaev (https://snippets.dzone.com/user/AlexanderErmolaev)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Steven Levithan (https://blog.stevenlevithan.com)
    // improved by: Jack
    //    input by: Erkekjetter
    //    input by: DxGx
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: trim('    Kevin van Zonneveld    ')
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: trim('Hello World', 'Hdle')
    //   returns 2: 'o Wor'
    //   example 3: trim(16, 1)
    //   returns 3: '6'
    var whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000'
    ].join('');
    var l = 0;
    var i = 0;
    str += '';
    if (charlist) {
        whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy90cmltLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRyxFQUFFLFFBQVE7SUFDM0MsNENBQTRDO0lBQzVDLG9EQUFvRDtJQUNwRCxtREFBbUQ7SUFDbkQsc0ZBQXNGO0lBQ3RGLG9EQUFvRDtJQUNwRCxpRUFBaUU7SUFDakUsb0JBQW9CO0lBQ3BCLDJCQUEyQjtJQUMzQixvQkFBb0I7SUFDcEIsOERBQThEO0lBQzlELG1EQUFtRDtJQUNuRCxxQ0FBcUM7SUFDckMsMkNBQTJDO0lBQzNDLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBRW5CLElBQUksVUFBVSxHQUFHO1FBQ2YsR0FBRztRQUNILElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixNQUFNO1FBQ04sTUFBTTtRQUNOLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtLQUNULENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVULElBQUksUUFBUSxFQUFFO1FBQ1osVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUNuRTtJQUVELENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEIsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0QixNQUFLO1NBQ047S0FDRjtJQUVELENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0lBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNCLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM3QixNQUFLO1NBQ047S0FDRjtJQUVELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQzVELENBQUMsQ0FBQSJ9