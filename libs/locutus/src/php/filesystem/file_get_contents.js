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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV9nZXRfY29udGVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2ZpbGVzeXN0ZW0vZmlsZV9nZXRfY29udGVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGlCQUFpQixDQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQzlFLDhEQUE4RDtJQUM5RCxrQ0FBa0M7SUFDbEMscUNBQXFDO0lBQ3JDLHdDQUF3QztJQUN4Qyx5REFBeUQ7SUFDekQseURBQXlEO0lBQ3pELHlEQUF5RDtJQUN6RCx5REFBeUQ7SUFDekQsdUVBQXVFO0lBQ3ZFLGtEQUFrRDtJQUNsRCxxRUFBcUU7SUFDckUsb0RBQW9EO0lBQ3BELHNEQUFzRDtJQUN0RCwwRUFBMEU7SUFDMUUsOERBQThEO0lBQzlELHlCQUF5QjtJQUV6QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFdEIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUEifQ==