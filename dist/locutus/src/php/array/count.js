module.exports = function count(mixedVar, mode) {
    //  discuss at: https://locutus.io/php/count/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Waldo Malqui Silva (https://waldo.malqui.info)
    //    input by: merabi
    // bugfixed by: Soren Hansen
    // bugfixed by: Olivier Louvignes (https://mg-crea.com/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE')
    //   returns 1: 6
    //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
    //   returns 2: 6
    var key;
    var cnt = 0;
    if (mixedVar === null || typeof mixedVar === 'undefined') {
        return 0;
    }
    else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
        return 1;
    }
    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode !== 1) {
        mode = 0;
    }
    for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
            cnt++;
            if (mode === 1 && mixedVar[key] &&
                (mixedVar[key].constructor === Array ||
                    mixedVar[key].constructor === Object)) {
                cnt += count(mixedVar[key], 1);
            }
        }
    }
    return cnt;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvYXJyYXkvY291bnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsSUFBSTtJQUM3Qyw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxzQkFBc0I7SUFDdEIsNEJBQTRCO0lBQzVCLHdEQUF3RDtJQUN4RCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELGlCQUFpQjtJQUNqQiwrREFBK0Q7SUFDL0QsaUJBQWlCO0lBRWpCLElBQUksR0FBRyxDQUFBO0lBQ1AsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRVgsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTtRQUN4RCxPQUFPLENBQUMsQ0FBQTtLQUNUO1NBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtRQUM1RSxPQUFPLENBQUMsQ0FBQTtLQUNUO0lBRUQsSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDOUIsSUFBSSxHQUFHLENBQUMsQ0FBQTtLQUNUO0lBQ0QsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ2QsSUFBSSxHQUFHLENBQUMsQ0FBQTtLQUNUO0lBRUQsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ3BCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxHQUFHLEVBQUUsQ0FBQTtZQUNMLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM3QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEtBQUssS0FBSztvQkFDbEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsRUFBRTtnQkFDekMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDL0I7U0FDRjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==