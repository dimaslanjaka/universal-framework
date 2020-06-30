module.exports = function octdec(octString) {
    //  discuss at: https://locutus.io/php/octdec/
    // original by: Philippe Baumann
    //   example 1: octdec('77')
    //   returns 1: 63
    octString = (octString + '').replace(/[^0-7]/gi, '');
    return parseInt(octString, 8);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2N0ZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL29jdGRlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFNBQVM7SUFDekMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyw0QkFBNEI7SUFDNUIsa0JBQWtCO0lBRWxCLFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELE9BQU8sUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUEifQ==