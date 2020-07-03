module.exports = function file_get_contents(url, flags, context, offset, maxLen) {
    //       discuss at: https://locutus.io/php/file_get_contents/
    //      original by: Legaev Andrey
    //         input by: Jani Hartikainen
    //         input by: Raphael (Ao) RUDLER
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Kevin van Zonneveld (https://kvz.io)
    //           note 1: This used to work in the browser via blocking ajax
    //           note 1: requests in 1.3.2 and earlier
    //           note 1: but then people started using that for real app,
    //           note 1: so we deprecated this behavior,
    //           note 1: so this function is now Node-only
    //        example 1: var $buf = file_get_contents('test/never-change.txt')
    //        example 1: var $result = $buf.indexOf('hash') !== -1
    //        returns 1: true
    var fs = require('fs');
    return fs.readFileSync(url, 'utf-8');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV9nZXRfY29udGVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZmlsZXN5c3RlbS9maWxlX2dldF9jb250ZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsaUJBQWlCLENBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDOUUsOERBQThEO0lBQzlELGtDQUFrQztJQUNsQyxxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx1RUFBdUU7SUFDdkUsa0RBQWtEO0lBQ2xELHFFQUFxRTtJQUNyRSxvREFBb0Q7SUFDcEQsc0RBQXNEO0lBQ3RELDBFQUEwRTtJQUMxRSw4REFBOEQ7SUFDOUQseUJBQXlCO0lBRXpCLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQSJ9