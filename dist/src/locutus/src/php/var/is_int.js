module.exports = function is_int(mixedVar) {
    //  discuss at: https://locutus.io/php/is_int/
    // original by: Alex
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: WebDevHobo (https://webdevhobo.blogspot.com/)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //  revised by: Matt Bradley
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_int(23)
    //   returns 1: true
    //   example 2: is_int('23')
    //   returns 2: false
    //   example 3: is_int(23.5)
    //   returns 3: false
    //   example 4: is_int(true)
    //   returns 4: false
    return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19pbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxRQUFRO0lBQ3hDLDhDQUE4QztJQUM5QyxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELDZEQUE2RDtJQUM3RCx5REFBeUQ7SUFDekQsNEJBQTRCO0lBQzVCLG9EQUFvRDtJQUNwRCw0RkFBNEY7SUFDNUYsMEZBQTBGO0lBQzFGLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFFckIsT0FBTyxRQUFRLEtBQUssQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDeEUsQ0FBQyxDQUFBIn0=