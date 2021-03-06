module.exports = function levenshtein(s1, s2, costIns, costRep, costDel) {
    //       discuss at: https://locutus.io/php/levenshtein/
    //      original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //       revised by: Andrea Giammarchi (https://webreflection.blogspot.com)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Alexander M Beedie
    // reimplemented by: Rafał Kukawski (https://blog.kukawski.pl)
    //        example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld')
    //        returns 1: 3
    //        example 2: levenshtein("carrrot", "carrots")
    //        returns 2: 2
    //        example 3: levenshtein("carrrot", "carrots", 2, 3, 4)
    //        returns 3: 6
    // var LEVENSHTEIN_MAX_LENGTH = 255 // PHP limits the function to max 255 character-long strings
    costIns = costIns == null ? 1 : +costIns;
    costRep = costRep == null ? 1 : +costRep;
    costDel = costDel == null ? 1 : +costDel;
    if (s1 === s2) {
        return 0;
    }
    var l1 = s1.length;
    var l2 = s2.length;
    if (l1 === 0) {
        return l2 * costIns;
    }
    if (l2 === 0) {
        return l1 * costDel;
    }
    // Enable the 3 lines below to set the same limits on string length as PHP does
    // if (l1 > LEVENSHTEIN_MAX_LENGTH || l2 > LEVENSHTEIN_MAX_LENGTH) {
    //   return -1;
    // }
    var split = false;
    try {
        split = !('0')[0];
    }
    catch (e) {
        // Earlier IE may not support access by string index
        split = true;
    }
    if (split) {
        s1 = s1.split('');
        s2 = s2.split('');
    }
    var p1 = new Array(l2 + 1);
    var p2 = new Array(l2 + 1);
    var i1, i2, c0, c1, c2, tmp;
    for (i2 = 0; i2 <= l2; i2++) {
        p1[i2] = i2 * costIns;
    }
    for (i1 = 0; i1 < l1; i1++) {
        p2[0] = p1[0] + costDel;
        for (i2 = 0; i2 < l2; i2++) {
            c0 = p1[i2] + ((s1[i1] === s2[i2]) ? 0 : costRep);
            c1 = p1[i2 + 1] + costDel;
            if (c1 < c0) {
                c0 = c1;
            }
            c2 = p2[i2] + costIns;
            if (c2 < c0) {
                c0 = c2;
            }
            p2[i2 + 1] = c0;
        }
        tmp = p1;
        p1 = p2;
        p2 = tmp;
    }
    c0 = p1[l2];
    return c0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZW5zaHRlaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9sZXZlbnNodGVpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPO0lBQ3RFLHdEQUF3RDtJQUN4RCx3RUFBd0U7SUFDeEUsbUVBQW1FO0lBQ25FLDJFQUEyRTtJQUMzRSx5REFBeUQ7SUFDekQsdUNBQXVDO0lBQ3ZDLDhEQUE4RDtJQUM5RCw4RUFBOEU7SUFDOUUsc0JBQXNCO0lBQ3RCLHNEQUFzRDtJQUN0RCxzQkFBc0I7SUFDdEIsK0RBQStEO0lBQy9ELHNCQUFzQjtJQUV0QixnR0FBZ0c7SUFFaEcsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFDeEMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFDeEMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFFeEMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2IsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUE7SUFDbEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQTtJQUVsQixJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDWixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7S0FDcEI7SUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDWixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7S0FDcEI7SUFFRCwrRUFBK0U7SUFDL0Usb0VBQW9FO0lBQ3BFLGVBQWU7SUFDZixJQUFJO0lBRUosSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ2pCLElBQUk7UUFDRixLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2xCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixvREFBb0Q7UUFDcEQsS0FBSyxHQUFHLElBQUksQ0FBQTtLQUNiO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNqQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNsQjtJQUVELElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQixJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQTtJQUUzQixLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUMzQixFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQTtLQUN0QjtJQUVELEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFBO1FBRXZCLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzFCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNqRCxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUE7WUFFekIsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNYLEVBQUUsR0FBRyxFQUFFLENBQUE7YUFDUjtZQUVELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFBO1lBRXJCLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDWCxFQUFFLEdBQUcsRUFBRSxDQUFBO2FBQ1I7WUFFRCxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtTQUNoQjtRQUVELEdBQUcsR0FBRyxFQUFFLENBQUE7UUFDUixFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1AsRUFBRSxHQUFHLEdBQUcsQ0FBQTtLQUNUO0lBRUQsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVYLE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQyxDQUFBIn0=