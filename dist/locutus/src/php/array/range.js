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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvcmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDOUMsNkNBQTZDO0lBQzdDLDhEQUE4RDtJQUM5RCwrQkFBK0I7SUFDL0IsMERBQTBEO0lBQzFELG1DQUFtQztJQUNuQyw0REFBNEQ7SUFDNUQsaUNBQWlDO0lBQ2pDLDZEQUE2RDtJQUM3RCxpQ0FBaUM7SUFDakMsK0JBQStCO0lBRS9CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUE7SUFDdEIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0IsSUFBSSxHQUFHLEdBQUcsQ0FBQTtRQUNWLE1BQU0sR0FBRyxJQUFJLENBQUE7S0FDZDtTQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDNUI7U0FBTTtRQUNMLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDbEM7SUFFRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQTtJQUN2QixJQUFJLElBQUksRUFBRTtRQUNSLE9BQU8sSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN6RCxJQUFJLElBQUksTUFBTSxDQUFBO1NBQ2Y7S0FDRjtTQUFNO1FBQ0wsT0FBTyxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ3pELElBQUksSUFBSSxNQUFNLENBQUE7U0FDZjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==