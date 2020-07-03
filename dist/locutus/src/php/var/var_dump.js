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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyX2R1bXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL3Zhcl9kdW1wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRO0lBQ2hDLGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQsc0JBQXNCO0lBQ3RCLG9EQUFvRDtJQUNwRCw2RkFBNkY7SUFDN0Ysd0JBQXdCO0lBQ3hCLDJCQUEyQjtJQUMzQix3QkFBd0I7SUFFeEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNkLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVULElBQUksWUFBWSxHQUFHLFVBQVUsRUFBRTtRQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLDZCQUE2QixDQUFDO2FBQ3ZDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNYLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLGFBQWEsQ0FBQTtTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtJQUVELElBQUksV0FBVyxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87UUFDdEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixHQUFHLElBQUksT0FBTyxDQUFBO1NBQ2Y7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUNELElBQUksWUFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLFFBQVE7UUFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLEdBQUcsR0FBRyxNQUFNLENBQUE7U0FDYjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25DLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUMxQjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2xDLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNqRDthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2xDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQ3pDLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTthQUN6QjtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUE7YUFDM0I7U0FDRjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1lBQ3JDLDBEQUEwRDtZQUMxRCw4Q0FBOEM7WUFDOUMsR0FBRyxHQUFHLFdBQVcsQ0FBQTtTQUNsQjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO1lBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUU7aUJBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNkLEdBQUcsR0FBRyxFQUFFLENBQUE7WUFDUixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDdkQ7U0FDRjthQUFNLElBQUksR0FBRyxZQUFZLElBQUksRUFBRTtZQUM5QixHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUE7U0FDMUI7YUFBTSxJQUFJLEdBQUcsWUFBWSxNQUFNLEVBQUU7WUFDaEMsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO1NBQzVCO2FBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLGtDQUFrQztZQUNsQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLEtBQUssQ0FBQztvQkFDSixJQUFJLE9BQU8sR0FBRyxDQUFDLFlBQVksS0FBSyxXQUFXO3dCQUN6QyxHQUFHLENBQUMsWUFBWSxLQUFLLCtCQUErQixFQUFFO3dCQUN4RCxnRkFBZ0Y7d0JBQzlFLEdBQUcsR0FBRyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7cUJBQzVDO3lCQUFNO3dCQUNMLEdBQUcsR0FBRyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7cUJBQzVDO29CQUNELE1BQUs7Z0JBQ1AsS0FBSyxDQUFDO29CQUNKLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQTtvQkFDNUMsTUFBSztnQkFDUCxLQUFLLENBQUM7b0JBQ0osR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtvQkFDeEMsTUFBSztnQkFDUCxLQUFLLENBQUM7b0JBQ0osR0FBRyxHQUFHLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO29CQUNqRCxNQUFLO2dCQUNQLEtBQUssQ0FBQztvQkFDSixHQUFHLEdBQUcsdUJBQXVCLENBQUE7b0JBQzdCLE1BQUs7Z0JBQ1AsS0FBSyxDQUFDO29CQUNKLEdBQUcsR0FBRyxhQUFhLENBQUE7b0JBQ25CLE1BQUs7Z0JBQ1AsS0FBSyxDQUFDO29CQUNKLEdBQUcsR0FBRyw4QkFBOEIsR0FBRyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtvQkFDL0UsTUFBSztnQkFDUCxLQUFLLENBQUM7b0JBQ0osR0FBRyxHQUFHLGVBQWUsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtvQkFDM0MsTUFBSztnQkFDUCxLQUFLLENBQUM7b0JBQ0osR0FBRyxHQUFHLGVBQWUsQ0FBQTtvQkFDckIsTUFBSztnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsR0FBRyxHQUFHLG9CQUFvQixDQUFBO29CQUMxQixNQUFLO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxHQUFHLEdBQUcsd0JBQXdCLENBQUE7b0JBQzlCLE1BQUs7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLEdBQUcsR0FBRyxlQUFlLENBQUE7b0JBQ3JCLE1BQUs7YUFDUjtTQUNGO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDLENBQUE7SUFFRCxJQUFJLFlBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU87UUFDekQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxDQUFBO1NBQ1g7UUFFRCxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzNELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDNUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBRVosSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUMzQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxrQkFBa0IsRUFBRTtnQkFDM0UsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7YUFDdEI7WUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsS0FBSyxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxFQUFFLENBQUE7aUJBQ1A7YUFDRjtZQUNELEdBQUcsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQTtZQUNoQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNyQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7b0JBQzVCLE1BQU0sS0FBSyxJQUFJO29CQUNmLENBQUMsQ0FBQyxNQUFNLFlBQVksSUFBSSxDQUFDO29CQUN6QixDQUFDLENBQUMsTUFBTSxZQUFZLE1BQU0sQ0FBQztvQkFDM0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNsQixHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLEdBQUcsQ0FBQTtvQkFDVixHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxRQUFRLENBQUE7b0JBQ2YsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7aUJBQzNEO3FCQUFNO29CQUNMLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUNwQyxHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxHQUFHLENBQUE7b0JBQ1YsR0FBRyxJQUFJLEdBQUcsQ0FBQTtvQkFDVixHQUFHLElBQUksUUFBUSxDQUFBO29CQUNmLEdBQUcsSUFBSSxRQUFRLENBQUE7b0JBQ2YsR0FBRyxJQUFJLEdBQUcsQ0FBQTtvQkFDVixHQUFHLElBQUksSUFBSSxDQUFBO2lCQUNaO2FBQ0Y7WUFDRCxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQTtTQUN2QjthQUFNO1lBQ0wsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDbEM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUVELE1BQU0sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDdkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQ2hFO0lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRVosMENBQTBDO0lBQzFDLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=