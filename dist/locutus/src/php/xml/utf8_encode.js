module.exports = function utf8_encode(argString) {
    //  discuss at: https://locutus.io/php/utf8_encode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: sowberry
    // improved by: Jack
    // improved by: Yves Sucaet
    // improved by: kirilloid
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Ulrich
    // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: kirilloid
    //   example 1: utf8_encode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === 'undefined') {
        return '';
    }
    // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var string = (argString + '');
    var utftext = '';
    var start;
    var end;
    var stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++;
        }
        else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        }
        else if ((c1 & 0xF800) !== 0xD800) {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        else {
            // surrogate pairs
            if ((c1 & 0xFC00) !== 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) !== 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
    return utftext;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRmOF9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAveG1sL3V0ZjhfZW5jb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsU0FBUztJQUM5QyxtREFBbUQ7SUFDbkQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsOERBQThEO0lBQzlELDhEQUE4RDtJQUM5RCxzQkFBc0I7SUFDdEIseURBQXlEO0lBQ3pELHlCQUF5QjtJQUN6QixrREFBa0Q7SUFDbEQscUNBQXFDO0lBRXJDLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7UUFDMUQsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELGdEQUFnRDtJQUNoRCxJQUFJLE1BQU0sR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUM3QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDaEIsSUFBSSxLQUFLLENBQUE7SUFDVCxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUVmLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ2YsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQTtRQUVkLElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNaLEdBQUcsRUFBRSxDQUFBO1NBQ047YUFBTSxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLElBQUksRUFBRTtZQUNoQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FDakMsQ0FBQTtTQUNGO2FBQU0sSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUU7WUFDbkMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQ3ZCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQzFELENBQUE7U0FDRjthQUFNO1lBQ0wsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM1QixNQUFNLElBQUksVUFBVSxDQUFDLCtCQUErQixHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQzFEO1lBQ0QsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM1QixNQUFNLElBQUksVUFBVSxDQUFDLDhCQUE4QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDL0Q7WUFDRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUE7WUFDbEQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQ3ZCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQ25GLENBQUE7U0FDRjtRQUNELElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixJQUFJLEdBQUcsR0FBRyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQ3BDO1lBQ0QsT0FBTyxJQUFJLEdBQUcsQ0FBQTtZQUNkLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNwQjtLQUNGO0lBRUQsSUFBSSxHQUFHLEdBQUcsS0FBSyxFQUFFO1FBQ2YsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQ3hDO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=