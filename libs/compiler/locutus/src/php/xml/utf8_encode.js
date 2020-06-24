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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRmOF9lbmNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3htbC91dGY4X2VuY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLFNBQVM7SUFDOUMsbURBQW1EO0lBQ25ELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUNwQiwyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLDhEQUE4RDtJQUM5RCw4REFBOEQ7SUFDOUQsc0JBQXNCO0lBQ3RCLHlEQUF5RDtJQUN6RCx5QkFBeUI7SUFDekIsa0RBQWtEO0lBQ2xELHFDQUFxQztJQUVyQyxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxFQUFFO1FBQzFELE9BQU8sRUFBRSxDQUFBO0tBQ1Y7SUFFRCxnREFBZ0Q7SUFDaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDN0IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLElBQUksS0FBSyxDQUFBO0lBQ1QsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFFZixLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNmLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUE7UUFFZCxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDWixHQUFHLEVBQUUsQ0FBQTtTQUNOO2FBQU0sSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUU7WUFDaEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQ2pDLENBQUE7U0FDRjthQUFNLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ25DLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUN2QixDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUMxRCxDQUFBO1NBQ0Y7YUFBTTtZQUNMLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDNUIsTUFBTSxJQUFJLFVBQVUsQ0FBQywrQkFBK0IsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUMxRDtZQUNELElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDNUIsTUFBTSxJQUFJLFVBQVUsQ0FBQyw4QkFBOEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQy9EO1lBQ0QsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFBO1lBQ2xELEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUN2QixDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUNuRixDQUFBO1NBQ0Y7UUFDRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxFQUFFO2dCQUNmLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNwQztZQUNELE9BQU8sSUFBSSxHQUFHLENBQUE7WUFDZCxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDcEI7S0FDRjtJQUVELElBQUksR0FBRyxHQUFHLEtBQUssRUFBRTtRQUNmLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUN4QztJQUVELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQSJ9