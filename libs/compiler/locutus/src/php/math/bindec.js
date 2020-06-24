module.exports = function bindec(binaryString) {
    //  discuss at: https://locutus.io/php/bindec/
    // original by: Philippe Baumann
    //   example 1: bindec('110011')
    //   returns 1: 51
    //   example 2: bindec('000110011')
    //   returns 2: 51
    //   example 3: bindec('111')
    //   returns 3: 7
    binaryString = (binaryString + '').replace(/[^01]/gi, '');
    return parseInt(binaryString, 2);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2JpbmRlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFlBQVk7SUFDNUMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMsa0JBQWtCO0lBQ2xCLG1DQUFtQztJQUNuQyxrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLGlCQUFpQjtJQUVqQixZQUFZLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUV6RCxPQUFPLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFBIn0=