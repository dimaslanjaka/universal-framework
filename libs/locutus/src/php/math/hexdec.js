module.exports = function hexdec(hexString) {
    //  discuss at: https://locutus.io/php/hexdec/
    // original by: Philippe Baumann
    //   example 1: hexdec('that')
    //   returns 1: 10
    //   example 2: hexdec('a0')
    //   returns 2: 160
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4ZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2hleGRlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFNBQVM7SUFDekMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyw4QkFBOEI7SUFDOUIsa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QixtQkFBbUI7SUFFbkIsU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDdkQsT0FBTyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQSJ9