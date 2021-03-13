module.exports = function inet_pton(a) {
    //  discuss at: https://locutus.io/php/inet_pton/
    // original by: Theriault (https://github.com/Theriault)
    //   example 1: inet_pton('::')
    //   returns 1: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'
    //   example 2: inet_pton('127.0.0.1')
    //   returns 2: '\x7F\x00\x00\x01'
    var r;
    var m;
    var x;
    var i;
    var j;
    var f = String.fromCharCode;
    // IPv4
    m = a.match(/^(?:\d{1,3}(?:\.|$)){4}/);
    if (m) {
        m = m[0].split('.');
        m = f(m[0]) + f(m[1]) + f(m[2]) + f(m[3]);
        // Return if 4 bytes, otherwise false.
        return m.length === 4 ? m : false;
    }
    r = /^((?:[\da-f]{1,4}(?::|)){0,8})(::)?((?:[\da-f]{1,4}(?::|)){0,8})$/;
    // IPv6
    m = a.match(r);
    if (m) {
        // Translate each hexadecimal value.
        for (j = 1; j < 4; j++) {
            // Indice 2 is :: and if no length, continue.
            if (j === 2 || m[j].length === 0) {
                continue;
            }
            m[j] = m[j].split(':');
            for (i = 0; i < m[j].length; i++) {
                m[j][i] = parseInt(m[j][i], 16);
                // Would be NaN if it was blank, return false.
                if (isNaN(m[j][i])) {
                    // Invalid IP.
                    return false;
                }
                m[j][i] = f(m[j][i] >> 8) + f(m[j][i] & 0xFF);
            }
            m[j] = m[j].join('');
        }
        x = m[1].length + m[3].length;
        if (x === 16) {
            return m[1] + m[3];
        }
        else if (x < 16 && m[2].length > 0) {
            return m[1] + (new Array(16 - x + 1))
                .join('\x00') + m[3];
        }
    }
    // Invalid IP
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ldF9wdG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL25ldHdvcmsvaW5ldF9wdG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsQ0FBQztJQUNwQyxpREFBaUQ7SUFDakQsd0RBQXdEO0lBQ3hELCtCQUErQjtJQUMvQixrREFBa0Q7SUFDbEQsc0NBQXNDO0lBQ3RDLGtDQUFrQztJQUVsQyxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBQTtJQUNMLElBQUksQ0FBQyxDQUFBO0lBQ0wsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQTtJQUUzQixPQUFPO0lBQ1AsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUN0QyxJQUFJLENBQUMsRUFBRTtRQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ25CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekMsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0tBQ2xDO0lBQ0QsQ0FBQyxHQUFHLG1FQUFtRSxDQUFBO0lBRXZFLE9BQU87SUFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNkLElBQUksQ0FBQyxFQUFFO1FBQ0wsb0NBQW9DO1FBQ3BDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLDZDQUE2QztZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLFNBQVE7YUFDVDtZQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQy9CLDhDQUE4QztnQkFDOUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xCLGNBQWM7b0JBQ2QsT0FBTyxLQUFLLENBQUE7aUJBQ2I7Z0JBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTthQUM5QztZQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3JCO1FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7YUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3ZCO0tBQ0Y7SUFFRCxhQUFhO0lBQ2IsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUEifQ==