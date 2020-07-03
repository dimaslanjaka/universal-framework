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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF91c2VyX2Z1bmNfYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZnVuY2hhbmQvY2FsbF91c2VyX2Z1bmNfYXJyYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFFLEVBQUUsRUFBRSxVQUFVO0lBQzVELDREQUE0RDtJQUM1RCx5REFBeUQ7SUFDekQseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELHFEQUFxRDtJQUNyRCxtRUFBbUU7SUFDbkUsdUZBQXVGO0lBQ3ZGLHNGQUFzRjtJQUN0Riw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELG9CQUFvQjtJQUNwQixrREFBa0Q7SUFDbEQscUJBQXFCO0lBRXJCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBRWhCLElBQUksMEJBQTBCLEdBQUcsa0RBQWtELENBQUE7SUFFbkYsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDckMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNuQjthQUFNLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO1lBQy9DLElBQUksR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsa0NBQWtDO1NBQ2pGO0tBQ0Y7U0FBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUNsRSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQSxDQUFDLDhCQUE4QjthQUN4RTtTQUNGO2FBQU07WUFDTCxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BCO1FBRUQsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3hDLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDdkI7aUJBQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7Z0JBQ2xELEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7YUFDbkQ7U0FDRjthQUFNLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3BDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDZDtLQUNGO1NBQU0sSUFBSSxPQUFPLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbkMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtLQUNWO0lBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsMEJBQTBCLENBQUMsQ0FBQTtLQUNuRDtJQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFBIn0=