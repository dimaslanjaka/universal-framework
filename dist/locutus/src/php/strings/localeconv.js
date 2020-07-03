module.exports = function localeconv() {
    //  discuss at: https://locutus.io/php/localeconv/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: setlocale('LC_ALL', 'en_US')
    //   example 1: localeconv()
    //   returns 1: {decimal_point: '.', thousands_sep: '', positive_sign: '', negative_sign: '-', int_frac_digits: 2, frac_digits: 2, p_cs_precedes: 1, p_sep_by_space: 0, n_cs_precedes: 1, n_sep_by_space: 0, p_sign_posn: 1, n_sign_posn: 1, grouping: [], int_curr_symbol: 'USD ', currency_symbol: '$', mon_decimal_point: '.', mon_thousands_sep: ',', mon_grouping: [3, 3]}
    var setlocale = require('../strings/setlocale');
    var arr = {};
    var prop = '';
    // ensure setup of localization variables takes place, if not already
    setlocale('LC_ALL', 0);
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    // Make copies
    for (prop in $locutus.php.locales[$locutus.php.localeCategories.LC_NUMERIC].LC_NUMERIC) {
        arr[prop] = $locutus.php.locales[$locutus.php.localeCategories.LC_NUMERIC].LC_NUMERIC[prop];
    }
    for (prop in $locutus.php.locales[$locutus.php.localeCategories.LC_MONETARY].LC_MONETARY) {
        arr[prop] = $locutus.php.locales[$locutus.php.localeCategories.LC_MONETARY].LC_MONETARY[prop];
    }
    return arr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL2xvY2FsZWNvbnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVU7SUFDbEMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCw0Q0FBNEM7SUFDNUMsNEJBQTRCO0lBQzVCLCtXQUErVztJQUUvVyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUUvQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFFYixxRUFBcUU7SUFDckUsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUV0QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxjQUFjO0lBQ2QsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDdEYsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzVGO0lBQ0QsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFDeEYsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzlGO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==