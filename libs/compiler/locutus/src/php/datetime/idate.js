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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL2lkYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsTUFBTSxFQUFFLFNBQVM7SUFDaEQsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsNEJBQTRCO0lBQzVCLG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELHNDQUFzQztJQUN0QyxpQkFBaUI7SUFFakIsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQTtLQUNqRTtJQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtLQUM1QztJQUVELGlHQUFpRztJQUNqRyxJQUFJLEtBQUssR0FBRyxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQztRQUM1QyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDWixDQUFDLENBQUMsQ0FBQyxTQUFTLFlBQVksSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxJQUFJLENBQUMsQ0FBQTtJQUVMLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxHQUFHO1lBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hCLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdB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