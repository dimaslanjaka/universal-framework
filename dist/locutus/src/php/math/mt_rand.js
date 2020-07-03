module.exports = function mt_rand(min, max) {
    //  discuss at: https://locutus.io/php/mt_rand/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: Kongo
    //   example 1: mt_rand(1, 1)
    //   returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    }
    else if (argc === 1) {
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
    }
    else {
        min = parseInt(min, 10);
        max = parseInt(max, 10);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXRfcmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL210X3JhbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRztJQUN6QywrQ0FBK0M7SUFDL0MsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIsNkJBQTZCO0lBQzdCLGlCQUFpQjtJQUVqQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNkLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDUCxHQUFHLEdBQUcsVUFBVSxDQUFBO0tBQ2pCO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQTtLQUM1RTtTQUFNO1FBQ0wsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDeEI7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtBQUMxRCxDQUFDLENBQUEifQ==