module.exports = function LastIndex(s, sep) {
    //  discuss at: https://locutus.io/golang/strings/LastIndex
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: GopherJS (https://www.gopherjs.org/)
    //   example 1: LastIndex('go gopher', 'go')
    //   returns 1: 3
    //   example 2: LastIndex('go gopher', 'rodent')
    //   returns 2: -1
    return parseInt(s.lastIndexOf(sep), 10) >> 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFzdEluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvZ29sYW5nL3N0cmluZ3MvTGFzdEluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsQ0FBQyxFQUFFLEdBQUc7SUFDekMsMkRBQTJEO0lBQzNELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsNENBQTRDO0lBQzVDLGlCQUFpQjtJQUNqQixnREFBZ0Q7SUFDaEQsa0JBQWtCO0lBRWxCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FBQSJ9