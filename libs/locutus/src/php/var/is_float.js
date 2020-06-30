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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZmxvYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19mbG9hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLFFBQVE7SUFDMUMsZ0RBQWdEO0lBQ2hELDZCQUE2QjtJQUM3QixvREFBb0Q7SUFDcEQsNkRBQTZEO0lBQzdELHlEQUF5RDtJQUN6RCw0RkFBNEY7SUFDNUYsMEZBQTBGO0lBQzFGLGdDQUFnQztJQUNoQyxvQkFBb0I7SUFFcEIsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM1RSxDQUFDLENBQUEifQ==