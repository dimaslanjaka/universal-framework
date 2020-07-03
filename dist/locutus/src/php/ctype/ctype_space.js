module.exports = function ctype_space(text) {
    //  discuss at: https://locutus.io/php/ctype_space/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_space('\t\n')
    //   returns 1: true
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
    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.sp) !== -1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3R5cGVfc3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvY3R5cGUvY3R5cGVfc3BhY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxJQUFJO0lBQ3pDLG1EQUFtRDtJQUNuRCxvREFBb0Q7SUFDcEQsbUNBQW1DO0lBQ25DLG9CQUFvQjtJQUVwQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUMvQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QscURBQXFEO0lBQ3JELFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFdEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUE7SUFFcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUMvRSxDQUFDLENBQUEifQ==