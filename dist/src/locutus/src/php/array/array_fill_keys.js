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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfZmlsbF9rZXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2ZpbGxfa2V5cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLElBQUksRUFBRSxLQUFLO0lBQ3BELHVEQUF1RDtJQUN2RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELCtEQUErRDtJQUMvRCxnREFBZ0Q7SUFDaEQsNkVBQTZFO0lBRTdFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO0tBQzFCO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==