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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9sYXN0X2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9qc29uL2pzb25fbGFzdF9lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZTtJQUN2Qyw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBQ3BELGlDQUFpQztJQUNqQyxpQkFBaUI7SUFFakIsc0JBQXNCO0lBQ3RCLGtGQUFrRjtJQUNsRix1QkFBdUI7SUFDdkIscUNBQXFDO0lBQ3JDLGdDQUFnQztJQUNoQyxtRkFBbUY7SUFDbkYsMkJBQTJCO0lBQzNCLDRFQUE0RTtJQUM1RSx3QkFBd0I7SUFFeEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFakMsT0FBTyxRQUFRLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hGLENBQUMsQ0FBQSJ9