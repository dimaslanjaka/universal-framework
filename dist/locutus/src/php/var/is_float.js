module.exports = function is_float(mixedVar) {
    //  discuss at: https://locutus.io/php/is_float/
    // original by: Paulo Freitas
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // improved by: WebDevHobo (https://webdevhobo.blogspot.com/)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
    //   example 1: is_float(186.31)
    //   returns 1: true
    return +mixedVar === mixedVar && (!isFinite(mixedVar) || !!(mixedVar % 1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZmxvYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzX2Zsb2F0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsUUFBUTtJQUMxQyxnREFBZ0Q7SUFDaEQsNkJBQTZCO0lBQzdCLG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QseURBQXlEO0lBQ3pELDRGQUE0RjtJQUM1RiwwRkFBMEY7SUFDMUYsZ0NBQWdDO0lBQ2hDLG9CQUFvQjtJQUVwQixPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzVFLENBQUMsQ0FBQSJ9