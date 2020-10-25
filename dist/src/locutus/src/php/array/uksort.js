module.exports = function uksort(inputArr, sorter) {
    //  discuss at: https://locutus.io/php/uksort/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: The examples are correct, this is a new way
    //      note 1: This function deviates from PHP in returning a copy of the array instead
    //      note 1: of acting by reference and returning true; this was necessary because
    //      note 1: IE does not allow deleting and re-adding of properties without caching
    //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
    //      note 1: get the PHP behavior, but use this only if you are in an environment
    //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
    //      note 1: property deletion is supported. Note that we intend to implement the PHP
    //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    //      note 1: is by reference in PHP anyways
    //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    //   example 1: uksort($data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
    //   example 1: var $result = $data
    //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    var tmpArr = {};
    var keys = [];
    var i = 0;
    var k = '';
    var sortByReference = false;
    var populateArr = {};
    if (typeof sorter === 'string') {
        sorter = this.window[sorter];
    }
    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    // Sort key names
    try {
        if (sorter) {
            keys.sort(sorter);
        }
        else {
            keys.sort();
        }
    }
    catch (e) {
        return false;
    }
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmpArr[k] = inputArr[k];
        if (sortByReference) {
            delete inputArr[k];
        }
    }
    for (i in tmpArr) {
        if (tmpArr.hasOwnProperty(i)) {
            populateArr[i] = tmpArr[i];
        }
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWtzb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L3Vrc29ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ2hELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDJEQUEyRDtJQUMzRCx3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0RixpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDhDQUE4QztJQUM5Qyw4RUFBOEU7SUFDOUUsNEdBQTRHO0lBQzVHLG1DQUFtQztJQUNuQyxrRUFBa0U7SUFFbEUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUM3QjtJQUVELDJCQUEyQjtJQUMzQixLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUU7UUFDbEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDYjtLQUNGO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUk7UUFDRixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDbEI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNaO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFBO0lBQ3pILGVBQWUsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFBO0lBQ2pDLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFBO0lBRXRELHNDQUFzQztJQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsSUFBSSxlQUFlLEVBQUU7WUFDbkIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7S0FDRjtJQUNELEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUNoQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtLQUNGO0lBRUQsT0FBTyxlQUFlLElBQUksV0FBVyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQSJ9