module.exports = function inet_ntop(a) {
    //  discuss at: https://locutus.io/php/inet_ntop/
    // original by: Theriault (https://github.com/Theriault)
    //   example 1: inet_ntop('\x7F\x00\x00\x01')
    //   returns 1: '127.0.0.1'
    //   _example 2: inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1')
    //   _returns 2: '::1'
    var i = 0;
    var m = '';
    var c = [];
    a += '';
    if (a.length === 4) {
        // IPv4
        return [
            a.charCodeAt(0),
            a.charCodeAt(1),
            a.charCodeAt(2),
            a.charCodeAt(3)
        ].join('.');
    }
    else if (a.length === 16) {
        // IPv6
        for (i = 0; i < 16; i++) {
            c.push(((a.charCodeAt(i++) << 8) + a.charCodeAt(i)).toString(16));
        }
        return c.join(':')
            .replace(/((^|:)0(?=:|$))+:?/g, function (t) {
            m = (t.length > m.length) ? t : m;
            return t;
        })
            .replace(m || ' ', '::');
    }
    else {
        // Invalid length
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ldF9udG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9uZXR3b3JrL2luZXRfbnRvcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLENBQUM7SUFDcEMsaURBQWlEO0lBQ2pELHdEQUF3RDtJQUN4RCw2Q0FBNkM7SUFDN0MsMkJBQTJCO0lBQzNCLDhEQUE4RDtJQUM5RCxzQkFBc0I7SUFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVYsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNQLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTztRQUNQLE9BQU87WUFDTCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUNoQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNaO1NBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtRQUMxQixPQUFPO1FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNsRTtRQUNELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDZixPQUFPLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDO1lBQ3pDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQzthQUNELE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQzNCO1NBQU07UUFDTCxpQkFBaUI7UUFDakIsT0FBTyxLQUFLLENBQUE7S0FDYjtBQUNILENBQUMsQ0FBQSJ9