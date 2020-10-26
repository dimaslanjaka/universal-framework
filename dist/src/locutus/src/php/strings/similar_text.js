module.exports = function similar_text(first, second, percent) {
    //  discuss at: https://locutus.io/php/similar_text/
    // original by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: Chris McMacken
    // bugfixed by: Jarkko Rantavuori original by findings in stackoverflow (https://stackoverflow.com/questions/14136349/how-does-similar-text-work)
    // improved by: Markus Padourek (taken from https://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
    //   example 1: similar_text('Hello World!', 'Hello locutus!')
    //   returns 1: 8
    //   example 2: similar_text('Hello World!', null)
    //   returns 2: 0
    if (first === null ||
        second === null ||
        typeof first === 'undefined' ||
        typeof second === 'undefined') {
        return 0;
    }
    first += '';
    second += '';
    var pos1 = 0;
    var pos2 = 0;
    var max = 0;
    var firstLength = first.length;
    var secondLength = second.length;
    var p;
    var q;
    var l;
    var sum;
    for (p = 0; p < firstLength; p++) {
        for (q = 0; q < secondLength; q++) {
            for (l = 0; (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++) { // eslint-disable-line max-len
                // @todo: ^-- break up this crazy for loop and put the logic in its body
            }
            if (l > max) {
                max = l;
                pos1 = p;
                pos2 = q;
            }
        }
    }
    sum = max;
    if (sum) {
        if (pos1 && pos2) {
            sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));
        }
        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
            sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
    }
    if (!percent) {
        return sum;
    }
    return (sum * 200) / (firstLength + secondLength);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhcl90ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc2ltaWxhcl90ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO0lBQzVELG9EQUFvRDtJQUNwRCx5REFBeUQ7SUFDekQsOEJBQThCO0lBQzlCLGlKQUFpSjtJQUNqSiwySEFBMkg7SUFDM0gsOERBQThEO0lBQzlELGlCQUFpQjtJQUNqQixrREFBa0Q7SUFDbEQsaUJBQWlCO0lBRWpCLElBQUksS0FBSyxLQUFLLElBQUk7UUFDaEIsTUFBTSxLQUFLLElBQUk7UUFDZixPQUFPLEtBQUssS0FBSyxXQUFXO1FBQzVCLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUMvQixPQUFPLENBQUMsQ0FBQTtLQUNUO0lBRUQsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUNYLE1BQU0sSUFBSSxFQUFFLENBQUE7SUFFWixJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFDWixJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFDWixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDWCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzlCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDaEMsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxHQUFHLENBQUE7SUFFUCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSw4QkFBOEI7Z0JBQ2xKLHdFQUF3RTthQUN6RTtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDWCxHQUFHLEdBQUcsQ0FBQyxDQUFBO2dCQUNQLElBQUksR0FBRyxDQUFDLENBQUE7Z0JBQ1IsSUFBSSxHQUFHLENBQUMsQ0FBQTthQUNUO1NBQ0Y7S0FDRjtJQUVELEdBQUcsR0FBRyxHQUFHLENBQUE7SUFFVCxJQUFJLEdBQUcsRUFBRTtRQUNQLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDbkU7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDLEVBQUU7WUFDN0QsR0FBRyxJQUFJLFlBQVksQ0FDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLFdBQVcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFDeEIsWUFBWSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzlCO0tBQ0Y7SUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxHQUFHLENBQUE7S0FDWDtJQUVELE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUE7QUFDbkQsQ0FBQyxDQUFBIn0=