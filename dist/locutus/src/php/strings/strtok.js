module.exports = function strtok(str, tokens) {
    //  discuss at: https://locutus.io/php/strtok/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Use tab and newline as tokenizing characters as well
    //   example 1: var $string = "\t\t\t\nThis is\tan example\nstring\n"
    //   example 1: var $tok = strtok($string, " \n\t")
    //   example 1: var $b = ''
    //   example 1: while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
    //   example 1: var $result = $b
    //   returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    if (tokens === undefined) {
        tokens = str;
        str = $locutus.php.strtokleftOver;
    }
    if (str.length === 0) {
        return false;
    }
    if (tokens.indexOf(str.charAt(0)) !== -1) {
        return strtok(str.substr(1), tokens);
    }
    for (var i = 0; i < str.length; i++) {
        if (tokens.indexOf(str.charAt(i)) !== -1) {
            break;
        }
    }
    $locutus.php.strtokleftOver = str.substr(i + 1);
    return str.substring(0, i);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydG9rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RydG9rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsR0FBRyxFQUFFLE1BQU07SUFDM0MsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCxvRUFBb0U7SUFDcEUscUVBQXFFO0lBQ3JFLG1EQUFtRDtJQUNuRCwyQkFBMkI7SUFDM0IseUZBQXlGO0lBQ3pGLGdDQUFnQztJQUNoQywwRUFBMEU7SUFFMUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFakMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDWixHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7S0FDbEM7SUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDckM7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLE1BQUs7U0FDTjtLQUNGO0lBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFL0MsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM1QixDQUFDLENBQUEifQ==