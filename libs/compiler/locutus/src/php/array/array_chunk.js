module.exports = function array_chunk(input, size, preserveKeys) {
    //  discuss at: https://locutus.io/php/array_chunk/
    // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Important note: Per the ECMAScript specification,
    //      note 1: objects may not always iterate in a predictable order
    //   example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2)
    //   returns 1: [['Kevin', 'van'], ['Zonneveld']]
    //   example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true)
    //   returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
    //   example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2)
    //   returns 3: [['Kevin', 'van'], ['Zonneveld']]
    //   example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true)
    //   returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]
    var x;
    var p = '';
    var i = 0;
    var c = -1;
    var l = input.length || 0;
    var n = [];
    if (size < 1) {
        return null;
    }
    if (Object.prototype.toString.call(input) === '[object Array]') {
        if (preserveKeys) {
            while (i < l) {
                (x = i % size)
                    ? n[c][i] = input[i]
                    : n[++c] = {};
                n[c][i] = input[i];
                i++;
            }
        }
        else {
            while (i < l) {
                (x = i % size)
                    ? n[c][x] = input[i]
                    : n[++c] = [input[i]];
                i++;
            }
        }
    }
    else {
        if (preserveKeys) {
            for (p in input) {
                if (input.hasOwnProperty(p)) {
                    (x = i % size)
                        ? n[c][p] = input[p]
                        : n[++c] = {};
                    n[c][p] = input[p];
                    i++;
                }
            }
        }
        else {
            for (p in input) {
                if (input.hasOwnProperty(p)) {
                    (x = i % size)
                        ? n[c][x] = input[p]
                        : n[++c] = [input[p]];
                    i++;
                }
            }
        }
    }
    return n;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY2h1bmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X2NodW5rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZO0lBQzlELG1EQUFtRDtJQUNuRCxtRUFBbUU7SUFDbkUsb0RBQW9EO0lBQ3BELGlFQUFpRTtJQUNqRSxxRUFBcUU7SUFDckUsNkRBQTZEO0lBQzdELGlEQUFpRDtJQUNqRCxtRUFBbUU7SUFDbkUsd0RBQXdEO0lBQ3hELG1FQUFtRTtJQUNuRSxpREFBaUQ7SUFDakQseUVBQXlFO0lBQ3pFLDBEQUEwRDtJQUUxRCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUE7SUFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVYsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1FBQzlELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNuQyxDQUFDLEVBQUUsQ0FBQTthQUNKO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZCLENBQUMsRUFBRSxDQUFBO2FBQ0o7U0FDRjtLQUNGO1NBQU07UUFDTCxJQUFJLFlBQVksRUFBRTtZQUNoQixLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7Z0JBQ2YsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNuQyxDQUFDLEVBQUUsQ0FBQTtpQkFDSjthQUNGO1NBQ0Y7YUFBTTtZQUNMLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDdkIsQ0FBQyxFQUFFLENBQUE7aUJBQ0o7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9