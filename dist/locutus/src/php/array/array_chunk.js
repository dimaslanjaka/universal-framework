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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfY2h1bmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfY2h1bmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFlBQVk7SUFDOUQsbURBQW1EO0lBQ25ELG1FQUFtRTtJQUNuRSxvREFBb0Q7SUFDcEQsaUVBQWlFO0lBQ2pFLHFFQUFxRTtJQUNyRSw2REFBNkQ7SUFDN0QsaURBQWlEO0lBQ2pELG1FQUFtRTtJQUNuRSx3REFBd0Q7SUFDeEQsbUVBQW1FO0lBQ25FLGlEQUFpRDtJQUNqRCx5RUFBeUU7SUFDekUsMERBQTBEO0lBRTFELElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDVixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQTtJQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFVixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDWixPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDOUQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ25DLENBQUMsRUFBRSxDQUFBO2FBQ0o7U0FDRjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkIsQ0FBQyxFQUFFLENBQUE7YUFDSjtTQUNGO0tBQ0Y7U0FBTTtRQUNMLElBQUksWUFBWSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ25DLENBQUMsRUFBRSxDQUFBO2lCQUNKO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFO2dCQUNmLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDM0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN2QixDQUFDLEVBQUUsQ0FBQTtpQkFDSjthQUNGO1NBQ0Y7S0FDRjtJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=