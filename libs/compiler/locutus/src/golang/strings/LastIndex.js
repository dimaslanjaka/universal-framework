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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFzdEluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL2dvbGFuZy9zdHJpbmdzL0xhc3RJbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLENBQUMsRUFBRSxHQUFHO0lBQ3pDLDJEQUEyRDtJQUMzRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDRDQUE0QztJQUM1QyxpQkFBaUI7SUFDakIsZ0RBQWdEO0lBQ2hELGtCQUFrQjtJQUVsQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM5QyxDQUFDLENBQUEifQ==