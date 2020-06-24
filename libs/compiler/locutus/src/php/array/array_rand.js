module.exports = function array_rand(array, num) {
    //       discuss at: https://locutus.io/php/array_rand/
    //      original by: Waldo Malqui Silva (https://waldo.malqui.info)
    // reimplemented by: Rafał Kukawski
    //        example 1: array_rand( ['Kevin'], 1 )
    //        returns 1: '0'
    // By using Object.keys we support both, arrays and objects
    // which phpjs wants to support
    var keys = Object.keys(array);
    if (typeof num === 'undefined' || num === null) {
        num = 1;
    }
    else {
        num = +num;
    }
    if (isNaN(num) || num < 1 || num > keys.length) {
        return null;
    }
    // shuffle the array of keys
    for (var i = keys.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // 0 ≤ j ≤ i
        var tmp = keys[j];
        keys[j] = keys[i];
        keys[i] = tmp;
    }
    return num === 1 ? keys[0] : keys.slice(0, num);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcmFuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLEtBQUssRUFBRSxHQUFHO0lBQzlDLHVEQUF1RDtJQUN2RCxtRUFBbUU7SUFDbkUsbUNBQW1DO0lBQ25DLCtDQUErQztJQUMvQyx3QkFBd0I7SUFFeEIsMkRBQTJEO0lBQzNELCtCQUErQjtJQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTdCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDOUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtLQUNSO1NBQU07UUFDTCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUE7S0FDWDtJQUVELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDOUMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELDRCQUE0QjtJQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLFlBQVk7UUFFeEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUNkO0lBRUQsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ2pELENBQUMsQ0FBQSJ9