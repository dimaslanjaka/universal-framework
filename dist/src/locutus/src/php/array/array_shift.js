module.exports = function array_shift(inputArr) {
    //  discuss at: https://locutus.io/php/array_shift/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Martijn Wieringa
    //      note 1: Currently does not handle objects
    //   example 1: array_shift(['Kevin', 'van', 'Zonneveld'])
    //   returns 1: 'Kevin'
    var _checkToUpIndices = function (arr, ct, key) {
        // Deal with situation, e.g., if encounter index 4 and try
        // to set it to 0, but 0 exists later in loop (need to
        // increment all subsequent (skipping current key, since
        // we need its value below) until find unused)
        if (arr[ct] !== undefined) {
            var tmp = ct;
            ct += 1;
            if (ct === key) {
                ct += 1;
            }
            ct = _checkToUpIndices(arr, ct, key);
            arr[ct] = arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };
    if (inputArr.length === 0) {
        return null;
    }
    if (inputArr.length > 0) {
        return inputArr.shift();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfc2hpZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfc2hpZnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxRQUFRO0lBQzdDLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsZ0NBQWdDO0lBQ2hDLGlEQUFpRDtJQUNqRCwwREFBMEQ7SUFDMUQsdUJBQXVCO0lBRXZCLElBQUksaUJBQWlCLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7UUFDNUMsMERBQTBEO1FBQzFELHNEQUFzRDtRQUN0RCx3REFBd0Q7UUFDeEQsOENBQThDO1FBQzlDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN6QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7WUFDWixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ1AsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUNkLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDUjtZQUNELEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDaEI7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUMsQ0FBQTtJQUVELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDeEI7QUFDSCxDQUFDLENBQUEifQ==