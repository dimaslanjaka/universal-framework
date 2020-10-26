module.exports = function array_pop(inputArr) {
    //  discuss at: https://locutus.io/php/array_pop/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: Theriault (https://github.com/Theriault)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      note 1: While IE (and other browsers) support iterating an object's
    //      note 1: own properties in order, if one attempts to add back properties
    //      note 1: in IE, they may end up in their former position due to their position
    //      note 1: being retained. So use of this function with "associative arrays"
    //      note 1: (objects) may lead to unexpected behavior in an IE environment if
    //      note 1: you add back properties with the same keys that you removed
    //   example 1: array_pop([0,1,2])
    //   returns 1: 2
    //   example 2: var $data = {firstName: 'Kevin', surName: 'van Zonneveld'}
    //   example 2: var $lastElem = array_pop($data)
    //   example 2: var $result = $data
    //   returns 2: {firstName: 'Kevin'}
    var key = '';
    var lastKey = '';
    if (inputArr.hasOwnProperty('length')) {
        // Indexed
        if (!inputArr.length) {
            // Done popping, are we?
            return null;
        }
        return inputArr.pop();
    }
    else {
        // Associative
        for (key in inputArr) {
            if (inputArr.hasOwnProperty(key)) {
                lastKey = key;
            }
        }
        if (lastKey) {
            var tmp = inputArr[lastKey];
            delete (inputArr[lastKey]);
            return tmp;
        }
        else {
            return null;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3BvcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLFFBQVE7SUFDM0MsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDJFQUEyRTtJQUMzRSwrRUFBK0U7SUFDL0UscUZBQXFGO0lBQ3JGLGlGQUFpRjtJQUNqRixpRkFBaUY7SUFDakYsMkVBQTJFO0lBQzNFLGtDQUFrQztJQUNsQyxpQkFBaUI7SUFDakIsMEVBQTBFO0lBQzFFLGdEQUFnRDtJQUNoRCxtQ0FBbUM7SUFDbkMsb0NBQW9DO0lBRXBDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUVoQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDckMsVUFBVTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3BCLHdCQUF3QjtZQUN4QixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUE7S0FDdEI7U0FBTTtRQUNMLGNBQWM7UUFDZCxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDcEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLEdBQUcsR0FBRyxDQUFBO2FBQ2Q7U0FDRjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtZQUMxQixPQUFPLEdBQUcsQ0FBQTtTQUNYO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7QUFDSCxDQUFDLENBQUEifQ==