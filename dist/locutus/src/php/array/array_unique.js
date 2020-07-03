module.exports = function array_unique(inputArr) {
    //  discuss at: https://locutus.io/php/array_unique/
    // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
    //    input by: duncan
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Nate
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // improved by: Michael Grier
    //      note 1: The second argument, sort_flags is not implemented;
    //      note 1: also should be sorted (asort?) first according to docs
    //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
    //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
    //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}
    var key = '';
    var tmpArr2 = {};
    var val = '';
    var _arraySearch = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey;
                }
            }
        }
        return false;
    };
    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key];
            if (_arraySearch(val, tmpArr2) === false) {
                tmpArr2[key] = val;
            }
        }
    }
    return tmpArr2;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3VuaXF1ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLFFBQVE7SUFDOUMsb0RBQW9EO0lBQ3BELG1FQUFtRTtJQUNuRSxzQkFBc0I7SUFDdEIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IsbUVBQW1FO0lBQ25FLHNFQUFzRTtJQUN0RSx5RUFBeUU7SUFDekUsc0RBQXNEO0lBQ3RELHlGQUF5RjtJQUN6RixpREFBaUQ7SUFFakQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUVaLElBQUksWUFBWSxHQUFHLFVBQVUsTUFBTSxFQUFFLFFBQVE7UUFDM0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsS0FBSyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3JCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFDM0MsT0FBTyxJQUFJLENBQUE7aUJBQ1o7YUFDRjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDLENBQUE7SUFFRCxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDcEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbkIsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQTthQUNuQjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==