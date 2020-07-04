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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfY2FsbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX2NhbGxhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZO0lBQ3ZFLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0IsMkRBQTJEO0lBQzNELG9GQUFvRjtJQUNwRiw4RUFBOEU7SUFDOUUsd0VBQXdFO0lBQ3hFLHVEQUF1RDtJQUN2RCx5RUFBeUU7SUFDekUsa0RBQWtEO0lBQ2xELDJGQUEyRjtJQUMzRixxRkFBcUY7SUFDckYsc0ZBQXNGO0lBQ3RGLDhEQUE4RDtJQUM5RCwwQ0FBMEM7SUFDMUMsb0JBQW9CO0lBQ3BCLGtEQUFrRDtJQUNsRCxzRUFBc0U7SUFDdEUsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCw2Q0FBNkM7SUFDN0MsbUVBQW1FO0lBQ25FLG1DQUFtQztJQUNuQyx1Q0FBdUM7SUFDdkMsMkNBQTJDO0lBQzNDLG9CQUFvQjtJQUNwQiw2Q0FBNkM7SUFDN0MscUJBQXFCO0lBRXJCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRS9ELElBQUksMEJBQTBCLEdBQUcsa0RBQWtELENBQUE7SUFFbkYsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUE7SUFFN0IsSUFBSSxXQUFXLEdBQUcsVUFBVSxFQUFFO1FBQzVCLElBQUksSUFBSSxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sYUFBYSxDQUFBO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBRUQsNkNBQTZDO0lBQzdDLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO1FBQ2pELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxHQUFHLEdBQUcsT0FBTyxDQUFBO1FBQ2IsTUFBTSxHQUFHLFFBQVEsQ0FBQTtRQUNqQixJQUFJLEdBQUcsUUFBUSxDQUFBO1FBQ2YsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtLQUM3RDtTQUFNLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7U0FBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxnQkFBZ0I7UUFDdEUsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7UUFDL0IsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ2pDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFBO0tBQ3pFO0lBRUQsSUFBSSxVQUFVLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQ25ELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUE7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsb0NBQW9DO0lBQ3BDLElBQUksaUJBQWlCLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVSxFQUFFLEVBQUUsOEJBQThCO1FBQzNGLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUE7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==