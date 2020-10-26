module.exports = function bindec(binaryString) {
    //  discuss at: https://locutus.io/php/bindec/
    // original by: Philippe Baumann
    //   example 1: bindec('110011')
    //   returns 1: 51
    //   example 2: bindec('000110011')
    //   returns 2: 51
    //   example 3: bindec('111')
    //   returns 3: 7
    binaryString = (binaryString + '').replace(/[^01]/gi, '');
    return parseInt(binaryString, 2);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvYmluZGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsWUFBWTtJQUM1Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBRWpCLFlBQVksR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRXpELE9BQU8sUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNsQyxDQUFDLENBQUEifQ==