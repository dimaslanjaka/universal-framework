module.exports = function each(arr) {
    //  discuss at: https://locutus.io/php/each/
    // original by: Ates Goral (https://magnetiq.com)
    //  revised by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Uses global: locutus to store the array pointer
    //   example 1: each({a: "apple", b: "balloon"})
    //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.pointers = $locutus.php.pointers || [];
    var pointers = $locutus.php.pointers;
    var indexOf = function (value) {
        for (var i = 0, length = this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };
    if (!pointers.indexOf) {
        pointers.indexOf = indexOf;
    }
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos + 1];
    var pos = 0;
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor) {
                pointers[arrpos + 1] += 1;
                if (each.returnArrayOnly) {
                    return [k, arr[k]];
                }
                else {
                    return {
                        1: arr[k],
                        value: arr[k],
                        0: k,
                        key: k
                    };
                }
            }
            ct++;
        }
        // Empty
        return false;
    }
    if (arr.length === 0 || cursor === arr.length) {
        return false;
    }
    pos = cursor;
    pointers[arrpos + 1] += 1;
    if (each.returnArrayOnly) {
        return [pos, arr[pos]];
    }
    else {
        return {
            1: arr[pos],
            value: arr[pos],
            0: pos,
            key: pos
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFFLEdBQUc7SUFDakMsNENBQTRDO0lBQzVDLGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELGdEQUFnRDtJQUNoRCw4REFBOEQ7SUFFOUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ25ELElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO0lBRXBDLElBQUksT0FBTyxHQUFHLFVBQVUsS0FBSztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDckIsT0FBTyxDQUFDLENBQUE7YUFDVDtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNYLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0tBQzNCO0lBQ0QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ3RCO0lBQ0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1FBQzVELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNWLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2pCLElBQUksRUFBRSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDeEIsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDbkI7cUJBQU07b0JBQ0wsT0FBTzt3QkFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDYixDQUFDLEVBQUUsQ0FBQzt3QkFDSixHQUFHLEVBQUUsQ0FBQztxQkFDUCxDQUFBO2lCQUNGO2FBQ0Y7WUFDRCxFQUFFLEVBQUUsQ0FBQTtTQUNMO1FBQ0QsUUFBUTtRQUNSLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQzdDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxHQUFHLEdBQUcsTUFBTSxDQUFBO0lBQ1osUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDdkI7U0FBTTtRQUNMLE9BQU87WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2YsQ0FBQyxFQUFFLEdBQUc7WUFDTixHQUFHLEVBQUUsR0FBRztTQUNULENBQUE7S0FDRjtBQUNILENBQUMsQ0FBQSJ9