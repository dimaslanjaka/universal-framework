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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9sb2Nfc2V0X2RlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2kxOG4vaTE4bl9sb2Nfc2V0X2RlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLG9CQUFvQixDQUFFLElBQUk7SUFDbEQsNERBQTREO0lBQzVELG9EQUFvRDtJQUNwRCxvRkFBb0Y7SUFDcEYsd0hBQXdIO0lBQ3hILHlJQUF5STtJQUN6SSw2Q0FBNkM7SUFDN0Msb0JBQW9CO0lBRXBCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUVqRCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUc7UUFDakMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLElBQUk7WUFDM0IsaUVBQWlFO1lBQ2pFLDhEQUE4RDtZQUM5RCxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2RCxDQUFDO0tBQ0YsQ0FBQTtJQUVELFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQTtJQUNsQyxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9