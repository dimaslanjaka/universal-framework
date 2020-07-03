module.exports = function gopher_parsedir(dirent) {
    //  discuss at: https://locutus.io/php/gopher_parsedir/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var entry = gopher_parsedir('0All about my gopher site.\t/allabout.txt\tgopher.example.com\t70\u000d\u000a')
    //   example 1: entry.title
    //   returns 1: 'All about my gopher site.'
    /* Types
     * 0 = plain text file
     * 1 = directory menu listing
     * 2 = CSO search query
     * 3 = error message
     * 4 = BinHex encoded text file
     * 5 = binary archive file
     * 6 = UUEncoded text file
     * 7 = search engine query
     * 8 = telnet session pointer
     * 9 = binary file
     * g = Graphics file format, primarily a GIF file
     * h = HTML file
     * i = informational message
     * s = Audio file format, primarily a WAV file
     */
    var entryPattern = /^(.)(.*?)\t(.*?)\t(.*?)\t(.*?)\u000d\u000a$/;
    var entry = dirent.match(entryPattern);
    if (entry === null) {
        throw new Error('Could not parse the directory entry');
        // return false;
    }
    var type = entry[1];
    switch (type) {
        case 'i':
            // GOPHER_INFO
            type = 255;
            break;
        case '1':
            // GOPHER_DIRECTORY
            type = 1;
            break;
        case '0':
            // GOPHER_DOCUMENT
            type = 0;
            break;
        case '4':
            // GOPHER_BINHEX
            type = 4;
            break;
        case '5':
            // GOPHER_DOSBINARY
            type = 5;
            break;
        case '6':
            // GOPHER_UUENCODED
            type = 6;
            break;
        case '9':
            // GOPHER_BINARY
            type = 9;
            break;
        case 'h':
            // GOPHER_HTTP
            type = 254;
            break;
        default:
            return {
                type: -1,
                data: dirent
            }; // GOPHER_UNKNOWN
    }
    return {
        type: type,
        title: entry[2],
        path: entry[3],
        host: entry[4],
        port: entry[5]
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29waGVyX3BhcnNlZGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL25ldC1nb3BoZXIvZ29waGVyX3BhcnNlZGlyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxlQUFlLENBQUUsTUFBTTtJQUMvQyx1REFBdUQ7SUFDdkQsb0RBQW9EO0lBQ3BELDRIQUE0SDtJQUM1SCwyQkFBMkI7SUFDM0IsMkNBQTJDO0lBRTNDOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUVILElBQUksWUFBWSxHQUFHLDZDQUE2QyxDQUFBO0lBQ2hFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFdEMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtRQUN0RCxnQkFBZ0I7S0FDakI7SUFFRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkIsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLEdBQUc7WUFDUixjQUFjO1lBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQTtZQUNWLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixtQkFBbUI7WUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNSLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixrQkFBa0I7WUFDaEIsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNSLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixnQkFBZ0I7WUFDZCxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsTUFBSztRQUNQLEtBQUssR0FBRztZQUNSLG1CQUFtQjtZQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsTUFBSztRQUNQLEtBQUssR0FBRztZQUNSLG1CQUFtQjtZQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsTUFBSztRQUNQLEtBQUssR0FBRztZQUNSLGdCQUFnQjtZQUNkLElBQUksR0FBRyxDQUFDLENBQUE7WUFDUixNQUFLO1FBQ1AsS0FBSyxHQUFHO1lBQ1IsY0FBYztZQUNaLElBQUksR0FBRyxHQUFHLENBQUE7WUFDVixNQUFLO1FBQ1A7WUFDRSxPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFBLENBQUMsaUJBQWlCO0tBQ3RCO0lBQ0QsT0FBTztRQUNMLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=