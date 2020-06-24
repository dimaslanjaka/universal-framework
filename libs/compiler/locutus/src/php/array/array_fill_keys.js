module.exports = function array_fill_keys(keys, value) {
    //  discuss at: https://locutus.io/php/array_fill_keys/
    // original by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
    //   example 1: array_fill_keys($keys, 'banana')
    //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
    var retObj = {};
    var key = '';
    for (key in keys) {
        retObj[keys[key]] = value;
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsbF9rZXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9maWxsX2tleXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxJQUFJLEVBQUUsS0FBSztJQUNwRCx1REFBdUQ7SUFDdkQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwrREFBK0Q7SUFDL0QsZ0RBQWdEO0lBQ2hELDZFQUE2RTtJQUU3RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtLQUMxQjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=