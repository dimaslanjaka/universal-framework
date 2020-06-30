module.exports = function array_key_exists(key, search) {
    //  discuss at: https://locutus.io/php/array_key_exists/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Felix Geisendoerfer (https://www.debuggable.com/felix)
    //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
    //   returns 1: true
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    return key in search;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfa2V5X2V4aXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfa2V5X2V4aXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZ0JBQWdCLENBQUUsR0FBRyxFQUFFLE1BQU07SUFDckQsd0RBQXdEO0lBQ3hELG9EQUFvRDtJQUNwRCxzRUFBc0U7SUFDdEUscUVBQXFFO0lBQ3JFLG9CQUFvQjtJQUVwQixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsRUFBRTtRQUM5RSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFBO0FBQ3RCLENBQUMsQ0FBQSJ9