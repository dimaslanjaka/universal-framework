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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAybG9uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbmV0d29yay9pcDJsb25nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsS0FBSztJQUN0QywrQ0FBK0M7SUFDL0MsOERBQThEO0lBQzlELHNCQUFzQjtJQUN0QiwyREFBMkQ7SUFDM0Qsd0RBQXdEO0lBQ3hELHNCQUFzQjtJQUN0Qix1Q0FBdUM7SUFDdkMsMEJBQTBCO0lBQzFCLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsMENBQTBDO0lBQzFDLHFCQUFxQjtJQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCw0REFBNEQ7SUFDNUQsbUVBQW1FO0lBRW5FLElBQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDO1FBQ3pCLGtDQUFrQztRQUNsQyx5Q0FBeUM7UUFDekMseUNBQXlDO1FBQ3pDLDBDQUEwQztLQUMzQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUVoQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLHVCQUF1QjtJQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1Ysa0JBQWtCO1FBQ2xCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ25DO0lBQ0QsNkNBQTZDO0lBQzdDLGdEQUFnRDtJQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLHFGQUFxRjtJQUNyRixLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUM7UUFDNUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDbkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==