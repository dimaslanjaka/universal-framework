module.exports = function idate(format, timestamp) {
    //  discuss at: https://locutus.io/php/idate/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: date
    // original by: gettimeofday
    //    input by: Alex
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // improved by: Theriault (https://github.com/Theriault)
    //   example 1: idate('y', 1255633200)
    //   returns 1: 9
    if (format === undefined) {
        throw new Error('idate() expects at least 1 parameter, 0 given');
    }
    if (!format.length || format.length > 1) {
        throw new Error('idate format is one char');
    }
    // @todo: Need to allow date_default_timezone_set() (check for $locutus.default_timezone and use)
    var _date = (typeof timestamp === 'undefined')
        ? new Date()
        : (timestamp instanceof Date)
            ? new Date(timestamp)
            : new Date(timestamp * 1000);
    var a;
    switch (format) {
        case 'B':
            return Math.floor(((_date.getUTCHours() * 36e2) +
                (_date.getUTCMinutes() * 60) +
                _date.getUTCSeconds() + 36e2) / 86.4) % 1e3;
        case 'd':
            return _date.getDate();
        case 'h':
            return _date.getHours() % 12 || 12;
        case 'H':
            return _date.getHours();
        case 'i':
            return _date.getMinutes();
        case 'I':
            // capital 'i'
            // Logic original by getimeofday().
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            a = _date.getFullYear();
            return 0 + (((new Date(a, 0)) - Date.UTC(a, 0)) !== ((new Date(a, 6)) - Date.UTC(a, 6)));
        case 'L':
            a = _date.getFullYear();
            return (!(a & 3) && (a % 1e2 || !(a % 4e2))) ? 1 : 0;
        case 'm':
            return _date.getMonth() + 1;
        case 's':
            return _date.getSeconds();
        case 't':
            return (new Date(_date.getFullYear(), _date.getMonth() + 1, 0))
                .getDate();
        case 'U':
            return Math.round(_date.getTime() / 1000);
        case 'w':
            return _date.getDay();
        case 'W':
            a = new Date(_date.getFullYear(), _date.getMonth(), _date.getDate() - (_date.getDay() || 7) + 3);
            return 1 + Math.round((a - (new Date(a.getFullYear(), 0, 4))) / 864e5 / 7);
        case 'y':
            return parseInt((_date.getFullYear() + '')
                .slice(2), 10); // This function returns an integer, unlike _date()
        case 'Y':
            return _date.getFullYear();
        case 'z':
            return Math.floor((_date - new Date(_date.getFullYear(), 0, 1)) / 864e5);
        case 'Z':
            return -_date.getTimezoneOffset() * 60;
        default:
            throw new Error('Unrecognized _date format token');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxNQUFNLEVBQUUsU0FBUztJQUNoRCw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsc0NBQXNDO0lBQ3RDLGlCQUFpQjtJQUVqQixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO0tBQ2pFO0lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0tBQzVDO0lBRUQsaUdBQWlHO0lBQ2pHLElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNaLENBQUMsQ0FBQyxDQUFDLFNBQVMsWUFBWSxJQUFJLENBQUM7WUFDM0IsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ2hDLElBQUksQ0FBQyxDQUFBO0lBRUwsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLEdBQUc7WUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEIsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixDQUFDLEtBQUssQ0FBQyxhQUFh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