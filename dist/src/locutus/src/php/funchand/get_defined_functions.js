module.exports = function get_defined_functions() {
    //  discuss at: https://locutus.io/php/get_defined_functions/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Test case 1: If get_defined_functions can find
    //      note 1: itself in the defined functions, it worked :)
    //   example 1: function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if (array[i] === p_val) return true} return false}
    //   example 1: var $funcs = get_defined_functions()
    //   example 1: var $found = test_in_array($funcs, 'get_defined_functions')
    //   example 1: var $result = $found
    //   returns 1: true
    //        test: skip-1
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    var i = '';
    var arr = [];
    var already = {};
    for (i in $global) {
        try {
            if (typeof $global[i] === 'function') {
                if (!already[i]) {
                    already[i] = 1;
                    arr.push(i);
                }
            }
            else if (typeof $global[i] === 'object') {
                for (var j in $global[i]) {
                    if (typeof $global[j] === 'function' && $global[j] && !already[j]) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
        }
        catch (e) {
            // Some objects in Firefox throw exceptions when their
            // properties are accessed (e.g., sessionStorage)
        }
    }
    return arr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X2RlZmluZWRfZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2Z1bmNoYW5kL2dldF9kZWZpbmVkX2Z1bmN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMscUJBQXFCO0lBQzdDLDZEQUE2RDtJQUM3RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCw2REFBNkQ7SUFDN0QsdUpBQXVKO0lBQ3ZKLG9EQUFvRDtJQUNwRCwyRUFBMkU7SUFDM0Usb0NBQW9DO0lBQ3BDLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFFdEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFakMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBRWhCLEtBQUssQ0FBQyxJQUFJLE9BQU8sRUFBRTtRQUNqQixJQUFJO1lBQ0YsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNaO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3pDLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN4QixJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ2pFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDWjtpQkFDRjthQUNGO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLHNEQUFzRDtZQUN0RCxpREFBaUQ7U0FDbEQ7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=