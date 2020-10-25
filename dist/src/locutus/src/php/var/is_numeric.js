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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfbnVtZXJpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfbnVtZXJpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLFFBQVE7SUFDNUMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLDZCQUE2QjtJQUM3Qiw2REFBNkQ7SUFDN0Qsb0RBQW9EO0lBQ3BELGtEQUFrRDtJQUNsRCxrQ0FBa0M7SUFDbEMsb0JBQW9CO0lBQ3BCLGlEQUFpRDtJQUNqRCxxQkFBcUI7SUFDckIsd0NBQXdDO0lBQ3hDLG9CQUFvQjtJQUNwQiw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLDhCQUE4QjtJQUM5QixxQkFBcUI7SUFDckIsZ0NBQWdDO0lBQ2hDLHFCQUFxQjtJQUVyQixJQUFJLFVBQVUsR0FBRztRQUNmLEdBQUc7UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7S0FDVCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVWLHVFQUF1RTtJQUN2RSxPQUFPLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUTtRQUNsQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsS0FBSyxFQUFFO1FBQ2YsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFBIn0=