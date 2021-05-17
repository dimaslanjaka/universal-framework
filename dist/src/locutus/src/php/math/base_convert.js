module.exports = function base_convert(number, frombase, tobase) {
    //  discuss at: https://locutus.io/php/base_convert/
    // original by: Philippe Baumann
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: base_convert('A37334', 16, 2)
    //   returns 1: '101000110111001100110100'
    return parseInt(number + '', frombase | 0)
        .toString(tobase | 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9jb252ZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvYmFzZV9jb252ZXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQzlELG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFDaEMseURBQXlEO0lBQ3pELDZDQUE2QztJQUM3QywwQ0FBMEM7SUFFMUMsT0FBTyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBIn0=