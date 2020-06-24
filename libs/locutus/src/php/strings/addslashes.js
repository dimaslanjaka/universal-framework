module.exports = function addslashes(str) {
    //  discuss at: https://locutus.io/php/addslashes/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: marrtins
    // improved by: Nate
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // improved by: Oskar Larsson Högfeldt (https://oskar-lh.name/)
    //    input by: Denny Wardhana
    //   example 1: addslashes("kevin's birthday")
    //   returns 1: "kevin\\'s birthday"
    return (str + '')
        .replace(/[\\"']/g, '\\$&')
        .replace(/\u0000/g, '\\0');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkc2xhc2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9hZGRzbGFzaGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUUsR0FBRztJQUN2QyxrREFBa0Q7SUFDbEQsb0RBQW9EO0lBQ3BELGlEQUFpRDtJQUNqRCx3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLDhEQUE4RDtJQUM5RCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELDhCQUE4QjtJQUM5Qiw4Q0FBOEM7SUFDOUMsb0NBQW9DO0lBRXBDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2QsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7U0FDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUEifQ==