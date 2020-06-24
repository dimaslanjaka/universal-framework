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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfaW5maW5pdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvaXNfaW5maW5pdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxHQUFHO0lBQ3hDLG1EQUFtRDtJQUNuRCw4REFBOEQ7SUFDOUQscUNBQXFDO0lBQ3JDLG9CQUFvQjtJQUNwQixzQ0FBc0M7SUFDdEMsb0JBQW9CO0lBQ3BCLDhCQUE4QjtJQUM5QixxQkFBcUI7SUFFckIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBRXBCLElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELDhDQUE4QztJQUM5QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUMzQixXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDOUY7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDNUQseUVBQXlFO1FBQ3pFLFdBQVcsR0FBRyxRQUFRLENBQUE7S0FDdkI7SUFDRCxJQUFJLFdBQVcsRUFBRTtRQUNmLElBQUksR0FBRyxHQUFHLDJEQUEyRCxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUE7UUFDOUYsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNyQjtJQUVELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=