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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydG90aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9zdHJ0b3RpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFBO0FBQ3pCLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQTtBQUM1QixJQUFNLFVBQVUsR0FBRywrQkFBK0IsQ0FBQTtBQUNsRCxJQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQTtBQUN0QyxJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQTtBQUN2QyxJQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQTtBQUNuQyxJQUFNLFFBQVEsR0FBRyxlQUFlLENBQUE7QUFDaEMsSUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFBO0FBQ2pDLElBQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFBO0FBQ25DLElBQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFBO0FBQ3BDLElBQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFBO0FBRWhDLElBQU0sU0FBUyxHQUFHLDBEQUEwRCxDQUFBO0FBQzVFLElBQU0sU0FBUyxHQUFHLDZCQUE2QixDQUFBO0FBQy9DLElBQU0sU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQTtBQUU1RCxJQUFNLGVBQWUsR0FBRyxvRkFBb0YsQ0FBQTtBQUM1RyxJQUFNLGFBQWEsR0FBRyx5QkFBeUIsQ0FBQTtBQUMvQyxJQUFNLGFBQWEsR0FBRyw2RUFBNkUsR0FBRyxTQUFTLENBQUE7QUFFL0csSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFBO0FBQzdCLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQTtBQUM1QixJQUFNLE9BQU8sR0FBRyxZQUFZLENBQUE7QUFDNUIsSUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUE7QUFDekMsSUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUE7QUFDbEMsSUFB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