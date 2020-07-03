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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3BhZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUTtJQUMzRCxpREFBaUQ7SUFDakQsOERBQThEO0lBQzlELDhDQUE4QztJQUM5QywwQkFBMEI7SUFDMUIsOENBQThDO0lBQzlDLG9DQUFvQztJQUNwQyw0Q0FBNEM7SUFDNUMsZ0NBQWdDO0lBQ2hDLCtDQUErQztJQUMvQyxxQ0FBcUM7SUFFckMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksU0FBUyxDQUFBO0lBQ2IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRVQsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakYsU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RELElBQUksR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUUvQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDWixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQTthQUN2QjtZQUNELEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7U0FDeEU7YUFBTTtZQUNMLEdBQUcsR0FBRyxLQUFLLENBQUE7U0FDWjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==