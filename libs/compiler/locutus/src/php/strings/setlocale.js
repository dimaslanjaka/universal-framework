module.exports = function setlocale(category, locale) {
    //  discuss at: https://locutus.io/php/setlocale/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: Blues (https://hacks.bluesmoon.info/strftime/strftime.js)
    // original by: YUI Library (https://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html)
    //      note 1: Is extensible, but currently only implements locales en,
    //      note 1: en_US, en_GB, en_AU, fr, and fr_CA for LC_TIME only; C for LC_CTYPE;
    //      note 1: C and en for LC_MONETARY/LC_NUMERIC; en for LC_COLLATE
    //      note 1: Uses global: locutus to store locale info
    //      note 1: Consider using https://demo.icu-project.org/icu-bin/locexp as basis for localization (as in i18n_loc_set_default())
    //      note 2: This function tries to establish the locale via the `window` global.
    //      note 2: This feature will not work in Node and hence is Browser-only
    //   example 1: setlocale('LC_ALL', 'en_US')
    //   returns 1: 'en_US'
    var getenv = require('../info/getenv');
    var categ = '';
    var cats = [];
    var i = 0;
    var _copy = function _copy(orig) {
        if (orig instanceof RegExp) {
            return new RegExp(orig);
        }
        else if (orig instanceof Date) {
            return new Date(orig);
        }
        var newObj = {};
        for (var i in orig) {
            if (typeof orig[i] === 'object') {
                newObj[i] = _copy(orig[i]);
            }
            else {
                newObj[i] = orig[i];
            }
        }
        return newObj;
    };
    // Function usable by a ngettext implementation (apparently not an accessible part of setlocale(),
    // but locale-specific) See https://www.gnu.org/software/gettext/manual/gettext.html#Plural-forms
    // though amended with others from https://developer.mozilla.org/En/Localization_and_Plurals (new
    // categories noted with "MDC" below, though not sure of whether there is a convention for the
    // relative order of these newer groups as far as ngettext) The function name indicates the number
    // of plural forms (nplural) Need to look into https://cldr.unicode.org/ (maybe future JavaScript);
    // Dojo has some functions (under new BSD), including JSON conversions of LDML XML from CLDR:
    // https://bugs.dojotoolkit.org/browser/dojo/trunk/cldr and docs at
    // https://api.dojotoolkit.org/jsdoc/HEAD/dojo.cldr
    // var _nplurals1 = function (n) {
    //   // e.g., Japanese
    //   return 0
    // }
    var _nplurals2a = function (n) {
        // e.g., English
        return n !== 1 ? 1 : 0;
    };
    var _nplurals2b = function (n) {
        // e.g., French
        return n > 1 ? 1 : 0;
    };
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    // Reconcile Windows vs. *nix locale names?
    // Allow different priority orders of languages, esp. if implement gettext as in
    // LANGUAGE env. var.? (e.g., show German if French is not available)
    if (!$locutus.php.locales ||
        !$locutus.php.locales.fr_CA ||
        !$locutus.php.locales.fr_CA.LC_TIME ||
        !$locutus.php.locales.fr_CA.LC_TIME.x) {
        // Can add to the locales
        $locutus.php.locales = {};
        $locutus.php.locales.en = {
            'LC_COLLATE': function (str1, str2) {
                // @todo: This one taken from strcmp, but need for other locales; we don't use localeCompare
                // since its locale is not settable
                return (str1 === str2) ? 0 : ((str1 > str2) ? 1 : -1);
            },
            'LC_CTYPE': {
                // Need to change any of these for English as opposed to C?
                an: /^[A-Za-z\d]+$/g,
                al: /^[A-Za-z]+$/g,
                ct: /^[\u0000-\u001F\u007F]+$/g,
                dg: /^[\d]+$/g,
                gr: /^[\u0021-\u007E]+$/g,
                lw: /^[a-z]+$/g,
                pr: /^[\u0020-\u007E]+$/g,
                pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
                sp: /^[\f\n\r\t\v ]+$/g,
                up: /^[A-Z]+$/g,
                xd: /^[A-Fa-f\d]+$/g,
                CODESET: 'UTF-8',
                // Used by sql_regcase
                lower: 'abcdefghijklmnopqrstuvwxyz',
                upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            },
            'LC_TIME': {
                // Comments include nl_langinfo() constant equivalents and any
                // changes from Blues' implementation
                a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                // ABDAY_
                A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                // DAY_
                b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                // ABMON_
                B: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October',
                    'November', 'December'
                ],
                // MON_
                c: '%a %d %b %Y %r %Z',
                // D_T_FMT // changed %T to %r per results
                p: ['AM', 'PM'],
                // AM_STR/PM_STR
                P: ['am', 'pm'],
                // Not available in nl_langinfo()
                r: '%I:%M:%S %p',
                // T_FMT_AMPM (Fixed for all locales)
                x: '%m/%d/%Y',
                // D_FMT // switched order of %m and %d; changed %y to %Y (C uses %y)
                X: '%r',
                // T_FMT // changed from %T to %r  (%T is default for C, not English US)
                // Following are from nl_langinfo() or https://www.cptec.inpe.br/sx4/sx4man2/g1ab02e/strftime.4.html
                alt_digits: '',
                // e.g., ordinal
                ERA: '',
                ERA_YEAR: '',
                ERA_D_T_FMT: '',
                ERA_D_FMT: '',
                ERA_T_FMT: ''
            },
            // Assuming distinction between numeric and monetary is thus:
            // See below for C locale
            'LC_MONETARY': {
                // based on Windows "english" (English_United States.1252) locale
                int_curr_symbol: 'USD',
                currency_symbol: '$',
                mon_decimal_point: '.',
                mon_thousands_sep: ',',
                mon_grouping: [3],
                // use mon_thousands_sep; "" for no grouping; additional array members
                // indicate successive group lengths after first group
                // (e.g., if to be 1,23,456, could be [3, 2])
                positive_sign: '',
                negative_sign: '-',
                int_frac_digits: 2,
                // Fractional digits only for money defaults?
                frac_digits: 2,
                p_cs_precedes: 1,
                // positive currency symbol follows value = 0; precedes value = 1
                p_sep_by_space: 0,
                // 0: no space between curr. symbol and value; 1: space sep. them unless symb.
                // and sign are adjacent then space sep. them from value; 2: space sep. sign
                // and value unless symb. and sign are adjacent then space separates
                n_cs_precedes: 1,
                // see p_cs_precedes
                n_sep_by_space: 0,
                // see p_sep_by_space
                p_sign_posn: 3,
                // 0: parentheses surround quantity and curr. symbol; 1: sign precedes them;
                // 2: sign follows them; 3: sign immed. precedes curr. symbol; 4: sign immed.
                // succeeds curr. symbol
                n_sign_posn: 0 // see p_sign_posn
            },
            'LC_NUMERIC': {
                // based on Windows "english" (English_United States.1252) locale
                decimal_point: '.',
                thousands_sep: ',',
                grouping: [3] // see mon_grouping, but for non-monetary values (use thousands_sep)
            },
            'LC_MESSAGES': {
                YESEXPR: '^[yY].*',
                NOEXPR: '^[nN].*',
                YESSTR: '',
                NOSTR: ''
            },
            nplurals: _nplurals2a
        };
        $locutus.php.locales.en_US = _copy($locutus.php.locales.en);
        $locutus.php.locales.en_US.LC_TIME.c = '%a %d %b %Y %r %Z';
        $locutus.php.locales.en_US.LC_TIME.x = '%D';
        $locutus.php.locales.en_US.LC_TIME.X = '%r';
        // The following are based on *nix settings
        $locutus.php.locales.en_US.LC_MONETARY.int_curr_symbol = 'USD ';
        $locutus.php.locales.en_US.LC_MONETARY.p_sign_posn = 1;
        $locutus.php.locales.en_US.LC_MONETARY.n_sign_posn = 1;
        $locutus.php.locales.en_US.LC_MONETARY.mon_grouping = [3, 3];
        $locutus.php.locales.en_US.LC_NUMERIC.thousands_sep = '';
        $locutus.php.locales.en_US.LC_NUMERIC.grouping = [];
        $locutus.php.locales.en_GB = _copy($locutus.php.locales.en);
        $locutus.php.locales.en_GB.LC_TIME.r = '%l:%M:%S %P %Z';
        $locutus.php.locales.en_AU = _copy($locutus.php.locales.en_GB);
        // Assume C locale is like English (?) (We need C locale for LC_CTYPE)
        $locutus.php.locales.C = _copy($locutus.php.locales.en);
        $locutus.php.locales.C.LC_CTYPE.CODESET = 'ANSI_X3.4-1968';
        $locutus.php.locales.C.LC_MONETARY = {
            int_curr_symbol: '',
            currency_symbol: '',
            mon_decimal_point: '',
            mon_thousands_sep: '',
            mon_grouping: [],
            p_cs_precedes: 127,
            p_sep_by_space: 127,
            n_cs_precedes: 127,
            n_sep_by_space: 127,
            p_sign_posn: 127,
            n_sign_posn: 127,
            positive_sign: '',
            negative_sign: '',
            int_frac_digits: 127,
            frac_digits: 127
        };
        $locutus.php.locales.C.LC_NUMERIC = {
            decimal_point: '.',
            thousands_sep: '',
            grouping: []
        };
        // D_T_FMT
        $locutus.php.locales.C.LC_TIME.c = '%a %b %e %H:%M:%S %Y';
        // D_FMT
        $locutus.php.locales.C.LC_TIME.x = '%m/%d/%y';
        // T_FMT
        $locutus.php.locales.C.LC_TIME.X = '%H:%M:%S';
        $locutus.php.locales.C.LC_MESSAGES.YESEXPR = '^[yY]';
        $locutus.php.locales.C.LC_MESSAGES.NOEXPR = '^[nN]';
        $locutus.php.locales.fr = _copy($locutus.php.locales.en);
        $locutus.php.locales.fr.nplurals = _nplurals2b;
        $locutus.php.locales.fr.LC_TIME.a = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
        $locutus.php.locales.fr.LC_TIME.A = ['dimanche', 'lundi', 'mardi', 'mercredi',
            'jeudi', 'vendredi', 'samedi'];
        $locutus.php.locales.fr.LC_TIME.b = ['jan', 'f\u00E9v', 'mar', 'avr', 'mai',
            'jun', 'jui', 'ao\u00FB', 'sep', 'oct',
            'nov', 'd\u00E9c'
        ];
        $locutus.php.locales.fr.LC_TIME.B = ['janvier', 'f\u00E9vrier', 'mars',
            'avril', 'mai', 'juin', 'juillet', 'ao\u00FBt',
            'septembre', 'octobre', 'novembre', 'd\u00E9cembre'
        ];
        $locutus.php.locales.fr.LC_TIME.c = '%a %d %b %Y %T %Z';
        $locutus.php.locales.fr.LC_TIME.p = ['', ''];
        $locutus.php.locales.fr.LC_TIME.P = ['', ''];
        $locutus.php.locales.fr.LC_TIME.x = '%d.%m.%Y';
        $locutus.php.locales.fr.LC_TIME.X = '%T';
        $locutus.php.locales.fr_CA = _copy($locutus.php.locales.fr);
        $locutus.php.locales.fr_CA.LC_TIME.x = '%Y-%m-%d';
    }
    if (!$locutus.php.locale) {
        $locutus.php.locale = 'en_US';
        // Try to establish the locale via the `window` global
        if (typeof window !== 'undefined' && window.document) {
            var d = window.document;
            var NS_XHTML = 'https://www.w3.org/1999/xhtml';
            var NS_XML = 'https://www.w3.org/XML/1998/namespace';
            if (d.getElementsByTagNameNS &&
                d.getElementsByTagNameNS(NS_XHTML, 'html')[0]) {
                if (d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS &&
                    d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang')) {
                    $locutus.php.locale = d.getElementsByTagName(NS_XHTML, 'html')[0]
                        .getAttributeNS(NS_XML, 'lang');
                }
                else if (d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang) {
                    // XHTML 1.0 only
                    $locutus.php.locale = d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang;
                }
            }
            else if (d.getElementsByTagName('html')[0] &&
                d.getElementsByTagName('html')[0].lang) {
                $locutus.php.locale = d.getElementsByTagName('html')[0].lang;
            }
        }
    }
    // PHP-style
    $locutus.php.locale = $locutus.php.locale.replace('-', '_');
    // @todo: locale if declared locale hasn't been defined
    if (!($locutus.php.locale in $locutus.php.locales)) {
        if ($locutus.php.locale.replace(/_[a-zA-Z]+$/, '') in $locutus.php.locales) {
            $locutus.php.locale = $locutus.php.locale.replace(/_[a-zA-Z]+$/, '');
        }
    }
    if (!$locutus.php.localeCategories) {
        $locutus.php.localeCategories = {
            'LC_COLLATE': $locutus.php.locale,
            // for string comparison, see strcoll()
            'LC_CTYPE': $locutus.php.locale,
            // for character classification and conversion, for example strtoupper()
            'LC_MONETARY': $locutus.php.locale,
            // for localeconv()
            'LC_NUMERIC': $locutus.php.locale,
            // for decimal separator (See also localeconv())
            'LC_TIME': $locutus.php.locale,
            // for date and time formatting with strftime()
            // for system responses (available if PHP was compiled with libintl):
            'LC_MESSAGES': $locutus.php.locale
        };
    }
    if (locale === null || locale === '') {
        locale = getenv(category) || getenv('LANG');
    }
    else if (Object.prototype.toString.call(locale) === '[object Array]') {
        for (i = 0; i < locale.length; i++) {
            if (!(locale[i] in $locutus.php.locales)) {
                if (i === locale.length - 1) {
                    // none found
                    return false;
                }
                continue;
            }
            locale = locale[i];
            break;
        }
    }
    // Just get the locale
    if (locale === '0' || locale === 0) {
        if (category === 'LC_ALL') {
            for (categ in $locutus.php.localeCategories) {
                // Add ".UTF-8" or allow ".@latint", etc. to the end?
                cats.push(categ + '=' + $locutus.php.localeCategories[categ]);
            }
            return cats.join(';');
        }
        return $locutus.php.localeCategories[category];
    }
    if (!(locale in $locutus.php.locales)) {
        // Locale not found
        return false;
    }
    // Set and get locale
    if (category === 'LC_ALL') {
        for (categ in $locutus.php.localeCategories) {
            $locutus.php.localeCategories[categ] = locale;
        }
    }
    else {
        $locutus.php.localeCategories[category] = locale;
    }
    return locale;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0bG9jYWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NldGxvY2FsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ25ELGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQseUVBQXlFO0lBQ3pFLDZGQUE2RjtJQUM3Rix3RUFBd0U7SUFDeEUsb0ZBQW9GO0lBQ3BGLHNFQUFzRTtJQUN0RSx5REFBeUQ7SUFDekQsbUlBQW1JO0lBQ25JLG9GQUFvRjtJQUNwRiw0RUFBNEU7SUFDNUUsNENBQTRDO0lBQzVDLHVCQUF1QjtJQUV2QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUV0QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDZCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFVCxJQUFJLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBRSxJQUFJO1FBQzlCLElBQUksSUFBSSxZQUFZLE1BQU0sRUFBRTtZQUMxQixPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO1lBQy9CLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdEI7UUFDRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDZixLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUMzQjtpQkFB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