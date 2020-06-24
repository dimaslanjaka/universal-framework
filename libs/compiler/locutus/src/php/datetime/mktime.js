module.exports = function mktime() {
    //  discuss at: https://locutus.io/php/mktime/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: baris ozdil
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: FGFEmperor
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: gabriel paderni
    //    input by: Yannoo
    //    input by: jakes
    //    input by: 3D-GRAF
    //    input by: Chris
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Marc Palau
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Theriault (https://github.com/Theriault)
    //      note 1: The return values of the following examples are
    //      note 1: received only if your system's timezone is UTC.
    //   example 1: mktime(14, 10, 2, 2, 1, 2008)
    //   returns 1: 1201875002
    //   example 2: mktime(0, 0, 0, 0, 1, 2008)
    //   returns 2: 1196467200
    //   example 3: var $make = mktime()
    //   example 3: var $td = new Date()
    //   example 3: var $real = Math.floor($td.getTime() / 1000)
    //   example 3: var $diff = ($real - $make)
    //   example 3: $diff < 5
    //   returns 3: true
    //   example 4: mktime(0, 0, 0, 13, 1, 1997)
    //   returns 4: 883612800
    //   example 5: mktime(0, 0, 0, 1, 1, 1998)
    //   returns 5: 883612800
    //   example 6: mktime(0, 0, 0, 1, 1, 98)
    //   returns 6: 883612800
    //   example 7: mktime(23, 59, 59, 13, 0, 2010)
    //   returns 7: 1293839999
    //   example 8: mktime(0, 0, -1, 1, 1, 1970)
    //   returns 8: -1
    var d = new Date();
    var r = arguments;
    var i = 0;
    var e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];
    for (i = 0; i < e.length; i++) {
        if (typeof r[i] === 'undefined') {
            r[i] = d['get' + e[i]]();
            // +1 to fix JS months.
            r[i] += (i === 3);
        }
        else {
            r[i] = parseInt(r[i], 10);
            if (isNaN(r[i])) {
                return false;
            }
        }
    }
    // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);
    // Set year, month (-1 to fix JS months), and date.
    // !This must come before the call to setHours!
    d.setFullYear(r[5], r[3] - 1, r[4]);
    // Set hours, minutes, and seconds.
    d.setHours(r[0], r[1], r[2]);
    var time = d.getTime();
    // Divide milliseconds by 1000 to return seconds and drop decimal.
    // Add 1 second if negative or it'll be off from PHP by 1 second.
    return (time / 1e3 >> 0) - (time < 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWt0aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9ta3RpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU07SUFDOUIsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCwyQkFBMkI7SUFDM0Isb0RBQW9EO0lBQ3BELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELCtEQUErRDtJQUMvRCwrREFBK0Q7SUFDL0QsNkNBQTZDO0lBQzdDLDBCQUEwQjtJQUMxQiwyQ0FBMkM7SUFDM0MsMEJBQTBCO0lBQzFCLG9DQUFvQztJQUNwQyxvQ0FBb0M7SUFDcEMsNERBQTREO0lBQzVELDJDQUEyQztJQUMzQyx5QkFBeUI7SUFDekIsb0JBQW9CO0lBQ3BCLDRDQUE0QztJQUM1Qyx5QkFBeUI7SUFDekIsMkNBQTJDO0lBQzNDLHlCQUF5QjtJQUN6Qix5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLCtDQUErQztJQUMvQywwQkFBMEI7SUFDMUIsNENBQTRDO0lBQzVDLGtCQUFrQjtJQUVsQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ2xCLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFFcEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdCLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDeEIsdUJBQXVCO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtTQUNsQjthQUFNO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDekIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxLQUFLLENBQUE7YUFDYjtTQUNGO0tBQ0Y7SUFFRCw2REFBNkQ7SUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUV2RSxtREFBbUQ7SUFDbkQsK0NBQStDO0lBQy9DLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFbkMsbUNBQW1DO0lBQ25DLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUU1QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFdEIsa0VBQWtFO0lBQ2xFLGlFQUFpRTtJQUNqRSxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDLENBQUEifQ==