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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluMmhleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2JpbjJoZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxDQUFDO0lBQ2xDLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELDBCQUEwQjtJQUMxQiw2RUFBNkU7SUFDN0UsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QixrREFBa0Q7SUFDbEQsb0JBQW9CO0lBRXBCLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLENBQUMsQ0FBQTtJQUVMLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFUCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2YsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEM7SUFFRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9