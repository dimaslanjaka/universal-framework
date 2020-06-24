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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJuY21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0lBQ2pELG9EQUFvRDtJQUNwRCxtRUFBbUU7SUFDbkUsaUNBQWlDO0lBQ2pDLHlEQUF5RDtJQUN6RCw2QkFBNkI7SUFDN0IseURBQXlEO0lBQ3pELDZDQUE2QztJQUM3QyxzQkFBc0I7SUFDdEIsOENBQThDO0lBQzlDLHVCQUF1QjtJQUV2QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDakIsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDakIsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUVsQixPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakQsQ0FBQyxDQUFBIn0=