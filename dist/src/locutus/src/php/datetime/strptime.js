module.exports = function strptime(dateStr, format) {
    //  discuss at: https://locutus.io/php/strptime/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: strftime
    //   example 1: strptime('20091112222135', '%Y%m%d%H%M%S') // Return value will depend on date and locale
    //   returns 1: {tm_sec: 35, tm_min: 21, tm_hour: 22, tm_mday: 12, tm_mon: 10, tm_year: 109, tm_wday: 4, tm_yday: 315, unparsed: ''}
    //   example 2: strptime('2009extra', '%Y')
    //   returns 2: {tm_sec:0, tm_min:0, tm_hour:0, tm_mday:0, tm_mon:0, tm_year:109, tm_wday:3, tm_yday: -1, unparsed: 'extra'}
    var setlocale = require('../strings/setlocale');
    var arrayMap = require('../array/array_map');
    var retObj = {
        tm_sec: 0,
        tm_min: 0,
        tm_hour: 0,
        tm_mday: 0,
        tm_mon: 0,
        tm_year: 0,
        tm_wday: 0,
        tm_yday: 0,
        unparsed: ''
    };
    var i = 0;
    var j = 0;
    var amPmOffset = 0;
    var prevHour = false;
    var _reset = function (dateObj, realMday) {
        // realMday is to allow for a value of 0 in return results (but without
        // messing up the Date() object)
        var jan1;
        var o = retObj;
        var d = dateObj;
        o.tm_sec = d.getUTCSeconds();
        o.tm_min = d.getUTCMinutes();
        o.tm_hour = d.getUTCHours();
        o.tm_mday = realMday === 0 ? realMday : d.getUTCDate();
        o.tm_mon = d.getUTCMonth();
        o.tm_year = d.getUTCFullYear() - 1900;
        o.tm_wday = realMday === 0 ? (d.getUTCDay() > 0 ? d.getUTCDay() - 1 : 6) : d.getUTCDay();
        jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        o.tm_yday = Math.ceil((d - jan1) / (1000 * 60 * 60 * 24));
    };
    var _date = function () {
        var o = retObj;
        // We set date to at least 1 to ensure year or month doesn't go backwards
        return _reset(new Date(Date.UTC(o.tm_year + 1900, o.tm_mon, o.tm_mday || 1, o.tm_hour, o.tm_min, o.tm_sec)), o.tm_mday);
    };
    var _NWS = /\S/;
    var _WS = /\s/;
    var _aggregates = {
        c: 'locale',
        D: '%m/%d/%y',
        F: '%y-%m-%d',
        r: 'locale',
        R: '%H:%M',
        T: '%H:%M:%S',
        x: 'locale',
        X: 'locale'
    };
    /* Fix: Locale alternatives are supported though not documented in PHP; see https://linux.die.net/man/3/strptime
      Ec
      EC
      Ex
      EX
      Ey
      EY
      Od or Oe
      OH
      OI
      Om
      OM
      OS
      OU
      Ow
      OW
      Oy
    */
    var _pregQuote = function (str) {
        return (str + '').replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
    };
    // ensure setup of localization variables takes place
    setlocale('LC_ALL', 0);
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    var locale = $locutus.php.localeCategories.LC_TIME;
    var lcTime = $locutus.php.locales[locale].LC_TIME;
    // First replace aggregates (run in a loop because an agg may be made up of other aggs)
    while (format.match(/%[cDFhnrRtTxX]/)) {
        format = format.replace(/%([cDFhnrRtTxX])/g, function (m0, m1) {
            var f = _aggregates[m1];
            return (f === 'locale' ? lcTime[m1] : f);
        });
    }
    var _addNext = function (j, regex, cb) {
        if (typeof regex === 'string') {
            regex = new RegExp('^' + regex, 'i');
        }
        var check = dateStr.slice(j);
        var match = regex.exec(check);
        // Even if the callback returns null after assigning to the
        // return object, the object won't be saved anyways
        var testNull = match ? cb.apply(null, match) : null;
        if (testNull === null) {
            throw new Error('No match in string');
        }
        return j + match[0].length;
    };
    var _addLocalized = function (j, formatChar, category) {
        // Could make each parenthesized instead and pass index to callback:
        return _addNext(j, arrayMap(_pregQuote, lcTime[formatChar]).join('|'), function (m) {
            var match = lcTime[formatChar].search(new RegExp('^' + _pregQuote(m) + '$', 'i'));
            if (match) {
                retObj[category] = match[0];
            }
        });
    };
    // BEGIN PROCESSING CHARACTERS
    for (i = 0, j = 0; i < format.length; i++) {
        if (format.charAt(i) === '%') {
            var literalPos = ['%', 'n', 't'].indexOf(format.charAt(i + 1));
            if (literalPos !== -1) {
                if (['%', '\n', '\t'].indexOf(dateStr.charAt(j)) === literalPos) {
                    // a matched literal
                    ++i;
                    // skip beyond
                    ++j;
                    continue;
                }
                // Format indicated a percent literal, but not actually present
                return false;
            }
            var formatChar = format.charAt(i + 1);
            try {
                switch (formatChar) {
                    case 'a':
                    case 'A':
                        // Sunday-Saturday
                        // Changes nothing else
                        j = _addLocalized(j, formatChar, 'tm_wday');
                        break;
                    case 'h':
                    case 'b':
                        // Jan-Dec
                        j = _addLocalized(j, 'b', 'tm_mon');
                        // Also changes wday, yday
                        _date();
                        break;
                    case 'B':
                        // January-December
                        j = _addLocalized(j, formatChar, 'tm_mon');
                        // Also changes wday, yday
                        _date();
                        break;
                    case 'C':
                        // 0+; century (19 for 20th)
                        // PHP docs say two-digit, but accepts one-digit (two-digit max):
                        j = _addNext(j, /^\d?\d/, function (d) {
                            var year = (parseInt(d, 10) - 19) * 100;
                            retObj.tm_year = year;
                            _date();
                            if (!retObj.tm_yday) {
                                retObj.tm_yday = -1;
                            }
                            // Also changes wday; and sets yday to -1 (always?)
                        });
                        break;
                    case 'd':
                    case 'e':
                        // 1-31 day
                        j = _addNext(j, formatChar === 'd'
                            ? /^(0[1-9]|[1-2]\d|3[0-1])/
                            : /^([1-2]\d|3[0-1]|[1-9])/, function (d) {
                            var dayMonth = parseInt(d, 10);
                            retObj.tm_mday = dayMonth;
                            // Also changes w_day, y_day
                            _date();
                        });
                        break;
                    case 'g':
                        // No apparent effect; 2-digit year (see 'V')
                        break;
                    case 'G':
                        // No apparent effect; 4-digit year (see 'V')'
                        break;
                    case 'H':
                        // 00-23 hours
                        j = _addNext(j, /^([0-1]\d|2[0-3])/, function (d) {
                            var hour = parseInt(d, 10);
                            retObj.tm_hour = hour;
                            // Changes nothing else
                        });
                        break;
                    case 'l':
                    case 'I':
                        // 01-12 hours
                        j = _addNext(j, formatChar === 'l'
                            ? /^([1-9]|1[0-2])/
                            : /^(0[1-9]|1[0-2])/, function (d) {
                            var hour = parseInt(d, 10) - 1 + amPmOffset;
                            retObj.tm_hour = hour;
                            // Used for coordinating with am-pm
                            prevHour = true;
                            // Changes nothing else, but affected by prior 'p/P'
                        });
                        break;
                    case 'j':
                        // 001-366 day of year
                        j = _addNext(j, /^(00[1-9]|0[1-9]\d|[1-2]\d\d|3[0-6][0-6])/, function (d) {
                            var dayYear = parseInt(d, 10) - 1;
                            retObj.tm_yday = dayYear;
                            // Changes nothing else
                            // (oddly, since if original by a given year, could calculate other fields)
                        });
                        break;
                    case 'm':
                        // 01-12 month
                        j = _addNext(j, /^(0[1-9]|1[0-2])/, function (d) {
                            var month = parseInt(d, 10) - 1;
                            retObj.tm_mon = month;
                            // Also sets wday and yday
                            _date();
                        });
                        break;
                    case 'M':
                        // 00-59 minutes
                        j = _addNext(j, /^[0-5]\d/, function (d) {
                            var minute = parseInt(d, 10);
                            retObj.tm_min = minute;
                            // Changes nothing else
                        });
                        break;
                    case 'P':
                        // Seems not to work; AM-PM
                        // Could make fall-through instead since supposed to be a synonym despite PHP docs
                        return false;
                    case 'p':
                        // am-pm
                        j = _addNext(j, /^(am|pm)/i, function (d) {
                            // No effect on 'H' since already 24 hours but
                            //   works before or after setting of l/I hour
                            amPmOffset = (/a/)
                                .test(d) ? 0 : 12;
                            if (prevHour) {
                                retObj.tm_hour += amPmOffset;
                            }
                        });
                        break;
                    case 's':
                        // Unix timestamp (in seconds)
                        j = _addNext(j, /^\d+/, function (d) {
                            var timestamp = parseInt(d, 10);
                            var date = new Date(Date.UTC(timestamp * 1000));
                            _reset(date);
                            // Affects all fields, but can't be negative (and initial + not allowed)
                        });
                        break;
                    case 'S':
                        // 00-59 seconds
                        j = _addNext(j, /^[0-5]\d/, // strptime also accepts 60-61 for some reason
                        function (d) {
                            var second = parseInt(d, 10);
                            retObj.tm_sec = second;
                            // Changes nothing else
                        });
                        break;
                    case 'u':
                    case 'w':
                        // 0 (Sunday)-6(Saturday)
                        j = _addNext(j, /^\d/, function (d) {
                            retObj.tm_wday = d - (formatChar === 'u');
                            // Changes nothing else apparently
                        });
                        break;
                    case 'U':
                    case 'V':
                    case 'W':
                        // Apparently ignored (week of year, from 1st Monday)
                        break;
                    case 'y':
                        // 69 (or higher) for 1969+, 68 (or lower) for 2068-
                        // PHP docs say two-digit, but accepts one-digit (two-digit max):
                        j = _addNext(j, /^\d?\d/, function (d) {
                            d = parseInt(d, 10);
                            var year = d >= 69 ? d : d + 100;
                            retObj.tm_year = year;
                            _date();
                            if (!retObj.tm_yday) {
                                retObj.tm_yday = -1;
                            }
                            // Also changes wday; and sets yday to -1 (always?)
                        });
                        break;
                    case 'Y':
                        // 2010 (4-digit year)
                        // PHP docs say four-digit, but accepts one-digit (four-digit max):
                        j = _addNext(j, /^\d{1,4}/, function (d) {
                            var year = (parseInt(d, 10)) - 1900;
                            retObj.tm_year = year;
                            _date();
                            if (!retObj.tm_yday) {
                                retObj.tm_yday = -1;
                            }
                            // Also changes wday; and sets yday to -1 (always?)
                        });
                        break;
                    case 'z':
                        // Timezone; on my system, strftime gives -0800,
                        // but strptime seems not to alter hour setting
                        break;
                    case 'Z':
                        // Timezone; on my system, strftime gives PST, but strptime treats text as unparsed
                        break;
                    default:
                        throw new Error('Unrecognized formatting character in strptime()');
                }
            }
            catch (e) {
                if (e === 'No match in string') {
                    // Allow us to exit
                    // There was supposed to be a matching format but there wasn't
                    return false;
                }
                // Calculate skipping beyond initial percent too
            }
            ++i;
        }
        else if (format.charAt(i) !== dateStr.charAt(j)) {
            // If extra whitespace at beginning or end of either, or between formats, no problem
            // (just a problem when between % and format specifier)
            // If the string has white-space, it is ok to ignore
            if (dateStr.charAt(j).search(_WS) !== -1) {
                j++;
                // Let the next iteration try again with the same format character
                i--;
            }
            else if (format.charAt(i).search(_NWS) !== -1) {
                // Any extra formatting characters besides white-space causes
                // problems (do check after WS though, as may just be WS in string before next character)
                return false;
            }
            // Extra WS in format
            // Adjust strings when encounter non-matching whitespace, so they align in future checks above
            // Will check on next iteration (against same (non-WS) string character)
        }
        else {
            j++;
        }
    }
    // POST-PROCESSING
    // Will also get extra whitespace; empty string if none
    retObj.unparsed = dateStr.slice(j);
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycHRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvc3RycHRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxPQUFPLEVBQUUsTUFBTTtJQUNqRCxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4Qix5R0FBeUc7SUFDekcsb0lBQW9JO0lBQ3BJLDJDQUEyQztJQUMzQyw0SEFBNEg7SUFFNUgsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDL0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFNUMsSUFBSSxNQUFNLEdBQUc7UUFDWCxNQUFNLEVBQUUsQ0FBQztRQUNULE1BQU0sRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLE1BQU0sRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFBO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFBO0lBQ2xCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtJQUNwQixJQUFJLE1BQU0sR0FBRyxVQUFVLE9BQU8sRUFBRSxRQUFRO1FBQ3RDLHVFQUF1RTtRQUN2RSxnQ0FBZ0M7UUFDaEMsSUFBSSxJQUFJLENBQUE7UUFDUixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUE7UUFDZCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUE7UUFDZixDQUFDLENBQUMsTUFBTSxHQUFHLENB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