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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0bG9jYWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc2V0bG9jYWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsUUFBUSxFQUFFLE1BQU07SUFDbkQsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCx5RUFBeUU7SUFDekUsNkZBQTZGO0lBQzdGLHdFQUF3RTtJQUN4RSxvRkFBb0Y7SUFDcEYsc0VBQXNFO0lBQ3RFLHlEQUF5RDtJQUN6RCxtSUFBbUk7SUFDbkksb0ZBQW9GO0lBQ3BGLDRFQUE0RTtJQUM1RSw0Q0FBNEM7SUFDNUMsdUJBQXVCO0lBRXZCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRXRDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULElBQUksS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFFLElBQUk7UUFDOUIsSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDeEI7YUFBTSxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7WUFDL0IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN0QjtRQUNELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FB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QUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFBO1FBQ3pELFFBQVE7UUFDUixRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUE7UUFDN0MsUUFBUTtRQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQTtRQUM3QyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDcEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFBO1FBRW5ELFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUE7UUFDOUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRixRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVU7WUFDM0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNoQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFD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