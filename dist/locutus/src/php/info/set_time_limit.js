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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0X3RpbWVfbGltaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvaW5mby9zZXRfdGltZV9saW1pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLE9BQU87SUFDL0Msc0RBQXNEO0lBQ3RELG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIsaUNBQWlDO0lBQ2pDLHlCQUF5QjtJQUV6QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxVQUFVLENBQUM7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1NBQ2xDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0lBQ3BELENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFBIn0=