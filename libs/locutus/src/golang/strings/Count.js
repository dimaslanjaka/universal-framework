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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvZ29sYW5nL3N0cmluZ3MvQ291bnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxDQUFDLEVBQUUsR0FBRztJQUNyQyw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBQ2pCLDZEQUE2RDtJQUM3RCxpQkFBaUI7SUFFakIsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN0QixPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUMvQjtTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7U0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxDQUFDLENBQUE7U0FDVDtRQUNELE9BQU8sQ0FBQyxDQUFBO0tBQ1Q7SUFDRCxPQUFPLElBQUksRUFBRTtRQUNYLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDM0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDZCxNQUFLO1NBQ047UUFDRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hCLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUN6QztJQUNELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=