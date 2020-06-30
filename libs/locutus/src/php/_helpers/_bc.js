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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2JjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9faGVscGVycy9fYmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUc7SUFDM0IsbURBQW1EO0lBQ25ELHNFQUFzRTtJQUN0RSxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLHNDQUFzQztJQUN0QyxtQkFBbUI7SUFFbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFFSCxJQUFJLFNBQVMsR0FBRztRQUNkLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLHVCQUF1QjtRQUN2QixLQUFLLEVBQUUsQ0FBQztRQUNSLGdCQUFnQjtRQUNoQjs7V0FFRztRQUNILE1BQU0sRUFBRTtZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBLENBQUMsT0FBTztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQSxDQUFDLHVEQUF1RDtZQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQSxDQUFDLHNEQUFzRDtZQUN4RSxzRUFBc0U7WUFDdEUsNERBQTREO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBLENBQUMsdUNBQXVDO1lBQzNELElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ2QsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFBO2dCQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFFM0IsMkRBQTJEO2dCQUMzRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBRXJGLGtEQUFrRDtnQkFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtvQkFDcEIsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2lCQUNoRDtnQkFDRCxPQUFPLENBQUMsQ0FBQTtZQUNWLENBQUMsQ0FBQTtRQUNILENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUTtZQUNoQyxJQUFJLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFBO1lBRXpCLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFO2dCQUMzQixHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUM1QyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUE7YUFDdkI7aUJBQU0sRUFBRSw0QkFBNEI7Z0JBQ25DLE1BQU0sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBLENBQUMsc0JBQXNCO2dCQUM5RSxRQUFRLE1BQU0sRUFBRTtvQkFDZCxLQUFLLENBQUMsQ0FBQzt3QkFDTCwyQ0FBMkM7d0JBQzNDLEdBQUcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7d0JBQzVDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQTt3QkFDdEIsTUFBSztvQkFFUCxLQUFLLENBQUM7d0JBQ0osc0RBQXNEO3dCQUN0RCxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO3dCQUN6RSxHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7d0JBQ3ZDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTt3QkFDakQsTUFBSztvQkFFUCxLQUFLLENBQUM7d0JBQ0osMkNBQTJDO3dCQUMzQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUM1QyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUE7aUJBQ3pCO2FBQ0Y7WUFDRCxPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQzFCLE9BQU8sU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN0RCxDQUFDO1FBRUQsU0FBUyxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJO1lBQ3ZELElBQUksS0FBSyxFQUFFLEtBQUssQ0FBQSxDQUFDLE1BQU07WUFDdkIsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFBLENBQUMsZUFBZTtZQUM5QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDLDRCQUE0QjthQUNsRTtpQkFBTTtnQkFDTCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7aUJBQy9FO3FCQUFNLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUMseUNBQXlDO29CQUNoRSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQyw0Q0FBNEM7b0JBQ25FLEtBQUssR0FBRyxDQUFDLENBQUE7b0JBRVQsT0FBTyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ2pCLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFBLENBQUMsbUNBQW1DO3dCQUN2RSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQSxDQUFDLHdDQUF3Qzt3QkFDaEYsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLHNDQUFzQztxQkFDbEY7b0JBRUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO3dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7cUJBQ3JCO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDO1FBRUQsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLO1lBQ2hDLDRCQUE0QjtZQUM1QixJQUFJLElBQUksQ0FBQSxDQUFDLFNBQVM7WUFDbEIsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFBLENBQUMsU0FBUztZQUN4QixJQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQSxDQUFDLGVBQWU7WUFDM0MsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFBLENBQUMsTUFBTTtZQUN0QixJQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFBLENBQUMsTUFBTTtZQUNwRCxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQSxDQUFDLE1BQU07WUFDdEMsSUFBSSxJQUFJLENBQUEsQ0FBQyxTQUFTO1lBQ2xCLElBQUksSUFBSSxDQUFBLENBQUMsT0FBTztZQUNoQixJQUFJLElBQUksQ0FBQSxDQUFDLE1BQU07WUFDZix5Q0FBeUM7WUFDekMsNENBQTRDO1lBQzVDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNWO1lBRUQsaURBQWlEO1lBQ2pELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUN0QztZQUVEOzs7Ozs7Y0FNRTtZQUVGLG9EQUFvRDtZQUNwRCx1REFBdUQ7WUFDdkQsMkNBQTJDO1lBQzNDLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3pDLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQyx3Q0FBd0M7b0JBQ3JGLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDMUUsOENBQThDO29CQUM5QyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ2xELDJFQUEyRTtvQkFDM0UsU0FBUyxDQUFDLE1BQU0sQ0FDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FDNUUsQ0FBQTtvQkFDRCwyREFBMkQ7b0JBQzNELGVBQWU7aUJBQ2hCO2FBQ0Y7WUFFRDtrRkFDc0U7WUFDdEUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUEsQ0FBQyx3QkFBd0I7WUFDNUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQSxDQUFDLDBEQUEwRDtZQUN4RixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNsRCxNQUFNLEVBQUUsQ0FBQTthQUNUO1lBRUQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtZQUM1QixJQUFJLE1BQU0sR0FBRyxLQUFLLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFBO2FBQ3ZCO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxDQUFDLENBQUE7YUFDVjtZQUVELDJFQUEyRTtZQUMzRSxJQUFJLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNsRSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2FBQzdCO1lBQ0QsbURBQW1EO1lBQ25ELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMvRCxvREFBb0Q7WUFDcEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9ELDZCQUE2QjtZQUM3QixJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7WUFDeEIsc0RBQXNEO1lBQ3RELElBQUksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTthQUM3QjtZQUNELG1DQUFtQztZQUNuQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUMsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZCxnQkFBZ0I7WUFDaEIsS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUNULHdCQUF3QjtZQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFBO2dCQUNQLElBQUksRUFBRSxDQUFBO2FBQ1A7WUFFRCwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssRUFBRTtnQkFDdkIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7Z0JBQ25CLElBQUksR0FBRyxJQUFJLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsS0FBSyxDQUFBO2dCQUNaLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtvQkFDZixPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUFDLGlDQUFpQztpQkFDdEQ7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtpQkFDbEM7YUFDRjtZQUVELGtEQUFrRDtZQUNsRCwyQ0FBMkM7WUFDM0MsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNuRCxzQ0FBc0M7WUFDdEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDM0MsbURBQW1EO1lBQ3JELHNEQUFzRDtZQUN0RCxJQUFJLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUE7YUFDN0I7WUFFRCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFlBQVk7Z0JBQ3ZCLHVFQUF1RTtnQkFDdkUsaUNBQWlDO2dCQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxrQ0FBa0M7Z0JBQ2xGLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCw4REFBOEQ7b0JBQzlELFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDdEUsaURBQWlEO29CQUNqRCxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDckUsNERBQTREO29CQUM1RCx5Q0FBeUM7aUJBQzFDO2dCQUVELDBCQUEwQjtnQkFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQTtnQkFDUixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7b0JBQ2YsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUEsQ0FBQyxtREFBbUQ7aUJBQ3ZFO3FCQUFNO29CQUNMLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQyx5Q0FBeUM7aUJBQ25EO2dCQUVELE9BQU87Z0JBQ1AsT0FBTyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsRUFBRSxzQ0FBc0M7b0JBQzFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3BDLE1BQU0sR0FBRyxDQUFDLENBQUE7cUJBQ1g7eUJBQU07d0JBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7cUJBQzVFO29CQUNELGVBQWU7b0JBRWYsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNO3dCQUNoQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQzs0QkFDL0QsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ3JCLE1BQU0sRUFBRSxDQUFBO3dCQUNSLGFBQWE7d0JBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNOzRCQUNoQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQ0FDL0QsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQ3JCLE1BQU0sRUFBRSxDQUFBO3lCQUNUO3FCQUNGO29CQUVELHlCQUF5QjtvQkFDekIsTUFBTSxHQUFHLENBQUMsQ0FBQTtvQkFDVixJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxnREFBZ0Q7d0JBQzVELHFEQUFxRDt3QkFDckQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTt3QkFDN0QsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUEsQ0FBQyxvQ0FBb0M7d0JBQ3ZELElBQUksR0FBRyxJQUFJLENBQUEsQ0FBQywrQkFBK0I7d0JBQzNDLHFEQUFxRDt3QkFDckQsOEVBQThFO3dCQUM5RSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ3pDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQ0FDWixpREFBaUQ7Z0NBQ2pELDhDQUE4QztnQ0FDOUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFBLENBQUMsOENBQThDOzZCQUM3RTtpQ0FBTTtnQ0FDTCw0RUFBNEU7Z0NBQzVFLDhDQUE4QztnQ0FDOUMsOENBQThDO2dDQUM5QyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQTs2QkFDekM7NEJBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dDQUNYLEdBQUcsSUFBSSxFQUFFLENBQUE7Z0NBQ1QsTUFBTSxHQUFHLENBQUMsQ0FBQTs2QkFDWDtpQ0FBTTtnQ0FDTCxNQUFNLEdBQUcsQ0FBQyxDQUFBOzZCQUNYOzRCQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTt5QkFDbkI7cUJBQ0Y7b0JBRUQsNEJBQTRCO29CQUM1QixJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ2hCLE1BQU0sRUFBRSxDQUFBO3dCQUNSLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFBLENBQUMsb0NBQW9DO3dCQUN2RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDLGtDQUFrQzt3QkFDbEQsS0FBSyxHQUFHLENBQUMsQ0FBQTt3QkFDVCxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTs0QkFDckMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dDQUNaLGdEQUFnRDtnQ0FDaEQsNkNBQTZDO2dDQUM3Qyw2Q0FBNkM7Z0NBQzdDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTs2QkFDN0I7aUNBQU07Z0NBQ0wsaUZBQWlGO2dDQUNqRiw2Q0FBNkM7Z0NBQzdDLDZDQUE2QztnQ0FDN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBOzZCQUM5Qzs0QkFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0NBQ1gsR0FBRyxJQUFJLEVBQUUsQ0FBQTtnQ0FDVCxLQUFLLEdBQUcsQ0FBQyxDQUFBOzZCQUNWO2lDQUFNO2dDQUNMLEtBQUssR0FBRyxDQUFDLENBQUE7NkJBQ1Y7NEJBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBLENBQUMsaUJBQWlCO3lCQUNyQzt3QkFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7NEJBQ2Ysc0RBQXNEOzRCQUN0RCxzQ0FBc0M7NEJBQ3RDLHNDQUFzQzs0QkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt5QkFDbkM7cUJBQ0Y7b0JBRUQsa0NBQWtDO29CQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFBLENBQUMscUJBQXFCO29CQUNuRCxJQUFJLEVBQUUsQ0FBQTtpQkFDUDthQUNGO1lBRUQsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQTthQUM3QjtZQUNELFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVwQyxPQUFPLElBQUksQ0FBQTtZQUVYLG9DQUFvQztRQUN0QyxDQUFDO1FBRUQsZUFBZSxFQUFFLEVBQUU7UUFDbkIsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLDZDQUE2QztRQUU3Qzs7U0FFQztRQUNEOzs7O1dBSUc7UUFDSCxXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUs7WUFDbEMsSUFBSSxJQUFJLENBQUEsQ0FBQyxTQUFTO1lBQ2xCLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQSxDQUFDLE1BQU07WUFDckIsSUFBSSxTQUFTLEVBQUUsU0FBUyxDQUFBLENBQUMsTUFBTTtZQUM3QixxQkFBcUI7WUFDdkIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQTtZQUM1QixJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFBO1lBQzVCLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUE7WUFDbkMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQ3ZCLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ3ZFLENBQUE7WUFFRCx1REFBdUQ7WUFDdkQsa0JBQWtCO1lBQ2xCLElBQUksR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUUzRCwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3hFLDRCQUE0QjtZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQTtZQUN4QixTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUE7YUFDN0I7WUFDRCxzQkFBc0I7WUFDdEIsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBRUQsV0FBVyxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBTztZQUFQLG9CQUFBLEVBQUEsT0FBTztZQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLDhCQUE4QjtZQUNoRSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUE7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQzNELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDN0QsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBRUQsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVM7WUFDckQsSUFBSSxJQUFJLENBQUEsQ0FBQyxTQUFTO1lBQ2xCLElBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUEsQ0FBQywrQkFBK0I7WUFDdkQsSUFBSSxLQUFLLEVBQUUsS0FBSyxDQUFBLENBQUMsMERBQTBEO1lBQzNFLElBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUEsQ0FBQywwQkFBMEI7WUFDakQsT0FBTyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1lBRTNCLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUV2QyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUFDLHNDQUFzQztZQUN4RCxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUFDLHNDQUFzQztZQUN4RCxLQUFLLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQSxDQUFDLDZDQUE2QztZQUNqRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1lBRVAsc0JBQXNCO1lBQ3RCLEtBQUssSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDekMsMkNBQTJDO2dCQUMzQyxLQUFLLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ2xELHlDQUF5QztnQkFDekMsS0FBSyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzlDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ3ZDLDhCQUE4QjtvQkFDOUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7aUJBQ2pEO2dCQUNELHlCQUF5QjtnQkFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDeEQsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLG9CQUFvQjthQUM1RDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFBLENBQUMsZ0JBQWdCO1lBQzFDLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUVEOzs7NEVBR29FO1FBQ3BFLGdCQUFnQixFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRztZQUNoRCxJQUFJLElBQUksRUFBRSxJQUFJLENBQUEsQ0FBQyw0QkFBNEI7WUFDM0MsSUFBSSxLQUFLLEVBQUUsS0FBSyxDQUFBLENBQUMscUJBQXFCO1lBQ3RDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1lBQ2pCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFBO2FBQ1I7WUFFRCx1REFBdUQ7WUFDdkQsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBLENBQUMsd0NBQXdDO2FBQ3hGO1lBRUQsNkJBQTZCO1lBQzdCLCtFQUErRTtZQUMvRSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDOUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBLENBQUMsa0RBQWtEO1lBQ3ZFLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDVCxJQUFJLEdBQUcsRUFBRTtnQkFDUCx1Q0FBdUM7Z0JBQ3ZDLE9BQU8sS0FBSyxFQUFFLEVBQUU7b0JBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBLENBQUMsNEJBQTRCO29CQUMvRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCO3dCQUM5QyxLQUFLLEdBQUcsQ0FBQyxDQUFBO3dCQUNULEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFBLENBQUMsbUJBQW1CO3FCQUM1RDt5QkFBTTt3QkFDTCxLQUFLLEdBQUcsQ0FBQyxDQUFBO3dCQUNULElBQUksRUFBRSxDQUFBO3FCQUNQO2lCQUNGO2dCQUNELE9BQU8sS0FBSyxFQUFFO29CQUNaLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFBLENBQUMsa0JBQWtCO29CQUMvQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCO3dCQUM5QyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQSxDQUFDLHNCQUFzQjtxQkFDL0Q7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLENBQUMsQ0FBQTtxQkFDVjtpQkFDRjthQUNGO2lCQUFNO2dCQUNMLFdBQVc7Z0JBQ1gsT0FBTyxLQUFLLEVBQUUsRUFBRTtvQkFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUEsQ0FBQyw0QkFBNEI7b0JBQy9FLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7d0JBQ3hFLEtBQUssR0FBRyxDQUFDLENBQUE7d0JBQ1QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxtQkFBbUI7cUJBQzVEO3lCQUFNO3dCQUNMLEtBQUssR0FBRyxDQUFDLENBQUE7d0JBQ1QsSUFBSSxFQUFFLENBQUE7cUJBQ1A7aUJBQ0Y7Z0JBQ0QsT0FBTyxLQUFLLEVBQUU7b0JBQ1osS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUEsQ0FBQyxrQkFBa0I7b0JBQy9DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7d0JBQ3hFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFBLENBQUMsbUJBQW1CO3FCQUM1RDt5QkFBTTt3QkFDTCxLQUFLLEdBQUcsQ0FBQyxDQUFBO3FCQUNWO2lCQUNGO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQSxDQUFDLHdDQUF3QztRQUN0RCxDQUFDO1FBRUQ7Ozs7Ozs7VUFPRTtRQUNGLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTO1lBQ2hELElBQUksSUFBSSxDQUFBLENBQUMsVUFBVTtZQUNuQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQSxDQUFDLFNBQVM7WUFDNUIsYUFBYTtZQUNiLG1CQUFtQjtZQUNuQixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUEsQ0FBQyxTQUFTO1lBQ2hDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUEsQ0FBQyxNQUFNO1lBQzdCLElBQUksS0FBSyxFQUFFLEtBQUssQ0FBQSxDQUFDLE1BQU07WUFDckIsYUFBYTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLGVBQWU7Z0JBQzNDLElBQUksR0FBRyxTQUFTLENBQUMsZ0JBQWdCO2dCQUNqQyxJQUFJLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFO2dCQUNuQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO2FBQzNEO1lBRUQsb0RBQW9EO1lBQ3BELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFbkQsaUJBQWlCO1lBQ2pCLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDWixFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsa0NBQWtDO2dCQUMvRCxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUMvQztpQkFBTTtnQkFDTCxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ2xELEVBQUUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDdEQ7WUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ1osRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLDZCQUE2QjtnQkFDMUQsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDL0M7aUJBQU07Z0JBQ0wsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNsRCxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ3REO1lBQ0QsU0FBUyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNsQyx1QkFBdUI7WUFDdkIsU0FBUyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNsQyx1QkFBdUI7WUFFdkIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUU3RCw0QkFBNEI7WUFDNUIsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLFVBQVU7WUFDdkMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLFVBQVU7WUFDdkMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNoQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTtZQUVoQixFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2hDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBO1lBRWhCLDRDQUE0QztZQUM1QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsNkJBQTZCO2FBQzNEO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDMUQ7WUFDRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDeEQsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLDZCQUE2QjthQUMzRDtpQkFBTTtnQkFDTCxvREFBb0Q7Z0JBQ3BELEVBQUUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwRDtZQUVELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN4RCxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsNkJBQTZCO2FBQzNEO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDMUQ7WUFFRCxxQkFBcUI7WUFDckIsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ3pCLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUV2QyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQzlDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTthQUMzQztZQUNELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMxQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRWhFLE9BQU8sSUFBSSxDQUFBO1lBQ1QsZ0JBQWdCO1lBQ2hCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIscUJBQXFCO1FBQ3pCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsY0FBYyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVTtZQUNuRCxJQUFJLEtBQUssRUFBRSxLQUFLLENBQUEsQ0FBQyxNQUFNO1lBQ3ZCLElBQUksS0FBSyxDQUFBLENBQUMsTUFBTTtZQUNkLHdCQUF3QjtZQUMxQixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtvQkFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsNEJBQTRCO2lCQUN4QztxQkFBTTtvQkFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLDRCQUE0QjtpQkFDekM7YUFDRjtZQUVELDZCQUE2QjtZQUM3QixJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRTtnQkFDekIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSx3QkFBd0I7b0JBQ2pELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDOUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNYO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNaO2lCQUNGO3FCQUFNLEVBQUUsd0JBQXdCO29CQUMvQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNaO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDWDtpQkFDRjthQUNGO1lBRUQ7K0VBQ21FO1lBQ25FLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDbkQsS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUNULEtBQUssR0FBRyxDQUFDLENBQUE7WUFFVCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELEtBQUssRUFBRSxDQUFBO2dCQUNQLEtBQUssRUFBRSxDQUFBO2dCQUNQLEtBQUssRUFBRSxDQUFBO2FBQ1I7WUFFRCxJQUFJLFVBQVUsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM5RCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDWDtZQUVELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLHdCQUF3QjtvQkFDbkUsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7d0JBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDWDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDWjtpQkFDRjtxQkFBTSxFQUFFLHdCQUF3QjtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7d0JBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNaO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDWDtpQkFDRjthQUNGO1lBRUQsd0VBQXdFO1lBQ3hFLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDM0IsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUMxRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7NEJBQ3ZELElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO2dDQUM1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7NkJBQ1g7aUNBQU07Z0NBQ0wsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7NkJBQ1o7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7cUJBQU07b0JBQ0wsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUMxRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7NEJBQ3ZELElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO2dDQUM1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs2QkFDWjtpQ0FBTTtnQ0FDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7NkJBQ1g7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUVELHNCQUFzQjtZQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDWixDQUFDO1FBRUQ7OzhDQUVzQztRQUN0QyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVE7WUFDaEMsSUFBSSxJQUFJLENBQUEsQ0FBQyxTQUFTO1lBQ2xCLElBQUksTUFBTSxFQUFFLFFBQVEsQ0FBQSxDQUFDLE1BQU07WUFDM0IsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQTthQUN4QjtpQkFBTSxFQUFFLDRCQUE0QjtnQkFDbkMsc0JBQXNCO2dCQUN0QixNQUFNLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFDdkQsUUFBUSxNQUFNLEVBQUU7b0JBQ2QsS0FBSyxDQUFDLENBQUM7d0JBQ0wsMkNBQTJDO3dCQUMzQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQy9FLE1BQUs7b0JBQ1AsS0FBSyxDQUFDO3dCQUNKLCtCQUErQjt3QkFDL0IsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTt3QkFDekUsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUN4QyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7d0JBQ2xELE1BQUs7b0JBQ1AsS0FBSyxDQUFDO3dCQUNKLDJDQUEyQzt3QkFDM0MsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTt3QkFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFBO3dCQUN2QixNQUFLO2lCQUNSO2FBQ0Y7WUFFRCx1QkFBdUI7WUFDdkIsd0JBQXdCO1lBQ3hCLGtCQUFrQjtZQUNsQixPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRCxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVE7WUFDcEMsSUFBSSxHQUFHLENBQUEsQ0FBQyxTQUFTO1lBQ2pCLElBQUksUUFBUSxFQUFFLFNBQVMsQ0FBQSxDQUFDLE1BQU07WUFDOUIsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQSxDQUFDLE1BQU07WUFDL0IsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQSxDQUFDLE1BQU07WUFDbEMsSUFBSSxHQUFHLENBQUEsQ0FBQyxNQUFNO1lBRWQsZUFBZTtZQUNmLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hELFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNqRCxHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtZQUV4RSwwREFBMEQ7WUFDMUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUE7WUFDcEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUE7WUFDcEIsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDaEMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDaEMsTUFBTSxHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUVuQyx5REFBeUQ7WUFDekQsa0VBQWtFO1lBQ2xFLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtnQkFDdkIsSUFBSSxPQUFPLEdBQUcsT0FBTyxFQUFFO29CQUNyQix5QkFBeUI7b0JBQ3pCLE9BQU8sT0FBTyxHQUFHLE9BQU8sRUFBRTt3QkFDeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTt3QkFDekMsd0JBQXdCO3dCQUMxQixPQUFPLEVBQUUsQ0FBQTtxQkFDVjtpQkFDRjtxQkFBTTtvQkFDTCx5QkFBeUI7b0JBQ3pCLE9BQU8sT0FBTyxHQUFHLE9BQU8sRUFBRTt3QkFDeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTt3QkFDekMsd0JBQXdCO3dCQUMxQixPQUFPLEVBQUUsQ0FBQTtxQkFDVjtpQkFDRjthQUNGO1lBRUQsb0VBQW9FO1lBQ3BFLE9BQU8sSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFBO1lBQ25CLE9BQU8sSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFBO1lBQ25CLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDVCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNyQywrQkFBK0I7Z0JBQy9CLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQTtnQkFDckQseUNBQXlDO2dCQUN6QywwREFBMEQ7Z0JBQzVELElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3pCLEtBQUssR0FBRyxDQUFDLENBQUE7b0JBQ1QsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxnQ0FBZ0M7aUJBQ3ZEO3FCQUFNO29CQUNMLEtBQUssR0FBRyxDQUFDLENBQUE7aUJBQ1Y7Z0JBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUE7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFBO2dCQUNSLE9BQU8sRUFBRSxDQUFBO2dCQUNULE9BQU8sRUFBRSxDQUFBO2FBQ1Y7WUFFRCx1REFBdUQ7WUFDdkQsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQTtvQkFDL0IsOEJBQThCO29CQUNoQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFO3dCQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFBO3dCQUNULEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFBO3FCQUN0Qjt5QkFBTTt3QkFDTCxLQUFLLEdBQUcsQ0FBQyxDQUFBO3FCQUNWO29CQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUE7aUJBQzVCO2FBQ0Y7aUJBQU07Z0JBQ0wseUJBQXlCO2dCQUN6QixPQUFPLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDcEIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUE7b0JBQy9CLDhCQUE4QjtvQkFDaEMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTt3QkFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQTt3QkFDVCxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQTtxQkFDdEI7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLENBQUMsQ0FBQTtxQkFDVjtvQkFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO2lCQUM1QjthQUNGO1lBRUQsbUJBQW1CO1lBQ25CLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdEIsZ0JBQWdCO2FBQ25CO1lBRUQseUJBQXlCO1lBQ3pCLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNuQyxPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBa0JHO1FBQ0gsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRO1lBQ3BDLElBQUksSUFBSSxDQUFBLENBQUMsU0FBUztZQUNsQixJQUFJLFNBQVMsRUFBRSxPQUFPLENBQUEsQ0FBQyxNQUFNO1lBQzdCLElBQUksUUFBUSxFQUFFLE1BQU0sQ0FBQSxDQUFDLE1BQU07WUFDM0IsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQSxDQUFDLE1BQU07WUFDaEMsSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQSxDQUFDLE1BQU07WUFDM0IsOEJBQThCO1lBQ2hDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2pELE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzFDLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hELElBQUksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBRXhFOzs7Ozs7OztjQVFFO1lBRUYsMkJBQTJCO1lBQzNCLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbkMsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUVuQyx3QkFBd0I7WUFDeEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVWLHlDQUF5QztZQUN6QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMzQiwwQkFBMEI7Z0JBQzFCLEtBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7b0JBQzNDLHlCQUF5QjtpQkFDNUI7YUFDRjtpQkFBTTtnQkFDTCwwQkFBMEI7Z0JBQzFCLEtBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3RELEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtvQkFDcEMsNkJBQTZCO29CQUMvQixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUE7d0JBQ3JCLE1BQU0sR0FBRyxDQUFDLENBQUE7cUJBQ1g7eUJBQU07d0JBQ0wsTUFBTSxHQUFHLENBQUMsQ0FBQTtxQkFDWDtvQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO29CQUMzQixvQkFBb0I7aUJBQ3ZCO2FBQ0Y7WUFFRCxtREFBbUQ7WUFDbkQsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxNQUFNLEdBQUcsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNsRCxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUE7Z0JBQ3RELHNDQUFzQztnQkFDeEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNYLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFBO29CQUNyQixNQUFNLEdBQUcsQ0FBQyxDQUFBO2lCQUNYO3FCQUFNO29CQUNMLE1BQU0sR0FBRyxDQUFDLENBQUE7aUJBQ1g7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtnQkFDM0Isb0JBQW9CO2FBQ3ZCO1lBRUQsMERBQTBEO1lBQzFELElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDdEIsS0FBSyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUNqRCxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtvQkFDaEMsMkJBQTJCO29CQUM3QixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUE7d0JBQ3JCLE1BQU0sR0FBRyxDQUFDLENBQUE7cUJBQ1g7eUJBQU07d0JBQ0wsTUFBTSxHQUFHLENBQUMsQ0FBQTtxQkFDWDtvQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO2lCQUM5QjthQUNGO1lBRUQsdUJBQXVCO1lBQ3ZCLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILFVBQVUsRUFBRSxVQUFVLE1BQU0sRUFBRSxLQUFLO1lBQ2pDLElBQUksSUFBSSxDQUFBLENBQUMsU0FBUztZQUNsQixJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQyw4QkFBOEI7WUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFBO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMzRCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDcEQsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBRUQsWUFBWSxFQUFFLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLO1lBQ3RDLE9BQU8sS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO1FBQ3BDLENBQUM7UUFFRDs7V0FFRztRQUNILFdBQVcsRUFBRTtZQUNYLE9BQU8sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLDhCQUE4QjtRQUN0RSxDQUFDO1FBRUQsb0JBQW9CLEVBQUUsVUFBVSxHQUFHO1lBQ2pDLDREQUE0RDtZQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hELEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ25CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNaO1FBQ0gsQ0FBQztRQUVEOztXQUVHO1FBQ0gsV0FBVyxFQUFFLFVBQVUsR0FBRztZQUN4QixJQUFJLENBQUMsQ0FBQTtZQUNMLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNaLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDcEM7aUJBQU07Z0JBQ0wsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNuRDtRQUNILENBQUM7UUFFRCxNQUFNLEVBQUUsVUFBVSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQSxDQUFDLEtBQUs7UUFDdEIsQ0FBQztRQUVELFFBQVEsRUFBRSxVQUFVLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFBLENBQUMsS0FBSztRQUN0QixDQUFDO1FBRUQsT0FBTyxFQUFFLFVBQVUsQ0FBQztZQUNsQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUVELFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRSxLQUFLO1lBQ2hDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFBO1lBQ2hELHFDQUFxQztZQUNyQywyQ0FBMkM7WUFFN0MsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxtQkFBbUI7WUFDekMsR0FBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLE1BQU07WUFDZCxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQ1YsUUFBUSxHQUFHLENBQUMsQ0FBQTtZQUNaLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QyxHQUFHLEVBQUUsQ0FBQSxDQUFDLE9BQU87YUFDZDtZQUNELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsR0FBRyxFQUFFLENBQUEsQ0FBQyxzQkFBc0I7YUFDN0I7WUFDRCx3Q0FBd0M7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQ0FBaUM7Z0JBQzlELEdBQUcsRUFBRSxDQUFBO2dCQUNMLE1BQU0sRUFBRSxDQUFBLENBQUMsU0FBUzthQUNuQjtZQUVELElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDcEIsR0FBRyxFQUFFLENBQUEsQ0FBQyxnQkFBZ0I7YUFDdkI7WUFDRCx3Q0FBd0M7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQ0FBaUM7Z0JBQzlELEdBQUcsRUFBRSxDQUFBO2dCQUNMLFFBQVEsRUFBRSxDQUFBLENBQUMsU0FBUzthQUNyQjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzNDLDJCQUEyQjtnQkFDM0IsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQzVCLG9DQUFvQzthQUN2QztZQUVELDZEQUE2RDtZQUM3RCxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDekMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFBO2dCQUNkLE1BQU0sR0FBRyxDQUFDLENBQUE7YUFDWDtZQUVELEdBQUcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUU1QywwQkFBMEI7WUFDMUIsR0FBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLE1BQU07WUFDZCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3BCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtnQkFDMUIsMEJBQTBCO2dCQUM1QixHQUFHLEVBQUUsQ0FBQTthQUNOO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQTtnQkFDekIseUJBQXlCO2dCQUMzQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3BCLEdBQUcsRUFBRSxDQUFBO2lCQUNOO2FBQ0Y7WUFDRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLEdBQUcsRUFBRSxDQUFBLENBQUMsc0JBQXNCO2FBQzdCO1lBRUQsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDLG1CQUFtQjtZQUM1QixJQUFJLE9BQU8sRUFBRTtnQkFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN2QixNQUFNLEdBQUcsQ0FBQyxDQUFBO2FBQ1g7WUFDRCxPQUFPLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hELDRCQUE0QjthQUMvQjtZQUVELDZCQUE2QjtZQUM3QixJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLEdBQUcsRUFBRSxDQUFBLENBQUMsMEJBQTBCO2dCQUNoQyxPQUFPLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7b0JBQy9CLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ25EO2FBQ0Y7WUFFRCxPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUM7UUFFRCxJQUFJLEVBQUUsVUFBVSxDQUFDO1lBQ2YsSUFBSSxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzVCLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDTjtZQUNELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDdkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNOO1lBQ0QsT0FBTyxDQUFDLENBQUE7UUFDVixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsR0FBRyxFQUFFLFVBQVUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7WUFDaEMsSUFBSSxDQUFDLENBQUE7WUFDTCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7YUFDakI7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxNQUFNLEVBQUUsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRztZQUMzQyxJQUFJLENBQUMsQ0FBQTtZQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDaEM7WUFDRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsVUFBVSxFQUFFLFVBQVUsR0FBRztZQUN2QixJQUFJLEtBQUssQ0FBQSxDQUFDLE1BQU07WUFDaEIsSUFBSSxJQUFJLENBQUEsQ0FBQyxNQUFNO1lBQ2YsZUFBZTtZQUNmLHdDQUF3QztZQUN4QyxhQUFhO1lBQ2IsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQTtZQUMvQixJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUMsZ0JBQWdCO1lBQ3pCLFlBQVk7WUFDWixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNqRCxLQUFLLEVBQUUsQ0FBQTthQUNSO1lBRUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sS0FBSyxDQUFBO2FBQ2I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUE7YUFDWjtRQUNILENBQUM7UUFFRCxnQkFBZ0IsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDdkMsQ0FBQztLQUNGLENBQUE7SUFDRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUEifQ==