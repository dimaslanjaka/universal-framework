module.exports = function pos(arr) {
    //  discuss at: https://locutus.io/php/pos/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Uses global: locutus to store the array pointer
    //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
    //   example 1: pos($transport)
    //   returns 1: 'foot'
    var current = require('../array/current');
    return current(arr);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9wb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBRSxHQUFHO0lBQ2hDLDJDQUEyQztJQUMzQyxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELGlFQUFpRTtJQUNqRSwrQkFBK0I7SUFDL0Isc0JBQXNCO0lBRXRCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3JCLENBQUMsQ0FBQSJ9