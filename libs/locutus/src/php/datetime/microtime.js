module.exports = function microtime(getAsFloat) {
    //  discuss at: https://locutus.io/php/microtime/
    // original by: Paulo Freitas
    // improved by: Dumitru Uzun (https://duzun.me)
    //   example 1: var $timeStamp = microtime(true)
    //   example 1: $timeStamp > 1000000000 && $timeStamp < 2000000000
    //   returns 1: true
    //   example 2: /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
    //   returns 2: true
    var s;
    var now;
    if (typeof performance !== 'undefined' && performance.now) {
        now = (performance.now() + performance.timing.navigationStart) / 1e3;
        if (getAsFloat) {
            return now;
        }
        // Math.round(now)
        s = now | 0;
        return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s;
    }
    else {
        now = (Date.now ? Date.now() : new Date().getTime()) / 1e3;
        if (getAsFloat) {
            return now;
        }
        // Math.round(now)
        s = now | 0;
        return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm90aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9taWNyb3RpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxVQUFVO0lBQzdDLGlEQUFpRDtJQUNqRCw2QkFBNkI7SUFDN0IsK0NBQStDO0lBQy9DLGdEQUFnRDtJQUNoRCxrRUFBa0U7SUFDbEUsb0JBQW9CO0lBQ3BCLGdFQUFnRTtJQUNoRSxvQkFBb0I7SUFFcEIsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDekQsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQ3BFLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxHQUFHLENBQUE7U0FDWDtRQUVELGtCQUFrQjtRQUNsQixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUVYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7S0FDckQ7U0FBTTtRQUNMLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUMxRCxJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sR0FBRyxDQUFBO1NBQ1g7UUFFRCxrQkFBa0I7UUFDbEIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFFWCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0tBQ3JEO0FBQ0gsQ0FBQyxDQUFBIn0=