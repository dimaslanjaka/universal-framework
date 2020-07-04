module.exports = function bcscale(scale) {
    //  discuss at: https://locutus.io/php/bcscale/
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    //   example 1: bcscale(1)
    //   returns 1: true
    var _bc = require('../_helpers/_bc');
    var libbcmath = _bc();
    scale = parseInt(scale, 10);
    if (isNaN(scale)) {
        return false;
    }
    if (scale < 0) {
        return false;
    }
    libbcmath.scale = scale;
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNzY2FsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9iYy9iY3NjYWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsS0FBSztJQUN0QywrQ0FBK0M7SUFDL0Msc0VBQXNFO0lBQ3RFLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFFcEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDcEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFckIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDM0IsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNiLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUV2QixPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQSJ9