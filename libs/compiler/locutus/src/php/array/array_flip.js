module.exports = function array_flip(trans) {
    //  discuss at: https://locutus.io/php/array_flip/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Pier Paolo Ramon (https://www.mastersoup.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_flip( {a: 1, b: 1, c: 2} )
    //   returns 1: {1: 'b', 2: 'c'}
    var key;
    var tmpArr = {};
    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[trans[key]] = key;
    }
    return tmpArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmxpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfZmxpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLEtBQUs7SUFDekMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELGdEQUFnRDtJQUNoRCxnQ0FBZ0M7SUFFaEMsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUIsU0FBUTtTQUNUO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUN6QjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=