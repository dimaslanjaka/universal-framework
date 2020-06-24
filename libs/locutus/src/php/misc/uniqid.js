module.exports = function uniqid(prefix, moreEntropy) {
    //  discuss at: https://locutus.io/php/uniqid/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: Kankrelune (https://www.webfaktory.info/)
    //      note 1: Uses an internal counter (in locutus global) to avoid collision
    //   example 1: var $id = uniqid()
    //   example 1: var $result = $id.length === 13
    //   returns 1: true
    //   example 2: var $id = uniqid('foo')
    //   example 2: var $result = $id.length === (13 + 'foo'.length)
    //   returns 2: true
    //   example 3: var $id = uniqid('bar', true)
    //   example 3: var $result = $id.length === (23 + 'bar'.length)
    //   returns 3: true
    if (typeof prefix === 'undefined') {
        prefix = '';
    }
    var retId;
    var _formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) {
            // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) {
            // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };
    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    if (!$locutus.php.uniqidSeed) {
        // init seed with big random int
        $locutus.php.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    $locutus.php.uniqidSeed++;
    // start with prefix, add current milliseconds hex string
    retId = prefix;
    retId += _formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    // add seed hex string
    retId += _formatSeed($locutus.php.uniqidSeed, 5);
    if (moreEntropy) {
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10).toFixed(8).toString();
    }
    return retId;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9taXNjL3VuaXFpZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE1BQU0sRUFBRSxXQUFXO0lBQ25ELDhDQUE4QztJQUM5QyxvREFBb0Q7SUFDcEQseURBQXlEO0lBQ3pELCtFQUErRTtJQUMvRSxrQ0FBa0M7SUFDbEMsK0NBQStDO0lBQy9DLG9CQUFvQjtJQUNwQix1Q0FBdUM7SUFDdkMsZ0VBQWdFO0lBQ2hFLG9CQUFvQjtJQUNwQiw2Q0FBNkM7SUFDN0MsZ0VBQWdFO0lBQ2hFLG9CQUFvQjtJQUVwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0tBQ1o7SUFFRCxJQUFJLEtBQUssQ0FBQTtJQUNULElBQUksV0FBVyxHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVE7UUFDeEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsYUFBYTtRQUNwRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFCLG1CQUFtQjtZQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQTtTQUMxQztRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsa0JBQWtCO1lBQ2xCLE9BQU8sS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFBO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUE7SUFFRCxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO0lBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDL0IsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUVqQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7UUFDNUIsZ0NBQWdDO1FBQ2hDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFBO0tBQ2hFO0lBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUV6Qix5REFBeUQ7SUFDekQsS0FBSyxHQUFHLE1BQU0sQ0FBQTtJQUNkLEtBQUssSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLHNCQUFzQjtJQUN0QixLQUFLLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hELElBQUksV0FBVyxFQUFFO1FBQ2YsOENBQThDO1FBQzlDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDcEQ7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9