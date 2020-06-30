module.exports = function soundex(str) {
    //  discuss at: https://locutus.io/php/soundex/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // original by: Arnout Kazemier (https://www.3rd-Eden.com)
    // improved by: Jack
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: soundex('Kevin')
    //   returns 1: 'K150'
    //   example 2: soundex('Ellery')
    //   returns 2: 'E460'
    //   example 3: soundex('Euler')
    //   returns 3: 'E460'
    str = (str + '').toUpperCase();
    if (!str) {
        return '';
    }
    var sdx = [0, 0, 0, 0];
    var m = {
        B: 1,
        F: 1,
        P: 1,
        V: 1,
        C: 2,
        G: 2,
        J: 2,
        K: 2,
        Q: 2,
        S: 2,
        X: 2,
        Z: 2,
        D: 3,
        T: 3,
        L: 4,
        M: 5,
        N: 5,
        R: 6
    };
    var i = 0;
    var j;
    var s = 0;
    var c;
    var p;
    while ((c = str.charAt(i++)) && s < 4) {
        if ((j = m[c])) {
            if (j !== p) {
                sdx[s++] = p = j;
            }
        }
        else {
            s += i === 1;
            p = 0;
        }
    }
    sdx[0] = str.charAt(0);
    return sdx.join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zb3VuZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsR0FBRztJQUNwQywrQ0FBK0M7SUFDL0MscUVBQXFFO0lBQ3JFLDBEQUEwRDtJQUMxRCxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHlEQUF5RDtJQUN6RCxnQ0FBZ0M7SUFDaEMsc0JBQXNCO0lBQ3RCLGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsZ0NBQWdDO0lBQ2hDLHNCQUFzQjtJQUV0QixHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDOUIsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7SUFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3RCLElBQUksQ0FBQyxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0wsQ0FBQTtJQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUVMLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakI7U0FDRjthQUFNO1lBQ0wsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDWixDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ047S0FDRjtJQUVELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXRCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==