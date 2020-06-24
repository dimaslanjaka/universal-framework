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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaXNfaW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsUUFBUTtJQUN4Qyw4Q0FBOEM7SUFDOUMsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QseURBQXlEO0lBQ3pELDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQsNEZBQTRGO0lBQzVGLDBGQUEwRjtJQUMxRiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFDckIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBRXJCLE9BQU8sUUFBUSxLQUFLLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3hFLENBQUMsQ0FBQSJ9