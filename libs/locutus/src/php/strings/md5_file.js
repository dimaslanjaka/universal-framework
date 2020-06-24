module.exports = function md5_file(str_filename) {
    //  discuss at: https://locutus.io/php/md5_file/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Relies on file_get_contents which does not work in the browser, so Node only.
    //      note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
    //      note 2: hashed. We'd recommend Node's native crypto modules for faster and more
    //      note 2: efficient hashing
    //   example 1: md5_file('test/never-change.txt')
    //   returns 1: 'bc3aa724b0ec7dce4c26e7f4d0d9b064'
    var fileGetContents = require('../filesystem/file_get_contents');
    var md5 = require('../strings/md5');
    var buf = fileGetContents(str_filename);
    if (buf === false) {
        return false;
    }
    return md5(buf);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1X2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvbWQ1X2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxZQUFZO0lBQzlDLGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLHVGQUF1RjtJQUN2RixpQ0FBaUM7SUFDakMsaURBQWlEO0lBQ2pELGtEQUFrRDtJQUVsRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtJQUNoRSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNuQyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFdkMsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUEifQ==