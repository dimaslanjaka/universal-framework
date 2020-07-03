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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRmOF9kZWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAveG1sL3V0ZjhfZGVjb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsT0FBTztJQUM1QyxtREFBbUQ7SUFDbkQsOERBQThEO0lBQzlELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGtDQUFrQztJQUNsQyx1QkFBdUI7SUFDdkIsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFDekIsa0RBQWtEO0lBQ2xELGtEQUFrRDtJQUNsRCxxQ0FBcUM7SUFFckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBRWQsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUViLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDekIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ2pDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFFVixzREFBc0Q7UUFDdEQsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2QsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2hCLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDWDthQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDaEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtTQUNYO2FBQU0sSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3JCLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNoQixNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ1g7YUFBTTtZQUNMLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNoQixNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ1g7UUFFRCxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUMxRDtRQUVELElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQixFQUFFLElBQUksT0FBTyxDQUFBO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN4RDthQUFNO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDckM7UUFFRCxDQUFDLElBQUksTUFBTSxDQUFBO0tBQ1o7SUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDeEIsQ0FBQyxDQUFBIn0=