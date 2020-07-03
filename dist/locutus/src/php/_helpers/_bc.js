module.exports = function _bc() {
    //  discuss at: https://locutus.io/php/_helpers/_bc
    // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: var $bc = _bc()
    //   example 1: var $result = $bc.PLUS
    //   returns 1: '+'
    /**
     * BC Math Library for Javascript
     * Ported from the PHP5 bcmath extension source code,
     * which uses the Libbcmath package...
     *    Copyright (C) 1991, 1992, 1993, 1994, 1997 Free Software Foundation, Inc.
     *    Copyright (C) 2000 Philip A. Nelson
     *     The Free Software Foundation, Inc.
     *     59 Temple Place, Suite 330
     *     Boston, MA 02111-1307 USA.
     *      e-mail:  philnelson@acm.org
     *     us-mail:  Philip A. Nelson
     *               Computer Science Department, 9062
     *               Western Washington University
     *               Bellingham, WA 98226-9062
     *
     * bcmath-js homepage:
     *
     * This code is covered under the LGPL licence, and can be used however you want :)
     * Be kind and share any decent code changes.
     */
    /**
     * Binary Calculator (BC) Arbitrary Precision Mathematics Lib v0.10  (LGPL)
     * Copy of Libbcmath included in PHP5 src
     *
     * Note: this is just the shared library file and does not include the php-style functions.
     *       use bcmath{-min}.js for functions like bcadd, bcsub etc.
     *
     * Feel free to use how-ever you want, just email any bug-fixes/improvements
     * to the sourceforge project:
     *
     *
     * Ported from the PHP5 bcmath extension source code,
     * which uses the Libbcmath package...
     *    Copyright (C) 1991, 1992, 1993, 1994, 1997 Free Software Foundation, Inc.
     *    Copyright (C) 2000 Philip A. Nelson
     *     The Free Software Foundation, Inc.
     *     59 Temple Place, Suite 330
     *     Boston, MA 02111-1307 USA.
     *      e-mail:  philnelson@acm.org
     *     us-mail:  Philip A. Nelson
     *               Computer Science Department, 9062
     *               Western Washington University
     *               Bellingham, WA 98226-9062
     */
    var Libbcmath = {
        PLUS: '+',
        MINUS: '-',
        BASE: 10,
        // must be 10 (for now)
        scale: 0,
        // default scale
        /**
         * Basic number structure
         */
        bc_num: function () {
            this.n_sign = null; // sign
            this.n_len = null; // (int) The number of digits before the decimal point.
            this.n_scale = null; // (int) The number of digits after the decimal point.
            // this.n_refs = null; // (int) The number of pointers to this number.
            // this.n_text = null; // ?? Linked list for available list.
            this.n_value = null; // array as value, where 1.23 = [1,2,3]
            this.toString = function () {
                var r, tmp;
                tmp = this.n_value.join('');
                // add minus sign (if applicable) then add the integer part
                r = ((this.n_sign === Libbcmath.PLUS) ? '' : this.n_sign) + tmp.substr(0, this.n_len);
                // if decimal places, add a . and the decimal part
                if (this.n_scale > 0) {
                    r += '.' + tmp.substr(this.n_len, this.n_scale);
                }
                return r;
            };
        },
        /**
         * Base add function
         *
         //  Here is the full add routine that takes care of negative numbers.
         //  N1 is added to N2 and the result placed into RESULT.  SCALE_MIN
         //  is the minimum scale for the result.
         *
         * @param {bc_num} n1
         * @param {bc_num} n2
         * @param {int} scaleMin
         * @return bc_num
         */
        bc_add: function (n1, n2, scaleMin) {
            var sum, cmpRes, resScale;
            if (n1.n_sign === n2.n_sign) {
                sum = Libbcmath._bc_do_add(n1, n2, scaleMin);
                sum.n_sign = n1.n_sign;
            }
            else { // subtraction must be done.
                cmpRes = Libbcmath._bc_do_compare(n1, n2, false, false); // Compare magnitudes.
                switch (cmpRes) {
                    case -1:
                        // n1 is less than n2, subtract n1 from n2.
                        sum = Libbcmath._bc_do_sub(n2, n1, scaleMin);
                        sum.n_sign = n2.n_sign;
                        break;
                    case 0:
                        // They are equal! return zero with the correct scale!
                        resScale = Libbcmath.MAX(scaleMin, Libbcmath.MAX(n1.n_scale, n2.n_scale));
                        sum = Libbcmath.bc_new_num(1, resScale);
                        Libbcmath.memset(sum.n_value, 0, 0, resScale + 1);
                        break;
                    case 1:
                        // n2 is less than n1, subtract n2 from n1.
                        sum = Libbcmath._bc_do_sub(n1, n2, scaleMin);
                        sum.n_sign = n1.n_sign;
                }
            }
            return sum;
        },
        /**
         * This is the "user callable" routine to compare numbers N1 and N2.
         * @param {bc_num} n1
         * @param {bc_num} n2
         * @return int -1, 0, 1  (n1 < n2, ===, n1 > n2)
         */
        bc_compare: function (n1, n2) {
            return Libbcmath._bc_do_compare(n1, n2, true, false);
        },
        _one_mult: function (num, nPtr, size, digit, result, rPtr) {
            var carry, value; // int
            var nptr, rptr; // int pointers
            if (digit === 0) {
                Libbcmath.memset(result, 0, 0, size); // memset (result, 0, size);
            }
            else {
                if (digit === 1) {
                    Libbcmath.memcpy(result, rPtr, num, nPtr, size); // memcpy (result, num, size);
                }
                else { // Initialize
                    nptr = nPtr + size - 1; // nptr = (unsigned char *) (num+size-1);
                    rptr = rPtr + size - 1; // rptr = (unsigned char *) (result+size-1);
                    carry = 0;
                    while (size-- > 0) {
                        value = num[nptr--] * digit + carry; // value = *nptr-- * digit + carry;
                        result[rptr--] = value % Libbcmath.BASE; // @CHECK cint //*rptr-- = value % BASE;
                        carry = Math.floor(value / Libbcmath.BASE); // @CHECK cint //carry = value / BASE;
                    }
                    if (carry !== 0) {
                        result[rptr] = carry;
                    }
                }
            }
        },
        bc_divide: function (n1, n2, scale) {
            // var quot // bc_num return
            var qval; // bc_num
            var num1, num2; // string
            var ptr1, ptr2, n2ptr, qptr; // int pointers
            var scale1, val; // int
            var len1, len2, scale2, qdigits, extra, count; // int
            var qdig, qguess, borrow, carry; // int
            var mval; // string
            var zero; // char
            var norm; // int
            // var ptrs // return object from one_mul
            // Test for divide by zero. (return failure)
            if (Libbcmath.bc_is_zero(n2)) {
                return -1;
            }
            // Test for zero divide by anything (return zero)
            if (Libbcmath.bc_is_zero(n1)) {
                return Libbcmath.bc_new_num(1, scale);
            }
            /* Test for n1 equals n2 (return 1 as n1 nor n2 are zero)
              if (Libbcmath.bc_compare(n1, n2, Libbcmath.MAX(n1.n_scale, n2.n_scale)) === 0) {
                quot=Libbcmath.bc_new_num(1, scale);
                quot.n_value[0] = 1;
                return quot;
              }
            */
            // Test for divide by 1.  If it is we must truncate.
            // @todo: check where scale > 0 too.. can't see why not
            // (ie bc_is_zero - add bc_is_one function)
            if (n2.n_scale === 0) {
                if (n2.n_len === 1 && n2.n_value[0] === 1) {
                    qval = Libbcmath.bc_new_num(n1.n_len, scale); // qval = bc_new_num (n1->n_len, scale);
                    qval.n_sign = (n1.n_sign === n2.n_sign ? Libbcmath.PLUS : Libbcmath.MINUS);
                    // memset (&qval->n_value[n1->n_len],0,scale):
                    Libbcmath.memset(qval.n_value, n1.n_len, 0, scale);
                    // memcpy (qval->n_value, n1->n_value, n1->n_len + MIN(n1->n_scale,scale)):
                    Libbcmath.memcpy(qval.n_value, 0, n1.n_value, 0, n1.n_len + Libbcmath.MIN(n1.n_scale, scale));
                    // can we return here? not in c src, but can't see why-not.
                    // return qval;
                }
            }
            /* Set up the divide.  Move the decimal point on n1 by n2's scale.
             Remember, zeros on the end of num2 are wasted effort for dividing. */
            scale2 = n2.n_scale; // scale2 = n2->n_scale;
            n2ptr = n2.n_len + scale2 - 1; // n2ptr = (unsigned char *) n2.n_value+n2.n_len+scale2-1;
            while ((scale2 > 0) && (n2.n_value[n2ptr--] === 0)) {
                scale2--;
            }
            len1 = n1.n_len + scale2;
            scale1 = n1.n_scale - scale2;
            if (scale1 < scale) {
                extra = scale - scale1;
            }
            else {
                extra = 0;
            }
            // num1 = (unsigned char *) safe_emalloc (1, n1.n_len+n1.n_scale, extra+2):
            num1 = Libbcmath.safe_emalloc(1, n1.n_len + n1.n_scale, extra + 2);
            if (num1 === null) {
                Libbcmath.bc_out_of_memory();
            }
            // memset (num1, 0, n1->n_len+n1->n_scale+extra+2):
            Libbcmath.memset(num1, 0, 0, n1.n_len + n1.n_scale + extra + 2);
            // memcpy (num1+1, n1.n_value, n1.n_len+n1.n_scale):
            Libbcmath.memcpy(num1, 1, n1.n_value, 0, n1.n_len + n1.n_scale);
            // len2 = n2->n_len + scale2:
            len2 = n2.n_len + scale2;
            // num2 = (unsigned char *) safe_emalloc (1, len2, 1):
            num2 = Libbcmath.safe_emalloc(1, len2, 1);
            if (num2 === null) {
                Libbcmath.bc_out_of_memory();
            }
            // memcpy (num2, n2.n_value, len2):
            Libbcmath.memcpy(num2, 0, n2.n_value, 0, len2);
            // *(num2+len2) = 0:
            num2[len2] = 0;
            // n2ptr = num2:
            n2ptr = 0;
            // while (*n2ptr === 0):
            while (num2[n2ptr] === 0) {
                n2ptr++;
                len2--;
            }
            // Calculate the number of quotient digits.
            if (len2 > len1 + scale) {
                qdigits = scale + 1;
                zero = true;
            }
            else {
                zero = false;
                if (len2 > len1) {
                    qdigits = scale + 1; // One for the zero integer part.
                }
                else {
                    qdigits = len1 - len2 + scale + 1;
                }
            }
            // Allocate and zero the storage for the quotient.
            // qval = bc_new_num (qdigits-scale,scale);
            qval = Libbcmath.bc_new_num(qdigits - scale, scale);
            // memset (qval->n_value, 0, qdigits);
            Libbcmath.memset(qval.n_value, 0, 0, qdigits);
            // Allocate storage for the temporary storage mval.
            // mval = (unsigned char *) safe_emalloc (1, len2, 1);
            mval = Libbcmath.safe_emalloc(1, len2, 1);
            if (mval === null) {
                Libbcmath.bc_out_of_memory();
            }
            // Now for the full divide algorithm.
            if (!zero) { // Normalize
                // norm = Libbcmath.cint(10 / (Libbcmath.cint(n2.n_value[n2ptr]) + 1));
                // norm =  10 / ((int)*n2ptr + 1)
                norm = Math.floor(10 / (n2.n_value[n2ptr] + 1)); // norm =  10 / ((int)*n2ptr + 1);
                if (norm !== 1) {
                    // Libbcmath._one_mult(num1, len1+scale1+extra+1, norm, num1);
                    Libbcmath._one_mult(num1, 0, len1 + scale1 + extra + 1, norm, num1, 0);
                    // Libbcmath._one_mult(n2ptr, len2, norm, n2ptr);
                    Libbcmath._one_mult(n2.n_value, n2ptr, len2, norm, n2.n_value, n2ptr);
                    // @todo: Check: Is the pointer affected by the call? if so,
                    // maybe need to adjust points on return?
                }
                // Initialize divide loop.
                qdig = 0;
                if (len2 > len1) {
                    qptr = len2 - len1; // qptr = (unsigned char *) qval.n_value+len2-len1;
                }
                else {
                    qptr = 0; // qptr = (unsigned char *) qval.n_value;
                }
                // Loop
                while (qdig <= len1 + scale - len2) { // Calculate the quotient digit guess.
                    if (n2.n_value[n2ptr] === num1[qdig]) {
                        qguess = 9;
                    }
                    else {
                        qguess = Math.floor((num1[qdig] * 10 + num1[qdig + 1]) / n2.n_value[n2ptr]);
                    }
                    // Test qguess.
                    if (n2.n_value[n2ptr + 1] * qguess >
                        (num1[qdig] * 10 + num1[qdig + 1] - n2.n_value[n2ptr] * qguess) *
                            10 + num1[qdig + 2]) {
                        qguess--;
                        // And again.
                        if (n2.n_value[n2ptr + 1] * qguess >
                            (num1[qdig] * 10 + num1[qdig + 1] - n2.n_value[n2ptr] * qguess) *
                                10 + num1[qdig + 2]) {
                            qguess--;
                        }
                    }
                    // Multiply and subtract.
                    borrow = 0;
                    if (qguess !== 0) {
                        mval[0] = 0; //* mval = 0; // @CHECK is this to fix ptr2 < 0?
                        // _one_mult (n2ptr, len2, qguess, mval+1); // @CHECK
                        Libbcmath._one_mult(n2.n_value, n2ptr, len2, qguess, mval, 1);
                        ptr1 = qdig + len2; // (unsigned char *) num1+qdig+len2;
                        ptr2 = len2; // (unsigned char *) mval+len2;
                        // @todo: CHECK: Does a negative pointer return null?
                        // ptr2 can be < 0 here as ptr1 = len2, thus count < len2+1 will always fail ?
                        for (count = 0; count < len2 + 1; count++) {
                            if (ptr2 < 0) {
                                // val = Libbcmath.cint(num1[ptr1]) - 0 - borrow;
                                // val = (int) *ptr1 - (int) *ptr2-- - borrow;
                                val = num1[ptr1] - 0 - borrow; // val = (int) *ptr1 - (int) *ptr2-- - borrow;
                            }
                            else {
                                // val = Libbcmath.cint(num1[ptr1]) - Libbcmath.cint(mval[ptr2--]) - borrow;
                                // val = (int) *ptr1 - (int) *ptr2-- - borrow;
                                // val = (int) *ptr1 - (int) *ptr2-- - borrow;
                                val = num1[ptr1] - mval[ptr2--] - borrow;
                            }
                            if (val < 0) {
                                val += 10;
                                borrow = 1;
                            }
                            else {
                                borrow = 0;
                            }
                            num1[ptr1--] = val;
                        }
                    }
                    // Test for negative result.
                    if (borrow === 1) {
                        qguess--;
                        ptr1 = qdig + len2; // (unsigned char *) num1+qdig+len2;
                        ptr2 = len2 - 1; // (unsigned char *) n2ptr+len2-1;
                        carry = 0;
                        for (count = 0; count < len2; count++) {
                            if (ptr2 < 0) {
                                // val = Libbcmath.cint(num1[ptr1]) + 0 + carry;
                                // val = (int) *ptr1 + (int) *ptr2-- + carry;
                                // val = (int) *ptr1 + (int) *ptr2-- + carry;
                                val = num1[ptr1] + 0 + carry;
                            }
                            else {
                                // val = Libbcmath.cint(num1[ptr1]) + Libbcmath.cint(n2.n_value[ptr2--]) + carry;
                                // val = (int) *ptr1 + (int) *ptr2-- + carry;
                                // val = (int) *ptr1 + (int) *ptr2-- + carry;
                                val = num1[ptr1] + n2.n_value[ptr2--] + carry;
                            }
                            if (val > 9) {
                                val -= 10;
                                carry = 1;
                            }
                            else {
                                carry = 0;
                            }
                            num1[ptr1--] = val; //* ptr1-- = val;
                        }
                        if (carry === 1) {
                            // num1[ptr1] = Libbcmath.cint((num1[ptr1] + 1) % 10);
                            // *ptr1 = (*ptr1 + 1) % 10; // @CHECK
                            // *ptr1 = (*ptr1 + 1) % 10; // @CHECK
                            num1[ptr1] = (num1[ptr1] + 1) % 10;
                        }
                    }
                    // We now know the quotient digit.
                    qval.n_value[qptr++] = qguess; //* qptr++ =  qguess;
                    qdig++;
                }
            }
            // Clean up and return the number.
            qval.n_sign = (n1.n_sign === n2.n_sign ? Libbcmath.PLUS : Libbcmath.MINUS);
            if (Libbcmath.bc_is_zero(qval)) {
                qval.n_sign = Libbcmath.PLUS;
            }
            Libbcmath._bc_rm_leading_zeros(qval);
            return qval;
            // return 0;    // Everything is OK.
        },
        MUL_BASE_DIGITS: 80,
        MUL_SMALL_DIGITS: (80 / 4),
        // #define MUL_SMALL_DIGITS mul_base_digits/4
        /* The multiply routine.  N2 times N1 is put int PROD with the scale of
       the result being MIN(N2 scale+N1 scale, MAX (SCALE, N2 scale, N1 scale)).
       */
        /**
         * @param n1 bc_num
         * @param n2 bc_num
         * @param scale [int] optional
         */
        bc_multiply: function (n1, n2, scale) {
            var pval; // bc_num
            var len1, len2; // int
            var fullScale, prodScale; // int
            // Initialize things.
            len1 = n1.n_len + n1.n_scale;
            len2 = n2.n_len + n2.n_scale;
            fullScale = n1.n_scale + n2.n_scale;
            prodScale = Libbcmath.MIN(fullScale, Libbcmath.MAX(scale, Libbcmath.MAX(n1.n_scale, n2.n_scale)));
            // pval = Libbcmath.bc_init_num(); // allow pass by ref
            // Do the multiply
            pval = Libbcmath._bc_rec_mul(n1, len1, n2, len2, fullScale);
            // Assign to prod and clean up the number.
            pval.n_sign = (n1.n_sign === n2.n_sign ? Libbcmath.PLUS : Libbcmath.MINUS);
            // pval.n_value = pval.nPtr;
            pval.n_len = len2 + len1 + 1 - fullScale;
            pval.n_scale = prodScale;
            Libbcmath._bc_rm_leading_zeros(pval);
            if (Libbcmath.bc_is_zero(pval)) {
                pval.n_sign = Libbcmath.PLUS;
            }
            // bc_free_num (prod);
            return pval;
        },
        new_sub_num: function (length, scale, value, ptr) {
            if (ptr === void 0) { ptr = 0; }
            var temp = new Libbcmath.bc_num(); // eslint-disable-line new-cap
            temp.n_sign = Libbcmath.PLUS;
            temp.n_len = length;
            temp.n_scale = scale;
            temp.n_value = Libbcmath.safe_emalloc(1, length + scale, 0);
            Libbcmath.memcpy(temp.n_value, 0, value, ptr, length + scale);
            return temp;
        },
        _bc_simp_mul: function (n1, n1len, n2, n2len, fullScale) {
            var prod; // bc_num
            var n1ptr, n2ptr, pvptr; // char *n1ptr, *n2ptr, *pvptr;
            var n1end, n2end; // char *n1end, *n2end;        // To the end of n1 and n2.
            var indx, sum, prodlen; // int indx, sum, prodlen;
            prodlen = n1len + n2len + 1;
            prod = Libbcmath.bc_new_num(prodlen, 0);
            n1end = n1len - 1; // (char *) (n1->n_value + n1len - 1);
            n2end = n2len - 1; // (char *) (n2->n_value + n2len - 1);
            pvptr = prodlen - 1; // (char *) ((*prod)->n_value + prodlen - 1);
            sum = 0;
            // Here is the loop...
            for (indx = 0; indx < prodlen - 1; indx++) {
                // (char *) (n1end - MAX(0, indx-n2len+1));
                n1ptr = n1end - Libbcmath.MAX(0, indx - n2len + 1);
                // (char *) (n2end - MIN(indx, n2len-1));
                n2ptr = n2end - Libbcmath.MIN(indx, n2len - 1);
                while ((n1ptr >= 0) && (n2ptr <= n2end)) {
                    // sum += *n1ptr-- * *n2ptr++;
                    sum += n1.n_value[n1ptr--] * n2.n_value[n2ptr++];
                }
                //* pvptr-- = sum % BASE;
                prod.n_value[pvptr--] = Math.floor(sum % Libbcmath.BASE);
                sum = Math.floor(sum / Libbcmath.BASE); // sum = sum / BASE;
            }
            prod.n_value[pvptr] = sum; //* pvptr = sum;
            return prod;
        },
        /* A special adder/subtractor for the recursive divide and conquer
           multiply algorithm.  Note: if sub is called, accum must
           be larger that what is being subtracted.  Also, accum and val
           must have n_scale = 0.  (e.g. they must look like integers. *) */
        _bc_shift_addsub: function (accum, val, shift, sub) {
            var accp, valp; // signed char *accp, *valp;
            var count, carry; // int  count, carry;
            count = val.n_len;
            if (val.n_value[0] === 0) {
                count--;
            }
            // assert (accum->n_len+accum->n_scale >= shift+count);
            if (accum.n_len + accum.n_scale < shift + count) {
                throw new Error('len + scale < shift + count'); // ?? I think that's what assert does :)
            }
            // Set up pointers and others
            // (signed char *)(accum->n_value + accum->n_len + accum->n_scale - shift - 1);
            accp = accum.n_len + accum.n_scale - shift - 1;
            valp = val.n_len - 1; // (signed char *)(val->n_value + val->n_len - 1);
            carry = 0;
            if (sub) {
                // Subtraction, carry is really borrow.
                while (count--) {
                    accum.n_value[accp] -= val.n_value[valp--] + carry; //* accp -= *valp-- + carry;
                    if (accum.n_value[accp] < 0) { // if (*accp < 0)
                        carry = 1;
                        accum.n_value[accp--] += Libbcmath.BASE; //* accp-- += BASE;
                    }
                    else {
                        carry = 0;
                        accp--;
                    }
                }
                while (carry) {
                    accum.n_value[accp] -= carry; //* accp -= carry;
                    if (accum.n_value[accp] < 0) { // if (*accp < 0)
                        accum.n_value[accp--] += Libbcmath.BASE; //    *accp-- += BASE;
                    }
                    else {
                        carry = 0;
                    }
                }
            }
            else {
                // Addition
                while (count--) {
                    accum.n_value[accp] += val.n_value[valp--] + carry; //* accp += *valp-- + carry;
                    if (accum.n_value[accp] > (Libbcmath.BASE - 1)) { // if (*accp > (BASE-1))
                        carry = 1;
                        accum.n_value[accp--] -= Libbcmath.BASE; //* accp-- -= BASE;
                    }
                    else {
                        carry = 0;
                        accp--;
                    }
                }
                while (carry) {
                    accum.n_value[accp] += carry; //* accp += carry;
                    if (accum.n_value[accp] > (Libbcmath.BASE - 1)) { // if (*accp > (BASE-1))
                        accum.n_value[accp--] -= Libbcmath.BASE; //* accp-- -= BASE;
                    }
                    else {
                        carry = 0;
                    }
                }
            }
            return true; // accum is the pass-by-reference return
        },
        /* Recursive divide and conquer multiply algorithm.
           based on
           Let u = u0 + u1*(b^n)
           Let v = v0 + v1*(b^n)
           Then uv = (B^2n+B^n)*u1*v1 + B^n*(u1-u0)*(v0-v1) + (B^n+1)*u0*v0
    
           B is the base of storage, number of digits in u1,u0 close to equal.
        */
        _bc_rec_mul: function (u, ulen, v, vlen, fullScale) {
            var prod; // @return
            var u0, u1, v0, v1; // bc_num
            // var u0len,
            // var v0len // int
            var m1, m2, m3, d1, d2; // bc_num
            var n, prodlen, m1zero; // int
            var d1len, d2len; // int
            // Base case?
            if ((ulen + vlen) < Libbcmath.MUL_BASE_DIGITS ||
                ulen < Libbcmath.MUL_SMALL_DIGITS ||
                vlen < Libbcmath.MUL_SMALL_DIGITS) {
                return Libbcmath._bc_simp_mul(u, ulen, v, vlen, fullScale);
            }
            // Calculate n -- the u and v split point in digits.
            n = Math.floor((Libbcmath.MAX(ulen, vlen) + 1) / 2);
            // Split u and v.
            if (ulen < n) {
                u1 = Libbcmath.bc_init_num(); // u1 = bc_copy_num (BCG(_zero_));
                u0 = Libbcmath.new_sub_num(ulen, 0, u.n_value);
            }
            else {
                u1 = Libbcmath.new_sub_num(ulen - n, 0, u.n_value);
                u0 = Libbcmath.new_sub_num(n, 0, u.n_value, ulen - n);
            }
            if (vlen < n) {
                v1 = Libbcmath.bc_init_num(); // bc_copy_num (BCG(_zero_));
                v0 = Libbcmath.new_sub_num(vlen, 0, v.n_value);
            }
            else {
                v1 = Libbcmath.new_sub_num(vlen - n, 0, v.n_value);
                v0 = Libbcmath.new_sub_num(n, 0, v.n_value, vlen - n);
            }
            Libbcmath._bc_rm_leading_zeros(u1);
            Libbcmath._bc_rm_leading_zeros(u0);
            // var u0len = u0.n_len
            Libbcmath._bc_rm_leading_zeros(v1);
            Libbcmath._bc_rm_leading_zeros(v0);
            // var v0len = v0.n_len
            m1zero = Libbcmath.bc_is_zero(u1) || Libbcmath.bc_is_zero(v1);
            // Calculate sub results ...
            d1 = Libbcmath.bc_init_num(); // needed?
            d2 = Libbcmath.bc_init_num(); // needed?
            d1 = Libbcmath.bc_sub(u1, u0, 0);
            d1len = d1.n_len;
            d2 = Libbcmath.bc_sub(v0, v1, 0);
            d2len = d2.n_len;
            // Do recursive multiplies and shifted adds.
            if (m1zero) {
                m1 = Libbcmath.bc_init_num(); // bc_copy_num (BCG(_zero_));
            }
            else {
                // m1 = Libbcmath.bc_init_num(); //allow pass-by-ref
                m1 = Libbcmath._bc_rec_mul(u1, u1.n_len, v1, v1.n_len, 0);
            }
            if (Libbcmath.bc_is_zero(d1) || Libbcmath.bc_is_zero(d2)) {
                m2 = Libbcmath.bc_init_num(); // bc_copy_num (BCG(_zero_));
            }
            else {
                // m2 = Libbcmath.bc_init_num(); //allow pass-by-ref
                m2 = Libbcmath._bc_rec_mul(d1, d1len, d2, d2len, 0);
            }
            if (Libbcmath.bc_is_zero(u0) || Libbcmath.bc_is_zero(v0)) {
                m3 = Libbcmath.bc_init_num(); // bc_copy_num (BCG(_zero_));
            }
            else {
                // m3 = Libbcmath.bc_init_num(); //allow pass-by-ref
                m3 = Libbcmath._bc_rec_mul(u0, u0.n_len, v0, v0.n_len, 0);
            }
            // Initialize product
            prodlen = ulen + vlen + 1;
            prod = Libbcmath.bc_new_num(prodlen, 0);
            if (!m1zero) {
                Libbcmath._bc_shift_addsub(prod, m1, 2 * n, 0);
                Libbcmath._bc_shift_addsub(prod, m1, n, 0);
            }
            Libbcmath._bc_shift_addsub(prod, m3, n, 0);
            Libbcmath._bc_shift_addsub(prod, m3, 0, 0);
            Libbcmath._bc_shift_addsub(prod, m2, n, d1.n_sign !== d2.n_sign);
            return prod;
            // Now clean up!
            // bc_free_num (&u1);
            // bc_free_num (&u0);
            // bc_free_num (&v1);
            // bc_free_num (&m1);
            // bc_free_num (&v0);
            // bc_free_num (&m2);
            // bc_free_num (&m3);
            // bc_free_num (&d1);
            // bc_free_num (&d2);
        },
        /**
         *
         * @param {bc_num} n1
         * @param {bc_num} n2
         * @param {boolean} useSign
         * @param {boolean} ignoreLast
         * @return -1, 0, 1 (see bc_compare)
         */
        _bc_do_compare: function (n1, n2, useSign, ignoreLast) {
            var n1ptr, n2ptr; // int
            var count; // int
            // First, compare signs.
            if (useSign && (n1.n_sign !== n2.n_sign)) {
                if (n1.n_sign === Libbcmath.PLUS) {
                    return (1); // Positive N1 > Negative N2
                }
                else {
                    return (-1); // Negative N1 < Positive N1
                }
            }
            // Now compare the magnitude.
            if (n1.n_len !== n2.n_len) {
                if (n1.n_len > n2.n_len) { // Magnitude of n1 > n2.
                    if (!useSign || (n1.n_sign === Libbcmath.PLUS)) {
                        return (1);
                    }
                    else {
                        return (-1);
                    }
                }
                else { // Magnitude of n1 < n2.
                    if (!useSign || (n1.n_sign === Libbcmath.PLUS)) {
                        return (-1);
                    }
                    else {
                        return (1);
                    }
                }
            }
            /* If we get here, they have the same number of integer digits.
           check the integer part and the equal length part of the fraction. */
            count = n1.n_len + Math.min(n1.n_scale, n2.n_scale);
            n1ptr = 0;
            n2ptr = 0;
            while ((count > 0) && (n1.n_value[n1ptr] === n2.n_value[n2ptr])) {
                n1ptr++;
                n2ptr++;
                count--;
            }
            if (ignoreLast && (count === 1) && (n1.n_scale === n2.n_scale)) {
                return (0);
            }
            if (count !== 0) {
                if (n1.n_value[n1ptr] > n2.n_value[n2ptr]) { // Magnitude of n1 > n2.
                    if (!useSign || n1.n_sign === Libbcmath.PLUS) {
                        return (1);
                    }
                    else {
                        return (-1);
                    }
                }
                else { // Magnitude of n1 < n2.
                    if (!useSign || n1.n_sign === Libbcmath.PLUS) {
                        return (-1);
                    }
                    else {
                        return (1);
                    }
                }
            }
            // They are equal up to the last part of the equal part of the fraction.
            if (n1.n_scale !== n2.n_scale) {
                if (n1.n_scale > n2.n_scale) {
                    for (count = (n1.n_scale - n2.n_scale); count > 0; count--) {
                        if (n1.n_value[n1ptr++] !== 0) { // Magnitude of n1 > n2.
                            if (!useSign || n1.n_sign === Libbcmath.PLUS) {
                                return (1);
                            }
                            else {
                                return (-1);
                            }
                        }
                    }
                }
                else {
                    for (count = (n2.n_scale - n1.n_scale); count > 0; count--) {
                        if (n2.n_value[n2ptr++] !== 0) { // Magnitude of n1 < n2.
                            if (!useSign || n1.n_sign === Libbcmath.PLUS) {
                                return (-1);
                            }
                            else {
                                return (1);
                            }
                        }
                    }
                }
            }
            // They must be equal!
            return (0);
        },
        /* Here is the full subtract routine that takes care of negative numbers.
       N2 is subtracted from N1 and the result placed in RESULT.  SCALE_MIN
       is the minimum scale for the result. */
        bc_sub: function (n1, n2, scaleMin) {
            var diff; // bc_num
            var cmpRes, resScale; // int
            if (n1.n_sign !== n2.n_sign) {
                diff = Libbcmath._bc_do_add(n1, n2, scaleMin);
                diff.n_sign = n1.n_sign;
            }
            else { // subtraction must be done.
                // Compare magnitudes.
                cmpRes = Libbcmath._bc_do_compare(n1, n2, false, false);
                switch (cmpRes) {
                    case -1:
                        // n1 is less than n2, subtract n1 from n2.
                        diff = Libbcmath._bc_do_sub(n2, n1, scaleMin);
                        diff.n_sign = (n2.n_sign === Libbcmath.PLUS ? Libbcmath.MINUS : Libbcmath.PLUS);
                        break;
                    case 0:
                        // They are equal! return zero!
                        resScale = Libbcmath.MAX(scaleMin, Libbcmath.MAX(n1.n_scale, n2.n_scale));
                        diff = Libbcmath.bc_new_num(1, resScale);
                        Libbcmath.memset(diff.n_value, 0, 0, resScale + 1);
                        break;
                    case 1:
                        // n2 is less than n1, subtract n2 from n1.
                        diff = Libbcmath._bc_do_sub(n1, n2, scaleMin);
                        diff.n_sign = n1.n_sign;
                        break;
                }
            }
            // Clean up and return.
            // bc_free_num (result);
            //* result = diff;
            return diff;
        },
        _bc_do_add: function (n1, n2, scaleMin) {
            var sum; // bc_num
            var sumScale, sumDigits; // int
            var n1ptr, n2ptr, sumptr; // int
            var carry, n1bytes, n2bytes; // int
            var tmp; // int
            // Prepare sum.
            sumScale = Libbcmath.MAX(n1.n_scale, n2.n_scale);
            sumDigits = Libbcmath.MAX(n1.n_len, n2.n_len) + 1;
            sum = Libbcmath.bc_new_num(sumDigits, Libbcmath.MAX(sumScale, scaleMin));
            // Start with the fraction part.  Initialize the pointers.
            n1bytes = n1.n_scale;
            n2bytes = n2.n_scale;
            n1ptr = (n1.n_len + n1bytes - 1);
            n2ptr = (n2.n_len + n2bytes - 1);
            sumptr = (sumScale + sumDigits - 1);
            // Add the fraction part.  First copy the longer fraction
            // (ie when adding 1.2345 to 1 we know .2345 is correct already) .
            if (n1bytes !== n2bytes) {
                if (n1bytes > n2bytes) {
                    // n1 has more dp then n2
                    while (n1bytes > n2bytes) {
                        sum.n_value[sumptr--] = n1.n_value[n1ptr--];
                        // *sumptr-- = *n1ptr--;
                        n1bytes--;
                    }
                }
                else {
                    // n2 has more dp then n1
                    while (n2bytes > n1bytes) {
                        sum.n_value[sumptr--] = n2.n_value[n2ptr--];
                        // *sumptr-- = *n2ptr--;
                        n2bytes--;
                    }
                }
            }
            // Now add the remaining fraction part and equal size integer parts.
            n1bytes += n1.n_len;
            n2bytes += n2.n_len;
            carry = 0;
            while ((n1bytes > 0) && (n2bytes > 0)) {
                // add the two numbers together
                tmp = n1.n_value[n1ptr--] + n2.n_value[n2ptr--] + carry;
                // *sumptr = *n1ptr-- + *n2ptr-- + carry;
                // check if they are >= 10 (impossible to be more then 18)
                if (tmp >= Libbcmath.BASE) {
                    carry = 1;
                    tmp -= Libbcmath.BASE; // yep, subtract 10, add a carry
                }
                else {
                    carry = 0;
                }
                sum.n_value[sumptr] = tmp;
                sumptr--;
                n1bytes--;
                n2bytes--;
            }
            // Now add carry the [rest of the] longer integer part.
            if (n1bytes === 0) {
                // n2 is a bigger number then n1
                while (n2bytes-- > 0) {
                    tmp = n2.n_value[n2ptr--] + carry;
                    // *sumptr = *n2ptr-- + carry;
                    if (tmp >= Libbcmath.BASE) {
                        carry = 1;
                        tmp -= Libbcmath.BASE;
                    }
                    else {
                        carry = 0;
                    }
                    sum.n_value[sumptr--] = tmp;
                }
            }
            else {
                // n1 is bigger then n2..
                while (n1bytes-- > 0) {
                    tmp = n1.n_value[n1ptr--] + carry;
                    // *sumptr = *n1ptr-- + carry;
                    if (tmp >= Libbcmath.BASE) {
                        carry = 1;
                        tmp -= Libbcmath.BASE;
                    }
                    else {
                        carry = 0;
                    }
                    sum.n_value[sumptr--] = tmp;
                }
            }
            // Set final carry.
            if (carry === 1) {
                sum.n_value[sumptr] += 1;
                // *sumptr += 1;
            }
            // Adjust sum and return.
            Libbcmath._bc_rm_leading_zeros(sum);
            return sum;
        },
        /**
         * Perform a subtraction
         *
         * Perform subtraction: N2 is subtracted from N1 and the value is
         *  returned.  The signs of N1 and N2 are ignored.  Also, N1 is
         *  assumed to be larger than N2.  SCALE_MIN is the minimum scale
         *  of the result.
         *
         * Basic school maths says to subtract 2 numbers..
         * 1. make them the same length, the decimal places, and the integer part
         * 2. start from the right and subtract the two numbers from each other
         * 3. if the sum of the 2 numbers < 0, carry -1 to the next set and add 10
         * (ie 18 > carry 1 becomes 8). thus 0.9 + 0.9 = 1.8
         *
         * @param {bc_num} n1
         * @param {bc_num} n2
         * @param {int} scaleMin
         * @return bc_num
         */
        _bc_do_sub: function (n1, n2, scaleMin) {
            var diff; // bc_num
            var diffScale, diffLen; // int
            var minScale, minLen; // int
            var n1ptr, n2ptr, diffptr; // int
            var borrow, count, val; // int
            // Allocate temporary storage.
            diffLen = Libbcmath.MAX(n1.n_len, n2.n_len);
            diffScale = Libbcmath.MAX(n1.n_scale, n2.n_scale);
            minLen = Libbcmath.MIN(n1.n_len, n2.n_len);
            minScale = Libbcmath.MIN(n1.n_scale, n2.n_scale);
            diff = Libbcmath.bc_new_num(diffLen, Libbcmath.MAX(diffScale, scaleMin));
            /* Not needed?
            // Zero extra digits made by scaleMin.
            if (scaleMin > diffScale) {
              diffptr = (char *) (diff->n_value + diffLen + diffScale);
              for (count = scaleMin - diffScale; count > 0; count--) {
                *diffptr++ = 0;
              }
            }
            */
            // Initialize the subtract.
            n1ptr = (n1.n_len + n1.n_scale - 1);
            n2ptr = (n2.n_len + n2.n_scale - 1);
            diffptr = (diffLen + diffScale - 1);
            // Subtract the numbers.
            borrow = 0;
            // Take care of the longer scaled number.
            if (n1.n_scale !== minScale) {
                // n1 has the longer scale
                for (count = n1.n_scale - minScale; count > 0; count--) {
                    diff.n_value[diffptr--] = n1.n_value[n1ptr--];
                    // *diffptr-- = *n1ptr--;
                }
            }
            else {
                // n2 has the longer scale
                for (count = n2.n_scale - minScale; count > 0; count--) {
                    val = 0 - n2.n_value[n2ptr--] - borrow;
                    // val = - *n2ptr-- - borrow;
                    if (val < 0) {
                        val += Libbcmath.BASE;
                        borrow = 1;
                    }
                    else {
                        borrow = 0;
                    }
                    diff.n_value[diffptr--] = val;
                    //* diffptr-- = val;
                }
            }
            // Now do the equal length scale and integer parts.
            for (count = 0; count < minLen + minScale; count++) {
                val = n1.n_value[n1ptr--] - n2.n_value[n2ptr--] - borrow;
                // val = *n1ptr-- - *n2ptr-- - borrow;
                if (val < 0) {
                    val += Libbcmath.BASE;
                    borrow = 1;
                }
                else {
                    borrow = 0;
                }
                diff.n_value[diffptr--] = val;
                //* diffptr-- = val;
            }
            // If n1 has more digits then n2, we now do that subtract.
            if (diffLen !== minLen) {
                for (count = diffLen - minLen; count > 0; count--) {
                    val = n1.n_value[n1ptr--] - borrow;
                    // val = *n1ptr-- - borrow;
                    if (val < 0) {
                        val += Libbcmath.BASE;
                        borrow = 1;
                    }
                    else {
                        borrow = 0;
                    }
                    diff.n_value[diffptr--] = val;
                }
            }
            // Clean up and return.
            Libbcmath._bc_rm_leading_zeros(diff);
            return diff;
        },
        /**
         *
         * @param {int} length
         * @param {int} scale
         * @return bc_num
         */
        bc_new_num: function (length, scale) {
            var temp; // bc_num
            temp = new Libbcmath.bc_num(); // eslint-disable-line new-cap
            temp.n_sign = Libbcmath.PLUS;
            temp.n_len = length;
            temp.n_scale = scale;
            temp.n_value = Libbcmath.safe_emalloc(1, length + scale, 0);
            Libbcmath.memset(temp.n_value, 0, 0, length + scale);
            return temp;
        },
        safe_emalloc: function (size, len, extra) {
            return Array((size * len) + extra);
        },
        /**
         * Create a new number
         */
        bc_init_num: function () {
            return new Libbcmath.bc_new_num(1, 0); // eslint-disable-line new-cap
        },
        _bc_rm_leading_zeros: function (num) {
            // We can move n_value to point to the first non zero digit!
            while ((num.n_value[0] === 0) && (num.n_len > 1)) {
                num.n_value.shift();
                num.n_len--;
            }
        },
        /**
         * Convert to bc_num detecting scale
         */
        php_str2num: function (str) {
            var p;
            p = str.indexOf('.');
            if (p === -1) {
                return Libbcmath.bc_str2num(str, 0);
            }
            else {
                return Libbcmath.bc_str2num(str, (str.length - p));
            }
        },
        CH_VAL: function (c) {
            return c - '0'; // ??
        },
        BCD_CHAR: function (d) {
            return d + '0'; // ??
        },
        isdigit: function (c) {
            return isNaN(parseInt(c, 10));
        },
        bc_str2num: function (strIn, scale) {
            var str, num, ptr, digits, strscale, zeroInt, nptr;
            // remove any non-expected characters
            // Check for valid number and count digits.
            str = strIn.split(''); // convert to array
            ptr = 0; // str
            digits = 0;
            strscale = 0;
            zeroInt = false;
            if ((str[ptr] === '+') || (str[ptr] === '-')) {
                ptr++; // Sign
            }
            while (str[ptr] === '0') {
                ptr++; // Skip leading zeros.
            }
            // while (Libbcmath.isdigit(str[ptr])) {
            while ((str[ptr]) % 1 === 0) { // Libbcmath.isdigit(str[ptr])) {
                ptr++;
                digits++; // digits
            }
            if (str[ptr] === '.') {
                ptr++; // decimal point
            }
            // while (Libbcmath.isdigit(str[ptr])) {
            while ((str[ptr]) % 1 === 0) { // Libbcmath.isdigit(str[ptr])) {
                ptr++;
                strscale++; // digits
            }
            if ((str[ptr]) || (digits + strscale === 0)) {
                // invalid number, return 0
                return Libbcmath.bc_init_num();
                //* num = bc_copy_num (BCG(_zero_));
            }
            // Adjust numbers and allocate storage and initialize fields.
            strscale = Libbcmath.MIN(strscale, scale);
            if (digits === 0) {
                zeroInt = true;
                digits = 1;
            }
            num = Libbcmath.bc_new_num(digits, strscale);
            // Build the whole number.
            ptr = 0; // str
            if (str[ptr] === '-') {
                num.n_sign = Libbcmath.MINUS;
                // (*num)->n_sign = MINUS;
                ptr++;
            }
            else {
                num.n_sign = Libbcmath.PLUS;
                // (*num)->n_sign = PLUS;
                if (str[ptr] === '+') {
                    ptr++;
                }
            }
            while (str[ptr] === '0') {
                ptr++; // Skip leading zeros.
            }
            nptr = 0; // (*num)->n_value;
            if (zeroInt) {
                num.n_value[nptr++] = 0;
                digits = 0;
            }
            for (; digits > 0; digits--) {
                num.n_value[nptr++] = Libbcmath.CH_VAL(str[ptr++]);
                //* nptr++ = CH_VAL(*ptr++);
            }
            // Build the fractional part.
            if (strscale > 0) {
                ptr++; // skip the decimal point!
                for (; strscale > 0; strscale--) {
                    num.n_value[nptr++] = Libbcmath.CH_VAL(str[ptr++]);
                }
            }
            return num;
        },
        cint: function (v) {
            if (typeof v === 'undefined') {
                v = 0;
            }
            var x = parseInt(v, 10);
            if (isNaN(x)) {
                x = 0;
            }
            return x;
        },
        /**
         * Basic min function
         * @param {int} a
         * @param {int} b
         */
        MIN: function (a, b) {
            return ((a > b) ? b : a);
        },
        /**
         * Basic max function
         * @param {int} a
         * @param {int} b
         */
        MAX: function (a, b) {
            return ((a > b) ? a : b);
        },
        /**
         * Basic odd function
         * @param {int} a
         */
        ODD: function (a) {
            return (a & 1);
        },
        /**
         * replicate c function
         * @param {array} r     return (by reference)
         * @param {int} ptr
         * @param {string} chr    char to fill
         * @param {int} len       length to fill
         */
        memset: function (r, ptr, chr, len) {
            var i;
            for (i = 0; i < len; i++) {
                r[ptr + i] = chr;
            }
        },
        /**
         * Replacement c function
         * Obviously can't work like c does, so we've added an "offset"
         * param so you could do memcpy(dest+1, src, len) as memcpy(dest, 1, src, len)
         * Also only works on arrays
         */
        memcpy: function (dest, ptr, src, srcptr, len) {
            var i;
            for (i = 0; i < len; i++) {
                dest[ptr + i] = src[srcptr + i];
            }
            return true;
        },
        /**
         * Determine if the number specified is zero or not
         * @param {bc_num} num    number to check
         * @return boolean      true when zero, false when not zero.
         */
        bc_is_zero: function (num) {
            var count; // int
            var nptr; // int
            // Quick check.
            // if (num === BCG(_zero_)) return TRUE;
            // Initialize
            count = num.n_len + num.n_scale;
            nptr = 0; // num->n_value;
            // The check
            while ((count > 0) && (num.n_value[nptr++] === 0)) {
                count--;
            }
            if (count !== 0) {
                return false;
            }
            else {
                return true;
            }
        },
        bc_out_of_memory: function () {
            throw new Error('(BC) Out of memory');
        }
    };
    return Libbcmath;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2JjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL19oZWxwZXJzL19iYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRztJQUMzQixtREFBbUQ7SUFDbkQsc0VBQXNFO0lBQ3RFLG9EQUFvRDtJQUNwRCwrQkFBK0I7SUFDL0Isc0NBQXNDO0lBQ3RDLG1CQUFtQjtJQUVuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUVILElBQUksU0FBUyxHQUFHO1FBQ2QsSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxFQUFFO1FBQ1IsdUJBQXVCO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBQ1IsZ0JBQWdCO1FBQ2hCOztXQUVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUEsQ0FBQyxPQUFPO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBLENBQUMsdURBQXVEO1lBQ3pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBLENBQUMsc0RBQXNEO1lBQ3hFLHNFQUFzRTtZQUN0RSw0REFBNEQ7WUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUEsQ0FBQyx1Q0FBdUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUE7Z0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUUzQiwyREFBMkQ7Z0JBQzNELENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUs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