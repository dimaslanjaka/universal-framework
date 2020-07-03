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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21zdHJmdGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9nbXN0cmZ0aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsTUFBTSxFQUFFLFNBQVM7SUFDckQsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxvQkFBb0I7SUFDcEIsb0RBQW9EO0lBQ3BELDRDQUE0QztJQUM1Qyx5QkFBeUI7SUFFekIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFFOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUM7UUFDNUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ1osQ0FBQyxDQUFDLENBQUMsU0FBUyxZQUFZLElBQUksQ0FBQztZQUMzQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFFaEMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUUvRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=