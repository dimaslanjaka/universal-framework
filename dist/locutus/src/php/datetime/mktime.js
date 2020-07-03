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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWt0aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL21rdGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtJQUM5Qiw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELDJCQUEyQjtJQUMzQixvREFBb0Q7SUFDcEQsMEJBQTBCO0lBQzFCLG9EQUFvRDtJQUNwRCwrQkFBK0I7SUFDL0Isc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsMEJBQTBCO0lBQzFCLG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsK0RBQStEO0lBQy9ELCtEQUErRDtJQUMvRCw2Q0FBNkM7SUFDN0MsMEJBQTBCO0lBQzFCLDJDQUEyQztJQUMzQywwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUNwQyw0REFBNEQ7SUFDNUQsMkNBQTJDO0lBQzNDLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUN6QiwyQ0FBMkM7SUFDM0MseUJBQXlCO0lBQ3pCLHlDQUF5QztJQUN6Qyx5QkFBeUI7SUFDekIsK0NBQStDO0lBQy9DLDBCQUEwQjtJQUMxQiw0Q0FBNEM7SUFDNUMsa0JBQWtCO0lBRWxCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7SUFDbEIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFBO0lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUVwRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUN4Qix1QkFBdUI7WUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1NBQ2xCO2FBQU07WUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUN6QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZixPQUFPLEtBQUssQ0FBQTthQUNiO1NBQ0Y7S0FDRjtJQUVELDZEQUE2RDtJQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXZFLG1EQUFtRDtJQUNuRCwrQ0FBK0M7SUFDL0MsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVuQyxtQ0FBbUM7SUFDbkMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTVCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUV0QixrRUFBa0U7SUFDbEUsaUVBQWlFO0lBQ2pFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQSJ9