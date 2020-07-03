module.exports = function octdec(octString) {
    //  discuss at: https://locutus.io/php/octdec/
    // original by: Philippe Baumann
    //   example 1: octdec('77')
    //   returns 1: 63
    octString = (octString + '').replace(/[^0-7]/gi, '');
    return parseInt(octString, 8);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2N0ZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvb2N0ZGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsU0FBUztJQUN6Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLDRCQUE0QjtJQUM1QixrQkFBa0I7SUFFbEIsU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEQsT0FBTyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQSJ9