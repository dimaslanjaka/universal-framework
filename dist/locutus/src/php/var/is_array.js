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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX2FycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsUUFBUTtJQUMxQyxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3Qiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixvREFBb0Q7SUFDcEQsK0VBQStFO0lBQy9FLGlEQUFpRDtJQUNqRCwwRkFBMEY7SUFDMUYsNENBQTRDO0lBQzVDLG9FQUFvRTtJQUNwRSw0REFBNEQ7SUFDNUQsZ0NBQWdDO0lBQ2hDLHVEQUF1RDtJQUN2RCxvQkFBb0I7SUFDcEIsK0NBQStDO0lBQy9DLHFCQUFxQjtJQUNyQixnRUFBZ0U7SUFDaEUsb0JBQW9CO0lBQ3BCLHFEQUFxRDtJQUNyRCxnRUFBZ0U7SUFDaEUscUJBQXFCO0lBQ3JCLGtFQUFrRTtJQUNsRSxxQkFBcUI7SUFFckIsSUFBSSxZQUFZLEdBQUcsVUFBVSxFQUFFO1FBQzdCLElBQUksSUFBSSxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sYUFBYSxDQUFBO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBQ0QsSUFBSSxRQUFRLEdBQUcsVUFBVSxRQUFRO1FBQy9CLHdFQUF3RTtRQUN4RSxrRUFBa0U7UUFDbEUsd0RBQXdEO1FBQ3hELDhFQUE4RTtRQUM5RSxJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3BGLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFBO1FBQ25DLG1GQUFtRjtRQUNuRixxQ0FBcUM7UUFDckMsb0VBQW9FO1FBQ3BFLDJEQUEyRDtRQUMzRCx3RUFBd0U7UUFDeEUsMkRBQTJEO1FBQzNELG1FQUFtRTtRQUNuRSxvQ0FBb0M7UUFDcEMsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUMzQix5RUFBeUU7WUFDekUsNkVBQTZFO1lBQzdFLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFBO1lBQ3BCLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCwwRUFBMEU7UUFDMUUsMkVBQTJFO1FBQzNFLDhFQUE4RTtRQUM5RSwwQkFBMEI7UUFDMUIsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFBO0lBRUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDN0MsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVoQyxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFBO0lBQ3pILElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkQsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUUvQyxJQUFJLFFBQVEsS0FBSyxpQkFBaUIsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3pELHFEQUFxRDtZQUNyRCxPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9