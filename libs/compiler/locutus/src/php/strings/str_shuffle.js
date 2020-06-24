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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyX3NodWZmbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyX3NodWZmbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxHQUFHO0lBQ3hDLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELDhDQUE4QztJQUM5QyxpQkFBaUI7SUFFakIsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7S0FDM0Q7SUFFRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFVCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFFbEIsT0FBTyxDQUFDLEVBQUU7UUFDUixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ25ELENBQUMsRUFBRSxDQUFBO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9