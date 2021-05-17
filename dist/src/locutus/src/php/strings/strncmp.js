module.exports = function strncmp(str1, str2, lgth) {
    //       discuss at: https://locutus.io/php/strncmp/
    //      original by: Waldo Malqui Silva (https://waldo.malqui.info)
    //         input by: Steve Hilder
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //       revised by: gorthaur
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //        example 1: strncmp('aaa', 'aab', 2)
    //        returns 1: 0
    //        example 2: strncmp('aaa', 'aab', 3 )
    //        returns 2: -1
    var s1 = (str1 + '')
        .substr(0, lgth);
    var s2 = (str2 + '')
        .substr(0, lgth);
    return ((s1 === s2) ? 0 : ((s1 > s2) ? 1 : -1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cm5jbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDakQsb0RBQW9EO0lBQ3BELG1FQUFtRTtJQUNuRSxpQ0FBaUM7SUFDakMseURBQXlEO0lBQ3pELDZCQUE2QjtJQUM3Qix5REFBeUQ7SUFDekQsNkNBQTZDO0lBQzdDLHNCQUFzQjtJQUN0Qiw4Q0FBOEM7SUFDOUMsdUJBQXVCO0lBRXZCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNqQixNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNqQixNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBRWxCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRCxDQUFDLENBQUEifQ==