module.exports = function ini_set(varname, newvalue) {
    //  discuss at: https://locutus.io/php/ini_set/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: This will not set a global_value or access level for the ini item
    //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
    //   example 1: ini_set('date.timezone', 'America/Chicago')
    //   returns 1: 'Asia/Hong_Kong'
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.ini = $locutus.php.ini || {};
    $locutus.php.ini = $locutus.php.ini || {};
    $locutus.php.ini[varname] = $locutus.php.ini[varname] || {};
    var oldval = $locutus.php.ini[varname].local_value;
    var lowerStr = (newvalue + '').toLowerCase().trim();
    if (newvalue === true || lowerStr === 'on' || lowerStr === '1') {
        newvalue = 'on';
    }
    if (newvalue === false || lowerStr === 'off' || lowerStr === '0') {
        newvalue = 'off';
    }
    var _setArr = function (oldval) {
        // Although these are set individually, they are all accumulated
        if (typeof oldval === 'undefined') {
            $locutus.ini[varname].local_value = [];
        }
        $locutus.ini[varname].local_value.push(newvalue);
    };
    switch (varname) {
        case 'extension':
            _setArr(oldval, newvalue);
            break;
        default:
            $locutus.php.ini[varname].local_value = newvalue;
            break;
    }
    return oldval;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pX3NldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9pbmZvL2luaV9zZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxPQUFPLEVBQUUsUUFBUTtJQUNsRCwrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELGlGQUFpRjtJQUNqRiwwREFBMEQ7SUFDMUQsMkRBQTJEO0lBQzNELGdDQUFnQztJQUVoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFekMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ3pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUUzRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUE7SUFFbEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbkQsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUNoRSxRQUFRLEdBQUcsS0FBSyxDQUFBO0tBQ2pCO0lBRUQsSUFBSSxPQUFPLEdBQUcsVUFBVSxNQUFNO1FBQzVCLGdFQUFnRTtRQUNoRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7U0FDdkM7UUFDRCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFBO0lBRUQsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLFdBQVc7WUFDZCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ3pCLE1BQUs7UUFDUDtZQUNFLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7WUFDaEQsTUFBSztLQUNSO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==