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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmF0Y2FzZWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJuYXRjYXNlY21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsQ0FBQyxFQUFFLENBQUM7SUFDM0MsMERBQTBEO0lBQzFELGdDQUFnQztJQUNoQyxxQ0FBcUM7SUFDckMsaUZBQWlGO0lBQ2pGLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsdUNBQXVDO0lBQ3ZDLHlEQUF5RDtJQUN6RCxtQ0FBbUM7SUFDbkMseUNBQXlDO0lBQ3pDLHNCQUFzQjtJQUN0Qiw2Q0FBNkM7SUFDN0MsdUJBQXVCO0lBRXZCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQy9DLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBRTFELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8sU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDLENBQUEifQ==