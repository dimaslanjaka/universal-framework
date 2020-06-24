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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9sb2NfZ2V0X2RlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2kxOG4vaTE4bl9sb2NfZ2V0X2RlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLG9CQUFvQjtJQUM1Qyw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBQ3BELHFGQUFxRjtJQUNyRixnRkFBZ0Y7SUFDaEYsaUZBQWlGO0lBQ2pGLHlFQUF5RTtJQUN6RSxzQ0FBc0M7SUFDdEMsNkJBQTZCO0lBQzdCLDZDQUE2QztJQUM3QyxzQ0FBc0M7SUFDdEMsdUJBQXVCO0lBRXZCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUVqRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLGFBQWEsQ0FBQTtBQUNyRCxDQUFDLENBQUEifQ==