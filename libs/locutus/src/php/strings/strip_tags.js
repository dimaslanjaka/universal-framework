module.exports = function strip_tags(input, allowed) {
    //  discuss at: https://locutus.io/php/strip_tags/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Luke Godfrey
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Pul
    //    input by: Alex
    //    input by: Marc Palau
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: Bobby Drake
    //    input by: Evertjan Garretsen
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Eric Nagel
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Tomasz Wesolowski
    // bugfixed by: Tymon Sturgeon (https://scryptonite.com)
    // bugfixed by: Tim de Koning (https://www.kingsquare.nl)
    //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>')
    //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>')
    //   returns 2: '<p>Kevin van Zonneveld</p>'
    //   example 3: strip_tags("<a href='https://kvz.io'>Kevin van Zonneveld</a>", "<a>")
    //   returns 3: "<a href='https://kvz.io'>Kevin van Zonneveld</a>"
    //   example 4: strip_tags('1 < 5 5 > 1')
    //   returns 4: '1 < 5 5 > 1'
    //   example 5: strip_tags('1 <br/> 1')
    //   returns 5: '1  1'
    //   example 6: strip_tags('1 <br/> 1', '<br>')
    //   returns 6: '1 <br/> 1'
    //   example 7: strip_tags('1 <br/> 1', '<br><br/>')
    //   returns 7: '1 <br/> 1'
    //   example 8: strip_tags('<i>hello</i> <<foo>script>world<</foo>/script>')
    //   returns 8: 'hello world'
    //   example 9: strip_tags(4)
    //   returns 9: '4'
    var _phpCastString = require('../_helpers/_phpCastString');
    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    var after = _phpCastString(input);
    // removes tha '<' char at the end of the string to replicate PHP's behaviour
    after = (after.substring(after.length - 1) === '<') ? after.substring(0, after.length - 1) : after;
    // recursively remove tags to ensure that the returned string doesn't contain forbidden tags after previous passes (e.g. '<<bait/>switch/>')
    while (true) {
        var before = after;
        after = before.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
        // return once no more tags are removed
        if (before === after) {
            return after;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBfdGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJpcF90YWdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLE9BQU87SUFDbEQsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCw0QkFBNEI7SUFDNUIsb0RBQW9EO0lBQ3BELG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0Isa0NBQWtDO0lBQ2xDLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwwQkFBMEI7SUFDMUIsb0RBQW9EO0lBQ3BELGlDQUFpQztJQUNqQyx3REFBd0Q7SUFDeEQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCxzRkFBc0Y7SUFDdEYsbURBQW1EO0lBQ25ELDRIQUE0SDtJQUM1SCw0Q0FBNEM7SUFDNUMscUZBQXFGO0lBQ3JGLGtFQUFrRTtJQUNsRSx5Q0FBeUM7SUFDekMsNkJBQTZCO0lBQzdCLHVDQUF1QztJQUN2QyxzQkFBc0I7SUFDdEIsK0NBQStDO0lBQy9DLDJCQUEyQjtJQUMzQixvREFBb0Q7SUFDcEQsMkJBQTJCO0lBQzNCLDRFQUE0RTtJQUM1RSw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUVuQixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUUxRCx3RkFBd0Y7SUFDeEYsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFMUYsSUFBSSxJQUFJLEdBQUcsNEJBQTRCLENBQUE7SUFDdkMsSUFBSSxrQkFBa0IsR0FBRywwQ0FBMEMsQ0FBQTtJQUVuRSxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakMsNkVBQTZFO0lBQzdFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBRWxHLDRJQUE0STtJQUM1SSxPQUFPLElBQUksRUFBRTtRQUNYLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUNsQixLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7WUFDM0UsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ3JFLENBQUMsQ0FBQyxDQUFBO1FBRUYsdUNBQXVDO1FBQ3ZDLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNwQixPQUFPLEtBQUssQ0FBQTtTQUNiO0tBQ0Y7QUFDSCxDQUFDLENBQUEifQ==