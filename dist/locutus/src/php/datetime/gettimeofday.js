module.exports = function gettimeofday(returnFloat) {
    //  discuss at: https://locutus.io/php/gettimeofday/
    // original by: Brett Zamir (https://brett-zamir.me)
    // original by: Josh Fraser (https://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
    //    parts by: Breaking Par Consulting Inc (https://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
    //  revised by: Theriault (https://github.com/Theriault)
    //   example 1: var $obj = gettimeofday()
    //   example 1: var $result = ('sec' in $obj && 'usec' in $obj && 'minuteswest' in $obj &&80, 'dsttime' in $obj)
    //   returns 1: true
    //   example 2: var $timeStamp = gettimeofday(true)
    //   example 2: var $result = $timeStamp > 1000000000 && $timeStamp < 2000000000
    //   returns 2: true
    var t = new Date();
    var y = 0;
    if (returnFloat) {
        return t.getTime() / 1000;
    }
    // Store current year.
    y = t.getFullYear();
    return {
        sec: t.getUTCSeconds(),
        usec: t.getUTCMilliseconds() * 1000,
        minuteswest: t.getTimezoneOffset(),
        // Compare Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC to see if DST is observed.
        dsttime: 0 + (((new Date(y, 0)) - Date.UTC(y, 0)) !== ((new Date(y, 6)) - Date.UTC(y, 6)))
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dGltZW9mZGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL2dldHRpbWVvZmRheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLFdBQVc7SUFDakQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwwR0FBMEc7SUFDMUcseUhBQXlIO0lBQ3pILHdEQUF3RDtJQUN4RCx5Q0FBeUM7SUFDekMsZ0hBQWdIO0lBQ2hILG9CQUFvQjtJQUNwQixtREFBbUQ7SUFDbkQsZ0ZBQWdGO0lBQ2hGLG9CQUFvQjtJQUVwQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULElBQUksV0FBVyxFQUFFO1FBQ2YsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO0tBQzFCO0lBRUQsc0JBQXNCO0lBQ3RCLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDbkIsT0FBTztRQUNMLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFFO1FBQ3RCLElBQUksRUFBRSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxJQUFJO1FBQ25DLFdBQVcsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUU7UUFDbEMsb0ZBQW9GO1FBQ3BGLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=