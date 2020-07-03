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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbG9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2ltcGxvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxJQUFJLEVBQUUsTUFBTTtJQUM3QywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELDJEQUEyRDtJQUMzRCxxQ0FBcUM7SUFDckMsb0VBQW9FO0lBQ3BFLHFDQUFxQztJQUVyQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7SUFFZCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDYixJQUFJLEdBQUcsRUFBRSxDQUFBO0tBQ1Y7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtZQUMvRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDekI7UUFDRCxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQTtTQUNiO1FBQ0QsT0FBTyxNQUFNLENBQUE7S0FDZDtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=