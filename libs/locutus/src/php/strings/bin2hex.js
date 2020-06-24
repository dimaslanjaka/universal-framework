module.exports = function bin2hex(s) {
    //  discuss at: https://locutus.io/php/bin2hex/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Linuxworld
    // improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
    //   example 1: bin2hex('Kev')
    //   returns 1: '4b6576'
    //   example 2: bin2hex(String.fromCharCode(0x00))
    //   returns 2: '00'
    var i;
    var l;
    var o = '';
    var n;
    s += '';
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i)
            .toString(16);
        o += n.length < 2 ? '0' + n : n;
    }
    return o;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluMmhleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9iaW4yaGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsQ0FBQztJQUNsQywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCwwQkFBMEI7SUFDMUIsNkVBQTZFO0lBQzdFLDhCQUE4QjtJQUM5Qix3QkFBd0I7SUFDeEIsa0RBQWtEO0lBQ2xELG9CQUFvQjtJQUVwQixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLENBQUE7SUFFTCxDQUFDLElBQUksRUFBRSxDQUFBO0lBRVAsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ2hCLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNmLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2hDO0lBRUQsT0FBTyxDQUFDLENBQUE7QUFDVixDQUFDLENBQUEifQ==