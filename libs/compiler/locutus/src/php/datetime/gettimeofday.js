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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dGltZW9mZGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9nZXR0aW1lb2ZkYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVksQ0FBRSxXQUFXO0lBQ2pELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsMEdBQTBHO0lBQzFHLHlIQUF5SDtJQUN6SCx3REFBd0Q7SUFDeEQseUNBQXlDO0lBQ3pDLGdIQUFnSDtJQUNoSCxvQkFBb0I7SUFDcEIsbURBQW1EO0lBQ25ELGdGQUFnRjtJQUNoRixvQkFBb0I7SUFFcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFVCxJQUFJLFdBQVcsRUFBRTtRQUNmLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtLQUMxQjtJQUVELHNCQUFzQjtJQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ25CLE9BQU87UUFDTCxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRTtRQUN0QixJQUFJLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsSUFBSTtRQUNuQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFO1FBQ2xDLG9GQUFvRjtRQUNwRixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0YsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9