module.exports = function Count(s, sep) {
    //  discuss at: https://locutus.io/php/printf/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: GopherJS (https://www.gopherjs.org/)
    //   example 1: Count("cheese", "e")
    //   returns 1: 3
    //   example 2: Count("five", "") // before & after each rune
    //   returns 2: 5
    var pos;
    var n = 0;
    if ((sep.length === 0)) {
        return s.split(sep).length + 1;
    }
    else if (sep.length > s.length) {
        return 0;
    }
    else if ((sep.length === s.length)) {
        if (sep === s) {
            return 1;
        }
        return 0;
    }
    while (true) {
        pos = (s + '').indexOf(sep);
        if (pos === -1) {
            break;
        }
        n = n + (1) >> 0;
        s = s.substring((pos + sep.length >> 0));
    }
    return n;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9nb2xhbmcvc3RyaW5ncy9Db3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLENBQUMsRUFBRSxHQUFHO0lBQ3JDLDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9DQUFvQztJQUNwQyxpQkFBaUI7SUFDakIsNkRBQTZEO0lBQzdELGlCQUFpQjtJQUVqQixJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQy9CO1NBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDaEMsT0FBTyxDQUFDLENBQUE7S0FDVDtTQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQTtTQUNUO1FBQ0QsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUNELE9BQU8sSUFBSSxFQUFFO1FBQ1gsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMzQixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNkLE1BQUs7U0FDTjtRQUNELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3pDO0lBQ0QsT0FBTyxDQUFDLENBQUE7QUFDVixDQUFDLENBQUEifQ==