module.exports = function capwords(str) {
    //  discuss at: https://locutus.io/python/capwords/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
    // improved by: Robin
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: James (https://www.james-bell.co.uk/)
    //   example 1: capwords('kevin van  zonneveld')
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: capwords('HELLO WORLD')
    //   returns 2: 'HELLO WORLD'
    var pattern = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g;
    return (str + '').replace(pattern, function ($1) {
        return $1.toUpperCase();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwd29yZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9weXRob24vc3RyaW5nL2NhcHdvcmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsR0FBRztJQUNyQyxtREFBbUQ7SUFDbkQscUVBQXFFO0lBQ3JFLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxxREFBcUQ7SUFDckQsZ0RBQWdEO0lBQ2hELHNDQUFzQztJQUN0Qyx1Q0FBdUM7SUFDdkMsNkJBQTZCO0lBRTdCLElBQUksT0FBTyxHQUFHLGdEQUFnRCxDQUFBO0lBQzlELE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUU7UUFDN0MsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDekIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEifQ==