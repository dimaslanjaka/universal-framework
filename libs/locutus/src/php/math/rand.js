module.exports = function rand(min, max) {
    //  discuss at: https://locutus.io/php/rand/
    // original by: Leslie Hoare
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      note 1: See the commented out code below for a version which
    //      note 1: will work with our experimental (though probably unnecessary)
    //      note 1: srand() function)
    //   example 1: rand(1, 1)
    //   returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    }
    else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9yYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEMsNENBQTRDO0lBQzVDLDRCQUE0QjtJQUM1Qiw4REFBOEQ7SUFDOUQsb0VBQW9FO0lBQ3BFLDZFQUE2RTtJQUM3RSxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLGlCQUFpQjtJQUVqQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNkLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDUCxHQUFHLEdBQUcsVUFBVSxDQUFBO0tBQ2pCO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQTtLQUN6RTtJQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0FBQzFELENBQUMsQ0FBQSJ9