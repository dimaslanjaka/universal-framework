module.exports = function is_object(mixedVar) {
    //  discuss at: https://locutus.io/php/is_object/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Legaev Andrey
    // improved by: Michael White (https://getsprink.com)
    //   example 1: is_object('23')
    //   returns 1: false
    //   example 2: is_object({foo: 'bar'})
    //   returns 2: true
    //   example 3: is_object(null)
    //   returns 3: false
    if (Object.prototype.toString.call(mixedVar) === '[object Array]') {
        return false;
    }
    return mixedVar !== null && typeof mixedVar === 'object';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfb2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19vYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxRQUFRO0lBQzNDLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsNkJBQTZCO0lBQzdCLHFEQUFxRDtJQUNyRCwrQkFBK0I7SUFDL0IscUJBQXFCO0lBQ3JCLHVDQUF1QztJQUN2QyxvQkFBb0I7SUFDcEIsK0JBQStCO0lBQy9CLHFCQUFxQjtJQUVyQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUNqRSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsT0FBTyxRQUFRLEtBQUssSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQTtBQUMxRCxDQUFDLENBQUEifQ==