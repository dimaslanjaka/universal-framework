module.exports = function chunk_split(body, chunklen, end) {
    //  discuss at: https://locutus.io/php/chunk_split/
    // original by: Paulo Freitas
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Theriault (https://github.com/Theriault)
    //   example 1: chunk_split('Hello world!', 1, '*')
    //   returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
    //   example 2: chunk_split('Hello world!', 10, '*')
    //   returns 2: 'Hello worl*d!*'
    chunklen = parseInt(chunklen, 10) || 76;
    end = end || '\r\n';
    if (chunklen < 1) {
        return false;
    }
    return body.match(new RegExp('.{0,' + chunklen + '}', 'g'))
        .join(end);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtfc3BsaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9jaHVua19zcGxpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRztJQUN4RCxtREFBbUQ7SUFDbkQsNkJBQTZCO0lBQzdCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsd0RBQXdEO0lBQ3hELG1EQUFtRDtJQUNuRCwwQ0FBMEM7SUFDMUMsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUVoQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDdkMsR0FBRyxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUE7SUFFbkIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=