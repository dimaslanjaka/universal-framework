module.exports = function array_sum(array) {
    //  discuss at: https://locutus.io/php/array_sum/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Nate
    // bugfixed by: Gilbert
    // improved by: David Pilia (https://www.beteck.it/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_sum([4, 9, 182.6])
    //   returns 1: 195.6
    //   example 2: var $total = []
    //   example 2: var $index = 0.1
    //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
    //   example 2: array_sum($total)
    //   returns 2: 67.2
    var key;
    var sum = 0;
    // input sanitation
    if (typeof array !== 'object') {
        return null;
    }
    for (key in array) {
        if (!isNaN(parseFloat(array[key]))) {
            sum += parseFloat(array[key]);
        }
    }
    return sum;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9zdW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxLQUFLO0lBQ3hDLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdDQUF3QztJQUN4QyxxQkFBcUI7SUFDckIsK0JBQStCO0lBQy9CLGdDQUFnQztJQUNoQywyRUFBMkU7SUFDM0UsaUNBQWlDO0lBQ2pDLG9CQUFvQjtJQUVwQixJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLG1CQUFtQjtJQUNuQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUM5QjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==