module.exports = function _phpCastString(value) {
    // original by: Rafał Kukawski
    //   example 1: _phpCastString(true)
    //   returns 1: '1'
    //   example 2: _phpCastString(false)
    //   returns 2: ''
    //   example 3: _phpCastString('foo')
    //   returns 3: 'foo'
    //   example 4: _phpCastString(0/0)
    //   returns 4: 'NAN'
    //   example 5: _phpCastString(1/0)
    //   returns 5: 'INF'
    //   example 6: _phpCastString(-1/0)
    //   returns 6: '-INF'
    //   example 7: _phpCastString(null)
    //   returns 7: ''
    //   example 8: _phpCastString(undefined)
    //   returns 8: ''
    //   example 9: _phpCastString([])
    //   returns 9: 'Array'
    //   example 10: _phpCastString({})
    //   returns 10: 'Object'
    //   example 11: _phpCastString(0)
    //   returns 11: '0'
    //   example 12: _phpCastString(1)
    //   returns 12: '1'
    //   example 13: _phpCastString(3.14)
    //   returns 13: '3.14'
    var type = typeof value;
    switch (type) {
        case 'boolean':
            return value ? '1' : '';
        case 'string':
            return value;
        case 'number':
            if (isNaN(value)) {
                return 'NAN';
            }
            if (!isFinite(value)) {
                return (value < 0 ? '-' : '') + 'INF';
            }
            return value + '';
        case 'undefined':
            return '';
        case 'object':
            if (Array.isArray(value)) {
                return 'Array';
            }
            if (value !== null) {
                return 'Object';
            }
            return '';
        case 'function':
        // fall through
        default:
            throw new Error('Unsupported value type');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3BocENhc3RTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvX2hlbHBlcnMvX3BocENhc3RTdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxLQUFLO0lBQzdDLDhCQUE4QjtJQUM5QixvQ0FBb0M7SUFDcEMsbUJBQW1CO0lBQ25CLHFDQUFxQztJQUNyQyxrQkFBa0I7SUFDbEIscUNBQXFDO0lBQ3JDLHFCQUFxQjtJQUNyQixtQ0FBbUM7SUFDbkMscUJBQXFCO0lBQ3JCLG1DQUFtQztJQUNuQyxxQkFBcUI7SUFDckIsb0NBQW9DO0lBQ3BDLHNCQUFzQjtJQUN0QixvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLHlDQUF5QztJQUN6QyxrQkFBa0I7SUFDbEIsa0NBQWtDO0lBQ2xDLHVCQUF1QjtJQUN2QixtQ0FBbUM7SUFDbkMseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUNsQyxvQkFBb0I7SUFDcEIsa0NBQWtDO0lBQ2xDLG9CQUFvQjtJQUNwQixxQ0FBcUM7SUFDckMsdUJBQXVCO0lBRXZCLElBQUksSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFBO0lBRXZCLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1osT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ3pCLEtBQUssUUFBUTtZQUNYLE9BQU8sS0FBSyxDQUFBO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sS0FBSyxDQUFBO2FBQ2I7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUE7YUFDdEM7WUFFRCxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDbkIsS0FBSyxXQUFXO1lBQ2QsT0FBTyxFQUFFLENBQUE7UUFDWCxLQUFLLFFBQVE7WUFDWCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sT0FBTyxDQUFBO2FBQ2Y7WUFFRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLE9BQU8sUUFBUSxDQUFBO2FBQ2hCO1lBRUQsT0FBTyxFQUFFLENBQUE7UUFDWCxLQUFLLFVBQVUsQ0FBQztRQUNkLGVBQWU7UUFDakI7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7S0FDNUM7QUFDSCxDQUFDLENBQUEifQ==