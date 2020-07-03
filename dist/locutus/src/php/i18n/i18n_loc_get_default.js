module.exports = function i18n_loc_get_default() {
    //  discuss at: https://locutus.io/php/i18n_loc_get_default/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net.
    //      note 1: List of locales at <https://demo.icu-project.org/icu-bin/locexp>
    //      note 1: To be usable with sort() if it is passed the `SORT_LOCALE_STRING`
    //      note 1: sorting flag: https://php.net/manual/en/function.sort.php
    //   example 1: i18n_loc_get_default()
    //   returns 1: 'en_US_POSIX'
    //   example 2: i18n_loc_set_default('pt_PT')
    //   example 2: i18n_loc_get_default()
    //   returns 2: 'pt_PT'
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.locales = $locutus.php.locales || {};
    return $locutus.php.locale_default || 'en_US_POSIX';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9sb2NfZ2V0X2RlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvaTE4bi9pMThuX2xvY19nZXRfZGVmYXVsdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsb0JBQW9CO0lBQzVDLDREQUE0RDtJQUM1RCxvREFBb0Q7SUFDcEQscUZBQXFGO0lBQ3JGLGdGQUFnRjtJQUNoRixpRkFBaUY7SUFDakYseUVBQXlFO0lBQ3pFLHNDQUFzQztJQUN0Qyw2QkFBNkI7SUFDN0IsNkNBQTZDO0lBQzdDLHNDQUFzQztJQUN0Qyx1QkFBdUI7SUFFdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBRWpELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksYUFBYSxDQUFBO0FBQ3JELENBQUMsQ0FBQSJ9