module.exports = function ip2long(argIP) {
    //  discuss at: https://locutus.io/php/ip2long/
    // original by: Waldo Malqui Silva (https://waldo.malqui.info)
    // improved by: Victor
    //  revised by: fearphage (https://my.opera.com/fearphage/)
    //  revised by: Theriault (https://github.com/Theriault)
    //    estarget: es2015
    //   example 1: ip2long('192.0.34.166')
    //   returns 1: 3221234342
    //   example 2: ip2long('0.0xABCDEF')
    //   returns 2: 11259375
    //   example 3: ip2long('255.255.255.256')
    //   returns 3: false
    var i = 0;
    // PHP allows decimal, octal, and hexadecimal IP components.
    // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
    var pattern = new RegExp([
        '^([1-9]\\d*|0[0-7]*|0x[\\da-f]+)',
        '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?',
        '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?',
        '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?$'
    ].join(''), 'i');
    argIP = argIP.match(pattern); // Verify argIP format.
    if (!argIP) {
        // Invalid format.
        return false;
    }
    // Reuse argIP variable for component counter.
    argIP[0] = 0;
    for (i = 1; i < 5; i += 1) {
        argIP[0] += !!((argIP[i] || '').length);
        argIP[i] = parseInt(argIP[i]) || 0;
    }
    // Continue to use argIP for overflow values.
    // PHP does not allow any component to overflow.
    argIP.push(256, 256, 256, 256);
    // Recalculate overflow of last component supplied to make up for missing components.
    argIP[4 + argIP[0]] *= Math.pow(256, 4 - argIP[0]);
    if (argIP[1] >= argIP[5] ||
        argIP[2] >= argIP[6] ||
        argIP[3] >= argIP[7] ||
        argIP[4] >= argIP[8]) {
        return false;
    }
    return argIP[1] * (argIP[0] === 1 || 16777216) +
        argIP[2] * (argIP[0] <= 2 || 65536) +
        argIP[3] * (argIP[0] <= 3 || 256) +
        argIP[4] * 1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAybG9uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9uZXR3b3JrL2lwMmxvbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxLQUFLO0lBQ3RDLCtDQUErQztJQUMvQyw4REFBOEQ7SUFDOUQsc0JBQXNCO0lBQ3RCLDJEQUEyRDtJQUMzRCx3REFBd0Q7SUFDeEQsc0JBQXNCO0lBQ3RCLHVDQUF1QztJQUN2QywwQkFBMEI7SUFDMUIscUNBQXFDO0lBQ3JDLHdCQUF3QjtJQUN4QiwwQ0FBMEM7SUFDMUMscUJBQXFCO0lBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULDREQUE0RDtJQUM1RCxtRUFBbUU7SUFFbkUsSUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDekIsa0NBQWtDO1FBQ2xDLHlDQUF5QztRQUN6Qyx5Q0FBeUM7UUFDekMsMENBQTBDO0tBQzNDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRWhCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsdUJBQXVCO0lBQ3BELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixrQkFBa0I7UUFDbEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELDhDQUE4QztJQUM5QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN6QixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDbkM7SUFDRCw2Q0FBNkM7SUFDN0MsZ0RBQWdEO0lBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDOUIscUZBQXFGO0lBQ3JGLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUM1QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUNuQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNqQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2hCLENBQUMsQ0FBQSJ9