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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxTQUFTO0lBQy9DLDRDQUE0QztJQUM1QyxtRUFBbUU7SUFDbkUsNEJBQTRCO0lBQzVCLHlFQUF5RTtJQUN6RSxvREFBb0Q7SUFDcEQsaURBQWlEO0lBQ2pELDhCQUE4QjtJQUM5Qix3QkFBd0I7SUFDeEIsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3Qix3REFBd0Q7SUFDeEQsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCx3REFBd0Q7SUFDeEQsd0RBQXdEO0lBQ3hELGtCQUFrQjtJQUNsQix3REFBd0Q7SUFDeEQseURBQXlEO0lBQ3pELHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLHdCQUF3QjtJQUN4QixvREFBb0Q7SUFDcEQscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0VBQW9FO0lBQ3BFLCtDQUErQztJQUMvQyxrRUFBa0U7SUFDbEUsc0VBQXNFO0lBQ3RFLHNEQUFzRDtJQUN0RCwrRkFBK0Y7SUFDL0Ysa0RBQWtEO0lBQ2xELGdFQUFnRTtJQUNoRSw2REFBNkQ7SUFDN0QsMERBQTBEO0lBQzFELG9FQUFvRTtJQUNwRSxxQ0FBcUM7SUFDckMsaURBQWlEO0lBQ2pELDZDQUE2QztJQUM3Qyx5Q0FBeUM7SUFDekMsOEJBQThCO0lBQzlCLHFFQUFxRTtJQUNyRSw0QkFBNEI7SUFDNUIscURBQXFEO0lBQ3JELGtCQUFrQjtJQUNsQixxQ0FBcUM7SUFDckMsb0JBQW9CO0lBQ3BCLHVDQUF1QztJQUN2Qyx3QkFBd0I7SUFDeEIseURBQXlEO0lBQ3pELCtC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