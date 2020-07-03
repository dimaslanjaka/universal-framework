module.exports = function substr_replace(str, replace, start, length) {
    //  discuss at: https://locutus.io/php/substr_replace/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0)
    //   returns 1: 'bob'
    //   example 2: var $var = 'ABCDEFGH:/MNRPQR/'
    //   example 2: substr_replace($var, 'bob', 0, $var.length)
    //   returns 2: 'bob'
    //   example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0)
    //   returns 3: 'bobABCDEFGH:/MNRPQR/'
    //   example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1)
    //   returns 4: 'ABCDEFGH:/bob/'
    //   example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1)
    //   returns 5: 'ABCDEFGH:/bob/'
    //   example 6: substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
    //   returns 6: 'ABCDEFGH://'
    if (start < 0) {
        // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    return [
        str.slice(0, start),
        replace.substr(0, length),
        replace.slice(length),
        str.slice(start + length)
    ].join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic3RyX3JlcGxhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9zdWJzdHJfcmVwbGFjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDbkUsc0RBQXNEO0lBQ3RELG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QscUJBQXFCO0lBQ3JCLDhDQUE4QztJQUM5QywyREFBMkQ7SUFDM0QscUJBQXFCO0lBQ3JCLGdFQUFnRTtJQUNoRSxzQ0FBc0M7SUFDdEMsa0VBQWtFO0lBQ2xFLGdDQUFnQztJQUNoQyxrRUFBa0U7SUFDbEUsZ0NBQWdDO0lBQ2hDLCtEQUErRDtJQUMvRCw2QkFBNkI7SUFFN0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ2Isd0JBQXdCO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtLQUMzQjtJQUNELE1BQU0sR0FBRyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDbkQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtLQUNyQztJQUVELE9BQU87UUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztLQUMxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9