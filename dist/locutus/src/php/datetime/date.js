module.exports = function date(format, timestamp) {
    //  discuss at: https://locutus.io/php/date/
    // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
    // original by: gettimeofday
    //    parts by: Peter-Paul Koch (https://www.quirksmode.org/js/beat.html)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: MeEtc (https://yass.meetcweb.com)
    // improved by: Brad Touesnard
    // improved by: Tim Wiel
    // improved by: Bryan Elliott
    // improved by: David Randall
    // improved by: Theriault (https://github.com/Theriault)
    // improved by: Theriault (https://github.com/Theriault)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Theriault (https://github.com/Theriault)
    // improved by: Thomas Beaucourt (https://www.webapp.fr)
    // improved by: JT
    // improved by: Theriault (https://github.com/Theriault)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    // improved by: Theriault (https://github.com/Theriault)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: majak
    //    input by: Alex
    //    input by: Martin
    //    input by: Alex Wilson
    //    input by: Haravikk
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: majak
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: omid (https://locutus.io/php/380:380#comment_137122)
    // bugfixed by: Chris (https://www.devotis.nl/)
    //      note 1: Uses global: locutus to store the default timezone
    //      note 1: Although the function potentially allows timezone info
    //      note 1: (see notes), it currently does not set
    //      note 1: per a timezone specified by date_default_timezone_set(). Implementers might use
    //      note 1: $locutus.currentTimezoneOffset and
    //      note 1: $locutus.currentTimezoneDST set by that function
    //      note 1: in order to adjust the dates in this function
    //      note 1: (or our other date functions!) accordingly
    //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
    //   returns 1: '07:09:40 m is month'
    //   example 2: date('F j, Y, g:i a', 1062462400)
    //   returns 2: 'September 2, 2003, 12:26 am'
    //   example 3: date('Y W o', 1062462400)
    //   returns 3: '2003 36 2003'
    //   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
    //   example 4: $x = $x + ''
    //   example 4: var $result = $x.length // 2009 01 09
    //   returns 4: 10
    //   example 5: date('W', 1104534000)
    //   returns 5: '52'
    //   example 6: date('B t', 1104534000)
    //   returns 6: '999 31'
    //   example 7: date('W U', 1293750000.82); // 2010-12-31
    //   returns 7: '52 1293750000'
    //   example 8: date('W', 1293836400); // 2011-01-01
    //   returns 8: '52'
    //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
    //   returns 9: '52 2011-01-02'
    //        test: skip-1 skip-2 skip-5
    var jsdate, f;
    // Keep this here (works, but for code commented-out below for file size reasons)
    // var tal= [];
    var txtWords = [
        'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // trailing backslash -> (dropped)
    // a backslash followed by any character (including backslash) -> the character
    // empty string -> empty string
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    var _pad = function (n, c) {
        n = String(n);
        while (n.length < c) {
            n = '0' + n;
        }
        return n;
    };
    f = {
        // Day
        d: function () {
            // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () {
            // Shorthand day name; Mon...Sun
            return f.l()
                .slice(0, 3);
        },
        j: function () {
            // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () {
            // Full day name; Monday...Sunday
            return txtWords[f.w()] + 'day';
        },
        N: function () {
            // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () {
            // Ordinal suffix for day of month; st, nd, rd, th
            var j = f.j();
            var i = j % 10;
            if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
                i = 0;
            }
            return ['st', 'nd', 'rd'][i - 1] || 'th';
        },
        w: function () {
            // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () {
            // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j());
            var b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5);
        },
        // Week
        W: function () {
            // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
            var b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },
        // Month
        F: function () {
            // Full month name; January...December
            return txtWords[6 + f.n()];
        },
        m: function () {
            // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () {
            // Shorthand month name; Jan...Dec
            return f.F()
                .slice(0, 3);
        },
        n: function () {
            // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () {
            // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0))
                .getDate();
        },
        // Year
        L: function () {
            // Is leap year?; 0 or 1
            var j = f.Y();
            return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
        },
        o: function () {
            // ISO-8601 year
            var n = f.n();
            var W = f.W();
            var Y = f.Y();
            return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
        },
        Y: function () {
            // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () {
            // Last two digits of year; 00...99
            return f.Y()
                .toString()
                .slice(-2);
        },
        // Time
        a: function () {
            // am or pm
            return jsdate.getHours() > 11 ? 'pm' : 'am';
        },
        A: function () {
            // AM or PM
            return f.a()
                .toUpperCase();
        },
        B: function () {
            // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2;
            // Hours
            var i = jsdate.getUTCMinutes() * 60;
            // Minutes
            // Seconds
            var s = jsdate.getUTCSeconds();
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () {
            // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () {
            // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () {
            // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () {
            // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () {
            // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () {
            // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () {
            // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },
        // Timezone
        e: function () {
            // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
            /*              return that.date_default_timezone_get();
             */
            var msg = 'Not supported (see source code of date() for timezone on how to add support)';
            throw new Error(msg);
        },
        I: function () {
            // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0);
            // Jan 1
            var c = Date.UTC(f.Y(), 0);
            // Jan 1 UTC
            var b = new Date(f.Y(), 6);
            // Jul 1
            // Jul 1 UTC
            var d = Date.UTC(f.Y(), 6);
            return ((a - c) !== (b - d)) ? 1 : 0;
        },
        O: function () {
            // Difference to GMT in hour format; e.g. +0200
            var tzo = jsdate.getTimezoneOffset();
            var a = Math.abs(tzo);
            return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function () {
            // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ':' + O.substr(3, 2));
        },
        T: function () {
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
            /*              var abbr, i, os, _default;
            if (!tal.length) {
              tal = that.timezone_abbreviations_list();
            }
            if ($locutus && $locutus.default_timezone) {
              _default = $locutus.default_timezone;
              for (abbr in tal) {
                for (i = 0; i < tal[abbr].length; i++) {
                  if (tal[abbr][i].timezone_id === _default) {
                    return abbr.toUpperCase();
                  }
                }
              }
            }
            for (abbr in tal) {
              for (i = 0; i < tal[abbr].length; i++) {
                os = -jsdate.getTimezoneOffset() * 60;
                if (tal[abbr][i].offset === os) {
                  return abbr.toUpperCase();
                }
              }
            }
            */
            return 'UTC';
        },
        Z: function () {
            // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },
        // Full Date/Time
        c: function () {
            // ISO-8601 date.
            return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () {
            // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () {
            // Seconds since UNIX epoch
            return jsdate / 1000 | 0;
        }
    };
    var _date = function (format, timestamp) {
        jsdate = (timestamp === undefined ? new Date() // Not provided
            : (timestamp instanceof Date) ? new Date(timestamp) // JS Date()
                : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
        );
        return format.replace(formatChr, formatChrCb);
    };
    return _date(format, timestamp);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9kYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsTUFBTSxFQUFFLFNBQVM7SUFDL0MsNENBQTRDO0lBQzVDLG1FQUFtRTtJQUNuRSw0QkFBNEI7SUFDNUIseUVBQXlFO0lBQ3pFLG9EQUFvRDtJQUNwRCxpREFBaUQ7SUFDakQsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLHdEQUF3RDtJQUN4RCx3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCx3REFBd0Q7SUFDeEQsa0JBQWtCO0lBQ2xCLHdEQUF3RDtJQUN4RCx5REFBeUQ7SUFDekQsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0Isd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvRUFBb0U7SUFDcEUsK0NBQStDO0lBQy9DLGtFQUFrRTtJQUNsRSxzRUFBc0U7SUFDdEUsc0RBQXNEO0lBQ3RELCtGQUErRjtJQUMvRixrREFBa0Q7SUFDbEQsZ0VBQWdFO0lBQ2hFLDZEQUE2RDtJQUM3RCwwREFBMEQ7SUFDMUQsb0VBQW9FO0lBQ3BFLHFDQUFxQztJQUNyQyxpREFBaUQ7SUFDakQsNkNBQTZDO0lBQzdDLHlDQUF5QztJQUN6Qyw4QkFBOEI7SUFDOUIscUVBQXFFO0lBQ3JFLDRCQUE0QjtJQUM1QixxREFBcUQ7SUFDckQsa0JBQWtCO0lBQ2xCLHFDQUFxQztJQUNyQyxvQkFBb0I7SUFDcEIsdUNBQXVDO0lBQ3ZDLHdCQUF3QjtJQUN4Qix5REFBeUQ7SUFD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