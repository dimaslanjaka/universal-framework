module.exports = function ctype_cntrl(text) {
    //  discuss at: https://locutus.io/php/ctype_cntrl/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_cntrl('\u0020')
    //   returns 1: false
    //   example 2: ctype_cntrl('\u001F')
    //   returns 2: true
    var setlocale = require('../strings/setlocale');
    if (typeof text !== 'string') {
        return false;
    }
    // ensure setup of localization variables takes place
    setlocale('LC_ALL', 0);
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    var p = $locutus.php;
    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3R5cGVfY250cmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvY3R5cGUvY3R5cGVfY250cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxJQUFJO0lBQ3pDLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQscUNBQXFDO0lBQ3JDLHFCQUFxQjtJQUNyQixxQ0FBcUM7SUFDckMsb0JBQW9CO0lBRXBCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQy9DLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxxREFBcUQ7SUFDckQsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUV0QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQTtJQUVwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQy9FLENBQUMsQ0FBQSJ9