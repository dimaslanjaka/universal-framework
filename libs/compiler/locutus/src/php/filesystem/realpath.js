module.exports = function realpath(path) {
    //  discuss at: https://locutus.io/php/realpath/
    // original by: mk.keck
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Returned path is an url like e.g. 'https://yourhost.tld/path/'
    //   example 1: realpath('some/dir/.././_supporters/pj_test_supportfile_1.htm')
    //   returns 1: 'some/_supporters/pj_test_supportfile_1.htm'
    if (typeof window === 'undefined') {
        var nodePath = require('path');
        return nodePath.normalize(path);
    }
    var p = 0;
    var arr = []; // Save the root, if not given
    var r = this.window.location.href; // Avoid input failures
    // Check if there's a port in path (like 'https://')
    path = (path + '').replace('\\', '/');
    if (path.indexOf('://') !== -1) {
        p = 1;
    }
    // Ok, there's not a port in path, so let's take the root
    if (!p) {
        path = r.substring(0, r.lastIndexOf('/') + 1) + path;
    }
    // Explode the given path into it's parts
    arr = path.split('/'); // The path is an array now
    path = []; // Foreach part make a check
    for (var k in arr) { // This is'nt really interesting
        if (arr[k] === '.') {
            continue;
        }
        // This reduces the realpath
        if (arr[k] === '..') {
            /* But only if there more than 3 parts in the path-array.
             * The first three parts are for the uri */
            if (path.length > 3) {
                path.pop();
            }
        }
        else {
            // This adds parts to the realpath
            // But only if the part is not empty or the uri
            // (the first three parts ar needed) was not
            // saved
            if ((path.length < 2) || (arr[k] !== '')) {
                path.push(arr[k]);
            }
        }
    }
    // Returns the absloute path as a string
    return path.join('/');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbHBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2ZpbGVzeXN0ZW0vcmVhbHBhdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxJQUFJO0lBQ3RDLGdEQUFnRDtJQUNoRCx1QkFBdUI7SUFDdkIsb0RBQW9EO0lBQ3BELDhFQUE4RTtJQUM5RSwrRUFBK0U7SUFDL0UsNERBQTREO0lBRTVELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM5QixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDaEM7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUEsQ0FBQyw4QkFBOEI7SUFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBLENBQUMsdUJBQXVCO0lBRXpELG9EQUFvRDtJQUNwRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNyQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNOO0lBRUQseURBQXlEO0lBQ3pELElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDTixJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7S0FDckQ7SUFFRCx5Q0FBeUM7SUFDekMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQywyQkFBMkI7SUFDakQsSUFBSSxHQUFHLEVBQUUsQ0FBQSxDQUFDLDRCQUE0QjtJQUN0QyxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLGdDQUFnQztRQUNuRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDbEIsU0FBUTtTQUNUO1FBQ0QsNEJBQTRCO1FBQzVCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQjt1REFDMkM7WUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO2FBQ1g7U0FDRjthQUFNO1lBQ0wsa0NBQWtDO1lBQ2xDLCtDQUErQztZQUMvQyw0Q0FBNEM7WUFDNUMsUUFBUTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2xCO1NBQ0Y7S0FDRjtJQUVELHdDQUF3QztJQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDdkIsQ0FBQyxDQUFBIn0=