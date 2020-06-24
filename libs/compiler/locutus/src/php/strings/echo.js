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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9lY2hvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJO0lBQzVCLDRDQUE0QztJQUM1QywrQkFBK0I7SUFDL0IsMkJBQTJCO0lBQzNCLG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QscURBQXFEO0lBQ3JELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLDZGQUE2RjtJQUM3Rix5RUFBeUU7SUFDekUsaUZBQWlGO0lBQ2pGLDZGQUE2RjtJQUM3RixtRkFBbUY7SUFDbkYsNkZBQTZGO0lBQzdGLDhGQUE4RjtJQUM5Rix5REFBeUQ7SUFDekQsb0RBQW9EO0lBQ3BELGtCQUFrQjtJQUNsQixtQ0FBbUM7SUFDbkMseUJBQXlCO0lBRXpCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNoRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQSJ9