module.exports = function isset() {
    //  discuss at: https://locutus.io/php/isset/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: FremyCompany
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: isset( undefined, true)
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' )
    //   returns 2: true
    var a = arguments;
    var l = a.length;
    var i = 0;
    var undef;
    if (l === 0) {
        throw new Error('Empty isset');
    }
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL2lzc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLO0lBQzdCLDZDQUE2QztJQUM3QyxvREFBb0Q7SUFDcEQsNEJBQTRCO0lBQzVCLDhEQUE4RDtJQUM5RCx5REFBeUQ7SUFDekQsdUNBQXVDO0lBQ3ZDLHFCQUFxQjtJQUNyQiw4Q0FBOEM7SUFDOUMsb0JBQW9CO0lBRXBCLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQTtJQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksS0FBSyxDQUFBO0lBRVQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtLQUMvQjtJQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25DLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxDQUFDLEVBQUUsQ0FBQTtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUEifQ==