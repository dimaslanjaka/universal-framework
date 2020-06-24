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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9mdW5jaGFuZC9mdW5jdGlvbl9leGlzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGVBQWUsQ0FBRSxRQUFRO0lBQ2pELHVEQUF1RDtJQUN2RCxvREFBb0Q7SUFDcEQsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3QixvREFBb0Q7SUFDcEQsMkNBQTJDO0lBQzNDLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFFdEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFL0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDaEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUM3QjtJQUVELE9BQU8sT0FBTyxRQUFRLEtBQUssVUFBVSxDQUFBO0FBQ3ZDLENBQUMsQ0FBQSJ9