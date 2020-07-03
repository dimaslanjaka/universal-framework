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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm90aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL21pY3JvdGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLFVBQVU7SUFDN0MsaURBQWlEO0lBQ2pELDZCQUE2QjtJQUM3QiwrQ0FBK0M7SUFDL0MsZ0RBQWdEO0lBQ2hELGtFQUFrRTtJQUNsRSxvQkFBb0I7SUFDcEIsZ0VBQWdFO0lBQ2hFLG9CQUFvQjtJQUVwQixJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUN6RCxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLENBQUE7UUFDcEUsSUFBSSxVQUFVLEVBQUU7WUFDZCxPQUFPLEdBQUcsQ0FBQTtTQUNYO1FBRUQsa0JBQWtCO1FBQ2xCLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBRVgsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtLQUNyRDtTQUFNO1FBQ0wsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQzFELElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxHQUFHLENBQUE7U0FDWDtRQUVELGtCQUFrQjtRQUNsQixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUVYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7S0FDckQ7QUFDSCxDQUFDLENBQUEifQ==