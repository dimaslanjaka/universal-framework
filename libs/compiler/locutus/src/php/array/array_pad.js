module.exports = function array_pad(input, padSize, padValue) {
    //  discuss at: https://locutus.io/php/array_pad/
    // original by: Waldo Malqui Silva (https://waldo.malqui.info)
    //   example 1: array_pad([ 7, 8, 9 ], 2, 'a')
    //   returns 1: [ 7, 8, 9]
    //   example 2: array_pad([ 7, 8, 9 ], 5, 'a')
    //   returns 2: [ 7, 8, 9, 'a', 'a']
    //   example 3: array_pad([ 7, 8, 9 ], 5, 2)
    //   returns 3: [ 7, 8, 9, 2, 2]
    //   example 4: array_pad([ 7, 8, 9 ], -5, 'a')
    //   returns 4: [ 'a', 'a', 7, 8, 9 ]
    var pad = [];
    var newArray = [];
    var newLength;
    var diff = 0;
    var i = 0;
    if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
        newLength = ((padSize < 0) ? (padSize * -1) : padSize);
        diff = newLength - input.length;
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                newArray[i] = padValue;
            }
            pad = ((padSize < 0) ? newArray.concat(input) : input.concat(newArray));
        }
        else {
            pad = input;
        }
    }
    return pad;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9wYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVE7SUFDM0QsaURBQWlEO0lBQ2pELDhEQUE4RDtJQUM5RCw4Q0FBOEM7SUFDOUMsMEJBQTBCO0lBQzFCLDhDQUE4QztJQUM5QyxvQ0FBb0M7SUFDcEMsNENBQTRDO0lBQzVDLGdDQUFnQztJQUNoQywrQ0FBK0M7SUFDL0MscUNBQXFDO0lBRXJDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLFNBQVMsQ0FBQTtJQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pGLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0RCxJQUFJLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7UUFFL0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7YUFDdkI7WUFDRCxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1NBQ3hFO2FBQU07WUFDTCxHQUFHLEdBQUcsS0FBSyxDQUFBO1NBQ1o7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=