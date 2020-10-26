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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL3JhbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBRSxHQUFHLEVBQUUsR0FBRztJQUN0Qyw0Q0FBNEM7SUFDNUMsNEJBQTRCO0lBQzVCLDhEQUE4RDtJQUM5RCxvRUFBb0U7SUFDcEUsNkVBQTZFO0lBQzdFLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsaUJBQWlCO0lBRWpCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ2QsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUNQLEdBQUcsR0FBRyxVQUFVLENBQUE7S0FDakI7U0FBTSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0tBQ3pFO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7QUFDMUQsQ0FBQyxDQUFBIn0=