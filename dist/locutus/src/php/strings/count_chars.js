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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRfY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9jb3VudF9jaGFycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRSxJQUFJO0lBQzlDLG1EQUFtRDtJQUNuRCxpREFBaUQ7SUFDakQsb0JBQW9CO0lBQ3BCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCw4Q0FBOEM7SUFDOUMsMkJBQTJCO0lBQzNCLDhDQUE4QztJQUM5QyxtRUFBbUU7SUFFbkUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLElBQUksQ0FBQyxDQUFBO0lBRUwsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztTQUNiLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDVCxJQUFJLEVBQUU7U0FDTixJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ1IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDZDtLQUNGO0lBRUQsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDNUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BDO1FBQ0QsS0FBSyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3REO0tBQ0Y7U0FBTSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQy9CO0tBQ0Y7U0FBTTtRQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtTQUM3QztLQUNGO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ1osT0FBTyxNQUFNLENBQUE7S0FDZDtJQUVELEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzFCO0lBRUQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSJ9