module.exports = function strncasecmp(argStr1, argStr2, len) {
    //  discuss at: https://locutus.io/php/strncasecmp/
    // original by: Saulo Vallory
    //    input by: Nate
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      note 1: Returns < 0 if str1 is less than str2 ; > 0
    //      note 1: if str1 is greater than str2, and 0 if they are equal.
    //   example 1: strncasecmp('Price 12.9', 'Price 12.15', 2)
    //   returns 1: 0
    //   example 2: strncasecmp('Price 12.09', 'Price 12.15', 10)
    //   returns 2: -1
    //   example 3: strncasecmp('Price 12.90', 'Price 12.15', 30)
    //   returns 3: 8
    //   example 4: strncasecmp('Version 12.9', 'Version 12.15', 20)
    //   returns 4: 8
    //   example 5: strncasecmp('Version 12.15', 'Version 12.9', 20)
    //   returns 5: -8
    var diff;
    var i = 0;
    var str1 = (argStr1 + '').toLowerCase().substr(0, len);
    var str2 = (argStr2 + '').toLowerCase().substr(0, len);
    if (str1.length !== str2.length) {
        if (str1.length < str2.length) {
            len = str1.length;
            if (str2.substr(0, str1.length) === str1) {
                // return the difference of chars
                return str1.length - str2.length;
            }
        }
        else {
            len = str2.length;
            // str1 is longer than str2
            if (str1.substr(0, str2.length) === str2) {
                // return the difference of chars
                return str1.length - str2.length;
            }
        }
    }
    else {
        // Avoids trying to get a char that does not exist
        len = str1.length;
    }
    for (diff = 0, i = 0; i < len; i++) {
        diff = str1.charCodeAt(i) - str2.charCodeAt(i);
        if (diff !== 0) {
            return diff;
        }
    }
    return 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmNhc2VjbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RybmNhc2VjbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUc7SUFDMUQsbURBQW1EO0lBQ25ELDZCQUE2QjtJQUM3QixvQkFBb0I7SUFDcEIsOERBQThEO0lBQzlELDJEQUEyRDtJQUMzRCxzRUFBc0U7SUFDdEUsMkRBQTJEO0lBQzNELGlCQUFpQjtJQUNqQiw2REFBNkQ7SUFDN0Qsa0JBQWtCO0lBQ2xCLDZEQUE2RDtJQUM3RCxpQkFBaUI7SUFDakIsZ0VBQWdFO0lBQ2hFLGlCQUFpQjtJQUNqQixnRUFBZ0U7SUFDaEUsa0JBQWtCO0lBRWxCLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN0RCxJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXRELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDeEMsaUNBQWlDO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTthQUNqQztTQUNGO2FBQU07WUFDTCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtZQUNqQiwyQkFBMkI7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN4QyxpQ0FBaUM7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO2FBQ2pDO1NBQ0Y7S0FDRjtTQUFNO1FBQ0wsa0RBQWtEO1FBQ2xELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0tBQ2xCO0lBRUQsS0FBSyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlDLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFBO1NBQ1o7S0FDRjtJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=