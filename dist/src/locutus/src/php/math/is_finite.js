module.exports = function is_finite(val) {
    //  discuss at: https://locutus.io/php/is_finite/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: is_finite(Infinity)
    //   returns 1: false
    //   example 2: is_finite(-Infinity)
    //   returns 2: false
    //   example 3: is_finite(0)
    //   returns 3: true
    var warningType = '';
    if (val === Infinity || val === -Infinity) {
        return false;
    }
    // Some warnings for maximum PHP compatibility
    if (typeof val === 'object') {
        warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
    }
    else if (typeof val === 'string' && !val.match(/^[+-]?\d/)) {
        // simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        var msg = 'Warning: is_finite() expects parameter 1 to be double, ' + warningType + ' given';
        throw new Error(msg);
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZmluaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvaXNfZmluaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRztJQUN0QyxpREFBaUQ7SUFDakQsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxxQkFBcUI7SUFDckIsb0NBQW9DO0lBQ3BDLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBRXBCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ3pDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCw4Q0FBOEM7SUFDOUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDM0IsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzlGO1NBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVELHlFQUF5RTtRQUN6RSxXQUFXLEdBQUcsUUFBUSxDQUFBO0tBQ3ZCO0lBQ0QsSUFBSSxXQUFXLEVBQUU7UUFDZixJQUFJLEdBQUcsR0FBRyx5REFBeUQsR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFBO1FBQzVGLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDckI7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9