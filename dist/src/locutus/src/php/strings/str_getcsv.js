module.exports = function str_getcsv(input, delimiter, enclosure, escape) {
    //  discuss at: https://locutus.io/php/str_getcsv/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: str_getcsv('"abc","def","ghi"')
    //   returns 1: ['abc', 'def', 'ghi']
    //   example 2: str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"')
    //   returns 2: ['row2"cell1', 'row2cell2', 'row2cell3']
    /*
    // These test cases allowing for missing delimiters are not currently supported
      str_getcsv('"row2""cell1",row2cell2,row2cell3', null, null, '"');
      ['row2"cell1', 'row2cell2', 'row2cell3']
  
      str_getcsv('row1cell1,"row1,cell2",row1cell3', null, null, '"');
      ['row1cell1', 'row1,cell2', 'row1cell3']
  
      str_getcsv('"row2""cell1",row2cell2,"row2""""cell3"');
      ['row2"cell1', 'row2cell2', 'row2""cell3']
  
      str_getcsv('row1cell1,"row1,cell2","row1"",""cell3"', null, null, '"');
      ['row1cell1', 'row1,cell2', 'row1","cell3'];
  
      Should also test newlines within
    */
    var i;
    var inpLen;
    var output = [];
    var _backwards = function (str) {
        // We need to go backwards to simulate negative look-behind (don't split on
        // an escaped enclosure even if followed by the delimiter and another enclosure mark)
        return str.split('').reverse().join('');
    };
    var _pq = function (str) {
        // preg_quote()
        return String(str).replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
    };
    delimiter = delimiter || ',';
    enclosure = enclosure || '"';
    escape = escape || '\\';
    var pqEnc = _pq(enclosure);
    var pqEsc = _pq(escape);
    input = input
        .replace(new RegExp('^\\s*' + pqEnc), '')
        .replace(new RegExp(pqEnc + '\\s*$'), '');
    // PHP behavior may differ by including whitespace even outside of the enclosure
    input = _backwards(input)
        .split(new RegExp(pqEnc + '\\s*' + _pq(delimiter) + '\\s*' + pqEnc + '(?!' + pqEsc + ')', 'g'))
        .reverse();
    for (i = 0, inpLen = input.length; i < inpLen; i++) {
        output.push(_backwards(input[i])
            .replace(new RegExp(pqEsc + pqEnc, 'g'), enclosure));
    }
    return output;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX2dldGNzdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cl9nZXRjc3YuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNO0lBQ3ZFLGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsK0NBQStDO0lBQy9DLHFDQUFxQztJQUNyQyxvRkFBb0Y7SUFDcEYsd0RBQXdEO0lBRXhEOzs7Ozs7Ozs7Ozs7Ozs7TUFlRTtJQUVGLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUc7UUFDNUIsMkVBQTJFO1FBQzNFLHFGQUFxRjtRQUNyRixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQTtJQUNELElBQUksR0FBRyxHQUFHLFVBQVUsR0FBRztRQUNyQixlQUFlO1FBQ2YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQTtJQUVELFNBQVMsR0FBRyxTQUFTLElBQUksR0FBRyxDQUFBO0lBQzVCLFNBQVMsR0FBRyxTQUFTLElBQUksR0FBRyxDQUFBO0lBQzVCLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFBO0lBQ3ZCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMxQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFdkIsS0FBSyxHQUFHLEtBQUs7U0FDVixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUN4QyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRTNDLGdGQUFnRjtJQUNoRixLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUN0QixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM5RixPQUFPLEVBQUUsQ0FBQTtJQUVaLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0tBQ3ZEO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==