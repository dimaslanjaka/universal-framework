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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhcl90ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NpbWlsYXJfdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztJQUM1RCxvREFBb0Q7SUFDcEQseURBQXlEO0lBQ3pELDhCQUE4QjtJQUM5QixpSkFBaUo7SUFDakosMkhBQTJIO0lBQzNILDhEQUE4RDtJQUM5RCxpQkFBaUI7SUFDakIsa0RBQWtEO0lBQ2xELGlCQUFpQjtJQUVqQixJQUFJLEtBQUssS0FBSyxJQUFJO1FBQ2hCLE1BQU0sS0FBSyxJQUFJO1FBQ2YsT0FBTyxLQUFLLEtBQUssV0FBVztRQUM1QixPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDL0IsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUVELEtBQUssSUFBSSxFQUFFLENBQUE7SUFDWCxNQUFNLElBQUksRUFBRSxDQUFBO0lBRVosSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ1osSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUM5QixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQ2hDLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksR0FBRyxDQUFBO0lBRVAsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsOEJBQThCO2dCQUNsSix3RUFBd0U7YUFDekU7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7Z0JBQ1gsR0FBRyxHQUFHLENBQUMsQ0FBQTtnQkFDUCxJQUFJLEdBQUcsQ0FBQyxDQUFBO2dCQUNSLElBQUksR0FBRyxDQUFDLENBQUE7YUFDVDtTQUNGO0tBQ0Y7SUFFRCxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBRVQsSUFBSSxHQUFHLEVBQUU7UUFDUCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQ25FO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxFQUFFO1lBQzdELEdBQUcsSUFBSSxZQUFZLENBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxXQUFXLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQ3hCLFlBQVksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUM5QjtLQUNGO0lBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sR0FBRyxDQUFBO0tBQ1g7SUFFRCxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQSJ9