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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pX3NldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvaW5mby9pbmlfc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsT0FBTyxFQUFFLFFBQVE7SUFDbEQsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCxpRkFBaUY7SUFDakYsMERBQTBEO0lBQzFELDJEQUEyRDtJQUMzRCxnQ0FBZ0M7SUFFaEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0lBRXpDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFM0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFBO0lBRWxELElBQUksUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ25ELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDOUQsUUFBUSxHQUFHLElBQUksQ0FBQTtLQUNoQjtJQUNELElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDaEUsUUFBUSxHQUFHLEtBQUssQ0FBQTtLQUNqQjtJQUVELElBQUksT0FBTyxHQUFHLFVBQVUsTUFBTTtRQUM1QixnRUFBZ0U7UUFDaEUsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFBO1NBQ3ZDO1FBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xELENBQUMsQ0FBQTtJQUVELFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxXQUFXO1lBQ2QsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUN6QixNQUFLO1FBQ1A7WUFDRSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO1lBQ2hELE1BQUs7S0FDUjtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=