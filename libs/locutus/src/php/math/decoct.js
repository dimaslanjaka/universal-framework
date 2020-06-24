module.exports = function decoct(number) {
    //  discuss at: https://locutus.io/php/decoct/
    // original by: Enrique Gonzalez
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    //    input by: pilus
    //   example 1: decoct(15)
    //   returns 1: '17'
    //   example 2: decoct(264)
    //   returns 2: '410'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10)
        .toString(8);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2RlY29jdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU07SUFDdEMsOENBQThDO0lBQzlDLGdDQUFnQztJQUNoQyw4REFBOEQ7SUFDOUQscUdBQXFHO0lBQ3JHLHFCQUFxQjtJQUNyQiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLDJCQUEyQjtJQUMzQixxQkFBcUI7SUFFckIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsTUFBTSxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ2pDO0lBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUN4QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=