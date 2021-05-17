module.exports = function json_last_error() {
    //  discuss at: https://phpjs.org/functions/json_last_error/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: json_last_error()
    //   returns 1: 0
    // JSON_ERROR_NONE = 0
    // max depth limit to be removed per PHP comments in json.c (not possible in JS?):
    // JSON_ERROR_DEPTH = 1
    // internal use? also not documented:
    // JSON_ERROR_STATE_MISMATCH = 2
    // [\u0000-\u0008\u000B-\u000C\u000E-\u001F] if used directly within json_decode():
    // JSON_ERROR_CTRL_CHAR = 3
    // but JSON functions auto-escape these, so error not possible in JavaScript
    // JSON_ERROR_SYNTAX = 4
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    return $locutus.php && $locutus.php.last_error_json ? $locutus.php.last_error_json : 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9sYXN0X2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2pzb24vanNvbl9sYXN0X2Vycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxlQUFlO0lBQ3ZDLDREQUE0RDtJQUM1RCxvREFBb0Q7SUFDcEQsaUNBQWlDO0lBQ2pDLGlCQUFpQjtJQUVqQixzQkFBc0I7SUFDdEIsa0ZBQWtGO0lBQ2xGLHVCQUF1QjtJQUN2QixxQ0FBcUM7SUFDckMsZ0NBQWdDO0lBQ2hDLG1GQUFtRjtJQUNuRiwyQkFBMkI7SUFDM0IsNEVBQTRFO0lBQzVFLHdCQUF3QjtJQUV4QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEYsQ0FBQyxDQUFBIn0=