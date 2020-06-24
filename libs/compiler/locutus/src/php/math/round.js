function roundToInt(value, mode) {
    var tmp = Math.floor(Math.abs(value) + 0.5);
    if ((mode === 'PHP_ROUND_HALF_DOWN' && value === (tmp - 0.5)) ||
        (mode === 'PHP_ROUND_HALF_EVEN' && value === (0.5 + 2 * Math.floor(tmp / 2))) ||
        (mode === 'PHP_ROUND_HALF_ODD' && value === (0.5 + 2 * Math.floor(tmp / 2) - 1))) {
        tmp -= 1;
    }
    return value < 0 ? -tmp : tmp;
}
module.exports = function round(value, precision, mode) {
    //  discuss at: https://locutus.io/php/round/
    // original by: Philip Peterson
    //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
    //  revised by: T.Wild
    //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
    //    input by: Greenseed
    //    input by: meo
    //    input by: William
    //    input by: Josep Sanz (https://www.ws3.es/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //  revised by: Rafał Kukawski
    //   example 1: round(1241757, -3)
    //   returns 1: 1242000
    //   example 2: round(3.6)
    //   returns 2: 4
    //   example 3: round(2.835, 2)
    //   returns 3: 2.84
    //   example 4: round(1.1749999999999, 2)
    //   returns 4: 1.17
    //   example 5: round(58551.799999999996, 2)
    //   returns 5: 58551.8
    //   example 6: round(4096.485, 2)
    //   returns 6: 4096.49
    if (precision === void 0) { precision = 0; }
    if (mode === void 0) { mode = 'PHP_ROUND_HALF_UP'; }
    var floatCast = require('../_helpers/_php_cast_float');
    var intCast = require('../_helpers/_php_cast_int');
    var p;
    // the code is heavily based on the native PHP implementation
    // https://github.com/php/php-src/blob/PHP-7.4/ext/standard/math.c#L355
    value = floatCast(value);
    precision = intCast(precision);
    p = Math.pow(10, precision);
    if (isNaN(value) || !isFinite(value)) {
        return value;
    }
    // if value already integer and positive precision
    // then nothing to do, return early
    if (Math.trunc(value) === value && precision >= 0) {
        return value;
    }
    // PHP does a pre-rounding before rounding to desired precision
    // https://wiki.php.net/rfc/rounding#pre-rounding_to_the_value_s_precision_if_possible
    var preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)));
    if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
        value = roundToInt(value * Math.pow(10, preRoundPrecision), mode);
        value /= Math.pow(10, Math.abs(precision - preRoundPrecision));
    }
    else {
        value *= p;
    }
    value = roundToInt(value, mode);
    return value / p;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvcm91bmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxVQUFVLENBQUUsS0FBSyxFQUFFLElBQUk7SUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBRTNDLElBQ0UsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsSUFBSSxLQUFLLHFCQUFxQixJQUFJLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxDQUFDLElBQUksS0FBSyxvQkFBb0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDcEYsR0FBRyxJQUFJLENBQUMsQ0FBQTtLQUNUO0lBRUQsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0FBQy9CLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFFLEtBQUssRUFBRSxTQUFhLEVBQUUsSUFBMEI7SUFDL0UsNkNBQTZDO0lBQzdDLCtCQUErQjtJQUMvQiw4REFBOEQ7SUFDOUQsc0JBQXNCO0lBQ3RCLHlEQUF5RDtJQUN6RCx5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELDhCQUE4QjtJQUM5QixrQ0FBa0M7SUFDbEMsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtJQUMxQixpQkFBaUI7SUFDakIsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQix5Q0FBeUM7SUFDekMsb0JBQW9CO0lBQ3BCLDRDQUE0QztJQUM1Qyx1QkFBdUI7SUFDdkIsa0NBQWtDO0lBQ2xDLHVCQUF1QjtJQXZCZSwwQkFBQSxFQUFBLGFBQWE7SUFBRSxxQkFBQSxFQUFBLDBCQUEwQjtJQXlCL0UsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7SUFDdEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLENBQUE7SUFFTCw2REFBNkQ7SUFDN0QsdUVBQXVFO0lBRXZFLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDeEIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFM0IsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELGtEQUFrRDtJQUNsRCxtQ0FBbUM7SUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1FBQ2pELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCwrREFBK0Q7SUFDL0Qsc0ZBQXNGO0lBQ3RGLElBQUksaUJBQWlCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVwRSxJQUFJLGlCQUFpQixHQUFHLFNBQVMsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLEdBQUcsU0FBUyxFQUFFO1FBQ3ZFLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDakUsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtLQUMvRDtTQUFNO1FBQ0wsS0FBSyxJQUFJLENBQUMsQ0FBQTtLQUNYO0lBRUQsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFL0IsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQ2xCLENBQUMsQ0FBQSJ9