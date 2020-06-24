module.exports = function ini_get(varname) {
    //  discuss at: https://locutus.io/php/ini_get/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: The ini values must be set by ini_set or manually within an ini file
    //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
    //   example 1: ini_get('date.timezone')
    //   returns 1: 'Asia/Hong_Kong'
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.ini = $locutus.php.ini || {};
    if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
        if ($locutus.php.ini[varname].local_value === null) {
            return '';
        }
        return $locutus.php.ini[varname].local_value;
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pX2dldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvaW5mby9pbmlfZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsT0FBTztJQUN4QywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELG9GQUFvRjtJQUNwRiwwREFBMEQ7SUFDMUQsd0NBQXdDO0lBQ3hDLGdDQUFnQztJQUVoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFekMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1FBQ3BGLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUNsRCxPQUFPLEVBQUUsQ0FBQTtTQUNWO1FBQ0QsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUE7S0FDN0M7SUFFRCxPQUFPLEVBQUUsQ0FBQTtBQUNYLENBQUMsQ0FBQSJ9