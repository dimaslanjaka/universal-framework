module.exports = function base_convert(number, frombase, tobase) {
    //  discuss at: https://locutus.io/php/base_convert/
    // original by: Philippe Baumann
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: base_convert('A37334', 16, 2)
    //   returns 1: '101000110111001100110100'
    return parseInt(number + '', frombase | 0)
        .toString(tobase | 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9jb252ZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9tYXRoL2Jhc2VfY29udmVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUM5RCxvREFBb0Q7SUFDcEQsZ0NBQWdDO0lBQ2hDLHlEQUF5RDtJQUN6RCw2Q0FBNkM7SUFDN0MsMENBQTBDO0lBRTFDLE9BQU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUN2QyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQSJ9