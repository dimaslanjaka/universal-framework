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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsUUFBUSxFQUFFLElBQUk7SUFDN0MsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1Qix3REFBd0Q7SUFDeEQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCxpQkFBaUI7SUFDakIsK0RBQStEO0lBQy9ELGlCQUFpQjtJQUVqQixJQUFJLEdBQUcsQ0FBQTtJQUNQLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUVYLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLEVBQUU7UUFDeEQsT0FBTyxDQUFDLENBQUE7S0FDVDtTQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7UUFDNUUsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUVELElBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO1FBQzlCLElBQUksR0FBRyxDQUFDLENBQUE7S0FDVDtJQUNELElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNkLElBQUksR0FBRyxDQUFDLENBQUE7S0FDVDtJQUVELEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUNwQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsR0FBRyxFQUFFLENBQUE7WUFDTCxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDN0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxLQUFLLEtBQUs7b0JBQ2xDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLEVBQUU7Z0JBQ3pDLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQy9CO1NBQ0Y7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=