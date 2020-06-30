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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3BocENhc3RTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL19oZWxwZXJzL19waHBDYXN0U3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLENBQUUsS0FBSztJQUM3Qyw4QkFBOEI7SUFDOUIsb0NBQW9DO0lBQ3BDLG1CQUFtQjtJQUNuQixxQ0FBcUM7SUFDckMsa0JBQWtCO0lBQ2xCLHFDQUFxQztJQUNyQyxxQkFBcUI7SUFDckIsbUNBQW1DO0lBQ25DLHFCQUFxQjtJQUNyQixtQ0FBbUM7SUFDbkMscUJBQXFCO0lBQ3JCLG9DQUFvQztJQUNwQyxzQkFBc0I7SUFDdEIsb0NBQW9DO0lBQ3BDLGtCQUFrQjtJQUNsQix5Q0FBeUM7SUFDekMsa0JBQWtCO0lBQ2xCLGtDQUFrQztJQUNsQyx1QkFBdUI7SUFDdkIsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6QixrQ0FBa0M7SUFDbEMsb0JBQW9CO0lBQ3BCLGtDQUFrQztJQUNsQyxvQkFBb0I7SUFDcEIscUNBQXFDO0lBQ3JDLHVCQUF1QjtJQUV2QixJQUFJLElBQUksR0FBRyxPQUFPLEtBQUssQ0FBQTtJQUV2QixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssU0FBUztZQUNaLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUN6QixLQUFLLFFBQVE7WUFDWCxPQUFPLEtBQUssQ0FBQTtRQUNkLEtBQUssUUFBUTtZQUNYLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixPQUFPLEtBQUssQ0FBQTthQUNiO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBO2FBQ3RDO1lBRUQsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ25CLEtBQUssV0FBVztZQUNkLE9BQU8sRUFBRSxDQUFBO1FBQ1gsS0FBSyxRQUFRO1lBQ1gsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixPQUFPLE9BQU8sQ0FBQTthQUNmO1lBRUQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUNsQixPQUFPLFFBQVEsQ0FBQTthQUNoQjtZQUVELE9BQU8sRUFBRSxDQUFBO1FBQ1gsS0FBSyxVQUFVLENBQUM7UUFDZCxlQUFlO1FBQ2pCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0tBQzVDO0FBQ0gsQ0FBQyxDQUFBIn0=