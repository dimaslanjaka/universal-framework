module.exports = function count_chars(str, mode) {
    //  discuss at: https://locutus.io/php/count_chars/
    // original by: Ates Goral (https://magnetiq.com)
    // improved by: Jack
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Theriault (https://github.com/Theriault)
    //   example 1: count_chars("Hello World!", 3)
    //   returns 1: " !HWdelor"
    //   example 2: count_chars("Hello World!", 1)
    //   returns 2: {32:1,33:1,72:1,87:1,100:1,101:1,108:3,111:2,114:1}
    var result = {};
    var resultArr = [];
    var i;
    str = ('' + str)
        .split('')
        .sort()
        .join('')
        .match(/(.)\1*/g);
    if ((mode & 1) === 0) {
        for (i = 0; i !== 256; i++) {
            result[i] = 0;
        }
    }
    if (mode === 2 || mode === 4) {
        for (i = 0; i !== str.length; i += 1) {
            delete result[str[i].charCodeAt(0)];
        }
        for (i in result) {
            result[i] = (mode === 4) ? String.fromCharCode(i) : 0;
        }
    }
    else if (mode === 3) {
        for (i = 0; i !== str.length; i += 1) {
            result[i] = str[i].slice(0, 1);
        }
    }
    else {
        for (i = 0; i !== str.length; i += 1) {
            result[str[i].charCodeAt(0)] = str[i].length;
        }
    }
    if (mode < 3) {
        return result;
    }
    for (i in result) {
        resultArr.push(result[i]);
    }
    return resultArr.join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRfY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvY291bnRfY2hhcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxHQUFHLEVBQUUsSUFBSTtJQUM5QyxtREFBbUQ7SUFDbkQsaURBQWlEO0lBQ2pELG9CQUFvQjtJQUNwQiw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsOENBQThDO0lBQzlDLDJCQUEyQjtJQUMzQiw4Q0FBOEM7SUFDOUMsbUVBQW1FO0lBRW5FLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixJQUFJLENBQUMsQ0FBQTtJQUVMLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7U0FDYixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsSUFBSSxFQUFFO1NBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNSLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVuQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2Q7S0FDRjtJQUVELElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQzVCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwQztRQUNELEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0RDtLQUNGO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUMvQjtLQUNGO1NBQU07UUFDTCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7U0FDN0M7S0FDRjtJQUNELElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtRQUNaLE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFFRCxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMxQjtJQUVELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==