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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWN3b3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy91Y3dvcmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUUsR0FBRztJQUNwQywrQ0FBK0M7SUFDL0MscUVBQXFFO0lBQ3JFLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELDhEQUE4RDtJQUM5RCxnRUFBZ0U7SUFDaEUscURBQXFEO0lBQ3JELCtDQUErQztJQUMvQyxzQ0FBc0M7SUFDdEMsc0NBQXNDO0lBQ3RDLDZCQUE2QjtJQUM3Qiw4RUFBOEU7SUFDOUUscUVBQXFFO0lBQ3JFLHdGQUF3RjtJQUN4RiwrRUFBK0U7SUFFL0UsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRTtRQUNuQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN6QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9