module.exports = function strpbrk(haystack, charList) {
    //  discuss at: https://locutus.io/php/strpbrk/
    // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: Christoph
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: strpbrk('This is a Simple text.', 'is')
    //   returns 1: 'is is a Simple text.'
    for (var i = 0, len = haystack.length; i < len; ++i) {
        if (charList.indexOf(haystack.charAt(i)) >= 0) {
            return haystack.slice(i);
        }
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RycGJyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cnBicmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRLEVBQUUsUUFBUTtJQUNuRCwrQ0FBK0M7SUFDL0MsZ0VBQWdFO0lBQ2hFLDhEQUE4RDtJQUM5RCx5QkFBeUI7SUFDekIsb0RBQW9EO0lBQ3BELHVEQUF1RDtJQUN2RCxzQ0FBc0M7SUFFdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNuRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDekI7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=