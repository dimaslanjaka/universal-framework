module.exports = function utf8_decode(strData) {
    //  discuss at: https://locutus.io/php/utf8_decode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (https://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'
    var tmpArr = [];
    var i = 0;
    var c1 = 0;
    var seqlen = 0;
    strData += '';
    while (i < strData.length) {
        c1 = strData.charCodeAt(i) & 0xFF;
        seqlen = 0;
        // https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F);
            seqlen = 1;
        }
        else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F);
            seqlen = 2;
        }
        else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F);
            seqlen = 3;
        }
        else {
            c1 = (c1 & 0x07);
            seqlen = 4;
        }
        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F));
        }
        if (seqlen === 4) {
            c1 -= 0x10000;
            tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)));
            tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)));
        }
        else {
            tmpArr.push(String.fromCharCode(c1));
        }
        i += seqlen;
    }
    return tmpArr.join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRmOF9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3htbC91dGY4X2RlY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLE9BQU87SUFDNUMsbURBQW1EO0lBQ25ELDhEQUE4RDtJQUM5RCwwQkFBMEI7SUFDMUIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxrQ0FBa0M7SUFDbEMsdUJBQXVCO0lBQ3ZCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQseUJBQXlCO0lBQ3pCLGtEQUFrRDtJQUNsRCxrREFBa0Q7SUFDbEQscUNBQXFDO0lBRXJDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNWLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUVkLE9BQU8sSUFBSSxFQUFFLENBQUE7SUFFYixPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUNqQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBRVYsc0RBQXNEO1FBQ3RELElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNkLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNoQixNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ1g7YUFBTSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckIsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2hCLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDWDthQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDaEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtTQUNYO2FBQU07WUFDTCxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDaEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtTQUNYO1FBRUQsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDMUQ7UUFFRCxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEIsRUFBRSxJQUFJLE9BQU8sQ0FBQTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDeEQ7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ3JDO1FBRUQsQ0FBQyxJQUFJLE1BQU0sQ0FBQTtLQUNaO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMsQ0FBQSJ9