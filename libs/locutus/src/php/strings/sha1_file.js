module.exports = function sha1_file(str_filename) {
    //  discuss at: https://locutus.io/php/sha1_file/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Relies on file_get_contents which does not work in the browser, so Node only.
    //      note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
    //      note 2: hashed. We'd recommend Node's native crypto modules for faster and more
    //      note 2: efficient hashing
    //   example 1: sha1_file('test/never-change.txt')
    //   returns 1: '0ea65a1f4b4d69712affc58240932f3eb8a2af66'
    var fileGetContents = require('../filesystem/file_get_contents');
    var sha1 = require('../strings/sha1');
    var buf = fileGetContents(str_filename);
    if (buf === false) {
        return false;
    }
    return sha1(buf);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMV9maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3NoYTFfZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLFlBQVk7SUFDL0MsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLHVGQUF1RjtJQUN2RixpQ0FBaUM7SUFDakMsa0RBQWtEO0lBQ2xELDBEQUEwRDtJQUUxRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtJQUNoRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNyQyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFdkMsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNsQixDQUFDLENBQUEifQ==