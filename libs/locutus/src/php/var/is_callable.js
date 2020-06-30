module.exports = function is_callable(mixedVar, syntaxOnly, callableName) {
    //  discuss at: https://locutus.io/php/is_callable/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: François
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: KnightYoshi
    // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //      note 1: The variable callableName cannot work as a string variable passed by
    //      note 1: reference as in PHP (since JavaScript does not support passing
    //      note 1: strings by reference), but instead will take the name of
    //      note 1: a global variable and set that instead.
    //      note 1: When used on an object, depends on a constructor property
    //      note 1: being kept on the object prototype
    //      note 2: Depending on the `callableName` that is passed, this function can use eval.
    //      note 2: The eval input is however checked to only allow valid function names,
    //      note 2: So it should not be unsafer than uses without eval (seeing as you can)
    //      note 2: already pass any function to be executed here.
    //   example 1: is_callable('is_callable')
    //   returns 1: true
    //   example 2: is_callable('bogusFunction', true)
    //   returns 2: true // gives true because does not do strict checking
    //   example 3: function SomeClass () {}
    //   example 3: SomeClass.prototype.someMethod = function (){}
    //   example 3: var testObj = new SomeClass()
    //   example 3: is_callable([testObj, 'someMethod'], true, 'myVar')
    //   example 3: var $result = myVar
    //   returns 3: 'SomeClass::someMethod'
    //   example 4: is_callable(function () {})
    //   returns 4: true
    //   example 5: is_callable(class MyClass {})
    //   returns 5: false
    var $global = (typeof window !== 'undefined' ? window : global);
    var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    var name = '';
    var obj = {};
    var method = '';
    var validFunctionName = false;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    // eslint-disable-next-line no-useless-escape
    if (/(^class|\(this\,)/.test(mixedVar.toString())) {
        return false;
    }
    if (typeof mixedVar === 'string') {
        obj = $global;
        method = mixedVar;
        name = mixedVar;
        validFunctionName = !!name.match(validJSFunctionNamePattern);
    }
    else if (typeof mixedVar === 'function') {
        return true;
    }
    else if (Object.prototype.toString.call(mixedVar) === '[object Array]' &&
        mixedVar.length === 2 &&
        typeof mixedVar[0] === 'object' &&
        typeof mixedVar[1] === 'string') {
        obj = mixedVar[0];
        method = mixedVar[1];
        name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
    }
    if (syntaxOnly || typeof obj[method] === 'function') {
        if (callableName) {
            $global[callableName] = name;
        }
        return true;
    }
    // validFunctionName avoids exploits
    if (validFunctionName && typeof eval(method) === 'function') { // eslint-disable-line no-eval
        if (callableName) {
            $global[callableName] = name;
        }
        return true;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfY2FsbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19jYWxsYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWTtJQUN2RSxtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4QixvREFBb0Q7SUFDcEQsMkJBQTJCO0lBQzNCLDJEQUEyRDtJQUMzRCxvRkFBb0Y7SUFDcEYsOEVBQThFO0lBQzlFLHdFQUF3RTtJQUN4RSx1REFBdUQ7SUFDdkQseUVBQXlFO0lBQ3pFLGtEQUFrRDtJQUNsRCwyRkFBMkY7SUFDM0YscUZBQXFGO0lBQ3JGLHNGQUFzRjtJQUN0Riw4REFBOEQ7SUFDOUQsMENBQTBDO0lBQzFDLG9CQUFvQjtJQUNwQixrREFBa0Q7SUFDbEQsc0VBQXNFO0lBQ3RFLHdDQUF3QztJQUN4Qyw4REFBOEQ7SUFDOUQsNkNBQTZDO0lBQzdDLG1FQUFtRTtJQUNuRSxtQ0FBbUM7SUFDbkMsdUNBQXVDO0lBQ3ZDLDJDQUEyQztJQUMzQyxvQkFBb0I7SUFDcEIsNkNBQTZDO0lBQzdDLHFCQUFxQjtJQUVyQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxJQUFJLDBCQUEwQixHQUFHLGtEQUFrRCxDQUFBO0lBRW5GLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFBO0lBRTdCLElBQUksV0FBVyxHQUFHLFVBQVUsRUFBRTtRQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLGFBQWEsQ0FBQTtTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtJQUVELDZDQUE2QztJQUM3QyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDaEMsR0FBRyxHQUFHLE9BQU8sQ0FBQTtRQUNiLE1BQU0sR0FBRyxRQUFRLENBQUE7UUFDakIsSUFBSSxHQUFHLFFBQVEsQ0FBQTtRQUNmLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7S0FDN0Q7U0FBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQTtLQUNaO1NBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssZ0JBQWdCO1FBQ3RFLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNyQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQy9CLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUNqQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDcEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQTtLQUN6RTtJQUVELElBQUksVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNuRCxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFBO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELG9DQUFvQztJQUNwQyxJQUFJLGlCQUFpQixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsRUFBRSxFQUFFLDhCQUE4QjtRQUMzRixJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFBO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=