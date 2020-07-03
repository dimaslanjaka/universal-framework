module.exports = function empty(mixedVar) {
    //  discuss at: https://locutus.io/php/empty/
    // original by: Philippe Baumann
    //    input by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: LH
    //    input by: Stoyan Kyosev (https://www.svest.org/)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Francesco
    // improved by: Marc Jansen
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: empty(null)
    //   returns 1: true
    //   example 2: empty(undefined)
    //   returns 2: true
    //   example 3: empty([])
    //   returns 3: true
    //   example 4: empty({})
    //   returns 4: true
    //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
    //   returns 5: false
    var undef;
    var key;
    var i;
    var len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsUUFBUTtJQUN2Qyw2Q0FBNkM7SUFDN0MsZ0NBQWdDO0lBQ2hDLDhEQUE4RDtJQUM5RCxrQkFBa0I7SUFDbEIsc0RBQXNEO0lBQ3RELG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQseUJBQXlCO0lBQ3pCLDJCQUEyQjtJQUMzQix5REFBeUQ7SUFDekQsMkJBQTJCO0lBQzNCLG9CQUFvQjtJQUNwQixnQ0FBZ0M7SUFDaEMsb0JBQW9CO0lBQ3BCLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLG9CQUFvQjtJQUNwQixvRUFBb0U7SUFDcEUscUJBQXFCO0lBRXJCLElBQUksS0FBSyxDQUFBO0lBQ1QsSUFBSSxHQUFHLENBQUE7SUFDUCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRWxELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQUksUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7SUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDcEIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLEtBQUssQ0FBQTthQUNiO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==