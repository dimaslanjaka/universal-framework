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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9yYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLEdBQUc7SUFDOUMsdURBQXVEO0lBQ3ZELG1FQUFtRTtJQUNuRSxtQ0FBbUM7SUFDbkMsK0NBQStDO0lBQy9DLHdCQUF3QjtJQUV4QiwyREFBMkQ7SUFDM0QsK0JBQStCO0lBQy9CLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFN0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUM5QyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0tBQ1I7U0FBTTtRQUNMLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtLQUNYO0lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUM5QyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsNEJBQTRCO0lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsWUFBWTtRQUV4RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0tBQ2Q7SUFFRCxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDakQsQ0FBQyxDQUFBIn0=