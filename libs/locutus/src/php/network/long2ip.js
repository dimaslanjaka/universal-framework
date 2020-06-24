module.exports = function long2ip(ip) {
    //  discuss at: https://locutus.io/php/long2ip/
    // original by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //   example 1: long2ip( 3221234342 )
    //   returns 1: '192.0.34.166'
    if (!isFinite(ip)) {
        return false;
    }
    return [ip >>> 24 & 0xFF, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZzJpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbmV0d29yay9sb25nMmlwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsRUFBRTtJQUNuQywrQ0FBK0M7SUFDL0MsMkRBQTJEO0lBQzNELHFDQUFxQztJQUNyQyw4QkFBOEI7SUFFOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNqQixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbkYsQ0FBQyxDQUFBIn0=