module.exports = function capwords(str) {
    //  discuss at: https://locutus.io/python/capwords/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
    // improved by: Robin
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: James (https://www.james-bell.co.uk/)
    //   example 1: capwords('kevin van  zonneveld')
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: capwords('HELLO WORLD')
    //   returns 2: 'HELLO WORLD'
    var pattern = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g;
    return (str + '').replace(pattern, function ($1) {
        return $1.toUpperCase();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwd29yZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcHl0aG9uL3N0cmluZy9jYXB3b3Jkcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLEdBQUc7SUFDckMsbURBQW1EO0lBQ25ELHFFQUFxRTtJQUNyRSw4REFBOEQ7SUFDOUQscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQscURBQXFEO0lBQ3JELGdEQUFnRDtJQUNoRCxzQ0FBc0M7SUFDdEMsdUNBQXVDO0lBQ3ZDLDZCQUE2QjtJQUU3QixJQUFJLE9BQU8sR0FBRyxnREFBZ0QsQ0FBQTtJQUM5RCxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFO1FBQzdDLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3pCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIn0=