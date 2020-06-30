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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21kYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9nbWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxNQUFNLEVBQUUsU0FBUztJQUNqRCw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELG9CQUFvQjtJQUNwQixvREFBb0Q7SUFDcEQsOEdBQThHO0lBQzlHLHFDQUFxQztJQUVyQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUV0QyxJQUFJLEVBQUUsR0FBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsZUFBZTtRQUNwRSxDQUFDLENBQUMsU0FBUyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsb0JBQW9CO1lBQ3RFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQyx1Q0FBdUM7SUFFdEUsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUU1RCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIn0=