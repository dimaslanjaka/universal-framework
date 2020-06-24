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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29waGVyX3BhcnNlZGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9uZXQtZ29waGVyL2dvcGhlcl9wYXJzZWRpci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLE1BQU07SUFDL0MsdURBQXVEO0lBQ3ZELG9EQUFvRDtJQUNwRCw0SEFBNEg7SUFDNUgsMkJBQTJCO0lBQzNCLDJDQUEyQztJQUUzQzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFFSCxJQUFJLFlBQVksR0FBRyw2Q0FBNkMsQ0FBQTtJQUNoRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRXRDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7UUFDdEQsZ0JBQWdCO0tBQ2pCO0lBRUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxHQUFHO1lBQ1IsY0FBYztZQUNaLElBQUksR0FBRyxHQUFHLENBQUE7WUFDVixNQUFLO1FBQ1AsS0FBSyxHQUFHO1lBQ1IsbUJBQW1CO1lBQ2pCLElBQUksR0FBRyxDQUFDLENBQUE7WUFDUixNQUFLO1FBQ1AsS0FBSyxHQUFHO1lBQ1Isa0JBQWtCO1lBQ2hCLElBQUksR0FBRyxDQUFDLENBQUE7WUFDUixNQUFLO1FBQ1AsS0FBSyxHQUFHO1lBQ1IsZ0JBQWdCO1lBQ2QsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNSLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixtQkFBbUI7WUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNSLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixtQkFBbUI7WUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUNSLE1BQUs7UUFDUCxLQUFLLEdBQUc7WUFDUixnQkFBZ0I7WUFDZCxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsTUFBSztRQUNQLEtBQUssR0FBRztZQUNSLGNBQWM7WUFDWixJQUFJLEdBQUcsR0FBRyxDQUFBO1lBQ1YsTUFBSztRQUNQO1lBQ0UsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQSxDQUFDLGlCQUFpQjtLQUN0QjtJQUNELE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2YsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9