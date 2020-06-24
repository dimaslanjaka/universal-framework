module.exports = function call_user_func_array(cb, parameters) {
    //  discuss at: https://locutus.io/php/call_user_func_array/
    // original by: Thiago Mata (https://thiagomata.blog.com)
    //  revised by: Jon Hohle
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Diplom@t (https://difane.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Depending on the `cb` that is passed,
    //      note 1: this function can use `eval` and/or `new Function`.
    //      note 1: The `eval` input is however checked to only allow valid function names,
    //      note 1: So it should not be unsafer than uses without eval (seeing as you can)
    //      note 1: already pass any function to be executed here.
    //   example 1: call_user_func_array('isNaN', ['a'])
    //   returns 1: true
    //   example 2: call_user_func_array('isNaN', [1])
    //   returns 2: false
    var $global = (typeof window !== 'undefined' ? window : global);
    var func;
    var scope = null;
    var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    if (typeof cb === 'string') {
        if (typeof $global[cb] === 'function') {
            func = $global[cb];
        }
        else if (cb.match(validJSFunctionNamePattern)) {
            func = (new Function(null, 'return ' + cb)()); // eslint-disable-line no-new-func
        }
    }
    else if (Object.prototype.toString.call(cb) === '[object Array]') {
        if (typeof cb[0] === 'string') {
            if (cb[0].match(validJSFunctionNamePattern)) {
                func = eval(cb[0] + "['" + cb[1] + "']"); // eslint-disable-line no-eval
            }
        }
        else {
            func = cb[0][cb[1]];
        }
        if (typeof cb[0] === 'string') {
            if (typeof $global[cb[0]] === 'function') {
                scope = $global[cb[0]];
            }
            else if (cb[0].match(validJSFunctionNamePattern)) {
                scope = eval(cb[0]); // eslint-disable-line no-eval
            }
        }
        else if (typeof cb[0] === 'object') {
            scope = cb[0];
        }
    }
    else if (typeof cb === 'function') {
        func = cb;
    }
    if (typeof func !== 'function') {
        throw new Error(func + ' is not a valid function');
    }
    return func.apply(scope, parameters);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF91c2VyX2Z1bmNfYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2Z1bmNoYW5kL2NhbGxfdXNlcl9mdW5jX2FycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxvQkFBb0IsQ0FBRSxFQUFFLEVBQUUsVUFBVTtJQUM1RCw0REFBNEQ7SUFDNUQseURBQXlEO0lBQ3pELHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCxxREFBcUQ7SUFDckQsbUVBQW1FO0lBQ25FLHVGQUF1RjtJQUN2RixzRkFBc0Y7SUFDdEYsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsa0RBQWtEO0lBQ2xELHFCQUFxQjtJQUVyQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQTtJQUVoQixJQUFJLDBCQUEwQixHQUFHLGtEQUFrRCxDQUFBO0lBRW5GLElBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQUksT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3JDLElBQUksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDbkI7YUFBTSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsRUFBRTtZQUMvQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLGtDQUFrQztTQUNqRjtLQUNGO1NBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDbEUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7Z0JBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7YUFDeEU7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwQjtRQUVELElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUN4QyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3ZCO2lCQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO2dCQUNsRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsOEJBQThCO2FBQ25EO1NBQ0Y7YUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2Q7S0FDRjtTQUFNLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO1FBQ25DLElBQUksR0FBRyxFQUFFLENBQUE7S0FDVjtJQUVELElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLDBCQUEwQixDQUFDLENBQUE7S0FDbkQ7SUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQSJ9