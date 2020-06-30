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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL3NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUM7SUFBQTtJQW9ERCxDQUFDO0lBbkRDOzs7T0FHRztJQUNJLGdCQUFTLEdBQWhCLFVBQWlCLE1BQWlDO1FBQ2hELElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sWUFBWSxLQUFLLEVBQUU7WUFDeEQsd0JBQXdCO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDTSxpQkFBVSxHQUFqQixVQUFrQixHQUFRO1FBQ3hCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDcEIsSUFBSSxFQUFFO2FBQ04sTUFBTSxDQUFDLFVBQVUsTUFBVyxFQUFFLEdBQVE7WUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksY0FBTyxHQUFkLFVBQWUsTUFBb0I7UUFDakMsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsd0NBQXdDO1FBQ3hDLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQVMsRUFBRSxLQUFVO2dCQUM1QyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDcEMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNoQixJQUFJLEVBQUU7aUJBQ04sT0FBTyxDQUFDLFVBQVUsR0FBRztnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsdUJBQXVCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFwREEsSUFvREE7QUFDRCxpQkFBUyxNQUFNLENBQUMifQ==