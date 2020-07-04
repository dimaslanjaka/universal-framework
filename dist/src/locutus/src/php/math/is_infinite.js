module.exports = function is_infinite(val) {
    //  discuss at: https://locutus.io/php/is_infinite/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: is_infinite(Infinity)
    //   returns 1: true
    //   example 2: is_infinite(-Infinity)
    //   returns 2: true
    //   example 3: is_infinite(0)
    //   returns 3: false
    var warningType = '';
    if (val === Infinity || val === -Infinity) {
        return true;
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
        var msg = 'Warning: is_infinite() expects parameter 1 to be double, ' + warningType + ' given';
        throw new Error(msg);
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW5maW5pdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9pc19pbmZpbml0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLEdBQUc7SUFDeEMsbURBQW1EO0lBQ25ELDhEQUE4RDtJQUM5RCxxQ0FBcUM7SUFDckMsb0JBQW9CO0lBQ3BCLHNDQUFzQztJQUN0QyxvQkFBb0I7SUFDcEIsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUVyQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsOENBQThDO0lBQzlDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUM5RjtTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCx5RUFBeUU7UUFDekUsV0FBVyxHQUFHLFFBQVEsQ0FBQTtLQUN2QjtJQUNELElBQUksV0FBVyxFQUFFO1FBQ2YsSUFBSSxHQUFHLEdBQUcsMkRBQTJELEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQTtRQUM5RixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JCO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==