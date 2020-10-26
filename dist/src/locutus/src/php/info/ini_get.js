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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pX2dldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9pbmZvL2luaV9nZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxPQUFPO0lBQ3hDLCtDQUErQztJQUMvQyxvREFBb0Q7SUFDcEQsb0ZBQW9GO0lBQ3BGLDBEQUEwRDtJQUMxRCx3Q0FBd0M7SUFDeEMsZ0NBQWdDO0lBRWhDLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDekMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUV6QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFDcEYsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ2xELE9BQU8sRUFBRSxDQUFBO1NBQ1Y7UUFDRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtLQUM3QztJQUVELE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQyxDQUFBIn0=