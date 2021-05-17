module.exports = function ucwords(str) {
    //  discuss at: https://locutus.io/php/ucwords/
    // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
    // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
    // improved by: Robin
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Cetvertacov Alexandr (https://github.com/cetver)
    //    input by: James (https://www.james-bell.co.uk/)
    //   example 1: ucwords('kevin van  zonneveld')
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: ucwords('HELLO WORLD')
    //   returns 2: 'HELLO WORLD'
    //   example 3: ucwords('у мэри был маленький ягненок и она его очень любила')
    //   returns 3: 'У Мэри Был Маленький Ягненок И Она Его Очень Любила'
    //   example 4: ucwords('τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός')
    //   returns 4: 'Τάχιστη Αλώπηξ Βαφής Ψημένη Γη, Δρασκελίζει Υπέρ Νωθρού Κυνός'
    return (str + '')
        .replace(/^(.)|\s+(.)/g, function ($1) {
        return $1.toUpperCase();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWN3b3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3Vjd29yZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBRSxHQUFHO0lBQ3BDLCtDQUErQztJQUMvQyxxRUFBcUU7SUFDckUsOERBQThEO0lBQzlELHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELGdFQUFnRTtJQUNoRSxxREFBcUQ7SUFDckQsK0NBQStDO0lBQy9DLHNDQUFzQztJQUN0QyxzQ0FBc0M7SUFDdEMsNkJBQTZCO0lBQzdCLDhFQUE4RTtJQUM5RSxxRUFBcUU7SUFDckUsd0ZBQXdGO0lBQ3hGLCtFQUErRTtJQUUvRSxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNkLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFO1FBQ25DLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3pCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIn0=