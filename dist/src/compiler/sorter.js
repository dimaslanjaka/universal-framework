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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvc29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUFBO0lBc0RBLENBQUM7SUFyREc7OztPQUdHO0lBQ0ksZ0JBQVMsR0FBaEIsVUFBaUIsTUFBaUM7UUFDOUMsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxZQUFZLEtBQUssRUFBRTtZQUN0RCx3QkFBd0I7WUFDeEIsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFDRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQU0sU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxpQkFBVSxHQUFqQixVQUFrQixHQUFRO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDbEIsSUFBSSxFQUFFO2FBQ04sTUFBTSxDQUFDLFVBQVUsTUFBVyxFQUFFLEdBQVE7WUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksY0FBTyxHQUFkLFVBQWUsTUFBb0I7UUFDL0IsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsd0NBQXdDO1FBQ3hDLElBQUksUUFBUSxFQUFFO1lBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQVMsRUFBRSxLQUFVO2dCQUMxQyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBRTtvQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDbEMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNkLElBQUksRUFBRTtpQkFDTixPQUFPLENBQUMsVUFBVSxHQUFHO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFDRCx1QkFBdUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQztBQUVELGlCQUFTLE1BQU0sQ0FBQyJ9