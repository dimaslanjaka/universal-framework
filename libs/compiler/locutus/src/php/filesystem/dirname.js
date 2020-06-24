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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlybmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvZmlsZXN5c3RlbS9kaXJuYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsSUFBSTtJQUNyQywrQ0FBK0M7SUFDL0MsbUJBQW1CO0lBQ25CLDhDQUE4QztJQUM5QyxzQ0FBc0M7SUFDdEMsc0JBQXNCO0lBQ3RCLG9DQUFvQztJQUNwQyx5QkFBeUI7SUFDekIscUNBQXFDO0lBQ3JDLHNCQUFzQjtJQUV0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUM1QixPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQSJ9