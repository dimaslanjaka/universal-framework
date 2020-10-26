module.exports = function strnatcasecmp(a, b) {
    //       discuss at: https://locutus.io/php/strnatcasecmp/
    //      original by: Martin Pool
    // reimplemented by: Pierre-Luc Paour
    // reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //         input by: Devan Penner-Woelk
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    // reimplemented by: Rafał Kukawski
    //        example 1: strnatcasecmp(10, 1)
    //        returns 1: 1
    //        example 2: strnatcasecmp('1', '10')
    //        returns 2: -1
    var strnatcmp = require('../strings/strnatcmp');
    var _phpCastString = require('../_helpers/_phpCastString');
    if (arguments.length !== 2) {
        return null;
    }
    return strnatcmp(_phpCastString(a).toLowerCase(), _phpCastString(b).toLowerCase());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmF0Y2FzZWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cm5hdGNhc2VjbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGFBQWEsQ0FBRSxDQUFDLEVBQUUsQ0FBQztJQUMzQywwREFBMEQ7SUFDMUQsZ0NBQWdDO0lBQ2hDLHFDQUFxQztJQUNyQyxpRkFBaUY7SUFDakYseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx1Q0FBdUM7SUFDdkMseURBQXlEO0lBQ3pELG1DQUFtQztJQUNuQyx5Q0FBeUM7SUFDekMsc0JBQXNCO0lBQ3RCLDZDQUE2QztJQUM3Qyx1QkFBdUI7SUFFdkIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDL0MsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFFMUQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsT0FBTyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO0FBQ3BGLENBQUMsQ0FBQSJ9