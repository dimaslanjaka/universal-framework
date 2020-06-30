module.exports = function ctype_digit(text) {
    //  discuss at: https://locutus.io/php/ctype_digit/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_digit('150')
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
    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3R5cGVfZGlnaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2N0eXBlL2N0eXBlX2RpZ2l0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsSUFBSTtJQUN6QyxtREFBbUQ7SUFDbkQsb0RBQW9EO0lBQ3BELGtDQUFrQztJQUNsQyxvQkFBb0I7SUFFcEIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDL0MsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELHFEQUFxRDtJQUNyRCxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRXRCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFBO0lBRXBCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDL0UsQ0FBQyxDQUFBIn0=