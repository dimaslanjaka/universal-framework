module.exports = function array_product(input) {
    //  discuss at: https://locutus.io/php/array_product/
    // original by: Waldo Malqui Silva (https://waldo.malqui.info)
    //   example 1: array_product([ 2, 4, 6, 8 ])
    //   returns 1: 384
    var idx = 0;
    var product = 1;
    var il = 0;
    if (Object.prototype.toString.call(input) !== '[object Array]') {
        return null;
    }
    il = input.length;
    while (idx < il) {
        product *= (!isNaN(input[idx]) ? input[idx] : 0);
        idx++;
    }
    return product;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9wcm9kdWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUUsS0FBSztJQUM1QyxxREFBcUQ7SUFDckQsOERBQThEO0lBQzlELDZDQUE2QztJQUM3QyxtQkFBbUI7SUFFbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRVYsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDOUQsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQ2pCLE9BQU8sR0FBRyxHQUFHLEVBQUUsRUFBRTtRQUNmLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hELEdBQUcsRUFBRSxDQUFBO0tBQ047SUFFRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUEifQ==