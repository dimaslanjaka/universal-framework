module.exports = function decbin(number) {
    //  discuss at: https://locutus.io/php/decbin/
    // original by: Enrique Gonzalez
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //    input by: nord_ua
    //   example 1: decbin(12)
    //   returns 1: '1100'
    //   example 2: decbin(26)
    //   returns 2: '11010'
    //   example 3: decbin('26')
    //   returns 3: '11010'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(2);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjYmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2RlY2Jpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU07SUFDdEMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyw4REFBOEQ7SUFDOUQscUdBQXFHO0lBQ3JHLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1Qix1QkFBdUI7SUFFdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsTUFBTSxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ2pDO0lBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUN4QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=