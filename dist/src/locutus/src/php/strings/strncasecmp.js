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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RybmNhc2VjbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdHJuY2FzZWNtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRztJQUMxRCxtREFBbUQ7SUFDbkQsNkJBQTZCO0lBQzdCLG9CQUFvQjtJQUNwQiw4REFBOEQ7SUFDOUQsMkRBQTJEO0lBQzNELHNFQUFzRTtJQUN0RSwyREFBMkQ7SUFDM0QsaUJBQWlCO0lBQ2pCLDZEQUE2RDtJQUM3RCxrQkFBa0I7SUFDbEIsNkRBQTZEO0lBQzdELGlCQUFpQjtJQUNqQixnRUFBZ0U7SUFDaEUsaUJBQWlCO0lBQ2pCLGdFQUFnRTtJQUNoRSxrQkFBa0I7SUFFbEIsSUFBSSxJQUFJLENBQUE7SUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3RELElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFFdEQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7WUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN4QyxpQ0FBaUM7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBQ2pCLDJCQUEyQjtZQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hDLGlDQUFpQztnQkFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7YUFDakM7U0FDRjtLQUNGO1NBQU07UUFDTCxrREFBa0Q7UUFDbEQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7S0FDbEI7SUFFRCxLQUFLLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0lBRUQsT0FBTyxDQUFDLENBQUE7QUFDVixDQUFDLENBQUEifQ==