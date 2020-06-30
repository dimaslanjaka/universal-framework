module.exports = function unserialize(data) {
    //  discuss at: https://locutus.io/php/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (https://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: philippsimon (https://github.com/philippsimon/)
    //  revised by: d3x
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: Martin (https://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //    input by: lovasoa (https://github.com/lovasoa/)
    // improved by: Rafał Kukawski
    //      note 1: We feel the main purpose of this function should be
    //      note 1: to ease the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
    //   returns 2: {firstName: 'Kevin', midName: 'van'}
    //   example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
    //   returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
    //   example 4: unserialize(undefined)
    //   returns 4: false
    //   example 5: unserialize('O:8:"stdClass":1:{s:3:"foo";b:1;}')
    //   returns 5: { foo: true }
    var utf8Overhead = function (str) {
        var s = str.length;
        for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) {
                s++;
            }
            else if (code > 0x7ff && code <= 0xffff) {
                s += 2;
            }
            // trail surrogate
            if (code >= 0xDC00 && code <= 0xDFFF) {
                i--;
            }
        }
        return s - 1;
    };
    var readUntil = function (data, offset, stopchr) {
        var i = 2;
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        while (chr !== stopchr) {
            if ((i + offset) > data.length) {
                throw Error('Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1), offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var readChrs = function (data, offset, length) {
        var i, chr, buf;
        buf = [];
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
    };
    function _unserialize(data, offset) {
        var dtype;
        var dataoffset;
        var keyandchrs;
        var keys;
        var contig;
        var length;
        var array;
        var obj;
        var readdata;
        var readData;
        var ccount;
        var stringlength;
        var i;
        var key;
        var kprops;
        var kchrs;
        var vprops;
        var vchrs;
        var value;
        var chrs = 0;
        var typeconvert = function (x) {
            return x;
        };
        if (!offset) {
            offset = 0;
        }
        dtype = (data.slice(offset, offset + 1));
        dataoffset = offset + 2;
        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10);
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'b':
                typeconvert = function (x) {
                    var value = parseInt(x, 10);
                    switch (value) {
                        case 0:
                            return false;
                        case 1:
                            return true;
                        default:
                            throw SyntaxError('Invalid boolean value');
                    }
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x);
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'n':
                readdata = null;
                break;
            case 's':
                ccount = readUntil(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];
                dataoffset += chrs + 2;
                readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 2;
                if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                    throw SyntaxError('String length mismatch');
                }
                break;
            case 'a':
                readdata = {};
                keyandchrs = readUntil(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];
                dataoffset += chrs + 2;
                length = parseInt(keys, 10);
                contig = true;
                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset);
                    kchrs = kprops[1];
                    key = kprops[2];
                    dataoffset += kchrs;
                    vprops = _unserialize(data, dataoffset);
                    vchrs = vprops[1];
                    value = vprops[2];
                    dataoffset += vchrs;
                    if (key !== i) {
                        contig = false;
                    }
                    readdata[key] = value;
                }
                if (contig) {
                    array = new Array(length);
                    for (i = 0; i < length; i++) {
                        array[i] = readdata[i];
                    }
                    readdata = array;
                }
                dataoffset += 1;
                break;
            case 'O': {
                // O:<class name length>:"class name":<prop count>:{<props and values>}
                // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
                readData = readUntil(data, dataoffset, ':'); // read class name length
                dataoffset += readData[0] + 1;
                readData = readUntil(data, dataoffset, ':');
                if (readData[1] !== '"stdClass"') {
                    throw Error('Unsupported object type: ' + readData[1]);
                }
                dataoffset += readData[0] + 1; // skip ":"
                readData = readUntil(data, dataoffset, ':');
                keys = parseInt(readData[1], 10);
                dataoffset += readData[0] + 2; // skip ":{"
                obj = {};
                for (i = 0; i < keys; i++) {
                    readData = _unserialize(data, dataoffset);
                    key = readData[2];
                    dataoffset += readData[1];
                    readData = _unserialize(data, dataoffset);
                    dataoffset += readData[1];
                    obj[key] = readData[2];
                }
                dataoffset += 1; // skip "}"
                readdata = obj;
                break;
            }
            default:
                throw SyntaxError('Unknown / Unhandled data type(s): ' + dtype);
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    }
    try {
        if (typeof data !== 'string') {
            return false;
        }
        return _unserialize(data, 0)[2];
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zZXJpYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci91bnNlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFFLElBQUk7SUFDekMsbURBQW1EO0lBQ25ELGdEQUFnRDtJQUNoRCwwREFBMEQ7SUFDMUQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsd0JBQXdCO0lBQ3hCLG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsK0RBQStEO0lBQy9ELG1CQUFtQjtJQUNuQixvREFBb0Q7SUFDcEQsbURBQW1EO0lBQ25ELHNCQUFzQjtJQUN0QixpQ0FBaUM7SUFDakMscURBQXFEO0lBQ3JELDhCQUE4QjtJQUM5QixtRUFBbUU7SUFDbkUsOERBQThEO0lBQzlELG9GQUFvRjtJQUNwRix1RkFBdUY7SUFDdkYsNkNBQTZDO0lBQzdDLHlGQUF5RjtJQUN6RixvREFBb0Q7SUFDcEQsdUZBQXVGO0lBQ3ZGLGdEQUFnRDtJQUNoRCxzQ0FBc0M7SUFDdEMscUJBQXFCO0lBQ3JCLGdFQUFnRTtJQUNoRSw2QkFBNkI7SUFFN0IsSUFBSSxZQUFZLEdBQUcsVUFBVSxHQUFHO1FBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ2hDLENBQUMsRUFB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