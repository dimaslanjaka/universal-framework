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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9wYXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvZGF0ZV9wYXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLElBQUk7SUFDeEMsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxpREFBaUQ7SUFDakQsbUhBQW1IO0lBRW5ILElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ2hELElBQUksRUFBRSxDQUFBO0lBRU4sSUFBSTtRQUNGLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDckI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLEVBQUUsR0FBRyxLQUFLLENBQUE7S0FDWDtJQUVELElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0lBRTVCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVmLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzlCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN6QixNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQixNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFDekQsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFbEQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==