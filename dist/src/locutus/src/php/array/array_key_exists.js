module.exports = function array_key_exists(key, search) {
    //  discuss at: https://locutus.io/php/array_key_exists/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Felix Geisendoerfer (https://www.debuggable.com/felix)
    //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
    //   returns 1: true
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    return key in search;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfa2V5X2V4aXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9hcnJheV9rZXlfZXhpc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBRSxHQUFHLEVBQUUsTUFBTTtJQUNyRCx3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELHNFQUFzRTtJQUN0RSxxRUFBcUU7SUFDckUsb0JBQW9CO0lBRXBCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxFQUFFO1FBQzlFLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUE7QUFDdEIsQ0FBQyxDQUFBIn0=