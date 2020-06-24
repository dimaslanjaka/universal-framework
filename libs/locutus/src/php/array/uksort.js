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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWtzb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS91a3NvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUUsTUFBTTtJQUNoRCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwyREFBMkQ7SUFDM0Qsd0ZBQXdGO0lBQ3hGLHFGQUFxRjtJQUNyRixzRkFBc0Y7SUFDdEYsaUdBQWlHO0lBQ2pHLG9GQUFvRjtJQUNwRix5RkFBeUY7SUFDekYsd0ZBQXdGO0lBQ3hGLDJGQUEyRjtJQUMzRiw4Q0FBOEM7SUFDOUMsOEVBQThFO0lBQzlFLDRHQUE0RztJQUM1RyxtQ0FBbUM7SUFDbkMsa0VBQWtFO0lBRWxFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDN0I7SUFFRCwyQkFBMkI7SUFDM0IsS0FBSyxDQUFDLElBQUksUUFBUSxFQUFFO1FBQ2xCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2I7S0FDRjtJQUVELGlCQUFpQjtJQUNqQixJQUFJO1FBQ0YsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ2xCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDWjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUN6SCxlQUFlLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQTtJQUNqQyxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtJQUV0RCxzQ0FBc0M7SUFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZCLElBQUksZUFBZSxFQUFFO1lBQ25CLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ25CO0tBQ0Y7SUFDRCxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDaEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDM0I7S0FDRjtJQUVELE9BQU8sZUFBZSxJQUFJLFdBQVcsQ0FBQTtBQUN2QyxDQUFDLENBQUEifQ==