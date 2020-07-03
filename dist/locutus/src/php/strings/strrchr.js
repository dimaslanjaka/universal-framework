module.exports = function strrchr(haystack, needle) {
    //  discuss at: https://locutus.io/php/strrchr/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Jason Wong (https://carrot.org/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
    //   returns 1: 'Line 3'
    var pos = 0;
    if (typeof needle !== 'string') {
        needle = String.fromCharCode(parseInt(needle, 10));
    }
    needle = needle.charAt(0);
    pos = haystack.lastIndexOf(needle);
    if (pos === -1) {
        return false;
    }
    return haystack.substr(pos);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycmNoci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cnJjaHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRLEVBQUUsTUFBTTtJQUNqRCwrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELHdCQUF3QjtJQUV4QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFWCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDbkQ7SUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QixHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBIn0=