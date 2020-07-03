module.exports = function function_exists(funcName) {
    //  discuss at: https://locutus.io/php/function_exists/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Steve Clay
    // improved by: Legaev Andrey
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: function_exists('isFinite')
    //   returns 1: true
    //        test: skip-1
    var $global = (typeof window !== 'undefined' ? window : global);
    if (typeof funcName === 'string') {
        funcName = $global[funcName];
    }
    return typeof funcName === 'function';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2Z1bmNoYW5kL2Z1bmN0aW9uX2V4aXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLFFBQVE7SUFDakQsdURBQXVEO0lBQ3ZELG9EQUFvRDtJQUNwRCwwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLG9EQUFvRDtJQUNwRCwyQ0FBMkM7SUFDM0Msb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUV0QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzdCO0lBRUQsT0FBTyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUE7QUFDdkMsQ0FBQyxDQUFBIn0=