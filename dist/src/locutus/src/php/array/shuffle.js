module.exports = function shuffle(inputArr) {
    //  discuss at: https://locutus.io/php/shuffle/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
    //   example 1: ini_set('locutus.sortByReference', true)
    //   example 1: shuffle($data)
    //   example 1: var $result = $data.q
    //   returns 1: 5
    var valArr = [];
    var k = '';
    var i = 0;
    var sortByReference = false;
    var populateArr = [];
    for (k in inputArr) {
        // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (sortByReference) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function () {
        return 0.5 - Math.random();
    });
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
    sortByReference = iniVal === 'on';
    populateArr = sortByReference ? inputArr : populateArr;
    for (i = 0; i < valArr.length; i++) {
        // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return sortByReference || populateArr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1ZmZsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9zaHVmZmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsUUFBUTtJQUN6QywrQ0FBK0M7SUFDL0MscUVBQXFFO0lBQ3JFLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDZEQUE2RDtJQUM3RCx3REFBd0Q7SUFDeEQsOEJBQThCO0lBQzlCLHFDQUFxQztJQUNyQyxpQkFBaUI7SUFFakIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixLQUFLLENBQUMsSUFBSSxRQUFRLEVBQUU7UUFDbEIsMkJBQTJCO1FBQzNCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hCLElBQUksZUFBZSxFQUFFO2dCQUNuQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNuQjtTQUNGO0tBQ0Y7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1YsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUN6SCxlQUFlLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQTtJQUNqQyxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtJQUV0RCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsMkJBQTJCO1FBQzNCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDM0I7SUFFRCxPQUFPLGVBQWUsSUFBSSxXQUFXLENBQUE7QUFDdkMsQ0FBQyxDQUFBIn0=