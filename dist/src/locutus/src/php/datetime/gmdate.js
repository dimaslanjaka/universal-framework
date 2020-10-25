module.exports = function gmdate(format, timestamp) {
    //  discuss at: https://locutus.io/php/gmdate/
    // original by: Brett Zamir (https://brett-zamir.me)
    //    input by: Alex
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    //   returns 1: '07:09:40 m is month'
    var date = require('../datetime/date');
    var dt = typeof timestamp === 'undefined' ? new Date() // Not provided
        : timestamp instanceof Date ? new Date(timestamp) // Javascript Date()
            : new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
    timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
    return date(format, timestamp);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21kYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL2dtZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU0sRUFBRSxTQUFTO0lBQ2pELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQsb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCw4R0FBOEc7SUFDOUcscUNBQXFDO0lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBRXRDLElBQUksRUFBRSxHQUFHLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxlQUFlO1FBQ3BFLENBQUMsQ0FBQyxTQUFTLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0I7WUFDdEUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQSxDQUFDLHVDQUF1QztJQUV0RSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBRTVELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUEifQ==