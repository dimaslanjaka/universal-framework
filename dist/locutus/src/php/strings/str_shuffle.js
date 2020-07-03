module.exports = function str_shuffle(str) {
    //  discuss at: https://locutus.io/php/str_shuffle/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $shuffled = str_shuffle("abcdef")
    //   example 1: var $result = $shuffled.length
    //   returns 1: 6
    if (arguments.length === 0) {
        throw new Error('Wrong parameter count for str_shuffle()');
    }
    if (str === null) {
        return '';
    }
    str += '';
    var newStr = '';
    var rand;
    var i = str.length;
    while (i) {
        rand = Math.floor(Math.random() * i);
        newStr += str.charAt(rand);
        str = str.substring(0, rand) + str.substr(rand + 1);
        i--;
    }
    return newStr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3NodWZmbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJfc2h1ZmZsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLEdBQUc7SUFDeEMsbURBQW1EO0lBQ25ELG9EQUFvRDtJQUNwRCxxREFBcUQ7SUFDckQsOENBQThDO0lBQzlDLGlCQUFpQjtJQUVqQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtLQUMzRDtJQUVELElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVULElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUVsQixPQUFPLENBQUMsRUFBRTtRQUNSLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNwQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDbkQsQ0FBQyxFQUFFLENBQUE7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=