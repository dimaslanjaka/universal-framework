module.exports = function is_array(mixedVar) {
    //  discuss at: https://locutus.io/php/is_array/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Legaev Andrey
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Nathan Sepulveda
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Cord
    // bugfixed by: Manish
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      note 1: In Locutus, javascript objects are like php associative arrays,
    //      note 1: thus JavaScript objects will also
    //      note 1: return true in this function (except for objects which inherit properties,
    //      note 1: being thus used as objects),
    //      note 1: unless you do ini_set('locutus.objectsAsArrays', 0),
    //      note 1: in which case only genuine JavaScript arrays
    //      note 1: will return true
    //   example 1: is_array(['Kevin', 'van', 'Zonneveld'])
    //   returns 1: true
    //   example 2: is_array('Kevin van Zonneveld')
    //   returns 2: false
    //   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
    //   returns 3: true
    //   example 4: ini_set('locutus.objectsAsArrays', 0)
    //   example 4: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
    //   returns 4: false
    //   example 5: is_array(function tmp_a (){ this.name = 'Kevin' })
    //   returns 5: false
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    var _isArray = function (mixedVar) {
        // return Object.prototype.toString.call(mixedVar) === '[object Array]';
        // The above works, but let's do the even more stringent approach:
        // (since Object.prototype.toString could be overridden)
        // Null, Not an object, no length property so couldn't be an Array (or String)
        if (!mixedVar || typeof mixedVar !== 'object' || typeof mixedVar.length !== 'number') {
            return false;
        }
        var len = mixedVar.length;
        mixedVar[mixedVar.length] = 'bogus';
        // The only way I can think of to get around this (or where there would be trouble)
        // would be to have an object defined
        // with a custom "length" getter which changed behavior on each call
        // (or a setter to mess up the following below) or a custom
        // setter for numeric properties, but even that would need to listen for
        // specific indexes; but there should be no false negatives
        // and such a false positive would need to rely on later JavaScript
        // innovations like __defineSetter__
        if (len !== mixedVar.length) {
            // We know it's an array since length auto-changed with the addition of a
            // numeric property at its length end, so safely get rid of our bogus element
            mixedVar.length -= 1;
            return true;
        }
        // Get rid of the property we added onto a non-array object; only possible
        // side-effect is if the user adds back the property later, it will iterate
        // this property in the older order placement in IE (an order which should not
        // be depended on anyways)
        delete mixedVar[mixedVar.length];
        return false;
    };
    if (!mixedVar || typeof mixedVar !== 'object') {
        return false;
    }
    var isArray = _isArray(mixedVar);
    if (isArray) {
        return true;
    }
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.objectsAsArrays') : undefined) || 'on';
    if (iniVal === 'on') {
        var asString = Object.prototype.toString.call(mixedVar);
        var asFunc = _getFuncName(mixedVar.constructor);
        if (asString === '[object Object]' && asFunc === 'Object') {
            // Most likely a literal and intended as assoc. array
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19hcnJheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLFFBQVE7SUFDMUMsZ0RBQWdEO0lBQ2hELG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFDaEMsb0RBQW9EO0lBQ3BELG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsb0RBQW9EO0lBQ3BELCtFQUErRTtJQUMvRSxpREFBaUQ7SUFDakQsMEZBQTBGO0lBQzFGLDRDQUE0QztJQUM1QyxvRUFBb0U7SUFDcEUsNERBQTREO0lBQzVELGdDQUFnQztJQUNoQyx1REFBdUQ7SUFDdkQsb0JBQW9CO0lBQ3BCLCtDQUErQztJQUMvQyxxQkFBcUI7SUFDckIsZ0VBQWdFO0lBQ2hFLG9CQUFvQjtJQUNwQixxREFBcUQ7SUFDckQsZ0VBQWdFO0lBQ2hFLHFCQUFxQjtJQUNyQixrRUFBa0U7SUFDbEUscUJBQXFCO0lBRXJCLElBQUksWUFBWSxHQUFHLFVBQVUsRUFBRTtRQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLGFBQWEsQ0FBQTtTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtJQUNELElBQUksUUFBUSxHQUFHLFVBQVUsUUFBUTtRQUMvQix3RUFBd0U7UUFDeEUsa0VBQWtFO1FBQ2xFLHdEQUF3RDtRQUN4RCw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNwRixPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtRQUN6QixRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQTtRQUNuQyxtRkFBbUY7UUFDbkYscUNBQXFDO1FBQ3JDLG9FQUFvRTtRQUNwRSwyREFBMkQ7UUFDM0Qsd0VBQXdFO1FBQ3hFLDJEQUEyRDtRQUMzRCxtRUFBbUU7UUFDbkUsb0NBQW9DO1FBQ3BDLElBQUksR0FBRyxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDM0IseUVBQXlFO1lBQ3pFLDZFQUE2RTtZQUM3RSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQTtZQUNwQixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsMEVBQTBFO1FBQzFFLDJFQUEyRTtRQUMzRSw4RUFBOEU7UUFDOUUsMEJBQTBCO1FBQzFCLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNoQyxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQzdDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFaEMsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUN6SCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFL0MsSUFBSSxRQUFRLEtBQUssaUJBQWlCLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN6RCxxREFBcUQ7WUFDckQsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==