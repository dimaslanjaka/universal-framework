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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9wb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxRQUFRO0lBQzNDLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwyRUFBMkU7SUFDM0UsK0VBQStFO0lBQy9FLHFGQUFxRjtJQUNyRixpRkFBaUY7SUFDakYsaUZBQWlGO0lBQ2pGLDJFQUEyRTtJQUMzRSxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLDBFQUEwRTtJQUMxRSxnREFBZ0Q7SUFDaEQsbUNBQW1DO0lBQ25DLG9DQUFvQztJQUVwQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFaEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3JDLFVBQVU7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNwQix3QkFBd0I7WUFDeEIsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO0tBQ3RCO1NBQU07UUFDTCxjQUFjO1FBQ2QsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1lBQ3BCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxHQUFHLEdBQUcsQ0FBQTthQUNkO1NBQ0Y7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7WUFDMUIsT0FBTyxHQUFHLENBQUE7U0FDWDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0FBQ0gsQ0FBQyxDQUFBIn0=