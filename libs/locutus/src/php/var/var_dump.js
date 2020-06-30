module.exports = function var_dump() {
    //  discuss at: https://locutus.io/php/var_dump/
    // original by: Brett Zamir (https://brett-zamir.me)
    // improved by: Zahlii
    // improved by: Brett Zamir (https://brett-zamir.me)
    //      note 1: For returning a string, use var_export() with the second argument set to true
    //        test: skip-all
    //   example 1: var_dump(1)
    //   returns 1: 'int(1)'
    var echo = require('../strings/echo');
    var output = '';
    var padChar = ' ';
    var padVal = 4;
    var lgth = 0;
    var i = 0;
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w$]+)\s*\(/)
            .exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    var _repeatChar = function (len, padChar) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += padChar;
        }
        return str;
    };
    var _getInnerVal = function (val, thickPad) {
        var ret = '';
        if (val === null) {
            ret = 'NULL';
        }
        else if (typeof val === 'boolean') {
            ret = 'bool(' + val + ')';
        }
        else if (typeof val === 'string') {
            ret = 'string(' + val.length + ') "' + val + '"';
        }
        else if (typeof val === 'number') {
            if (parseFloat(val) === parseInt(val, 10)) {
                ret = 'int(' + val + ')';
            }
            else {
                ret = 'float(' + val + ')';
            }
        }
        else if (typeof val === 'undefined') {
            // The remaining are not PHP behavior because these values
            // only exist in this exact form in JavaScript
            ret = 'undefined';
        }
        else if (typeof val === 'function') {
            var funcLines = val.toString()
                .split('\n');
            ret = '';
            for (var i = 0, fll = funcLines.length; i < fll; i++) {
                ret += (i !== 0 ? '\n' + thickPad : '') + funcLines[i];
            }
        }
        else if (val instanceof Date) {
            ret = 'Date(' + val + ')';
        }
        else if (val instanceof RegExp) {
            ret = 'RegExp(' + val + ')';
        }
        else if (val.nodeName) {
            // Different than PHP's DOMElement
            switch (val.nodeType) {
                case 1:
                    if (typeof val.namespaceURI === 'undefined' ||
                        val.namespaceURI === 'https://www.w3.org/1999/xhtml') {
                        // Undefined namespace could be plain XML, but namespaceURI not widely supported
                        ret = 'HTMLElement("' + val.nodeName + '")';
                    }
                    else {
                        ret = 'XML Element("' + val.nodeName + '")';
                    }
                    break;
                case 2:
                    ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
                    break;
                case 3:
                    ret = 'TEXT_NODE(' + val.nodeValue + ')';
                    break;
                case 4:
                    ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
                    break;
                case 5:
                    ret = 'ENTITY_REFERENCE_NODE';
                    break;
                case 6:
                    ret = 'ENTITY_NODE';
                    break;
                case 7:
                    ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
                    break;
                case 8:
                    ret = 'COMMENT_NODE(' + val.nodeValue + ')';
                    break;
                case 9:
                    ret = 'DOCUMENT_NODE';
                    break;
                case 10:
                    ret = 'DOCUMENT_TYPE_NODE';
                    break;
                case 11:
                    ret = 'DOCUMENT_FRAGMENT_NODE';
                    break;
                case 12:
                    ret = 'NOTATION_NODE';
                    break;
            }
        }
        return ret;
    };
    var _formatArray = function (obj, curDepth, padVal, padChar) {
        if (curDepth > 0) {
            curDepth++;
        }
        var basePad = _repeatChar(padVal * (curDepth - 1), padChar);
        var thickPad = _repeatChar(padVal * (curDepth + 1), padChar);
        var str = '';
        var val = '';
        if (typeof obj === 'object' && obj !== null) {
            if (obj.constructor && _getFuncName(obj.constructor) === 'LOCUTUS_Resource') {
                return obj.var_dump();
            }
            lgth = 0;
            for (var someProp in obj) {
                if (obj.hasOwnProperty(someProp)) {
                    lgth++;
                }
            }
            str += 'array(' + lgth + ') {\n';
            for (var key in obj) {
                var objVal = obj[key];
                if (typeof objVal === 'object' &&
                    objVal !== null &&
                    !(objVal instanceof Date) &&
                    !(objVal instanceof RegExp) &&
                    !objVal.nodeName) {
                    str += thickPad;
                    str += '[';
                    str += key;
                    str += '] =>\n';
                    str += thickPad;
                    str += _formatArray(objVal, curDepth + 1, padVal, padChar);
                }
                else {
                    val = _getInnerVal(objVal, thickPad);
                    str += thickPad;
                    str += '[';
                    str += key;
                    str += '] =>\n';
                    str += thickPad;
                    str += val;
                    str += '\n';
                }
            }
            str += basePad + '}\n';
        }
        else {
            str = _getInnerVal(obj, thickPad);
        }
        return str;
    };
    output = _formatArray(arguments[0], 0, padVal, padChar);
    for (i = 1; i < arguments.length; i++) {
        output += '\n' + _formatArray(arguments[i], 0, padVal, padChar);
    }
    echo(output);
    // Not how PHP does it, but helps us test:
    return output;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyX2R1bXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci92YXJfZHVtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUTtJQUNoQyxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixvREFBb0Q7SUFDcEQsNkZBQTZGO0lBQzdGLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0Isd0JBQXdCO0lBRXhCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDZCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFVCxJQUFJLFlBQVksR0FBRyxVQUFVLEVBQUU7UUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQzthQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDWCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxhQUFhLENBQUE7U0FDckI7UUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUE7SUFFRCxJQUFJLFdBQVcsR0FBRyxVQUFVLEdBQUcsRUFBRSxPQUFPO1FBQ3RDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsR0FBRyxJQUFJLE9BQU8sQ0FBQTtTQUNmO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDLENBQUE7SUFDRCxJQUFJLFlBQVksR0FB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