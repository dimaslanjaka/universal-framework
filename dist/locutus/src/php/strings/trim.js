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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3RyaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBRSxHQUFHLEVBQUUsUUFBUTtJQUMzQyw0Q0FBNEM7SUFDNUMsb0RBQW9EO0lBQ3BELG1EQUFtRDtJQUNuRCxzRkFBc0Y7SUFDdEYsb0RBQW9EO0lBQ3BELGlFQUFpRTtJQUNqRSxvQkFBb0I7SUFDcEIsMkJBQTJCO0lBQzNCLG9CQUFvQjtJQUNwQiw4REFBOEQ7SUFDOUQsbURBQW1EO0lBQ25ELHFDQUFxQztJQUNyQywyQ0FBMkM7SUFDM0MsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFFbkIsSUFBSSxVQUFVLEdBQUc7UUFDZixHQUFHO1FBQ0gsSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO0tBQ1QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxHQUFHLElBQUksRUFBRSxDQUFBO0lBRVQsSUFBSSxRQUFRLEVBQUU7UUFDWixVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ25FO0lBRUQsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QixJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RCLE1BQUs7U0FDTjtLQUNGO0lBRUQsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE1BQUs7U0FDTjtLQUNGO0lBRUQsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDNUQsQ0FBQyxDQUFBIn0=