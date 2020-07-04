module.exports = function i18n_loc_set_default(name) {
    //  discuss at: https://locutus.io/php/i18n_loc_set_default/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Renamed in PHP6 from locale_set_default(). Not listed yet at php.net
    //      note 1: List of locales at https://demo.icu-project.org/icu-bin/locexp (use for implementing other locales here)
    //      note 1: To be usable with sort() if it is passed the SORT_LOCALE_STRING sorting flag: https://php.net/manual/en/function.sort.php
    //   example 1: i18n_loc_set_default('pt_PT')
    //   returns 1: true
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.locales = $locutus.php.locales || {};
    $locutus.php.locales.en_US_POSIX = {
        sorting: function (str1, str2) {
            // @todo: This one taken from strcmp, but need for other locales;
            // we don't use localeCompare since its locale is not settable
            return (str1 === str2) ? 0 : ((str1 > str2) ? 1 : -1);
        }
    };
    $locutus.php.locale_default = name;
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9sb2Nfc2V0X2RlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvaTE4bi9pMThuX2xvY19zZXRfZGVmYXVsdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsb0JBQW9CLENBQUUsSUFBSTtJQUNsRCw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBQ3BELG9GQUFvRjtJQUNwRix3SEFBd0g7SUFDeEgseUlBQXlJO0lBQ3pJLDZDQUE2QztJQUM3QyxvQkFBb0I7SUFFcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBRWpELFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRztRQUNqQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsSUFBSTtZQUMzQixpRUFBaUU7WUFDakUsOERBQThEO1lBQzlELE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7S0FDRixDQUFBO0lBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO0lBQ2xDLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=