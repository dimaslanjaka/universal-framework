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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBfdGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmlwX3RhZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxLQUFLLEVBQUUsT0FBTztJQUNsRCxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQiwwQkFBMEI7SUFDMUIsb0RBQW9EO0lBQ3BELDJCQUEyQjtJQUMzQixrQ0FBa0M7SUFDbEMsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsaUNBQWlDO0lBQ2pDLHdEQUF3RDtJQUN4RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHNGQUFzRjtJQUN0RixtREFBbUQ7SUFDbkQsNEhBQTRIO0lBQzVILDRDQUE0QztJQUM1QyxxRkFBcUY7SUFDckYsa0VBQWtFO0lBQ2xFLHlDQUF5QztJQUN6Qyw2QkFBNkI7SUFDN0IsdUNBQXVDO0lBQ3ZDLHNCQUFzQjtJQUN0QiwrQ0FBK0M7SUFDL0MsMkJBQTJCO0lBQzNCLG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0IsNEVBQTRFO0lBQzVFLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBRW5CLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBRTFELHdGQUF3RjtJQUN4RixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUxRixJQUFJLElBQUksR0FBRyw0QkFBNEIsQ0FBQTtJQUN2QyxJQUFJLGtCQUFrQixHQUFHLDBDQUEwQyxDQUFBO0lBRW5FLElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQyw2RUFBNkU7SUFDN0UsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFbEcsNElBQTRJO0lBQzVJLE9BQU8sSUFBSSxFQUFFO1FBQ1gsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtZQUMzRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDckUsQ0FBQyxDQUFDLENBQUE7UUFFRix1Q0FBdUM7UUFDdkMsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFBO1NBQ2I7S0FDRjtBQUNILENBQUMsQ0FBQSJ9