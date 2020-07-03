module.exports = function dirname(path) {
    //  discuss at: https://locutus.io/php/dirname/
    // original by: Ozh
    // improved by: XoraX (https://www.xorax.info)
    //   example 1: dirname('/etc/passwd')
    //   returns 1: '/etc'
    //   example 2: dirname('c:/Temp/x')
    //   returns 2: 'c:/Temp'
    //   example 3: dirname('/dir/test/')
    //   returns 3: '/dir'
    return path.replace(/\\/g, '/')
        .replace(/\/[^/]*\/?$/, '');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlybmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9maWxlc3lzdGVtL2Rpcm5hbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxJQUFJO0lBQ3JDLCtDQUErQztJQUMvQyxtQkFBbUI7SUFDbkIsOENBQThDO0lBQzlDLHNDQUFzQztJQUN0QyxzQkFBc0I7SUFDdEIsb0NBQW9DO0lBQ3BDLHlCQUF5QjtJQUN6QixxQ0FBcUM7SUFDckMsc0JBQXNCO0lBRXRCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQzVCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFBIn0=