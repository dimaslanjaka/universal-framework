module.exports = function end(arr) {
    //  discuss at: https://locutus.io/php/end/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Legaev Andrey
    //  revised by: J A R
    //  revised by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Uses global: locutus to store the array pointer
    //   example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
    //   returns 1: 'Zonneveld'
    //   example 2: end(['Kevin', 'van', 'Zonneveld'])
    //   returns 2: 'Zonneveld'
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
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        var ct = 0;
        var val;
        for (var k in arr) {
            ct++;
            val = arr[k];
        }
        if (ct === 0) {
            // Empty
            return false;
        }
        pointers[arrpos + 1] = ct - 1;
        return val;
    }
    if (arr.length === 0) {
        return false;
    }
    pointers[arrpos + 1] = arr.length - 1;
    return arr[pointers[arrpos + 1]];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFFLEdBQUc7SUFDaEMsMkNBQTJDO0lBQzNDLG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELCtEQUErRDtJQUMvRCwyREFBMkQ7SUFDM0QsMkJBQTJCO0lBQzNCLGtEQUFrRDtJQUNsRCwyQkFBMkI7SUFFM0IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ25ELElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO0lBRXBDLElBQUksT0FBTyxHQUFHLFVBQVUsS0FBSztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDckIsT0FBTyxDQUFDLENBQUE7YUFDVDtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNYLENBQUMsQ0FBQTtJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0tBQzNCO0lBQ0QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ3RCO0lBQ0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtRQUM1RCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLEdBQUcsQ0FBQTtRQUNQLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2pCLEVBQUUsRUFBRSxDQUFBO1lBQ0osR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNiO1FBQ0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osUUFBUTtZQUNSLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDN0IsT0FBTyxHQUFHLENBQUE7S0FDWDtJQUNELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDcEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDckMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2xDLENBQUMsQ0FBQSJ9