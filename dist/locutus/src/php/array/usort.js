module.exports = function usort(inputArr, sorter) {
    //  discuss at: https://locutus.io/php/usort/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: This function deviates from PHP in returning a copy of the array instead
    //      note 1: of acting by reference and returning true; this was necessary because
    //      note 1: IE does not allow deleting and re-adding of properties without caching
    //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
    //      note 1: get the PHP behavior, but use this only if you are in an environment
    //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
    //      note 1: property deletion is supported. Note that we intend to implement the PHP
    //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    //      note 1: is by reference in PHP anyways
    //   example 1: var $stuff = {d: '3', a: '1', b: '11', c: '4'}
    //   example 1: usort($stuff, function (a, b) { return (a - b) })
    //   example 1: var $result = $stuff
    //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'}
    var valArr = [];
    var k = '';
    var i = 0;
    var sortByReference = false;
    var populateArr = {};
    if (typeof sorter === 'string') {
        sorter = this[sorter];
    }
    else if (Object.prototype.toString.call(sorter) === '[object Array]') {
        sorter = this[sorter[0]][sorter[1]];
    }
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    for (k in inputArr) {
        // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (sortByReference) {
                delete inputArr[k];
            }
        }
    }
    try {
        valArr.sort(sorter);
    }
    catch (e) {
        return false;
    }
    for (i = 0; i < valArr.length; i++) {
        // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvdXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsTUFBTTtJQUMvQyw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0RixpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLHlGQUF5RjtJQUN6Rix3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDhDQUE4QztJQUM5Qyw4REFBOEQ7SUFDOUQsaUVBQWlFO0lBQ2pFLG9DQUFvQztJQUNwQyxpREFBaUQ7SUFFakQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3RCO1NBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDdEUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNwQztJQUVELElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUE7SUFDekgsZUFBZSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUE7SUFDakMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7SUFFdEQsS0FBSyxDQUFDLElBQUksUUFBUSxFQUFFO1FBQ2xCLDJCQUEyQjtRQUMzQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN4QixJQUFJLGVBQWUsRUFBRTtnQkFDbkIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDbkI7U0FDRjtLQUNGO0lBQ0QsSUFBSTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDcEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsMkJBQTJCO1FBQzNCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDM0I7SUFFRCxPQUFPLGVBQWUsSUFBSSxXQUFXLENBQUE7QUFDdkMsQ0FBQyxDQUFBIn0=