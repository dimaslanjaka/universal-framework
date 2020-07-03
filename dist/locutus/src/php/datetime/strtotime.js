var reSpace = '[ \\t]+';
var reSpaceOpt = '[ \\t]*';
var reMeridian = '(?:([ap])\\.?m\\.?([\\t ]|$))';
var reHour24 = '(2[0-4]|[01]?[0-9])';
var reHour24lz = '([01][0-9]|2[0-4])';
var reHour12 = '(0?[1-9]|1[0-2])';
var reMinute = '([0-5]?[0-9])';
var reMinutelz = '([0-5][0-9])';
var reSecond = '(60|[0-5]?[0-9])';
var reSecondlz = '(60|[0-5][0-9])';
var reFrac = '(?:\\.([0-9]+))';
var reDayfull = 'sunday|monday|tuesday|wednesday|thursday|friday|saturday';
var reDayabbr = 'sun|mon|tue|wed|thu|fri|sat';
var reDaytext = reDayfull + '|' + reDayabbr + '|weekdays?';
var reReltextnumber = 'first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth';
var reReltexttext = 'next|last|previous|this';
var reReltextunit = '(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|' + reDaytext;
var reYear = '([0-9]{1,4})';
var reYear2 = '([0-9]{2})';
var reYear4 = '([0-9]{4})';
var reYear4withSign = '([+-]?[0-9]{4})';
var reMonth = '(1[0-2]|0?[0-9])';
var reMonthlz = '(0[0-9]|1[0-2])';
var reDay = '(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)';
var reDaylz = '(0[0-9]|[1-2][0-9]|3[01])';
var reMonthFull = 'january|february|march|april|may|june|july|august|september|october|november|december';
var reMonthAbbr = 'jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec';
var reMonthroman = 'i[vx]|vi{0,3}|xi{0,2}|i{1,3}';
var reMonthText = '(' + reMonthFull + '|' + reMonthAbbr + '|' + reMonthroman + ')';
var reTzCorrection = '((?:GMT)?([+-])' + reHour24 + ':?' + reMinute + '?)';
var reDayOfYear = '(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])';
var reWeekOfYear = '(0[1-9]|[1-4][0-9]|5[0-3])';
var reDateNoYear = reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]*';
function processMeridian(hour, meridian) {
    meridian = meridian && meridian.toLowerCase();
    switch (meridian) {
        case 'a':
            hour += hour === 12 ? -12 : 0;
            break;
        case 'p':
            hour += hour !== 12 ? 12 : 0;
            break;
    }
    return hour;
}
function processYear(yearStr) {
    var year = +yearStr;
    if (yearStr.length < 4 && year < 100) {
        year += year < 70 ? 2000 : 1900;
    }
    return year;
}
function lookupMonth(monthStr) {
    return {
        jan: 0,
        january: 0,
        i: 0,
        feb: 1,
        february: 1,
        ii: 1,
        mar: 2,
        march: 2,
        iii: 2,
        apr: 3,
        april: 3,
        iv: 3,
        may: 4,
        v: 4,
        jun: 5,
        june: 5,
        vi: 5,
        jul: 6,
        july: 6,
        vii: 6,
        aug: 7,
        august: 7,
        viii: 7,
        sep: 8,
        sept: 8,
        september: 8,
        ix: 8,
        oct: 9,
        october: 9,
        x: 9,
        nov: 10,
        november: 10,
        xi: 10,
        dec: 11,
        december: 11,
        xii: 11
    }[monthStr.toLowerCase()];
}
function lookupWeekday(dayStr, desiredSundayNumber) {
    if (desiredSundayNumber === void 0) { desiredSundayNumber = 0; }
    var dayNumbers = {
        mon: 1,
        monday: 1,
        tue: 2,
        tuesday: 2,
        wed: 3,
        wednesday: 3,
        thu: 4,
        thursday: 4,
        fri: 5,
        friday: 5,
        sat: 6,
        saturday: 6,
        sun: 0,
        sunday: 0
    };
    return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber;
}
function lookupRelative(relText) {
    var relativeNumbers = {
        last: -1,
        previous: -1,
        this: 0,
        first: 1,
        next: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        sixth: 6,
        seventh: 7,
        eight: 8,
        eighth: 8,
        ninth: 9,
        tenth: 10,
        eleventh: 11,
        twelfth: 12
    };
    var relativeBehavior = {
        this: 1
    };
    var relTextLower = relText.toLowerCase();
    return {
        amount: relativeNumbers[relTextLower],
        behavior: relativeBehavior[relTextLower] || 0
    };
}
function processTzCorrection(tzOffset, oldValue) {
    var reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i;
    tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose);
    if (!tzOffset) {
        return oldValue;
    }
    var sign = tzOffset[1] === '-' ? 1 : -1;
    var hours = +tzOffset[2];
    var minutes = +tzOffset[4];
    if (!tzOffset[4] && !tzOffset[3]) {
        minutes = Math.floor(hours % 100);
        hours = Math.floor(hours / 100);
    }
    return sign * (hours * 60 + minutes);
}
var formats = {
    yesterday: {
        regex: /^yesterday/i,
        name: 'yesterday',
        callback: function () {
            this.rd -= 1;
            return this.resetTime();
        }
    },
    now: {
        regex: /^now/i,
        name: 'now'
        // do nothing
    },
    noon: {
        regex: /^noon/i,
        name: 'noon',
        callback: function () {
            return this.resetTime() && this.time(12, 0, 0, 0);
        }
    },
    midnightOrToday: {
        regex: /^(midnight|today)/i,
        name: 'midnight | today',
        callback: function () {
            return this.resetTime();
        }
    },
    tomorrow: {
        regex: /^tomorrow/i,
        name: 'tomorrow',
        callback: function () {
            this.rd += 1;
            return this.resetTime();
        }
    },
    timestamp: {
        regex: /^@(-?\d+)/i,
        name: 'timestamp',
        callback: function (match, timestamp) {
            this.rs += +timestamp;
            this.y = 1970;
            this.m = 0;
            this.d = 1;
            this.dates = 0;
            return this.resetTime() && this.zone(0);
        }
    },
    firstOrLastDay: {
        regex: /^(first|last) day of/i,
        name: 'firstdayof | lastdayof',
        callback: function (match, day) {
            if (day.toLowerCase() === 'first') {
                this.firstOrLastDayOfMonth = 1;
            }
            else {
                this.firstOrLastDayOfMonth = -1;
            }
        }
    },
    backOrFrontOf: {
        regex: RegExp('^(back|front) of ' + reHour24 + reSpaceOpt + reMeridian + '?', 'i'),
        name: 'backof | frontof',
        callback: function (match, side, hours, meridian) {
            var back = side.toLowerCase() === 'back';
            var hour = +hours;
            var minute = 15;
            if (!back) {
                hour -= 1;
                minute = 45;
            }
            hour = processMeridian(hour, meridian);
            return this.resetTime() && this.time(hour, minute, 0, 0);
        }
    },
    weekdayOf: {
        regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reDayfull + '|' + reDayabbr + ')' + reSpace + 'of', 'i'),
        name: 'weekdayof'
        // todo
    },
    mssqltime: {
        regex: RegExp('^' + reHour12 + ':' + reMinutelz + ':' + reSecondlz + '[:.]([0-9]+)' + reMeridian, 'i'),
        name: 'mssqltime',
        callback: function (match, hour, minute, second, frac, meridian) {
            return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3));
        }
    },
    timeLong12: {
        regex: RegExp('^' + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
        name: 'timelong12',
        callback: function (match, hour, minute, second, meridian) {
            return this.time(processMeridian(+hour, meridian), +minute, +second, 0);
        }
    },
    timeShort12: {
        regex: RegExp('^' + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
        name: 'timeshort12',
        callback: function (match, hour, minute, meridian) {
            return this.time(processMeridian(+hour, meridian), +minute, 0, 0);
        }
    },
    timeTiny12: {
        regex: RegExp('^' + reHour12 + reSpaceOpt + reMeridian, 'i'),
        name: 'timetiny12',
        callback: function (match, hour, meridian) {
            return this.time(processMeridian(+hour, meridian), 0, 0, 0);
        }
    },
    soap: {
        regex: RegExp('^' + reYear4 + '-' + reMonthlz + '-' + reDaylz + 'T' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reFrac + reTzCorrection + '?', 'i'),
        name: 'soap',
        callback: function (match, year, month, day, hour, minute, second, frac, tzCorrection) {
            return this.ymd(+year, month - 1, +day) &&
                this.time(+hour, +minute, +second, +frac.substr(0, 3)) &&
                this.zone(processTzCorrection(tzCorrection));
        }
    },
    wddx: {
        regex: RegExp('^' + reYear4 + '-' + reMonth + '-' + reDay + 'T' + reHour24 + ':' + reMinute + ':' + reSecond),
        name: 'wddx',
        callback: function (match, year, month, day, hour, minute, second) {
            return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }
    },
    exif: {
        regex: RegExp('^' + reYear4 + ':' + reMonthlz + ':' + reDaylz + ' ' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz, 'i'),
        name: 'exif',
        callback: function (match, year, month, day, hour, minute, second) {
            return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }
    },
    xmlRpc: {
        regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + 'T' + reHour24 + ':' + reMinutelz + ':' + reSecondlz),
        name: 'xmlrpc',
        callback: function (match, year, month, day, hour, minute, second) {
            return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }
    },
    xmlRpcNoColon: {
        regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + '[Tt]' + reHour24 + reMinutelz + reSecondlz),
        name: 'xmlrpcnocolon',
        callback: function (match, year, month, day, hour, minute, second) {
            return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }
    },
    clf: {
        regex: RegExp('^' + reDay + '/(' + reMonthAbbr + ')/' + reYear4 + ':' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reSpace + reTzCorrection, 'i'),
        name: 'clf',
        callback: function (match, day, month, year, hour, minute, second, tzCorrection) {
            return this.ymd(+year, lookupMonth(month), +day) &&
                this.time(+hour, +minute, +second, 0) &&
                this.zone(processTzCorrection(tzCorrection));
        }
    },
    iso8601long: {
        regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond + reFrac, 'i'),
        name: 'iso8601long',
        callback: function (match, hour, minute, second, frac) {
            return this.time(+hour, +minute, +second, +frac.substr(0, 3));
        }
    },
    dateTextual: {
        regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]+' + reYear, 'i'),
        name: 'datetextual',
        callback: function (match, month, day, year) {
            return this.ymd(processYear(year), lookupMonth(month), +day);
        }
    },
    pointedDate4: {
        regex: RegExp('^' + reDay + '[.\\t-]' + reMonth + '[.-]' + reYear4),
        name: 'pointeddate4',
        callback: function (match, day, month, year) {
            return this.ymd(+year, month - 1, +day);
        }
    },
    pointedDate2: {
        regex: RegExp('^' + reDay + '[.\\t]' + reMonth + '\\.' + reYear2),
        name: 'pointeddate2',
        callback: function (match, day, month, year) {
            return this.ymd(processYear(year), month - 1, +day);
        }
    },
    timeLong24: {
        regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond),
        name: 'timelong24',
        callback: function (match, hour, minute, second) {
            return this.time(+hour, +minute, +second, 0);
        }
    },
    dateNoColon: {
        regex: RegExp('^' + reYear4 + reMonthlz + reDaylz),
        name: 'datenocolon',
        callback: function (match, year, month, day) {
            return this.ymd(+year, month - 1, +day);
        }
    },
    pgydotd: {
        regex: RegExp('^' + reYear4 + '\\.?' + reDayOfYear),
        name: 'pgydotd',
        callback: function (match, year, day) {
            return this.ymd(+year, 0, +day);
        }
    },
    timeShort24: {
        regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute, 'i'),
        name: 'timeshort24',
        callback: function (match, hour, minute) {
            return this.time(+hour, +minute, 0, 0);
        }
    },
    iso8601noColon: {
        regex: RegExp('^t?' + reHour24lz + reMinutelz + reSecondlz, 'i'),
        name: 'iso8601nocolon',
        callback: function (match, hour, minute, second) {
            return this.time(+hour, +minute, +second, 0);
        }
    },
    iso8601dateSlash: {
        // eventhough the trailing slash is optional in PHP
        // here it's mandatory and inputs without the slash
        // are handled by dateslash
        regex: RegExp('^' + reYear4 + '/' + reMonthlz + '/' + reDaylz + '/'),
        name: 'iso8601dateslash',
        callback: function (match, year, month, day) {
            return this.ymd(+year, month - 1, +day);
        }
    },
    dateSlash: {
        regex: RegExp('^' + reYear4 + '/' + reMonth + '/' + reDay),
        name: 'dateslash',
        callback: function (match, year, month, day) {
            return this.ymd(+year, month - 1, +day);
        }
    },
    american: {
        regex: RegExp('^' + reMonth + '/' + reDay + '/' + reYear),
        name: 'american',
        callback: function (match, month, day, year) {
            return this.ymd(processYear(year), month - 1, +day);
        }
    },
    americanShort: {
        regex: RegExp('^' + reMonth + '/' + reDay),
        name: 'americanshort',
        callback: function (match, month, day) {
            return this.ymd(this.y, month - 1, +day);
        }
    },
    gnuDateShortOrIso8601date2: {
        // iso8601date2 is complete subset of gnudateshort
        regex: RegExp('^' + reYear + '-' + reMonth + '-' + reDay),
        name: 'gnudateshort | iso8601date2',
        callback: function (match, year, month, day) {
            return this.ymd(processYear(year), month - 1, +day);
        }
    },
    iso8601date4: {
        regex: RegExp('^' + reYear4withSign + '-' + reMonthlz + '-' + reDaylz),
        name: 'iso8601date4',
        callback: function (match, year, month, day) {
            return this.ymd(+year, month - 1, +day);
        }
    },
    gnuNoColon: {
        regex: RegExp('^t?' + reHour24lz + reMinutelz, 'i'),
        name: 'gnunocolon',
        callback: function (match, hour, minute) {
            // this rule is a special case
            // if time was already set once by any preceding rule, it sets the captured value as year
            switch (this.times) {
                case 0:
                    return this.time(+hour, +minute, 0, this.f);
                case 1:
                    this.y = hour * 100 + +minute;
                    this.times++;
                    return true;
                default:
                    return false;
            }
        }
    },
    gnuDateShorter: {
        regex: RegExp('^' + reYear4 + '-' + reMonth),
        name: 'gnudateshorter',
        callback: function (match, year, month) {
            return this.ymd(+year, month - 1, 1);
        }
    },
    pgTextReverse: {
        // note: allowed years are from 32-9999
        // years below 32 should be treated as days in datefull
        regex: RegExp('^' + '(\\d{3,4}|[4-9]\\d|3[2-9])-(' + reMonthAbbr + ')-' + reDaylz, 'i'),
        name: 'pgtextreverse',
        callback: function (match, year, month, day) {
            return this.ymd(processYear(year), lookupMonth(month), +day);
        }
    },
    dateFull: {
        regex: RegExp('^' + reDay + '[ \\t.-]*' + reMonthText + '[ \\t.-]*' + reYear, 'i'),
        name: 'datefull',
        callback: function (match, day, month, year) {
            return this.ymd(processYear(year), lookupMonth(month), +day);
        }
    },
    dateNoDay: {
        regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reYear4, 'i'),
        name: 'datenoday',
        callback: function (match, month, year) {
            return this.ymd(+year, lookupMonth(month), 1);
        }
    },
    dateNoDayRev: {
        regex: RegExp('^' + reYear4 + '[ .\\t-]*' + reMonthText, 'i'),
        name: 'datenodayrev',
        callback: function (match, year, month) {
            return this.ymd(+year, lookupMonth(month), 1);
        }
    },
    pgTextShort: {
        regex: RegExp('^(' + reMonthAbbr + ')-' + reDaylz + '-' + reYear, 'i'),
        name: 'pgtextshort',
        callback: function (match, month, day, year) {
            return this.ymd(processYear(year), lookupMonth(month), +day);
        }
    },
    dateNoYear: {
        regex: RegExp('^' + reDateNoYear, 'i'),
        name: 'datenoyear',
        callback: function (match, month, day) {
            return this.ymd(this.y, lookupMonth(month), +day);
        }
    },
    dateNoYearRev: {
        regex: RegExp('^' + reDay + '[ .\\t-]*' + reMonthText, 'i'),
        name: 'datenoyearrev',
        callback: function (match, day, month) {
            return this.ymd(this.y, lookupMonth(month), +day);
        }
    },
    isoWeekDay: {
        regex: RegExp('^' + reYear4 + '-?W' + reWeekOfYear + '(?:-?([0-7]))?'),
        name: 'isoweekday | isoweek',
        callback: function (match, year, week, day) {
            day = day ? +day : 1;
            if (!this.ymd(+year, 0, 1)) {
                return false;
            }
            // get day of week for Jan 1st
            var dayOfWeek = new Date(this.y, this.m, this.d).getDay();
            // and use the day to figure out the offset for day 1 of week 1
            dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek);
            this.rd += dayOfWeek + ((week - 1) * 7) + day;
        }
    },
    relativeText: {
        regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reReltextunit + ')', 'i'),
        name: 'relativetext',
        callback: function (match, relValue, relUnit) {
            // todo: implement handling of 'this time-unit'
            // eslint-disable-next-line no-unused-vars
            var _a = lookupRelative(relValue), amount = _a.amount, behavior = _a.behavior;
            switch (relUnit.toLowerCase()) {
                case 'sec':
                case 'secs':
                case 'second':
                case 'seconds':
                    this.rs += amount;
                    break;
                case 'min':
                case 'mins':
                case 'minute':
                case 'minutes':
                    this.ri += amount;
                    break;
                case 'hour':
                case 'hours':
                    this.rh += amount;
                    break;
                case 'day':
                case 'days':
                    this.rd += amount;
                    break;
                case 'fortnight':
                case 'fortnights':
                case 'forthnight':
                case 'forthnights':
                    this.rd += amount * 14;
                    break;
                case 'week':
                case 'weeks':
                    this.rd += amount * 7;
                    break;
                case 'month':
                case 'months':
                    this.rm += amount;
                    break;
                case 'year':
                case 'years':
                    this.ry += amount;
                    break;
                case 'mon':
                case 'monday':
                case 'tue':
                case 'tuesday':
                case 'wed':
                case 'wednesday':
                case 'thu':
                case 'thursday':
                case 'fri':
                case 'friday':
                case 'sat':
                case 'saturday':
                case 'sun':
                case 'sunday':
                    this.resetTime();
                    this.weekday = lookupWeekday(relUnit, 7);
                    this.weekdayBehavior = 1;
                    this.rd += (amount > 0 ? amount - 1 : amount) * 7;
                    break;
                case 'weekday':
                case 'weekdays':
                    // todo
                    break;
            }
        }
    },
    relative: {
        regex: RegExp('^([+-]*)[ \\t]*(\\d+)' + reSpaceOpt + '(' + reReltextunit + '|week)', 'i'),
        name: 'relative',
        callback: function (match, signs, relValue, relUnit) {
            var minuses = signs.replace(/[^-]/g, '').length;
            var amount = +relValue * Math.pow(-1, minuses);
            switch (relUnit.toLowerCase()) {
                case 'sec':
                case 'secs':
                case 'second':
                case 'seconds':
                    this.rs += amount;
                    break;
                case 'min':
                case 'mins':
                case 'minute':
                case 'minutes':
                    this.ri += amount;
                    break;
                case 'hour':
                case 'hours':
                    this.rh += amount;
                    break;
                case 'day':
                case 'days':
                    this.rd += amount;
                    break;
                case 'fortnight':
                case 'fortnights':
                case 'forthnight':
                case 'forthnights':
                    this.rd += amount * 14;
                    break;
                case 'week':
                case 'weeks':
                    this.rd += amount * 7;
                    break;
                case 'month':
                case 'months':
                    this.rm += amount;
                    break;
                case 'year':
                case 'years':
                    this.ry += amount;
                    break;
                case 'mon':
                case 'monday':
                case 'tue':
                case 'tuesday':
                case 'wed':
                case 'wednesday':
                case 'thu':
                case 'thursday':
                case 'fri':
                case 'friday':
                case 'sat':
                case 'saturday':
                case 'sun':
                case 'sunday':
                    this.resetTime();
                    this.weekday = lookupWeekday(relUnit, 7);
                    this.weekdayBehavior = 1;
                    this.rd += (amount > 0 ? amount - 1 : amount) * 7;
                    break;
                case 'weekday':
                case 'weekdays':
                    // todo
                    break;
            }
        }
    },
    dayText: {
        regex: RegExp('^(' + reDaytext + ')', 'i'),
        name: 'daytext',
        callback: function (match, dayText) {
            this.resetTime();
            this.weekday = lookupWeekday(dayText, 0);
            if (this.weekdayBehavior !== 2) {
                this.weekdayBehavior = 1;
            }
        }
    },
    relativeTextWeek: {
        regex: RegExp('^(' + reReltexttext + ')' + reSpace + 'week', 'i'),
        name: 'relativetextweek',
        callback: function (match, relText) {
            this.weekdayBehavior = 2;
            switch (relText.toLowerCase()) {
                case 'this':
                    this.rd += 0;
                    break;
                case 'next':
                    this.rd += 7;
                    break;
                case 'last':
                case 'previous':
                    this.rd -= 7;
                    break;
            }
            if (isNaN(this.weekday)) {
                this.weekday = 1;
            }
        }
    },
    monthFullOrMonthAbbr: {
        regex: RegExp('^(' + reMonthFull + '|' + reMonthAbbr + ')', 'i'),
        name: 'monthfull | monthabbr',
        callback: function (match, month) {
            return this.ymd(this.y, lookupMonth(month), this.d);
        }
    },
    tzCorrection: {
        regex: RegExp('^' + reTzCorrection, 'i'),
        name: 'tzcorrection',
        callback: function (tzCorrection) {
            return this.zone(processTzCorrection(tzCorrection));
        }
    },
    ago: {
        regex: /^ago/i,
        name: 'ago',
        callback: function () {
            this.ry = -this.ry;
            this.rm = -this.rm;
            this.rd = -this.rd;
            this.rh = -this.rh;
            this.ri = -this.ri;
            this.rs = -this.rs;
            this.rf = -this.rf;
        }
    },
    year4: {
        regex: RegExp('^' + reYear4),
        name: 'year4',
        callback: function (match, year) {
            this.y = +year;
            return true;
        }
    },
    whitespace: {
        regex: /^[ .,\t]+/,
        name: 'whitespace'
        // do nothing
    },
    dateShortWithTimeLong: {
        regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond, 'i'),
        name: 'dateshortwithtimelong',
        callback: function (match, month, day, hour, minute, second) {
            return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0);
        }
    },
    dateShortWithTimeLong12: {
        regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
        name: 'dateshortwithtimelong12',
        callback: function (match, month, day, hour, minute, second, meridian) {
            return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0);
        }
    },
    dateShortWithTimeShort: {
        regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute, 'i'),
        name: 'dateshortwithtimeshort',
        callback: function (match, month, day, hour, minute) {
            return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0);
        }
    },
    dateShortWithTimeShort12: {
        regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
        name: 'dateshortwithtimeshort12',
        callback: function (match, month, day, hour, minute, meridian) {
            return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0);
        }
    }
};
var resultProto = {
    // date
    y: NaN,
    m: NaN,
    d: NaN,
    // time
    h: NaN,
    i: NaN,
    s: NaN,
    f: NaN,
    // relative shifts
    ry: 0,
    rm: 0,
    rd: 0,
    rh: 0,
    ri: 0,
    rs: 0,
    rf: 0,
    // weekday related shifts
    weekday: NaN,
    weekdayBehavior: 0,
    // first or last day of month
    // 0 none, 1 first, -1 last
    firstOrLastDayOfMonth: 0,
    // timezone correction in minutes
    z: NaN,
    // counters
    dates: 0,
    times: 0,
    zones: 0,
    // helper functions
    ymd: function (y, m, d) {
        if (this.dates > 0) {
            return false;
        }
        this.dates++;
        this.y = y;
        this.m = m;
        this.d = d;
        return true;
    },
    time: function (h, i, s, f) {
        if (this.times > 0) {
            return false;
        }
        this.times++;
        this.h = h;
        this.i = i;
        this.s = s;
        this.f = f;
        return true;
    },
    resetTime: function () {
        this.h = 0;
        this.i = 0;
        this.s = 0;
        this.f = 0;
        this.times = 0;
        return true;
    },
    zone: function (minutes) {
        if (this.zones <= 1) {
            this.zones++;
            this.z = minutes;
            return true;
        }
        return false;
    },
    toDate: function (relativeTo) {
        if (this.dates && !this.times) {
            this.h = this.i = this.s = this.f = 0;
        }
        // fill holes
        if (isNaN(this.y)) {
            this.y = relativeTo.getFullYear();
        }
        if (isNaN(this.m)) {
            this.m = relativeTo.getMonth();
        }
        if (isNaN(this.d)) {
            this.d = relativeTo.getDate();
        }
        if (isNaN(this.h)) {
            this.h = relativeTo.getHours();
        }
        if (isNaN(this.i)) {
            this.i = relativeTo.getMinutes();
        }
        if (isNaN(this.s)) {
            this.s = relativeTo.getSeconds();
        }
        if (isNaN(this.f)) {
            this.f = relativeTo.getMilliseconds();
        }
        // adjust special early
        switch (this.firstOrLastDayOfMonth) {
            case 1:
                this.d = 1;
                break;
            case -1:
                this.d = 0;
                this.m += 1;
                break;
        }
        if (!isNaN(this.weekday)) {
            var date = new Date(relativeTo.getTime());
            date.setFullYear(this.y, this.m, this.d);
            date.setHours(this.h, this.i, this.s, this.f);
            var dow = date.getDay();
            if (this.weekdayBehavior === 2) {
                // To make "this week" work, where the current day of week is a "sunday"
                if (dow === 0 && this.weekday !== 0) {
                    this.weekday = -6;
                }
                // To make "sunday this week" work, where the current day of week is not a "sunday"
                if (this.weekday === 0 && dow !== 0) {
                    this.weekday = 7;
                }
                this.d -= dow;
                this.d += this.weekday;
            }
            else {
                var diff = this.weekday - dow;
                // some PHP magic
                if ((this.rd < 0 && diff < 0) || (this.rd >= 0 && diff <= -this.weekdayBehavior)) {
                    diff += 7;
                }
                if (this.weekday >= 0) {
                    this.d += diff;
                }
                else {
                    this.d -= (7 - (Math.abs(this.weekday) - dow));
                }
                this.weekday = NaN;
            }
        }
        // adjust relative
        this.y += this.ry;
        this.m += this.rm;
        this.d += this.rd;
        this.h += this.rh;
        this.i += this.ri;
        this.s += this.rs;
        this.f += this.rf;
        this.ry = this.rm = this.rd = 0;
        this.rh = this.ri = this.rs = this.rf = 0;
        var result = new Date(relativeTo.getTime());
        // since Date constructor treats years <= 99 as 1900+
        // it can't be used, thus this weird way
        result.setFullYear(this.y, this.m, this.d);
        result.setHours(this.h, this.i, this.s, this.f);
        // note: this is done twice in PHP
        // early when processing special relatives
        // and late
        // todo: check if the logic can be reduced
        // to just one time action
        switch (this.firstOrLastDayOfMonth) {
            case 1:
                result.setDate(1);
                break;
            case -1:
                result.setMonth(result.getMonth() + 1, 0);
                break;
        }
        // adjust timezone
        if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
            result.setUTCFullYear(result.getFullYear(), result.getMonth(), result.getDate());
            result.setUTCHours(result.getHours(), result.getMinutes() + this.z, result.getSeconds(), result.getMilliseconds());
        }
        return result;
    }
};
module.exports = function strtotime(str, now) {
    //       discuss at: https://locutus.io/php/strtotime/
    //      original by: Caio Ariede (https://caioariede.com)
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Caio Ariede (https://caioariede.com)
    //      improved by: A. Matías Quezada (https://amatiasq.com)
    //      improved by: preuter
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Mirko Faber
    //         input by: David
    //      bugfixed by: Wagner B. Soares
    //      bugfixed by: Artur Tchernychev
    //      bugfixed by: Stephan Bösch-Plepelits (https://github.com/plepe)
    // reimplemented by: Rafał Kukawski
    //           note 1: Examples all have a fixed timestamp to prevent
    //           note 1: tests to fail because of variable time(zones)
    //        example 1: strtotime('+1 day', 1129633200)
    //        returns 1: 1129719600
    //        example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200)
    //        returns 2: 1130425202
    //        example 3: strtotime('last month', 1129633200)
    //        returns 3: 1127041200
    //        example 4: strtotime('2009-05-04 08:30:00+00')
    //        returns 4: 1241425800
    //        example 5: strtotime('2009-05-04 08:30:00+02:00')
    //        returns 5: 1241418600
    if (now == null) {
        now = Math.floor(Date.now() / 1000);
    }
    // the rule order is important
    // if multiple rules match, the longest match wins
    // if multiple rules match the same string, the first match wins
    var rules = [
        formats.yesterday,
        formats.now,
        formats.noon,
        formats.midnightOrToday,
        formats.tomorrow,
        formats.timestamp,
        formats.firstOrLastDay,
        formats.backOrFrontOf,
        // formats.weekdayOf, // not yet implemented
        formats.timeTiny12,
        formats.timeShort12,
        formats.timeLong12,
        formats.mssqltime,
        formats.timeShort24,
        formats.timeLong24,
        formats.iso8601long,
        formats.gnuNoColon,
        formats.iso8601noColon,
        formats.americanShort,
        formats.american,
        formats.iso8601date4,
        formats.iso8601dateSlash,
        formats.dateSlash,
        formats.gnuDateShortOrIso8601date2,
        formats.gnuDateShorter,
        formats.dateFull,
        formats.pointedDate4,
        formats.pointedDate2,
        formats.dateNoDay,
        formats.dateNoDayRev,
        formats.dateTextual,
        formats.dateNoYear,
        formats.dateNoYearRev,
        formats.dateNoColon,
        formats.xmlRpc,
        formats.xmlRpcNoColon,
        formats.soap,
        formats.wddx,
        formats.exif,
        formats.pgydotd,
        formats.isoWeekDay,
        formats.pgTextShort,
        formats.pgTextReverse,
        formats.clf,
        formats.year4,
        formats.ago,
        formats.dayText,
        formats.relativeTextWeek,
        formats.relativeText,
        formats.monthFullOrMonthAbbr,
        formats.tzCorrection,
        formats.dateShortWithTimeShort12,
        formats.dateShortWithTimeLong12,
        formats.dateShortWithTimeShort,
        formats.dateShortWithTimeLong,
        formats.relative,
        formats.whitespace
    ];
    var result = Object.create(resultProto);
    while (str.length) {
        var longestMatch = null;
        var finalRule = null;
        for (var i = 0, l = rules.length; i < l; i++) {
            var format = rules[i];
            var match = str.match(format.regex);
            if (match) {
                if (!longestMatch || match[0].length > longestMatch[0].length) {
                    longestMatch = match;
                    finalRule = format;
                }
            }
        }
        if (!finalRule || (finalRule.callback && finalRule.callback.apply(result, longestMatch) === false)) {
            return false;
        }
        str = str.substr(longestMatch[0].length);
        finalRule = null;
        longestMatch = null;
    }
    return Math.floor(result.toDate(new Date(now * 1000)) / 1000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydG90aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL3N0cnRvdGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDekIsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFBO0FBQzVCLElBQU0sVUFBVSxHQUFHLCtCQUErQixDQUFBO0FBQ2xELElBQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFBO0FBQ3RDLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFBO0FBQ3ZDLElBQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFBO0FBQ25DLElBQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQTtBQUNoQyxJQUFNLFVBQVUsR0FBRyxjQUFjLENBQUE7QUFDakMsSUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUE7QUFDbkMsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUE7QUFDcEMsSUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUE7QUFFaEMsSUFBTSxTQUFTLEdBQUcsMERBQTBELENBQUE7QUFDNUUsSUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUE7QUFDL0MsSUFBTSxTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFBO0FBRTVELElBQU0sZUFBZSxHQUFHLG9GQUFvRixDQUFBO0FBQzVHLElBQU0sYUFBYSxHQUFHLHlCQUF5QixDQUFBO0FBQy9DLElBQU0sYUFBYSxHQUFHLDZFQUE2RSxHQUFHLFNBQVMsQ0FBQTtBQUUvRyxJQUFNLE1BQU0sR0FBRyxjQUFjLENBQUE7QUFDN0IsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFBO0FBQzVCLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQTtBQUM1QixJQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQTtBQUN6QyxJQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQTtBQUNsQyxJQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQTtBQUNuQyxJQUFNLEtBQUssR0FBRyx5Q0FBeUMsQ0FBQTtBQUN2RCxJQUFNLE9BQU8sR0FBRywyQkFBMkIsQ0FBQTtBQUUzQyxJQUFNLFdBQVcsR0FBRyx1RkFBdUYsQ0FBQTtBQUMzRyxJQUFNLFdBQVcsR0FBRyxtREFBbUQsQ0FBQTtBQUN2RSxJQUFNLFlBQVksR0FBRyw4QkFBOEIsQ0FBQTtBQUNuRCxJQUFNLFdBQVcsR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUE7QUFFcEYsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFBO0FBQzVFLElBQU0sV0FBVyxHQUFHLDBEQUEwRCxDQUFBO0FBQzlFLElBQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFBO0FBRWpELElBQU0sWUFBWSxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxHQUFHLGlCQUFpQixDQUFBO0FBRTFFLFNBQVMsZUFBZSxDQUFFLElBQUksRUFBRSxRQUFRO0lBQ3RDLFFBQVEsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRTdDLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssR0FBRztZQUNOLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDTixJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsTUFBSztLQUNSO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUUsT0FBTztJQUMzQixJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQTtJQUVuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7UUFDcEMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQ2hDO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUUsUUFBUTtJQUM1QixPQUFPO1FBQ0wsR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFBRSxDQUFDO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixRQUFRLEVBQUUsQ0FBQztRQUNYLEVBQUUsRUFBRSxDQUFDO1FBQ0wsR0FBRyxFQUFFLENBQUM7UUFDTixLQUFLLEVBQUUsQ0FBQztRQUNSLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixLQUFLLEVBQUUsQ0FBQztRQUNSLEVBQUUsRUFBRSxDQUFDO1FBQ0wsR0FBRyxFQUFFLENBQUM7UUFDTixDQUFDLEVBQUUsQ0FBQztRQUNKLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxFQUFFLEVBQUUsQ0FBQztRQUNMLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sTUFBTSxFQUFFLENBQUM7UUFDVCxJQUFJLEVBQUUsQ0FBQztRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxTQUFTLEVBQUUsQ0FBQztRQUNaLEVBQUUsRUFBRSxDQUFDO1FBQ0wsR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFBRSxDQUFDO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUUsRUFBRTtRQUNaLEVBQUUsRUFBRSxFQUFFO1FBQ04sR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUUsRUFBRTtRQUNaLEdBQUcsRUFBRSxFQUFFO0tBQ1IsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUUsTUFBTSxFQUFFLG1CQUF1QjtJQUF2QixvQ0FBQSxFQUFBLHVCQUF1QjtJQUNyRCxJQUFNLFVBQVUsR0FBRztRQUNqQixHQUFHLEVBQUUsQ0FBQztRQUNOLE1BQU0sRUFBRSxDQUFDO1FBQ1QsR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQztRQUNWLEdBQUcsRUFBRSxDQUFDO1FBQ04sU0FBUyxFQUFFLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQztRQUNOLFFBQVEsRUFBRSxDQUFDO1FBQ1gsR0FBRyxFQUFFLENBQUM7UUFDTixNQUFNLEVBQUUsQ0FBQztRQUNULEdBQUcsRUFBRSxDQUFDO1FBQ04sUUFBUSxFQUFFLENBQUM7UUFDWCxHQUFHLEVBQUUsQ0FBQztRQUNOLE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQTtJQUVELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLG1CQUFtQixDQUFBO0FBQ2hFLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBRSxPQUFPO0lBQzlCLElBQU0sZUFBZSxHQUFHO1FBQ3RCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDUixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ1osSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLENBQUM7UUFDVCxLQUFLLEVBQUUsQ0FBQztRQUNSLE1BQU0sRUFBRSxDQUFDO1FBQ1QsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsQ0FBQztRQUNULEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQTtJQUVELElBQU0sZ0JBQWdCLEdBQUc7UUFDdkIsSUFBSSxFQUFFLENBQUM7S0FDUixDQUFBO0lBRUQsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRTFDLE9BQU87UUFDTCxNQUFNLEVBQUUsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUNyQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztLQUM5QyxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUUsUUFBUSxFQUFFLFFBQVE7SUFDOUMsSUFBTSxtQkFBbUIsR0FBRyxtQ0FBbUMsQ0FBQTtJQUMvRCxRQUFRLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUUxRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hCLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTFCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQTtLQUNoQztJQUVELE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQTtBQUN0QyxDQUFDO0FBRUQsSUFBTSxPQUFPLEdBQUc7SUFDZCxTQUFTLEVBQUU7UUFDVCxLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsV0FBVztRQUNqQixRQUFRO1lBQ04sSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7SUFFRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsYUFBYTtLQUNkO0lBRUQsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ25ELENBQUM7S0FDRjtJQUVELGVBQWUsRUFBRTtRQUNmLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDekIsQ0FBQztLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUTtZQUNOLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDekIsQ0FBQztLQUNGO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLFdBQVc7UUFDakIsUUFBUSxZQUFFLEtBQUssRUFBRSxTQUFTO1lBQ3hCLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7WUFFZCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7S0FDRjtJQUVELGNBQWMsRUFBRTtRQUNkLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixRQUFRLFlBQUUsS0FBSyxFQUFFLEdBQUc7WUFDbEIsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUNqQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFBO2FBQy9CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUNoQztRQUNILENBQUM7S0FDRjtJQUVELGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxHQUFHLFVBQVUsR0FBRyxVQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNsRixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUE7WUFDeEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUE7WUFDakIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBRWYsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLElBQUksQ0FBQyxDQUFBO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUE7YUFDWjtZQUVELElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRXRDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUQsQ0FBQztLQUNGO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQzNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU87S0FDUjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsY0FBYyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUM7UUFDdEcsSUFBSSxFQUFFLFdBQVc7UUFDakIsUUFBUSxZQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTtZQUNuRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxRixDQUFDO0tBQ0Y7SUFFRCxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDO1FBQ3RHLElBQUksRUFBRSxZQUFZO1FBQ2xCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUTtZQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLENBQUM7S0FDRjtJQUVELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDO1FBQ2xGLElBQUksRUFBRSxhQUFhO1FBQ25CLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ25FLENBQUM7S0FDRjtJQUVELFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxVQUFVLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQztRQUM1RCxJQUFJLEVBQUUsWUFBWTtRQUNsQixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRO1lBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM3RCxDQUFDO0tBQ0Y7SUFFRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxjQUFjLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1SixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVk7WUFDekUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ3RELENBQUM7S0FDRjtJQUVELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDN0csSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUNyRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEYsQ0FBQztLQUNGO0lBRUQsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUM7UUFDNUgsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUNyRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEYsQ0FBQztLQUNGO0lBRUQsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLFNBQVMsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDekcsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUNyRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEYsQ0FBQztLQUNGO0lBRUQsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLFNBQVMsR0FBRyxPQUFPLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2hHLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQ3JELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNsRixDQUFDO0tBQ0Y7SUFFRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxjQUFjLEVBQUUsR0FBRyxDQUFDO1FBQ3pKLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxZQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZO1lBQ25FLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDdEQsQ0FBQztLQUNGO0lBRUQsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxNQUFNLEVBQUUsR0FBRyxDQUFDO1FBQ3JGLElBQUksRUFBRSxhQUFhO1FBQ25CLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSTtZQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9ELENBQUM7S0FDRjtJQUVELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxHQUFHLGlCQUFpQixHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUM7UUFDeEYsSUFBSSxFQUFFLGFBQWE7UUFDbkIsUUFBUSxZQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM5RCxDQUFDO0tBQ0Y7SUFFRCxZQUFZLEVBQUU7UUFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ25FLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsWUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJO1lBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekMsQ0FBQztLQUNGO0lBRUQsWUFBWSxFQUFFO1FBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNqRSxJQUFJLEVBQUUsY0FBYztRQUNwQixRQUFRLFlBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQ0Y7SUFFRCxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3ZFLElBQUksRUFBRSxZQUFZO1FBQ2xCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0tBQ0Y7SUFFRCxXQUFXLEVBQUU7UUFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNsRCxJQUFJLEVBQUUsYUFBYTtRQUNuQixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRztZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQ25ELElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxZQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRztZQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakMsQ0FBQztLQUNGO0lBRUQsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLEVBQUUsR0FBRyxDQUFDO1FBQ3hELElBQUksRUFBRSxhQUFhO1FBQ25CLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU07WUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN4QyxDQUFDO0tBQ0Y7SUFFRCxjQUFjLEVBQUU7UUFDZCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUM7UUFDaEUsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUMsQ0FBQztLQUNGO0lBRUQsZ0JBQWdCLEVBQUU7UUFDaEIsbURBQW1EO1FBQ25ELG1EQUFtRDtRQUNuRCwyQkFBMkI7UUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDcEUsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRztZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDMUQsSUFBSSxFQUFFLFdBQVc7UUFDakIsUUFBUSxZQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QyxDQUFDO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3pELElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JELENBQUM7S0FDRjtJQUVELGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQzFDLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUc7WUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFDLENBQUM7S0FDRjtJQUVELDBCQUEwQixFQUFFO1FBQzFCLGtEQUFrRDtRQUNsRCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ3pELElBQUksRUFBRSw2QkFBNkI7UUFDbkMsUUFBUSxZQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckQsQ0FBQztLQUNGO0lBRUQsWUFBWSxFQUFFO1FBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUN0RSxJQUFJLEVBQUUsY0FBYztRQUNwQixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRztZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7S0FDRjtJQUVELFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDO1FBQ25ELElBQUksRUFBRSxZQUFZO1FBQ2xCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU07WUFDM0IsOEJBQThCO1lBQzlCLHlGQUF5RjtZQUN6RixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQztvQkFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsS0FBSyxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtvQkFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO29CQUVaLE9BQU8sSUFBSSxDQUFBO2dCQUNiO29CQUNFLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxjQUFjLEVBQUU7UUFDZCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUM1QyxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUs7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdEMsQ0FBQztLQUNGO0lBRUQsYUFBYSxFQUFFO1FBQ2IsdUNBQXVDO1FBQ3ZDLHVEQUF1RDtRQUN2RCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyw4QkFBOEIsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE9BQU8sRUFBRSxHQUFHLENBQUM7UUFDdkYsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxZQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM5RCxDQUFDO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQztRQUNsRixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLFlBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlELENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsT0FBTyxFQUFFLEdBQUcsQ0FBQztRQUM3RCxJQUFJLEVBQUUsV0FBVztRQUNqQixRQUFRLFlBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0MsQ0FBQztLQUNGO0lBRUQsWUFBWSxFQUFFO1FBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxXQUFXLEVBQUUsR0FBRyxDQUFDO1FBQzdELElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUs7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMvQyxDQUFDO0tBQ0Y7SUFFRCxXQUFXLEVBQUU7UUFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQztRQUN0RSxJQUFJLEVBQUUsYUFBYTtRQUNuQixRQUFRLFlBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlELENBQUM7S0FDRjtJQUVELFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksRUFBRSxHQUFHLENBQUM7UUFDdEMsSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxZQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRztZQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuRCxDQUFDO0tBQ0Y7SUFFRCxhQUFhLEVBQUU7UUFDYixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsV0FBVyxHQUFHLFdBQVcsRUFBRSxHQUFHLENBQUM7UUFDM0QsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxZQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSztZQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuRCxDQUFDO0tBQ0Y7SUFFRCxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztRQUN0RSxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFFBQVEsWUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHO1lBQzlCLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixPQUFPLEtBQUssQ0FBQTthQUNiO1lBRUQsOEJBQThCO1lBQzlCLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7WUFFekQsK0RBQStEO1lBQy9ELFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUUzRCxJQUFJLENBQUMsRUFBRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUMvQyxDQUFDO0tBQ0Y7SUFFRCxZQUFZLEVBQUU7UUFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxlQUFlLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1RyxJQUFJLEVBQUUsY0FBYztRQUNwQixRQUFRLFlBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPO1lBQ2hDLCtDQUErQztZQUMvQywwQ0FBMEM7WUFDcEMsSUFBQSxLQUF1QixjQUFjLENBQUMsUUFBUSxDQUFDLEVBQTdDLE1BQU0sWUFBQSxFQUFFLFFBQVEsY0FBNkIsQ0FBQTtZQUVyRCxRQUFRLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxRQUFRLENBQUM7Z0JBQ2QsS0FBSyxTQUFTO29CQUNaLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFBO29CQUNqQixNQUFLO2dCQUNQLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssU0FBUztvQkFDWixJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQTtvQkFDakIsTUFBSztnQkFDUCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLE9BQU87b0JBQ1YsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUE7b0JBQ2pCLE1BQUs7Z0JBQ1AsS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNO29CQUNULElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFBO29CQUNqQixNQUFLO2dCQUNQLEtBQUssV0FBVyxDQUFDO2dCQUNqQixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtBQUssYUFBYTtvQkFDaEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO29CQUN0QixNQUFLO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssT0FBTztvQkFDVixJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7b0JBQ3JCLE1BQUs7Z0JBQ1AsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNYLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFBO29CQUNqQixNQUFLO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssT0FBTztvQkFDVixJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQTtvQkFDakIsTUFBSztnQkFDUCxLQUFLLEtBQUssQ0FBQztnQkFBQyxLQUFLLFFBQVEsQ0FBQztnQkFDMUIsS0FBSyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQzNCLEtBQUssS0FBSyxDQUFDO2dCQUFDLEtBQUssV0FBVyxDQUFDO2dCQUM3QixLQUFLLEtBQUssQ0FBQztnQkFBQyxLQUFLLFVBQVUsQ0FBQztnQkFDNUIsS0FBSyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxRQUFRLENBQUM7Z0JBQzFCLEtBQUssS0FBSyxDQUFDO2dCQUFDLEtBQUssVUFBVSxDQUFDO2dCQUM1QixLQUFLLEtBQUssQ0FBQztnQkFBQyxLQUFLLFFBQVE7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQTtvQkFDeEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDakQsTUFBSztnQkFDUCxLQUFLLFNBQVMsQ0FBQztnQkFDZixLQUFLLFVBQVU7b0JBQ2IsT0FBTztvQkFDUCxNQUFLO2FBQ1I7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLHVCQUF1QixHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsYUFBYSxHQUFHLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDekYsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxZQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU87WUFDdkMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFBO1lBRWpELElBQUksTUFBTSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFFOUMsUUFBUSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssU0FBUztvQkFDWixJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQTtvQkFDakIsTUFBSztnQkFDUCxLQUFLLEtBQUssQ0FBQztnQkFDWCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUE7b0JBQ2pCLE1BQUs7Z0JBQ1AsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxPQUFPO29CQUNWLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFBO29CQUNqQixNQUFLO2dCQUNQLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTTtvQkFDVCxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQTtvQkFDakIsTUFBSztnQkFDUCxLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLGFBQWE7b0JBQ2hCLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtvQkFDdEIsTUFBSztnQkFDUCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLE9BQU87b0JBQ1YsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFBO29CQUNyQixNQUFLO2dCQUNQLEtBQUssT0FBTyxDQUFDO2dCQUNiLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQTtvQkFDakIsTUFBSztnQkFDUCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLE9BQU87b0JBQ1YsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUE7b0JBQ2pCLE1BQUs7Z0JBQ1AsS0FBSyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxRQUFRLENBQUM7Z0JBQzFCLEtBQUssS0FBSyxDQUFDO2dCQUFDLEtBQUssU0FBUyxDQUFDO2dCQUMzQixLQUFLLEtBQUssQ0FBQztnQkFBQyxLQUFLLFdBQVcsQ0FBQztnQkFDN0IsS0FBSyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxVQUFVLENBQUM7Z0JBQzVCLEtBQUssS0FBSyxDQUFDO2dCQUFDLEtBQUssUUFBUSxDQUFDO2dCQUMxQixLQUFLLEtBQUssQ0FBQztnQkFBQyxLQUFLLFVBQVUsQ0FBQztnQkFDNUIsS0FBSyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxRQUFRO29CQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7b0JBQ3hCLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2pELE1BQUs7Z0JBQ1AsS0FBSyxTQUFTLENBQUM7Z0JBQ2YsS0FBSyxVQUFVO29CQUNiLE9BQU87b0JBQ1AsTUFBSzthQUNSO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDMUMsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLFlBQUUsS0FBSyxFQUFFLE9BQU87WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUV4QyxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQTthQUN6QjtRQUNILENBQUM7S0FDRjtJQUVELGdCQUFnQixFQUFFO1FBQ2hCLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUM7UUFDakUsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLFlBQUUsS0FBSyxFQUFFLE9BQU87WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7WUFFeEIsUUFBUSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssTUFBTTtvQkFDVCxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDWixNQUFLO2dCQUNQLEtBQUssTUFBTTtvQkFDVCxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDWixNQUFLO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssVUFBVTtvQkFDYixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDWixNQUFLO2FBQ1I7WUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBO2FBQ2pCO1FBQ0gsQ0FBQztLQUNGO0lBRUQsb0JBQW9CLEVBQUU7UUFDcEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNoRSxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSztZQUNwQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JELENBQUM7S0FDRjtJQUVELFlBQVksRUFBRTtRQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLGNBQWMsRUFBRSxHQUFHLENBQUM7UUFDeEMsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxZQUFFLFlBQVk7WUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDckQsQ0FBQztLQUNGO0lBRUQsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVE7WUFDTixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNwQixDQUFDO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLFlBQUUsS0FBSyxFQUFFLElBQUk7WUFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUNkLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQztLQUNGO0lBRUQsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsYUFBYTtLQUNkO0lBRUQscUJBQXFCLEVBQUU7UUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsUUFBUSxFQUFFLEdBQUcsQ0FBQztRQUNoRyxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDL0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1RixDQUFDO0tBQ0Y7SUFFRCx1QkFBdUIsRUFBRTtRQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxZQUFZLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFVBQVUsR0FBRyxVQUFVLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQztRQUNySCxJQUFJLEVBQUUseUJBQXlCO1FBQy9CLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRO1lBQ3pELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3ZILENBQUM7S0FDRjtJQUVELHNCQUFzQixFQUFFO1FBQ3RCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLEVBQUUsR0FBRyxDQUFDO1FBQzVFLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsUUFBUSxZQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RGLENBQUM7S0FDRjtJQUVELHdCQUF3QixFQUFFO1FBQ3hCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFVBQVUsR0FBRyxVQUFVLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQztRQUNqRyxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLFFBQVEsWUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7WUFDakQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pILENBQUM7S0FDRjtDQUNGLENBQUE7QUFFRCxJQUFJLFdBQVcsR0FBRztJQUNoQixPQUFPO0lBQ1AsQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sT0FBTztJQUNQLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBRU4sa0JBQWtCO0lBQ2xCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0lBRUwseUJBQXlCO0lBQ3pCLE9BQU8sRUFBRSxHQUFHO0lBQ1osZUFBZSxFQUFFLENBQUM7SUFFbEIsNkJBQTZCO0lBQzdCLDJCQUEyQjtJQUMzQixxQkFBcUIsRUFBRSxDQUFDO0lBRXhCLGlDQUFpQztJQUNqQyxDQUFDLEVBQUUsR0FBRztJQUVOLFdBQVc7SUFDWCxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssRUFBRSxDQUFDO0lBQ1IsS0FBSyxFQUFFLENBQUM7SUFFUixtQkFBbUI7SUFDbkIsR0FBRyxZQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNWLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELElBQUksWUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQTtTQUNiO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFVixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUVkLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELElBQUksWUFBRSxPQUFPO1FBQ1gsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDWixJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQTtZQUNoQixPQUFPLElBQUksQ0FBQTtTQUNaO1FBRUQsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsTUFBTSxZQUFFLFVBQVU7UUFDaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN0QztRQUVELGFBQWE7UUFDYixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDbEM7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDL0I7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDOUI7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDL0I7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDakM7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDakM7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUE7U0FDdEM7UUFFRCx1QkFBdUI7UUFDdkIsUUFBUSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbEMsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNWLE1BQUs7WUFDUCxLQUFLLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDVixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDWCxNQUFLO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFN0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBRXZCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLHdFQUF3RTtnQkFDeEUsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUNsQjtnQkFFRCxtRkFBbUY7Z0JBQ25GLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7aUJBQ2pCO2dCQUVELElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFBO2dCQUNiLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQTthQUN2QjtpQkFBTTtnQkFDTCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtnQkFFN0IsaUJBQWlCO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUNoRixJQUFJLElBQUksQ0FBQyxDQUFBO2lCQUNWO2dCQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFBO2lCQUNmO3FCQUFNO29CQUNMLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUMvQztnQkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTthQUNuQjtTQUNGO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7UUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7UUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUVqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDM0MscURBQXFEO1FBQ3JELHdDQUF3QztRQUN4QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFL0Msa0NBQWtDO1FBQ2xDLDBDQUEwQztRQUMxQyxXQUFXO1FBQ1gsMENBQTBDO1FBQzFDLDBCQUEwQjtRQUMxQixRQUFRLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNsQyxLQUFLLENBQUM7Z0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakIsTUFBSztZQUNQLEtBQUssQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDekMsTUFBSztTQUNSO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDM0QsTUFBTSxDQUFDLGNBQWMsQ0FDbkIsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUNwQixNQUFNLENBQUMsUUFBUSxFQUFFLEVBQ2pCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBRW5CLE1BQU0sQ0FBQyxXQUFXLENBQ2hCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDakIsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQzVCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFDbkIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7U0FDNUI7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUM7Q0FDRixDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxHQUFHLEVBQUUsR0FBRztJQUMzQyxzREFBc0Q7SUFDdEQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsNkRBQTZEO0lBQzdELDRCQUE0QjtJQUM1Qix5REFBeUQ7SUFDekQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixxQ0FBcUM7SUFDckMsc0NBQXNDO0lBQ3RDLHVFQUF1RTtJQUN2RSxtQ0FBbUM7SUFDbkMsbUVBQW1FO0lBQ25FLGtFQUFrRTtJQUNsRSxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLDhFQUE4RTtJQUM5RSwrQkFBK0I7SUFDL0Isd0RBQXdEO0lBQ3hELCtCQUErQjtJQUMvQix3REFBd0Q7SUFDeEQsK0JBQStCO0lBQy9CLDJEQUEyRDtJQUMzRCwrQkFBK0I7SUFFL0IsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0tBQ3BDO0lBRUQsOEJBQThCO0lBQzlCLGtEQUFrRDtJQUNsRCxnRUFBZ0U7SUFDaEUsSUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLENBQUMsU0FBUztRQUNqQixPQUFPLENBQUMsR0FBRztRQUNYLE9BQU8sQ0FBQyxJQUFJO1FBQ1osT0FBTyxDQUFDLGVBQWU7UUFDdkIsT0FBTyxDQUFDLFFBQVE7UUFDaEIsT0FBTyxDQUFDLFNBQVM7UUFDakIsT0FBTyxDQUFDLGNBQWM7UUFDdEIsT0FBTyxDQUFDLGFBQWE7UUFDckIsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxVQUFVO1FBQ2xCLE9BQU8sQ0FBQyxXQUFXO1FBQ25CLE9BQU8sQ0FBQyxVQUFVO1FBQ2xCLE9BQU8sQ0FBQyxTQUFTO1FBQ2pCLE9BQU8sQ0FBQyxXQUFXO1FBQ25CLE9BQU8sQ0FBQyxVQUFVO1FBQ2xCLE9BQU8sQ0FBQyxXQUFXO1FBQ25CLE9BQU8sQ0FBQyxVQUFVO1FBQ2xCLE9BQU8sQ0FBQyxjQUFjO1FBQ3RCLE9BQU8sQ0FBQyxhQUFhO1FBQ3JCLE9BQU8sQ0FBQyxRQUFRO1FBQ2hCLE9BQU8sQ0FBQyxZQUFZO1FBQ3BCLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTyxDQUFDLFNBQVM7UUFDakIsT0FBTyxDQUFDLDBCQUEwQjtRQUNsQyxPQUFPLENBQUMsY0FBYztRQUN0QixPQUFPLENBQUMsUUFBUTtRQUNoQixPQUFPLENBQUMsWUFBWTtRQUNwQixPQUFPLENBQUMsWUFBWTtRQUNwQixPQUFPLENBQUMsU0FBUztRQUNqQixPQUFPLENBQUMsWUFBWTtRQUNwQixPQUFPLENBQUMsV0FBVztRQUNuQixPQUFPLENBQUMsVUFBVTtRQUNsQixPQUFPLENBQUMsYUFBYTtRQUNyQixPQUFPLENBQUMsV0FBVztRQUNuQixPQUFPLENBQUMsTUFBTTtRQUNkLE9BQU8sQ0FBQyxhQUFhO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJO1FBQ1osT0FBTyxDQUFDLElBQUk7UUFDWixPQUFPLENBQUMsSUFBSTtRQUNaLE9BQU8sQ0FBQyxPQUFPO1FBQ2YsT0FBTyxDQUFDLFVBQVU7UUFDbEIsT0FBTyxDQUFDLFdBQVc7UUFDbkIsT0FBTyxDQUFDLGFBQWE7UUFDckIsT0FBTyxDQUFDLEdBQUc7UUFDWCxPQUFPLENBQUMsS0FBSztRQUNiLE9BQU8sQ0FBQyxHQUFHO1FBQ1gsT0FBTyxDQUFDLE9BQU87UUFDZixPQUFPLENBQUMsZ0JBQWdCO1FBQ3hCLE9BQU8sQ0FBQyxZQUFZO1FBQ3BCLE9BQU8sQ0FBQyxvQkFBb0I7UUFDNUIsT0FBTyxDQUFDLFlBQVk7UUFDcEIsT0FBTyxDQUFDLHdCQUF3QjtRQUNoQyxPQUFPLENBQUMsdUJBQXVCO1FBQy9CLE9BQU8sQ0FBQyxzQkFBc0I7UUFDOUIsT0FBTyxDQUFDLHFCQUFxQjtRQUM3QixPQUFPLENBQUMsUUFBUTtRQUNoQixPQUFPLENBQUMsVUFBVTtLQUNuQixDQUFBO0lBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUV2QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDakIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQTtRQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV2QixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUVyQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDN0QsWUFBWSxHQUFHLEtBQUssQ0FBQTtvQkFDcEIsU0FBUyxHQUFHLE1BQU0sQ0FBQTtpQkFDbkI7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2xHLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUNoQixZQUFZLEdBQUcsSUFBSSxDQUFBO0tBQ3BCO0lBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDL0QsQ0FBQyxDQUFBIn0=