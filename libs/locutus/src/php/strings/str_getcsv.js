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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX2dldGNzdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfZ2V0Y3N2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTTtJQUN2RSxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELCtDQUErQztJQUMvQyxxQ0FBcUM7SUFDckMsb0ZBQW9GO0lBQ3BGLHdEQUF3RDtJQUV4RDs7Ozs7Ozs7Ozs7Ozs7O01BZUU7SUFFRixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxVQUFVLEdBQUcsVUFBVSxHQUFHO1FBQzVCLDJFQUEyRTtRQUMzRSxxRkFBcUY7UUFDckYsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUE7SUFDRCxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUc7UUFDckIsZUFBZTtRQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNsRSxDQUFDLENBQUE7SUFFRCxTQUFTLEdBQUcsU0FBUyxJQUFJLEdBQUcsQ0FBQTtJQUM1QixTQUFTLEdBQUcsU0FBUyxJQUFJLEdBQUcsQ0FBQTtJQUM1QixNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQTtJQUN2QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDMUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRXZCLEtBQUssR0FBRyxLQUFLO1NBQ1YsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDeEMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUUzQyxnRkFBZ0Y7SUFDaEYsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDdEIsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDOUYsT0FBTyxFQUFFLENBQUE7SUFFWixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0IsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtLQUN2RDtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=