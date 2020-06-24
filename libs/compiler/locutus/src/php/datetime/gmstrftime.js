module.exports = function gmstrftime(format, timestamp) {
    //  discuss at: https://locutus.io/php/gmstrftime/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Alex
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: gmstrftime("%A", 1062462400)
    //   returns 1: 'Tuesday'
    var strftime = require('../datetime/strftime');
    var _date = (typeof timestamp === 'undefined')
        ? new Date()
        : (timestamp instanceof Date)
            ? new Date(timestamp)
            : new Date(timestamp * 1000);
    timestamp = Date.parse(_date.toUTCString().slice(0, -4)) / 1000;
    return strftime(format, timestamp);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21zdHJmdGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvZ21zdHJmdGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLE1BQU0sRUFBRSxTQUFTO0lBQ3JELGtEQUFrRDtJQUNsRCxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCw0Q0FBNEM7SUFDNUMseUJBQXlCO0lBRXpCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBRTlDLElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNaLENBQUMsQ0FBQyxDQUFDLFNBQVMsWUFBWSxJQUFJLENBQUM7WUFDM0IsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBRWhDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7SUFFL0QsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQSJ9