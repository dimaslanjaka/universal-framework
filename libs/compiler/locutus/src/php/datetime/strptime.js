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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycHRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL3N0cnB0aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUUsT0FBTyxFQUFFLE1BQU07SUFDakQsZ0RBQWdEO0lBQ2hELG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIseUdBQXlHO0lBQ3pHLG9JQUFvSTtJQUNwSSwyQ0FBMkM7SUFDM0MsNEhBQTRIO0lBRTVILElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQy9DLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBRTVDLElBQUksTUFBTSxHQUFHO1FBQ1gsTUFBTSxFQUFFLENBQUM7UUFDVCxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQTtJQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQTtJQUNsQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDcEIsSUFBSSxNQUFNLEdBQUcsVUFBVSxPQUFPLEVBQUUsUUFBUTtRQUN0Qyx1RUFBdUU7UUFDdkUsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFBO1FBQ1IsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFBO1FBQ2QsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFBO1FBQ2YsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDM0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUN0RCxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMxQixDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDckMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDeEYsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFBO0lBQ0QsSUFBSSxLQUFLLEdBQUc7UUFDVixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUE7UUFDZCx5RUFBeUU7UUFDekUsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDN0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQ1IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2QsQ0FBQyxDQUFDLE9BQU8sRUFDVCxDQUFDLENBQUMsTUFBTSxFQUNSLENBQUMsQ0FBQyxNQUFNLENBQ1QsQ0FBQyxFQUNGLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNmLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQTtJQUVkLElBQUksV0FBVyxHQUFHO1FBQ2hCLENBQUMsRUFBRSxRQUFRO1FBQ1gsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxRQUFRO1FBQ1gsQ0FBQyxFQUFFLE9BQU87UUFDVixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxRQUFRO1FBQ1gsQ0FBQyxFQUFFLFFBQVE7S0FDWixDQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJFO0lBQ0YsSUFBSSxVQUFVLEdBQUcsVUFBVSxHQUFHO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2pFLENBQUMsQ0FBQTtJQUVELHFEQUFxRDtJQUNyRCxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRXRCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQTtJQUNsRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFFakQsdUZBQXVGO0lBQ3ZGLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQyxDQUFBO0tBQ0g7SUFFRCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNyQztRQUNELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QiwyREFBMkQ7UUFDM0QsbURBQW1EO1FBQ25ELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNuRCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1NBQ3RDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUM1QixDQUFDLENBQUE7SUFFRCxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUTtRQUNuRCxvRUFBb0U7UUFDcEUsT0FBTyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNuRSxVQUFVLENBQUM7WUFDVCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDakYsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBRUQsOEJBQThCO0lBQzlCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzlELElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFDL0Qsb0JBQW9CO29CQUNwQixFQUFFLENBQUMsQ0FBQTtvQkFDSCxjQUFjO29CQUNkLEVBQUUsQ0FBQyxDQUFBO29CQUNILFNBQVE7aUJBQ1Q7Z0JBQ0QsK0RBQStEO2dCQUMvRCxPQUFPLEtBQUssQ0FBQTthQUNiO1lBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDckMsSUFBSTtnQkFDRixRQUFRLFVBQVUsRUFBRTtvQkFDbEIsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHO3dCQUNOLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUE7d0JBQzNDLE1BQUs7b0JBQ1AsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHO3dCQUNOLFVBQVU7d0JBQ1YsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUNuQywwQkFBMEI7d0JBQzFCLEtBQUssRUFBRSxDQUFBO3dCQUNQLE1BQUs7b0JBQ1AsS0FBSyxHQUFHO3dCQUNOLG1CQUFtQjt3QkFDbkIsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUMxQywwQkFBMEI7d0JBQzFCLEtBQUssRUFBRSxDQUFBO3dCQUNQLE1BQUs7b0JBQ1AsS0FBSyxHQUFHO3dCQUNOLDRCQUE0Qjt3QkFDNUIsaUVBQWlFO3dCQUNqRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBRXhCLFVBQVUsQ0FBQzs0QkFDVCxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBOzRCQUN2QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTs0QkFDckIsS0FBSyxFQUFFLENBQUE7NEJBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0NBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQ3BCOzRCQUNELG1EQUFtRDt3QkFDckQsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsTUFBSztvQkFDUCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUc7d0JBQ04sV0FBVzt3QkFDWCxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFVLEtBQUssR0FBRzs0QkFDaEMsQ0FBQyxDQUFDLDBCQUEwQjs0QkFDNUIsQ0FBQyxDQUFDLHlCQUF5QixFQUM3QixVQUFVLENBQUM7NEJBQ1QsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs0QkFDOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7NEJBQ3pCLDRCQUE0Qjs0QkFDNUIsS0FBSyxFQUFFLENBQUE7d0JBQ1QsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsTUFBSztvQkFDUCxLQUFLLEdBQUc7d0JBQ04sNkNBQTZDO3dCQUM3QyxNQUFLO29CQUNQLEtBQUssR0FBRzt3QkFDTiw4Q0FBOEM7d0JBQzlDLE1BQUs7b0JBQ1AsS0FBSyxHQUFHO3dCQUNOLGNBQWM7d0JBQ2QsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDOzRCQUM5QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOzRCQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTs0QkFDckIsdUJBQXVCO3dCQUN6QixDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRzt3QkFDTixjQUFjO3dCQUNkLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsS0FBSyxHQUFHOzRCQUNoQyxDQUFDLENBQUMsaUJBQWlCOzRCQUNuQixDQUFDLENBQUMsa0JBQWtCLEVBQ3RCLFVBQVUsQ0FBQzs0QkFDVCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUE7NEJBQzNDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBOzRCQUNyQixtQ0FBbUM7NEJBQ25DLFFBQVEsR0FBRyxJQUFJLENBQUE7NEJBQ2Ysb0RBQW9EO3dCQUN0RCxDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRzt3QkFDTixzQkFBc0I7d0JBQ3RCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLDJDQUEyQyxFQUFFLFVBQVUsQ0FBQzs0QkFDdEUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQ2pDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBOzRCQUN4Qix1QkFBdUI7NEJBQ3ZCLDJFQUEyRTt3QkFDN0UsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsTUFBSztvQkFDUCxLQUFLLEdBQUc7d0JBQ04sY0FBYzt3QkFDZCxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLENBQUM7NEJBQzdDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTs0QkFDdkIsMEJBQTBCOzRCQUN4QixLQUFLLEVBQUUsQ0FBQTt3QkFDVCxDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRzt3QkFDTixnQkFBZ0I7d0JBQ2hCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7NEJBQ3JDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQzVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBOzRCQUN4Qix1QkFBdUI7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFBO3dCQUNGLE1BQUs7b0JBQ1AsS0FBSyxHQUFHO3dCQUNOLDJCQUEyQjt3QkFDM0Isa0ZBQWtGO3dCQUNsRixPQUFPLEtBQUssQ0FBQTtvQkFDZCxLQUFLLEdBQUc7d0JBQ04sUUFBUTt3QkFDUixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDOzRCQUN0Qyw4Q0FBOEM7NEJBQzlDLDhDQUE4Qzs0QkFDOUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDO2lDQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBOzRCQUNqQixJQUFJLFFBQVEsRUFBRTtnQ0FDWixNQUFNLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQTs2QkFDN0I7d0JBQ0gsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsTUFBSztvQkFDUCxLQUFLLEdBQUc7d0JBQ04sOEJBQThCO3dCQUM5QixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDOzRCQUNqQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOzRCQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBOzRCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQ1osd0VBQXdFO3dCQUMxRSxDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRzt3QkFDTixnQkFBZ0I7d0JBQ2hCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSw4Q0FBOEM7d0JBRTFFLFVBQVUsQ0FBQzs0QkFDVCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOzRCQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTs0QkFDdEIsdUJBQXVCO3dCQUN6QixDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRzt3QkFDTix5QkFBeUI7d0JBQ3pCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7NEJBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFBOzRCQUN6QyxrQ0FBa0M7d0JBQ3BDLENBQUMsQ0FBQyxDQUFBO3dCQUNGLE1BQUs7b0JBQ1AsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHO3dCQUNOLHFEQUFxRDt3QkFDckQsTUFBSztvQkFDUCxLQUFLLEdBQUc7d0JBQ04sb0RBQW9EO3dCQUNuRCxpRUFBaUU7d0JBQ2xFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFFeEIsVUFBVSxDQUFDOzRCQUNULENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOzRCQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7NEJBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBOzRCQUNyQixLQUFLLEVBQUUsQ0FBQTs0QkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQ0FDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTs2QkFDcEI7NEJBQ0QsbURBQW1EO3dCQUNyRCxDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFLO29CQUNQLEtBQUssR0FBRzt3QkFDTixzQkFBc0I7d0JBQ3RCLG1FQUFtRTt3QkFDbkUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUUxQixVQUFVLENBQUM7NEJBQ1QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBOzRCQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTs0QkFDckIsS0FBSyxFQUFFLENBQUE7NEJBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0NBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQ3BCOzRCQUNELG1EQUFtRDt3QkFDckQsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsTUFBSztvQkFDUCxLQUFLLEdBQUc7d0JBQ04sZ0RBQWdEO3dCQUNoRCwrQ0FBK0M7d0JBQy9DLE1BQUs7b0JBQ1AsS0FBSyxHQUFHO3dCQUNOLG1GQUFtRjt3QkFDbkYsTUFBSztvQkFDUDt3QkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUE7aUJBQ3JFO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsS0FBSyxvQkFBb0IsRUFBRTtvQkFDOUIsbUJBQW1CO29CQUNuQiw4REFBOEQ7b0JBQzlELE9BQU8sS0FBSyxDQUFBO2lCQUNiO2dCQUNELGdEQUFnRDthQUNqRDtZQUNELEVBQUUsQ0FBQyxDQUFBO1NBQ0o7YUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqRCxvRkFBb0Y7WUFDcEYsdURBQXVEO1lBRXZELG9EQUFvRDtZQUNwRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxDQUFDLEVBQUUsQ0FBQTtnQkFDSCxrRUFBa0U7Z0JBQ2xFLENBQUMsRUFBRSxDQUFBO2FBQ0o7aUJBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0MsNkRBQTZEO2dCQUM3RCx5RkFBeUY7Z0JBQ3pGLE9BQU8sS0FBSyxDQUFBO2FBQ2I7WUFDRCxxQkFBcUI7WUFDckIsOEZBQThGO1lBQzlGLHdFQUF3RTtTQUN6RTthQUFNO1lBQ0wsQ0FBQyxFQUFFLENBQUE7U0FDSjtLQUNGO0lBRUQsa0JBQWtCO0lBQ2xCLHVEQUF1RDtJQUN2RCxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==