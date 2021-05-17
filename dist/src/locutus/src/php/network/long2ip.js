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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZzJpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9uZXR3b3JrL2xvbmcyaXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxFQUFFO0lBQ25DLCtDQUErQztJQUMvQywyREFBMkQ7SUFDM0QscUNBQXFDO0lBQ3JDLDhCQUE4QjtJQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNuRixDQUFDLENBQUEifQ==