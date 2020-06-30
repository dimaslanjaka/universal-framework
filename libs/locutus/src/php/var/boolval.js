module.exports = function boolval(mixedVar) {
    // original by: Will Rowe
    //   example 1: boolval(true)
    //   returns 1: true
    //   example 2: boolval(false)
    //   returns 2: false
    //   example 3: boolval(0)
    //   returns 3: false
    //   example 4: boolval(0.0)
    //   returns 4: false
    //   example 5: boolval('')
    //   returns 5: false
    //   example 6: boolval('0')
    //   returns 6: false
    //   example 7: boolval([])
    //   returns 7: false
    //   example 8: boolval('')
    //   returns 8: false
    //   example 9: boolval(null)
    //   returns 9: false
    //   example 10: boolval(undefined)
    //   returns 10: false
    //   example 11: boolval('true')
    //   returns 11: true
    if (mixedVar === false) {
        return false;
    }
    if (mixedVar === 0 || mixedVar === 0.0) {
        return false;
    }
    if (mixedVar === '' || mixedVar === '0') {
        return false;
    }
    if (Array.isArray(mixedVar) && mixedVar.length === 0) {
        return false;
    }
    if (mixedVar === null || mixedVar === undefined) {
        return false;
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbHZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2Jvb2x2YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxRQUFRO0lBQ3pDLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0Isb0JBQW9CO0lBQ3BCLDhCQUE4QjtJQUM5QixxQkFBcUI7SUFDckIsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLDJCQUEyQjtJQUMzQixxQkFBcUI7SUFDckIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQiwyQkFBMkI7SUFDM0IscUJBQXFCO0lBQ3JCLDJCQUEyQjtJQUMzQixxQkFBcUI7SUFDckIsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQixtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBQ3RCLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFFckIsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ3RCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLFFBQVEsS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUN0QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxRQUFRLEtBQUssRUFBRSxJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDdkMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNwRCxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDL0MsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=