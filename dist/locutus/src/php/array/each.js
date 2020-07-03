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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9lYWNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRztJQUNqQyw0Q0FBNEM7SUFDNUMsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCwrREFBK0Q7SUFDL0QsZ0RBQWdEO0lBQ2hELDhEQUE4RDtJQUU5RCxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7SUFDbkQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7SUFFcEMsSUFBSSxPQUFPLEdBQUcsVUFBVSxLQUFLO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNyQixPQUFPLENBQUMsQ0FBQTthQUNUO1NBQ0Y7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ1gsQ0FBQyxDQUFBO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDckIsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7S0FDM0I7SUFDRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDdEI7SUFDRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2xDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRVgsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDNUQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBSSxFQUFFLEtBQUssTUFBTSxFQUFFO2dCQUNqQixRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN4QixPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNuQjtxQkFBTTtvQkFDTCxPQUFPO3dCQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNULEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLENBQUMsRUFBRSxDQUFDO3dCQUNKLEdBQUcsRUFBRSxDQUFDO3FCQUNQLENBQUE7aUJBQ0Y7YUFDRjtZQUNELEVBQUUsRUFBRSxDQUFBO1NBQ0w7UUFDRCxRQUFRO1FBQ1IsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDN0MsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELEdBQUcsR0FBRyxNQUFNLENBQUE7SUFDWixRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFDeEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUN2QjtTQUFNO1FBQ0wsT0FBTztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDLEVBQUUsR0FBRztZQUNOLEdBQUcsRUFBRSxHQUFHO1NBQ1QsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyxDQUFBIn0=