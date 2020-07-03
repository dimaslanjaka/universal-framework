"use strict";
var sorter = /** @class */ (function () {
    function sorter() {
    }
    /**
     * Sort Ascending Recursive
     * @param {Object|Array<any>} object
     */
    sorter.ascending = function (object) {
        if (typeof object != "object" || object instanceof Array) {
            // Not to sort the array
            return object;
        }
        var keys = Object.keys(object);
        keys.sort();
        var newObject = {};
        for (var i = 0; i < keys.length; i++) {
            newObject[keys[i]] = this.ascending(object[keys[i]]);
        }
        return newObject;
    };
    sorter.sortObject = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    };
    /**
     * reorder object/array
     * @param {Object} parsed
     */
    sorter.reorder = function (parsed) {
        var ordered = [];
        var is_array = Array.isArray(parsed);
        //console.log('is_array ? ' + is_array);
        if (is_array) {
            parsed.forEach(function (item, index) {
                if (typeof item == "object") {
                    parsed[index] = sorter.sortObject(item);
                }
            });
            ordered = parsed;
        }
        else if (typeof parsed == "object") {
            ordered = {};
            Object.keys(parsed)
                .sort()
                .forEach(function (key) {
                ordered[key] = parsed[key];
            });
        }
        //console.log(ordered);
        return this.ascending(ordered);
    };
    return sorter;
}());
module.exports = sorter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvc29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQztJQUFBO0lBb0RELENBQUM7SUFuREM7OztPQUdHO0lBQ0ksZ0JBQVMsR0FBaEIsVUFBaUIsTUFBaUM7UUFDaEQsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxZQUFZLEtBQUssRUFBRTtZQUN4RCx3QkFBd0I7WUFDeEIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNNLGlCQUFVLEdBQWpCLFVBQWtCLEdBQVE7UUFDeEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNwQixJQUFJLEVBQUU7YUFDTixNQUFNLENBQUMsVUFBVSxNQUFXLEVBQUUsR0FBUTtZQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRDs7O09BR0c7SUFDSSxjQUFPLEdBQWQsVUFBZSxNQUFvQjtRQUNqQyxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyx3Q0FBd0M7UUFDeEMsSUFBSSxRQUFRLEVBQUU7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBUyxFQUFFLEtBQVU7Z0JBQzVDLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO29CQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDbEI7YUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNwQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLElBQUksRUFBRTtpQkFDTixPQUFPLENBQUMsVUFBVSxHQUFHO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCx1QkFBdUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXBEQSxJQW9EQTtBQUNELGlCQUFTLE1BQU0sQ0FBQyJ9