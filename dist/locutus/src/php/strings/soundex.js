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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NvdW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHO0lBQ3BDLCtDQUErQztJQUMvQyxxRUFBcUU7SUFDckUsMERBQTBEO0lBQzFELG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQseURBQXlEO0lBQ3pELGdDQUFnQztJQUNoQyxzQkFBc0I7SUFDdEIsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixnQ0FBZ0M7SUFDaEMsc0JBQXNCO0lBRXRCLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM5QixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDdEIsSUFBSSxDQUFDLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7S0FDTCxDQUFBO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBRUwsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1gsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNqQjtTQUNGO2FBQU07WUFDTCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNaLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDTjtLQUNGO0lBRUQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3JCLENBQUMsQ0FBQSJ9