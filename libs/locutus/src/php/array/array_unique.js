module.exports = function array_unique(inputArr) {
    //  discuss at: https://locutus.io/php/array_unique/
    // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
    //    input by: duncan
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Nate
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // improved by: Michael Grier
    //      note 1: The second argument, sort_flags is not implemented;
    //      note 1: also should be sorted (asort?) first according to docs
    //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
    //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
    //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}
    var key = '';
    var tmpArr2 = {};
    var val = '';
    var _arraySearch = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey;
                }
            }
        }
        return false;
    };
    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key];
            if (_arraySearch(val, tmpArr2) === false) {
                tmpArr2[key] = val;
            }
        }
    }
    return tmpArr2;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV91bmlxdWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxRQUFRO0lBQzlDLG9EQUFvRDtJQUNwRCxtRUFBbUU7SUFDbkUsc0JBQXNCO0lBQ3RCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsNkJBQTZCO0lBQzdCLG1FQUFtRTtJQUNuRSxzRUFBc0U7SUFDdEUseUVBQXlFO0lBQ3pFLHNEQUFzRDtJQUN0RCx5RkFBeUY7SUFDekYsaURBQWlEO0lBRWpELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixJQUFJLFlBQVksR0FBRyxVQUFVLE1BQU0sRUFBRSxRQUFRO1FBQzNDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLEtBQUssSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNyQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUU7b0JBQzNDLE9BQU8sSUFBSSxDQUFBO2lCQUNaO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFBO0lBRUQsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ3BCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUE7YUFDbkI7U0FDRjtLQUNGO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=