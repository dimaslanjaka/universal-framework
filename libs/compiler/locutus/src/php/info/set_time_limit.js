module.exports = function set_time_limit(seconds) {
    //  discuss at: https://locutus.io/php/set_time_limit/
    // original by: Brett Zamir (https://brett-zamir.me)
    //        test: skip-all
    //   example 1: set_time_limit(4)
    //   returns 1: undefined
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    setTimeout(function () {
        if (!$locutus.php.timeoutStatus) {
            $locutus.php.timeoutStatus = true;
        }
        throw new Error('Maximum execution time exceeded');
    }, seconds * 1000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0X3RpbWVfbGltaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2luZm8vc2V0X3RpbWVfbGltaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxPQUFPO0lBQy9DLHNEQUFzRDtJQUN0RCxvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLGlDQUFpQztJQUNqQyx5QkFBeUI7SUFFekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFFakMsVUFBVSxDQUFDO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQy9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtTQUNsQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtJQUNwRCxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSJ9