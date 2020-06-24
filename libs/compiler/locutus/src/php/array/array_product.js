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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvYXJyYXlfcHJvZHVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFFLEtBQUs7SUFDNUMscURBQXFEO0lBQ3JELDhEQUE4RDtJQUM5RCw2Q0FBNkM7SUFDN0MsbUJBQW1CO0lBRW5CLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUVWLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixFQUFFO1FBQzlELE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUNqQixPQUFPLEdBQUcsR0FBRyxFQUFFLEVBQUU7UUFDZixPQUFPLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoRCxHQUFHLEVBQUUsQ0FBQTtLQUNOO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=