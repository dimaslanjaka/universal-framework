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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNzY2FsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYmMvYmNzY2FsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFFLEtBQUs7SUFDdEMsK0NBQStDO0lBQy9DLHNFQUFzRTtJQUN0RSwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBRXBCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRXJCLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzNCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDYixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFFdkIsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==