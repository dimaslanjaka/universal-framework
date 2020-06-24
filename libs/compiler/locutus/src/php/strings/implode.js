module.exports = function implode(glue, pieces) {
    //  discuss at: https://locutus.io/php/implode/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
    // improved by: Itsacon (https://www.itsacon.net/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: implode(' ', ['Kevin', 'van', 'Zonneveld'])
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'})
    //   returns 2: 'Kevin van Zonneveld'
    var i = '';
    var retVal = '';
    var tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof pieces === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbG9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9pbXBsb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsSUFBSSxFQUFFLE1BQU07SUFDN0MsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCwyREFBMkQ7SUFDM0QscUNBQXFDO0lBQ3JDLG9FQUFvRTtJQUNwRSxxQ0FBcUM7SUFFckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBRWQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtLQUNWO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7WUFDL0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3pCO1FBQ0QsS0FBSyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNCLEtBQUssR0FBRyxJQUFJLENBQUE7U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9