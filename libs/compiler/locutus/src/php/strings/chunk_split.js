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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtfc3BsaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvY2h1bmtfc3BsaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsQ0FBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUc7SUFDeEQsbURBQW1EO0lBQ25ELDZCQUE2QjtJQUM3QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCxtREFBbUQ7SUFDbkQsMENBQTBDO0lBQzFDLG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFFaEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZDLEdBQUcsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFBO0lBRW5CLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtRQUNoQixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9