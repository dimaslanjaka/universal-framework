module.exports = function array_combine(keys, values) {
    //  discuss at: https://locutus.io/php/array_combine/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
    //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var newArray = {};
    var i = 0;
    // input sanitation
    // Only accept arrays or array-like objects
    // Require arrays to have a count
    if (typeof keys !== 'object') {
        return false;
    }
    if (typeof values !== 'object') {
        return false;
    }
    if (typeof keys.length !== 'number') {
        return false;
    }
    if (typeof values.length !== 'number') {
        return false;
    }
    if (!keys.length) {
        return false;
    }
    // number of elements does not match
    if (keys.length !== values.length) {
        return false;
    }
    for (i = 0; i < keys.length; i++) {
        newArray[keys[i]] = values[i];
    }
    return newArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY29tYmluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfY29tYmluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLElBQUksRUFBRSxNQUFNO0lBQ25ELHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG1FQUFtRTtJQUNuRSxzREFBc0Q7SUFFdEQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULG1CQUFtQjtJQUNuQiwyQ0FBMkM7SUFDM0MsaUNBQWlDO0lBQ2pDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ25DLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDckMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxvQ0FBb0M7SUFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDakMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzlCO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBIn0=