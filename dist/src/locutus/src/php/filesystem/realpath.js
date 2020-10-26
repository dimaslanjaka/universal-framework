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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbHBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZmlsZXN5c3RlbS9yZWFscGF0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLElBQUk7SUFDdEMsZ0RBQWdEO0lBQ2hELHVCQUF1QjtJQUN2QixvREFBb0Q7SUFDcEQsOEVBQThFO0lBQzlFLCtFQUErRTtJQUMvRSw0REFBNEQ7SUFFNUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNoQztJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQSxDQUFDLDhCQUE4QjtJQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUEsQ0FBQyx1QkFBdUI7SUFFekQsb0RBQW9EO0lBQ3BELElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5QixDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ047SUFFRCx5REFBeUQ7SUFDekQsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtLQUNyRDtJQUVELHlDQUF5QztJQUN6QyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLDJCQUEyQjtJQUNqRCxJQUFJLEdBQUcsRUFBRSxDQUFBLENBQUMsNEJBQTRCO0lBQ3RDLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsZ0NBQWdDO1FBQ25ELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNsQixTQUFRO1NBQ1Q7UUFDRCw0QkFBNEI7UUFDNUIsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CO3VEQUMyQztZQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7YUFDWDtTQUNGO2FBQU07WUFDTCxrQ0FBa0M7WUFDbEMsK0NBQStDO1lBQy9DLDRDQUE0QztZQUM1QyxRQUFRO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDbEI7U0FDRjtLQUNGO0lBRUQsd0NBQXdDO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==