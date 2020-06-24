module.exports = function is_numeric(mixedVar) {
    //  discuss at: https://locutus.io/php/is_numeric/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: David
    // improved by: taith
    // bugfixed by: Tim de Koning
    // bugfixed by: WebDevHobo (https://webdevhobo.blogspot.com/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Denis Chenu (https://shnoulle.net)
    //   example 1: is_numeric(186.31)
    //   returns 1: true
    //   example 2: is_numeric('Kevin van Zonneveld')
    //   returns 2: false
    //   example 3: is_numeric(' +186.31e2')
    //   returns 3: true
    //   example 4: is_numeric('')
    //   returns 4: false
    //   example 5: is_numeric([])
    //   returns 5: false
    //   example 6: is_numeric('1 ')
    //   returns 6: false
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
    // @todo: Break this up using many single conditions with early returns
    return (typeof mixedVar === 'number' ||
        (typeof mixedVar === 'string' &&
            whitespace.indexOf(mixedVar.slice(-1)) === -1)) &&
        mixedVar !== '' &&
        !isNaN(mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfbnVtZXJpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX251bWVyaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxRQUFRO0lBQzVDLGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQiw2QkFBNkI7SUFDN0IsNkRBQTZEO0lBQzdELG9EQUFvRDtJQUNwRCxrREFBa0Q7SUFDbEQsa0NBQWtDO0lBQ2xDLG9CQUFvQjtJQUNwQixpREFBaUQ7SUFDakQscUJBQXFCO0lBQ3JCLHdDQUF3QztJQUN4QyxvQkFBb0I7SUFDcEIsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQiw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFFckIsSUFBSSxVQUFVLEdBQUc7UUFDZixHQUFHO1FBQ0gsSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO0tBQ1QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFVix1RUFBdUU7SUFDdkUsT0FBTyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVE7UUFDbEMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxRQUFRLEtBQUssRUFBRTtRQUNmLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSJ9