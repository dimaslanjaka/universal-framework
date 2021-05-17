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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvbWF0aC9yb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFVBQVUsQ0FBRSxLQUFLLEVBQUUsSUFBSTtJQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFM0MsSUFDRSxDQUFDLElBQUksS0FBSyxxQkFBcUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUMsSUFBSSxLQUFLLG9CQUFvQixJQUFJLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNwRixHQUFHLElBQUksQ0FBQyxDQUFBO0tBQ1Q7SUFFRCxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7QUFDL0IsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLENBQUUsS0FBSyxFQUFFLFNBQWEsRUFBRSxJQUEwQjtJQUMvRSw2Q0FBNkM7SUFDN0MsK0JBQStCO0lBQy9CLDhEQUE4RDtJQUM5RCxzQkFBc0I7SUFDdEIseURBQXlEO0lBQ3pELHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLGtDQUFrQztJQUNsQyx1QkFBdUI7SUFDdkIsMEJBQTBCO0lBQzFCLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLHlDQUF5QztJQUN6QyxvQkFBb0I7SUFDcEIsNENBQTRDO0lBQzVDLHVCQUF1QjtJQUN2QixrQ0FBa0M7SUFDbEMsdUJBQXVCO0lBdkJlLDBCQUFBLEVBQUEsYUFBYTtJQUFFLHFCQUFBLEVBQUEsMEJBQTBCO0lBeUIvRSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtJQUN0RCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtJQUNsRCxJQUFJLENBQUMsQ0FBQTtJQUVMLDZEQUE2RDtJQUM3RCx1RUFBdUU7SUFFdkUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN4QixTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUUzQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsa0RBQWtEO0lBQ2xELG1DQUFtQztJQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7UUFDakQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELCtEQUErRDtJQUMvRCxzRkFBc0Y7SUFDdEYsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXBFLElBQUksaUJBQWlCLEdBQUcsU0FBUyxJQUFJLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxTQUFTLEVBQUU7UUFDdkUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNqRSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0tBQy9EO1NBQU07UUFDTCxLQUFLLElBQUksQ0FBQyxDQUFBO0tBQ1g7SUFFRCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUUvQixPQUFPLEtBQUssR0FBRyxDQUFDLENBQUE7QUFDbEIsQ0FBQyxDQUFBIn0=