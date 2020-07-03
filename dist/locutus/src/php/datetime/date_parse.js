module.exports = function date_parse(date) {
    //  discuss at: https://locutus.io/php/date_parse/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: date_parse('2006-12-12 10:00:00')
    //   returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0, is_localtime: false}
    var strtotime = require('../datetime/strtotime');
    var ts;
    try {
        ts = strtotime(date);
    }
    catch (e) {
        ts = false;
    }
    if (!ts) {
        return false;
    }
    var dt = new Date(ts * 1000);
    var retObj = {};
    retObj.year = dt.getFullYear();
    retObj.month = dt.getMonth() + 1;
    retObj.day = dt.getDate();
    retObj.hour = dt.getHours();
    retObj.minute = dt.getMinutes();
    retObj.second = dt.getSeconds();
    retObj.fraction = parseFloat('0.' + dt.getMilliseconds());
    retObj.is_localtime = dt.getTimezoneOffset() !== 0;
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9wYXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9kYXRlX3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsSUFBSTtJQUN4QyxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELGlEQUFpRDtJQUNqRCxtSEFBbUg7SUFFbkgsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDaEQsSUFBSSxFQUFFLENBQUE7SUFFTixJQUFJO1FBQ0YsRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNyQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsRUFBRSxHQUFHLEtBQUssQ0FBQTtLQUNYO0lBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFFNUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDOUIsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzNCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQy9CLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtJQUN6RCxNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUVsRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9