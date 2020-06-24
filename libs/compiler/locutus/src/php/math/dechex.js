module.exports = function dechex(number) {
    //  discuss at: https://locutus.io/php/dechex/
    // original by: Philippe Baumann
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //   example 1: dechex(10)
    //   returns 1: 'a'
    //   example 2: dechex(47)
    //   returns 2: '2f'
    //   example 3: dechex(-1415723993)
    //   returns 3: 'ab9dc427'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(16);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2RlY2hleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU07SUFDdEMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyw4REFBOEQ7SUFDOUQscUdBQXFHO0lBQ3JHLHFCQUFxQjtJQUNyQiwwQkFBMEI7SUFDMUIsbUJBQW1CO0lBQ25CLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsbUNBQW1DO0lBQ25DLDBCQUEwQjtJQUUxQixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDZCxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDakM7SUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUEifQ==