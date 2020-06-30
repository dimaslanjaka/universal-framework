module.exports = function is_finite(val) {
    //  discuss at: https://locutus.io/php/is_finite/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: is_finite(Infinity)
    //   returns 1: false
    //   example 2: is_finite(-Infinity)
    //   returns 2: false
    //   example 3: is_finite(0)
    //   returns 3: true
    var warningType = '';
    if (val === Infinity || val === -Infinity) {
        return false;
    }
    // Some warnings for maximum PHP compatibility
    if (typeof val === 'object') {
        warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
    }
    else if (typeof val === 'string' && !val.match(/^[+-]?\d/)) {
        // simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        var msg = 'Warning: is_finite() expects parameter 1 to be double, ' + warningType + ' given';
        throw new Error(msg);
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZmluaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2lzX2Zpbml0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEdBQUc7SUFDdEMsaURBQWlEO0lBQ2pELDhEQUE4RDtJQUM5RCxtQ0FBbUM7SUFDbkMscUJBQXFCO0lBQ3JCLG9DQUFvQztJQUNwQyxxQkFBcUI7SUFDckIsNEJBQTRCO0lBQzVCLG9CQUFvQjtJQUVwQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUN6QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsOENBQThDO0lBQzlDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUM5RjtTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCx5RUFBeUU7UUFDekUsV0FBVyxHQUFHLFFBQVEsQ0FBQTtLQUN2QjtJQUNELElBQUksV0FBVyxFQUFFO1FBQ2YsSUFBSSxHQUFHLEdBQUcseURBQXlELEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQTtRQUM1RixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JCO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==