module.exports = function echo() {
    //  discuss at: https://locutus.io/php/echo/
    // original by: Philip Peterson
    // improved by: echo is bad
    // improved by: Nate
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Der Simon (https://innerdom.sourceforge.net/)
    // bugfixed by: Eugene Bulkin (https://doubleaw.com/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: EdorFaus
    //      note 1: In 1.3.2 and earlier, this function wrote to the body of the document when it
    //      note 1: was called in webbrowsers, in addition to supporting XUL.
    //      note 1: This involved >100 lines of boilerplate to do this in a safe way.
    //      note 1: Since I can't imageine a complelling use-case for this, and XUL is deprecated
    //      note 1: I have removed this behavior in favor of just calling `console.log`
    //      note 2: You'll see functions depends on `echo` instead of `console.log` as we'll want
    //      note 2: to have 1 contact point to interface with the outside world, so that it's easy
    //      note 2: to support other ways of printing output.
    //  revised by: Kevin van Zonneveld (https://kvz.io)
    //    input by: JB
    //   example 1: echo('Hello world')
    //   returns 1: undefined
    var args = Array.prototype.slice.call(arguments);
    return console.log(args.join(' '));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2VjaG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUk7SUFDNUIsNENBQTRDO0lBQzVDLCtCQUErQjtJQUMvQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDZEQUE2RDtJQUM3RCxxREFBcUQ7SUFDckQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIsNkZBQTZGO0lBQzdGLHlFQUF5RTtJQUN6RSxpRkFBaUY7SUFDakYsNkZBQTZGO0lBQzdGLG1GQUFtRjtJQUNuRiw2RkFBNkY7SUFDN0YsOEZBQThGO0lBQzlGLHlEQUF5RDtJQUN6RCxvREFBb0Q7SUFDcEQsa0JBQWtCO0lBQ2xCLG1DQUFtQztJQUNuQyx5QkFBeUI7SUFFekIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2hELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=