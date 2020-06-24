module.exports = function range(low, high, step) {
    //  discuss at: https://locutus.io/php/range/
    // original by: Waldo Malqui Silva (https://waldo.malqui.info)
    //   example 1: range ( 0, 12 )
    //   returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    //   example 2: range( 0, 100, 10 )
    //   returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    //   example 3: range( 'a', 'i' )
    //   returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    //   example 4: range( 'c', 'a' )
    //   returns 4: ['c', 'b', 'a']
    var matrix = [];
    var iVal;
    var endval;
    var plus;
    var walker = step || 1;
    var chars = false;
    if (!isNaN(low) && !isNaN(high)) {
        iVal = low;
        endval = high;
    }
    else if (isNaN(low) && isNaN(high)) {
        chars = true;
        iVal = low.charCodeAt(0);
        endval = high.charCodeAt(0);
    }
    else {
        iVal = (isNaN(low) ? 0 : low);
        endval = (isNaN(high) ? 0 : high);
    }
    plus = !(iVal > endval);
    if (plus) {
        while (iVal <= endval) {
            matrix.push(((chars) ? String.fromCharCode(iVal) : iVal));
            iVal += walker;
        }
    }
    else {
        while (iVal >= endval) {
            matrix.push(((chars) ? String.fromCharCode(iVal) : iVal));
            iVal -= walker;
        }
    }
    return matrix;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L3JhbmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJO0lBQzlDLDZDQUE2QztJQUM3Qyw4REFBOEQ7SUFDOUQsK0JBQStCO0lBQy9CLDBEQUEwRDtJQUMxRCxtQ0FBbUM7SUFDbkMsNERBQTREO0lBQzVELGlDQUFpQztJQUNqQyw2REFBNkQ7SUFDN0QsaUNBQWlDO0lBQ2pDLCtCQUErQjtJQUUvQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxJQUFJLENBQUE7SUFDUixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBO0lBQ3RCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQy9CLElBQUksR0FBRyxHQUFHLENBQUE7UUFDVixNQUFNLEdBQUcsSUFBSSxDQUFBO0tBQ2Q7U0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNaLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzVCO1NBQU07UUFDTCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0IsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ2xDO0lBRUQsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUE7SUFDdkIsSUFBSSxJQUFJLEVBQUU7UUFDUixPQUFPLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDekQsSUFBSSxJQUFJLE1BQU0sQ0FBQTtTQUNmO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN6RCxJQUFJLElBQUksTUFBTSxDQUFBO1NBQ2Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=