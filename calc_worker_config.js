/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ../crcalc-js/dist/cr.min.js
/*!
 * crcalc.js
 * Copyright 2025-2026 lll69, Licensed under the Apache License, Version 2.0
 * Copyright (C) 2016 The Android Open Source Project, Licensed under the Apache License, Version 2.0
 * Copyright (C) 2015 The Android Open Source Project, Licensed under the Apache License, Version 2.0
 * Copyright (c) 1999, Silicon Graphics, Inc.
 * Copyright (c) 2001-2004, Hewlett-Packard Development Company, L.P.
 * Visit https://crcalc.js.org/aosp/licenses.html to view the full license text.
 */
const t=Math,e=t.LN2,r=t.abs,n=t.ceil,i=t.floor,s=t.log,a=t.max,l=t.random,u=t.round,o=t.sqrt,c=BigInt,h=Number;class m extends Error{constructor(t,e){super(t+(e?": "+e:e))}}class p extends m{constructor(t){super("PrecisionOverflowException",t)}}class f extends m{constructor(t){super("ArithmeticException",t)}}class g extends m{constructor(t){super("NumberFormatException",t)}}class R extends f{constructor(){super("Division by zero")}}class _ extends m{constructor(t){super("AssertionError",t)}}function w(t){return t<0n?-t:t}function d(t,e){return t<e?-1:t===e?0:1}function N(t){return t<0n?-1:0n===t?0:1}function F(t){if(t<0n&&(t=-1n-t),0n===t)return 0;let e,r=0n,n=1n;for(;1n<<n<=t;)r=n,n<<=1n;for(;r<n;)e=r+n+1n>>1n,t>>e===0n?n=e-1n:r=e;return h(r)+1}function C(t,e){return 0n===e?t:e<0n?t>>-e:t<<e}function O(t,e){if(e>=0n)return t<<e;return C(t,e+1n)+1n>>1n}class E{constructor(){this.min_prec=0,this.appr_valid=!1}static bound_log2(t){let i=r(t);return 0^n(s(i+1)/e)}static check_prec(t){if(t>>28^t>>29)throw new p}static valueOfN(t){return new x(t)}setMaxAppr(t){this.max_appr=t,this.maxApprBitLen=-1}getApprBitLen(){let t=this.maxApprBitLen;return-1===t&&(t=this.max_appr>=0n?F(this.max_appr):F(-this.max_appr),this.maxApprBitLen=t),t}get_appr(t){if(E.check_prec(t),this.appr_valid&&t>=this.min_prec)return O(this.max_appr,c(this.min_prec-t));{let e=this.approximate(t);return this.min_prec=t,this.setMaxAppr(e),this.appr_valid=!0,e}}known_msd(){let t=this.getApprBitLen();return this.min_prec+t-1}msd(t){return(!this.appr_valid||this.max_appr<=1n&&this.max_appr>=-1n)&&(this.get_appr(t-1),w(this.max_appr)<=1n)?-2147483648:this.known_msd()}iter_msd(t){let e,r=0;for(;r>t+30;r=(3*r>>1)-16){if(e=this.msd(r),-2147483648!==e)return e;E.check_prec(r)}return this.msd(t)}msd_get(){return this.iter_msd(-2147483648)}static zeroes(t){let e="";for(let r=0;r<t;++r)e+="0";return e}simple_ln(){return new V(this.subtract(E.ONE))}static atan_reciprocal(t){return new L(t)}compareToRA(t,e,r){let n=this.iter_msd(r),i=t.iter_msd(n>r?n:r),s=i>n?i:n;if(-2147483648===s)return 0;E.check_prec(e);let a=s+e,l=a>r?a:r;return this.compareToA(t,l)}compareToA(t,e){let r=e-1,n=this.get_appr(r),i=t.get_appr(r);return d(n,i+1n)>0?1:d(n,i-1n)<0?-1:0}compareTo(t){for(let e=-20;;e*=2){E.check_prec(e);let r=this.compareToA(t,e);if(0!==r)return r}}signumA(t){if(this.appr_valid){let t=N(this.max_appr);if(0!==t)return t}let e=t-1;return N(this.get_appr(e))}signum(){for(let t=-20;;t*=2){E.check_prec(t);let e=this.signumA(t);if(0!==e)return e}}static valueOfS(t,e){if(void 0===e&&(e=10),2!==e&&8!==e&&10!==e&&16!==e)throw new g("Radix: "+e);let r,n,i=t.length,s=0;for(;" "===t.charAt(s);)++s;for(;" "===t.charAt(i-1);)--i;r=t.indexOf(".",s),-1===r?(r=i,n=""):n=t.substring(r+1,i);let a,l=t.substring(s,r);switch(e){case 2:a=c("0b"+l+n);break;case 8:a=c("0o"+l+n);break;case 10:a=c(l+n);break;case 16:a=c("0x"+l+n)}let u=c(e)**c(n.length);return E.valueOfN(a).divide(E.valueOfN(u))}toStringR(t,e){let r;if(16===e)r=this.shiftLeft(4*t);else{let n=c(e)**c(t);r=this.multiply(new x(n))}let n,i=r.get_appr(0),s=w(i).toString(e);if(0===t)n=s;else{let e=s.length;if(e<=t){s=E.zeroes(t+1-e)+s,e=t+1}n=s.substring(0,e-t)+"."+s.substring(e-t)}return i<0n&&(n="-"+n),n}toStringD(t){return this.toStringR(t,10)}toString(){return this.toStringD(10)}BigIntegerValue(){return this.get_appr(0)}doubleValue(){let t=this.iter_msd(-1080);if(-2147483648===t)return 0;let e=t-60,r=h(this.get_appr(e)),n=e<-1e3,i=new ArrayBuffer(8),s=new DataView(i);s.setFloat64(0,r);let a=s.getBigInt64(0),l=c(n?e+96:e);if((a>>52n&0x7ffn)+l>=2047)return r<0?-1/0:1/0;a+=l<<52n,s.setBigInt64(0,a);let u=s.getFloat64(0);if(n){const t=h(1n<<48n);return u/t/t}return u}add(t){return new T(this,t)}shiftLeft(t){return E.check_prec(t),new b(this,t)}shiftRight(t){return E.check_prec(t),new b(this,-t)}assumeInt(){return new y(this)}negate(){return new I(this)}subtract(t){return new T(this,t.negate())}multiply(t){return new A(this,t)}inverse(){return new P(this)}divide(t){return new A(this,t.inverse())}select(t,e){return new S(this,t,e)}max(t){return this.subtract(t).select(t,this)}min(t){return this.subtract(t).select(this,t)}abs(){return this.select(this.negate(),this)}exp(){let t=this.get_appr(-10);if(t>2n||t<-2n){let t=this.shiftRight(1).exp();return t.multiply(t)}return new q(this)}cos(){let t=this.divide(E.PI).get_appr(-1);if(w(t)>=2n){let e=O(t,-1n),r=E.PI.multiply(E.valueOfN(e));return 0n!==(1n&e)?this.subtract(r).cos().negate():this.subtract(r).cos()}if(w(this.get_appr(-1))>=2n){let t=this.shiftRight(1).cos();return t.multiply(t).shiftLeft(1).subtract(E.ONE)}return new D(this)}sin(){return E.half_pi.subtract(this).cos()}asin(){let t=this.get_appr(-10);if(t>750n){return E.ONE.subtract(this.multiply(this)).sqrt().acos()}return t<-750n?this.negate().asin().negate():new B(this)}acos(){return E.half_pi.subtract(this.asin())}ln(){let t=this.get_appr(-4);if(t<0n)throw new f("ln(negative)");if(t<=8n)return this.inverse().ln().negate();if(t>=24n){if(t<=64n){return this.sqrt().sqrt().ln().shiftLeft(2)}{let e=F(t)-3;return this.shiftRight(e).ln().add(E.valueOfN(c(e)).multiply(E.ln2))}}return this.simple_ln()}sqrt(){return new H(this)}}class v extends E{get_appr(t){if(v.check_prec(t),this.appr_valid&&t>=this.min_prec)return O(this.max_appr,c(this.min_prec-t));{let e=t>=-64?-64:t-32+1&-32,r=this.approximate(e);return this.min_prec=e,this.setMaxAppr(r),this.appr_valid=!0,O(r,c(e-t))}}}class x extends E{constructor(t){super(),this.value=t}approximate(t){return O(this.value,c(-t))}}class y extends E{constructor(t){super(),this.value=t}approximate(t){return t>=0?this.value.get_appr(t):O(this.value.get_appr(0),c(-t))}}class T extends E{constructor(t,e){super(),this.op1=t,this.op2=e}approximate(t){return O(this.op1.get_appr(t-2)+this.op2.get_appr(t-2),-2n)}}class b extends E{constructor(t,e){super(),this.op=t,this.count=e}approximate(t){return this.op.get_appr(t-this.count)}}class I extends E{constructor(t){super(),this.op=t}approximate(t){return-this.op.get_appr(t)}negate(){return this.op}}class S extends E{constructor(t,e,r){super(),this.selector=t,this.selector_sign=N(t.get_appr(-20)),this.op1=e,this.op2=r}approximate(t){if(this.selector_sign<0)return this.op1.get_appr(t);if(this.selector_sign>0)return this.op2.get_appr(t);let e=this.op1.get_appr(t-1),r=this.op2.get_appr(t-1);return w(e-r)<=1n?O(e,-1n):this.selector.signum()<0?(this.selector_sign=-1,O(e,-1n)):(this.selector_sign=1,O(r,-1n))}}class A extends E{constructor(t,e){super(),this.op1=t,this.op2=e}approximate(t){let e,r=(t>>1)-1,n=this.op1.msd(r);if(-2147483648===n){if(e=this.op2.msd(r),-2147483648===e)return 0n;{let t;t=this.op1,this.op1=this.op2,this.op2=t,n=e}}let i=t-n-3,s=this.op2.get_appr(i);if(0n===s)return 0n;e=this.op2.known_msd();let a=t-e-3;return O(this.op1.get_appr(a)*s,c(a+i-t))}}class P extends E{constructor(t){super(),this.op=t}approximate(t){let e=this.op.msd_get(),r=e-(1-e-t+3),n=-t-r;if(n<0)return 0n;let i=1n<<c(n),s=this.op.get_appr(r),a=w(s),l=(i+(a>>1n))/a;return s<0?-l:l}}class q extends E{constructor(t){super(),this.op=t}approximate(t){if(t>=1)return 0n;let e=2+(-t>>1),r=t-q.bound_log2(2*e)-4,n=t-3,i=this.op.get_appr(n),s=c(n),a=1n<<c(-r),l=a,u=a,o=0,h=1n<<c(t-4-r);for(;w(l)>=h;)o=o+1^0,l=O(l*i,s),l/=c(o),u+=l;return O(u,c(r-t))}}class D extends v{constructor(t){super(),this.op=t}approximate(t){if(t>=1)return 0n;let e,r,n=4+(-t>>1),i=t-D.bound_log2(2*n)-4,s=t-2,a=this.op.get_appr(s),l=c(s),u=1n<<c(t-4-i);r=0,e=1n<<c(-i);let o=e;for(;w(e)>=u;){r+=2,e=O(e*a,l),e=O(e*a,l),e/=c(-r)*c(r-1),o+=e}return O(o,c(i-t))}}class L extends v{constructor(t){super(),this.op=t}approximate(t){if(t>=1)return 0n;let e=2+(-t>>1),r=t-L.bound_log2(2*e)-2,n=1n<<c(-r),i=c(this.op),s=c(this.op*this.op),a=n/i,l=a,u=a,o=a,h=1,m=1,p=1n<<c(t-2-r);for(;w(u)>=p;)m+=2,l/=s,h=-h,u=l/c(h*m),o+=u;return O(o,c(r-t))}}class V extends v{constructor(t){super(),this.op=t}approximate(t){if(t>=0)return 0n;let e=-t,r=t-V.bound_log2(2*e)-4,n=t-3,i=this.op.get_appr(n),s=c(n),a=O(i,c(n-r)),l=a,u=l,o=1,h=1,m=1n<<c(t-4-r);for(;w(l)>=m;)o+=1,h=-h,a=O(a*i,s),l=a/c(o*h),u+=l;return O(u,c(r-t))}}class B extends v{constructor(t){super(),this.op=t}approximate(t){if(t>=2)return 0n;let e=-3*(t>>1)+4,r=t-B.bound_log2(2*e)-4,n=t-3,i=this.op.get_appr(n),s=c(n+2),a=c(n-2),l=1n<<c(t-4-r),u=1,o=i<<c(n-r),h=o,m=o;for(;w(o)>=l;){u+=2,m*=c(u-2),m=O(m*i,s),m*=i,m/=c(u-1),m=O(m,a),o=m/c(u),h+=o}return O(h,c(r-t))}}class H extends E{constructor(t,e=0,r=null){super(),this.op=t,this.min_prec=e,null!==r&&(this.setMaxAppr(r),this.appr_valid=!0)}approximate(t){let e=(t<<1)-1,r=this.op.iter_msd(e);if(r<=e)return 0n;let n=r>>1,s=n-t;if(s>50){let e=n-(6+(s>>1)),r=e<<1,i=this.op.get_appr(r),a=this.get_appr(e);return O(a*a+i,c(e-t))/a+1n>>1n}{let e=r-60&-2,n=e-60,s=this.op.get_appr(e)<<60n,a=h(s);if(a<0)throw new f("sqrt(negative)");let l=o(a);return C(c(i(l)),c((n>>1)-t))}}}class Z extends v{constructor(){super(),this.b_prec=[null],this.b_val=[null]}approximate(t){if(this.b_prec.length>this.b_val.length&&this.b_prec.pop(),t>=0)return O(3n,c(-t));const r=n(s(-t)/e)+10^0,i=c(-r),a=t-r,l=c(-a);let u=1n<<l,o=Z.SQRT_HALF.get_appr(a),h=1n<<c(-a-2),m=0;for(;u-o-4n>0n;){let e,r=u+o>>1n,n=u-r,s=u*o>>l,p=Z.valueOfN(s).shiftRight(-a);if(this.b_prec.length===m+1){e=p.sqrt().get_appr(a);let r=O(e,i);this.b_prec.push(t),this.b_val.push(r)}else{e=new H(p,this.b_prec[m+1],this.b_val[m+1]).get_appr(a),this.b_prec[m+1]=t,this.b_val[m+1]=O(e,i)}u=r,o=e,h=h-(n*n<<c(m+a)),++m}let p=u+o;return O(p*p/h>>2n,i)}}E.ZERO=E.valueOfN(0n),E.ONE=E.valueOfN(1n),E.ten_ninths=E.valueOfN(10n).divide(E.valueOfN(9n)),E.twentyfive_twentyfourths=E.valueOfN(25n).divide(E.valueOfN(24n)),E.eightyone_eightyeths=E.valueOfN(81n).divide(E.valueOfN(80n)),E.ln2_1=E.valueOfN(7n).multiply(E.ten_ninths.simple_ln()),E.ln2_2=E.valueOfN(2n).multiply(E.twentyfive_twentyfourths.simple_ln()),E.ln2_3=E.valueOfN(3n).multiply(E.eightyone_eightyeths.simple_ln()),E.ln2=E.ln2_1.subtract(E.ln2_2).add(E.ln2_3),E.SQRT_HALF=new H(E.ONE.shiftRight(1)),E.four=E.valueOfN(4n),E.PI=new Z,E.atan_PI=E.four.multiply(E.four.multiply(E.atan_reciprocal(5)).subtract(E.atan_reciprocal(239))),E.half_pi=E.PI.shiftRight(1);class Q{}function k(t){let e=t.multiply(t),r=e.divide(this.one.add(e)).sqrt();return t.select(r.negate(),r).asin()}const M=Object.freeze({sinFunction:new class extends Q{execute(t){return t.sin()}},cosFunction:new class extends Q{execute(t){return t.cos()}},tanFunction:new class extends Q{execute(t){return t.sin().divide(t.cos())}},asinFunction:new class extends Q{execute(t){return t.asin()}},acosFunction:new class extends Q{execute(t){return t.acos()}},atanFunction:new class extends Q{constructor(){super(...arguments),this.one=E.ONE}execute(t){return k(t)}}});class U{constructor(t,e=1n){this.mNum=t,this.mDen=e}static valueOfS(t,e){if(void 0===e&&(e=10),2!==e&&8!==e&&10!==e&&16!==e)throw new g("Radix: "+e);let r,n,i=t.length,s=0;for(;" "===t.charAt(s);)++s;for(;" "===t.charAt(i-1);)--i;r=t.indexOf(".",s),-1===r?(r=i,n=""):n=t.substring(r+1,i);let a,l=t.substring(s,r);switch(e){case 2:a=c("0b"+l+n);break;case 8:a=c("0o"+l+n);break;case 10:a=c(l+n);break;case 16:a=c("0x"+l+n)}let u=c(e)**c(n.length);return new U(a,u)}toString(){return this.mNum.toString()+"/"+this.mDen.toString()}toNiceString(){let t=this.reduce().positiveDen(),e=t.mNum.toString();return 1n!==t.mDen&&(e+="/"+t.mDen),e}static toString(t){return null===t?"not a small rational":t.toString()}toStringTruncated(t){let e=(w(this.mNum)*10n**c(t)/w(this.mDen)).toString(),r=e.length;return r<t+1&&(e="0".repeat(t+1-r)+e,r=t+1),(this.signum()<0?"-":"")+e.substring(0,r-t)+"."+e.substring(r-t)}crValue(){return E.valueOfN(this.mNum).divide(E.valueOfN(this.mDen))}intValue(){let t=this.reduce();if(1n!==t.mDen)throw new f("intValue of non-int");return h(t.mNum)}wholeNumberBits(){return 0n===this.mNum?-2147483648:F(this.mNum)-F(this.mDen)}tooBig(){return 1n!==this.mDen&&F(this.mNum)+F(this.mDen)>1e4}positiveDen(){return this.mDen>0n?this:new U(-this.mNum,-this.mDen)}reduce(){if(1n===this.mDen)return this;let t=function(t,e){let r;for(t=t<0n?-t:t,e=e<0n?-e:e;0n!==e;)r=e,e=t%e,t=r;return t}(this.mNum,this.mDen);return new U(this.mNum/t,this.mDen/t)}static maybeReduce(t){if(null===t)return null;if(!t.tooBig()&&l()<1/16)return t;let e=t.positiveDen();return e=e.reduce(),e.tooBig()?null:e}compareTo(t){return d(this.mNum*t.mDen,t.mNum*this.mDen)*N(this.mDen)*N(t.mDen)}signum(){return N(this.mNum)*N(this.mDen)}equals(t){return null!==t&&0===this.compareTo(t)}static asBigInteger(t){return null===t?null:t.mNum%t.mDen===0n?t.mNum/t.mDen:null}static add(t,e){if(null===t||null===e)return null;let r=t.mDen*e.mDen,n=t.mNum*e.mDen+e.mNum*t.mDen;return U.maybeReduce(new U(n,r))}static negate(t){return null===t?null:new U(-t.mNum,t.mDen)}static subtract(t,e){return U.add(t,U.negate(e))}static rawMultiply(t,e){if(null===t||null===e)return null;if(t===U.ONE)return e;if(e===U.ONE)return t;let r=t.mNum*e.mNum,n=t.mDen*e.mDen;return new U(r,n)}static multiply(t,e){return U.maybeReduce(U.rawMultiply(t,e))}static inverse(t){if(null===t)return null;if(0n===t.mNum)throw new R;return new U(t.mDen,t.mNum)}static divide(t,e){return U.multiply(t,U.inverse(e))}static sqrt(t){if(null===t)return null;if((t=t.positiveDen().reduce()).mNum<0n)throw new f("sqrt(negative)");let e=u(o(h(t.mNum)));if(e===1/0)return null;let r=c(e);if(r*r!==t.mNum)return null;let n=u(o(h(t.mDen)));if(n===1/0)return null;let i=c(n);return i*i!==t.mDen?null:new U(r,i)}rawPow(t){if(1n===t)return this;if(1n===(1n&t))return U.rawMultiply(this.rawPow(t-1n),this);if(0n===t)return U.ONE;let e=this.rawPow(t>>1n),r=U.rawMultiply(e,e);return null===r||r.tooBig()?null:r}pow(t){let e=N(t);if(0===e)return U.ONE;if(1n===t)return this;let r=this.reduce().positiveDen();if(1n===r.mDen){if(0n===r.mNum)return U.ZERO;if(1n===r.mNum)return U.ONE;if(-1n===r.mNum)return 1n===(1n&t)?U.MINUS_ONE:U.ONE}return F(t)>1e3?null:e<0?U.inverse(r).rawPow(-t):r.rawPow(t)}static pow(t,e){return null===e||null===t||1n!==(e=e.reduce().positiveDen()).mDen?null:t.pow(e.mNum)}static digitsRequired(t){if(null===t)return 2147483647;let e=0,r=0;if(1n===t.mDen)return 0;let n=(t=t.reduce()).mDen;if(F(n)>1e4)return 2147483647;for(;0n===(1n&n);)++e,n>>=1n;for(;n%5n===0n;)++r,n/=5n;return 1n!==n&&-1n!==n?1e4:a(e,r)}static digitsRequiredByNumber(t){if(null===t)return 2147483647;let e=0,r=0;if(1n===t.mDen)return 0;let n=(t=t.reduce()).mDen;if(F(n)>1e4)return 2147483647;for(;0n===(1n&n);)++e,n>>=1n;for(;n%5n===0n;)++r,n/=5n;return 1n!==n&&-1n!==n?2147483647:a(e,r)}}U.ZERO=new U(0n),U.HALF=new U(1n,2n),U.MINUS_HALF=new U(-1n,2n),U.THIRD=new U(1n,3n),U.QUARTER=new U(1n,4n),U.SIXTH=new U(1n,6n),U.ONE=new U(1n),U.MINUS_ONE=new U(-1n),U.TWO=new U(2n),U.MINUS_TWO=new U(-2n),U.TEN=new U(10n),U.TWELVE=new U(12n);const W=1n<<1000n;class X{static check(t){if(!t)throw new _}constructor(t,e){if(null===t)throw new f("Building UnifiedReal from null");this.mCrFactor=e,this.mRatFactor=t}static newCR(t){return new X(U.ONE,t)}static newBR(t){return new X(t,X.CR_ONE)}static newN(t){return X.newBR(new U(t))}static getSquare(t){const e=X.sSqrts;for(let r=0;r<e.length;++r)if(e[r]===t)return new U(c(r));return null}getExp(t){const e=X.sLogs;for(let r=0;r<e.length;++r)if(e[r]===t)return new U(c(r));return null}static crName(t){if(t===X.CR_ONE)return"";if(t===X.CR_PI)return"π";if(t===X.CR_E)return"e";const e=X.sSqrts;for(let r=0;r<e.length;++r)if(t===e[r])return"√"+r;const r=X.sLogs;for(let e=0;e<r.length;++e)if(t===r[e])return"ln("+e+")";return null}static isNamed(t){if(t===X.CR_ONE||t===X.CR_PI||t===X.CR_E)return!0;const e=X.sSqrts;for(let r=0;r<e.length;++r)if(t===e[r])return!0;const r=X.sLogs;for(let e=0;e<r.length;++e)if(t===r[e])return!0;return!1}static definitelyAlgebraic(t){return t===X.CR_ONE||null!==X.getSquare(t)}definitelyRational(){return this.mCrFactor===X.CR_ONE||0===this.mRatFactor.signum()}definitelyIrrational(){return!this.definitelyRational()&&X.isNamed(this.mCrFactor)}definitelyAlgebraic(){return X.definitelyAlgebraic(this.mCrFactor)||0===this.mRatFactor.signum()}definitelyTranscendental(){return!this.definitelyAlgebraic()&&X.isNamed(this.mCrFactor)}static definitelyIndependent(t,e){return t!==e&&(t===X.CR_E||t===X.CR_PI?X.definitelyAlgebraic(e):e===X.CR_E||e===X.CR_PI?X.definitelyAlgebraic(t):X.isNamed(t)&&X.isNamed(e))}toString(){return this.mRatFactor.toString()+"*"+this.mCrFactor.toString()}toNiceString(){if(this.mCrFactor===X.CR_ONE||0===this.mRatFactor.signum())return this.mRatFactor.toNiceString();let t=X.crName(this.mCrFactor);if(null!==t){let e=U.asBigInteger(this.mRatFactor);return null!==e?1n===e?t:this.mRatFactor.toNiceString()+t:"("+this.mRatFactor.toNiceString()+")"+t}return this.mRatFactor===U.ONE?this.mCrFactor.toString():this.crValue().toString()}exactlyDisplayable(){return null!==X.crName(this.mCrFactor)}toStringTruncated(t){if(this.mCrFactor===X.CR_ONE||this.mRatFactor===U.ZERO)return this.mRatFactor.toStringTruncated(t);const e=E.valueOfN(10n**c(t)).multiply(this.crValue());let r,n=!1;this.exactlyTruncatable()?(r=e.get_appr(0),r<0n&&(n=!0,r=-r),E.valueOfN(r).compareTo(e.abs())>0&&(r-=1n),X.check(E.valueOfN(r).compareTo(e.abs())<0)):(r=e.get_appr(-X.EXTRA_PREC),r<0n&&(n=!0,r=-r),r>>=X.EXTRA_PREC_BIG);let i=r.toString(),s=i.length;return s<t+1&&(i="0".repeat(t+1-s)+i,s=t+1),(n?"-":"")+i.substring(0,s-t)+"."+i.substring(s-t)}exactlyTruncatable(){return this.mCrFactor===X.CR_ONE||this.mRatFactor===U.ZERO||this.definitelyIrrational()}crValue(){return this.mRatFactor.crValue().multiply(this.mCrFactor)}isComparable(t){return this.mCrFactor===t.mCrFactor&&(X.isNamed(this.mCrFactor)||0!==this.mCrFactor.signumA(-1e3))||0===this.mRatFactor.signum()&&0===t.mRatFactor.signum()||X.definitelyIndependent(this.mCrFactor,t.mCrFactor)||0!==this.crValue().compareToA(t.crValue(),-1e3)}compareTo(t){if(this.definitelyZero()&&t.definitelyZero())return 0;if(this.mCrFactor===t.mCrFactor){return this.mCrFactor.signum()*this.mRatFactor.compareTo(t.mRatFactor)}return this.crValue().compareTo(t.crValue())}compareToA(t,e){return this.isComparable(t)?this.compareTo(t):this.crValue().compareToA(t.crValue(),e)}signumA(t){return this.compareToA(X.ZERO,t)}signum(){return this.compareTo(X.ZERO)}approxEquals(t,e){return this.isComparable(t)?(!X.definitelyIndependent(this.mCrFactor,t.mCrFactor)||0===this.mRatFactor.signum()&&0===t.mRatFactor.signum())&&0===this.compareTo(t):0===this.crValue().compareToA(t.crValue(),e)}definitelyEquals(t){return this.isComparable(t)&&0===this.compareTo(t)}definitelyNotEquals(t){let e=X.isNamed(this.mCrFactor),r=X.isNamed(t.mCrFactor);return e&&r?X.definitelyIndependent(this.mCrFactor,t.mCrFactor)?0!==this.mRatFactor.signum()||0!==t.mRatFactor.signum():(this.mCrFactor,t.mCrFactor,!this.mRatFactor.equals(t.mRatFactor)):0===this.mRatFactor.signum()?r&&0!==t.mRatFactor.signum():0===t.mRatFactor.signum()&&(e&&0!==this.mRatFactor.signum())}definitelyZero(){return 0===this.mRatFactor.signum()}definitelyNonZero(){return X.isNamed(this.mCrFactor)&&0!==this.mRatFactor.signum()}definitelyOne(){return this.mCrFactor===X.CR_ONE&&this.mRatFactor.equals(U.ONE)}boundedRationalValue(){return this.mCrFactor===X.CR_ONE||0===this.mRatFactor.signum()?this.mRatFactor:null}bigIntegerValue(){let t=this.boundedRationalValue();return U.asBigInteger(t)}add(t){if(this.mCrFactor===t.mCrFactor){let e=U.add(this.mRatFactor,t.mRatFactor);if(null!==e)return new X(e,this.mCrFactor)}return this.definitelyZero()?t:t.definitelyZero()?this:X.newCR(this.crValue().add(t.crValue()))}negate(){return new X(U.negate(this.mRatFactor),this.mCrFactor)}subtract(t){return this.add(t.negate())}multiply(t){if(this.mCrFactor===X.CR_ONE){let e=U.multiply(this.mRatFactor,t.mRatFactor);if(null!==e)return new X(e,t.mCrFactor)}if(t.mCrFactor===X.CR_ONE){let e=U.multiply(this.mRatFactor,t.mRatFactor);if(null!==e)return new X(e,this.mCrFactor)}if(this.definitelyZero()||t.definitelyZero())return X.ZERO;if(this.mCrFactor===t.mCrFactor){let e=X.getSquare(this.mCrFactor);if(null!==e){let r=U.multiply(U.multiply(e,this.mRatFactor),t.mRatFactor);if(null!==r)return X.newBR(r)}}let e=U.multiply(this.mRatFactor,t.mRatFactor);return null!==e?new X(e,this.mCrFactor.multiply(t.mCrFactor)):X.newCR(this.crValue().multiply(t.crValue()))}inverse(){if(this.definitelyZero())throw new R;let t=X.getSquare(this.mCrFactor);if(null!==t){let e=U.inverse(U.multiply(this.mRatFactor,t));if(null!==e)return new X(e,this.mCrFactor)}return new X(U.inverse(this.mRatFactor),this.mCrFactor.inverse())}divide(t){if(this.mCrFactor===t.mCrFactor){if(t.definitelyZero())throw new R;let e=U.divide(this.mRatFactor,t.mRatFactor);if(null!==e)return new X(e,X.CR_ONE)}return this.multiply(t.inverse())}sqrt(){if(this.definitelyZero())return X.ZERO;if(this.mCrFactor===X.CR_ONE){let t;for(let e=1;e<X.sSqrts.length;++e)if(null!==X.sSqrts[e]&&(t=U.sqrt(U.divide(this.mRatFactor,new U(c(e)))),null!==t))return new X(t,X.sSqrts[e])}return X.newCR(this.crValue().sqrt())}getPiTwelfths(){if(this.definitelyZero())return 0n;if(this.mCrFactor===X.CR_PI){let t=U.asBigInteger(U.multiply(this.mRatFactor,U.TWELVE));return null===t?null:t%24n}return null}static sinPiTwelfths(t){if(t>=12){let e=X.sinPiTwelfths(t-12);return null===e?null:e.negate()}switch(t){case 0:return X.ZERO;case 2:case 10:return X.HALF;case 3:case 9:return X.HALF_SQRT2;case 4:case 8:return X.HALF_SQRT3;case 6:return X.ONE;default:return null}}sin(){let t=this.getPiTwelfths();if(null!==t){let e=X.sinPiTwelfths(h(t));if(null!==e)return e}return X.newCR(this.crValue().sin())}static cosPiTwelfths(t){let e=t+6;return e>=24&&(e-=24),X.sinPiTwelfths(e)}cos(){let t=this.getPiTwelfths();if(null!==t){let e=X.cosPiTwelfths(h(t));if(null!==e)return e}return X.newCR(this.crValue().cos())}tan(){let t=this.getPiTwelfths();if(null!==t){let e=h(t);if(6===e||18===e)throw new f("Tangent undefined");let r=X.sinPiTwelfths(e),n=X.cosPiTwelfths(e);if(null!==r&&null!==n)return r.divide(n)}return this.sin().divide(this.cos())}checkAsinDomain(){if(this.isComparable(X.ONE)&&(this.compareTo(X.ONE)>0||this.compareTo(X.MINUS_ONE)<0))throw new f("inverse trig argument out of range")}static asinHalves(t){if(t<0)return this.asinHalves(-t).negate();switch(t){case 0:return X.ZERO;case 1:return new X(U.SIXTH,E.PI);case 2:return new X(U.HALF,E.PI)}throw new _("asinHalves: Bad argument")}asinNonHalves(){return this.compareToA(X.ZERO,-10)<0?this.negate().asinNonHalves().negate():this.definitelyEquals(X.HALF_SQRT2)?new X(U.QUARTER,X.CR_PI):this.definitelyEquals(X.HALF_SQRT3)?new X(U.THIRD,X.CR_PI):X.newCR(this.crValue().asin())}asin(){this.checkAsinDomain();const t=this.multiply(X.TWO).bigIntegerValue();return null!==t?X.asinHalves(h(t)):this.mCrFactor===E.ONE||this.mCrFactor!==X.CR_SQRT2||this.mCrFactor!==X.CR_SQRT3?this.asinNonHalves():X.newCR(this.crValue().asin())}acos(){return X.PI_OVER_2.subtract(this.asin())}atan(){if(this.compareToA(X.ZERO,-10)<0)return this.negate().atan().negate();const t=this.bigIntegerValue();if(null!==t&&t<=1n){switch(h(t)){case 0:return X.ZERO;case 1:return X.PI_OVER_4;default:throw new _("Impossible r_int")}}return this.definitelyEquals(X.THIRD_SQRT3)?X.PI_OVER_6:this.definitelyEquals(X.SQRT3)?X.PI_OVER_3:X.newCR(k(this.crValue()))}static recursivePow(t,e){if(1n===e)return t;if(0n!==(1n&e))return t.multiply(X.recursivePow(t,e-1n));let r=X.recursivePow(t,e>>1n);return r.multiply(r)}expLnPow(t){let e=this.signumA(-1e3);if(e>0)return X.newCR(this.crValue().ln().multiply(E.valueOfN(t)).exp());if(e<0){let e=this.crValue().negate().ln().multiply(E.valueOfN(t)).exp();return 0n!==(1n&t)&&(e=e.negate()),X.newCR(e)}return t<0n?X.newCR(X.recursivePow(this.crValue(),-t).inverse()):X.newCR(X.recursivePow(this.crValue(),t))}powN(t){if(1n===t)return this;if(0n===t)return X.ONE;let e=w(t);if(this.mCrFactor===X.CR_ONE&&e<=W){const e=this.mRatFactor.pow(t);if(null!==e)return X.newBR(e)}if(e>1000n)return this.expLnPow(t);let r=X.getSquare(this.mCrFactor);if(null!==r){const e=U.multiply(this.mRatFactor.pow(t),r.pow(t>>1n));if(null!==e)return 1n===(1n&t)?new X(e,this.mCrFactor):X.newBR(e)}return this.expLnPow(t)}pow(t){if(this.mCrFactor===X.CR_E){if(this.mRatFactor.equals(U.ONE))return t.exp();{let e=X.newBR(this.mRatFactor).pow(t);return t.exp().multiply(e)}}const e=t.boundedRationalValue();if(null!==e){let t=U.asBigInteger(e);if(null!==t)return this.powN(t);if(t=U.asBigInteger(U.multiply(U.TWO,e)),null!==t)return this.powN(t).sqrt()}if(this.definitelyZero())return X.ZERO;if(this.signumA(-1e3)<0)throw new f("Negative base for pow() with non-integer exponent");return X.newCR(this.crValue().ln().multiply(t.crValue()).exp())}static pow16(t){if(t>10)throw new _("Unexpected pow16 argument");let e=c(t);return e*=e,e*=e,e*=e,e*=e,e}static getIntLog(t,e){let n=h(t),i=s(n)/s(e);if(isFinite(n)&&r(i-u(i))>1e-6)return 0n;let a=0n,l=c(e),o=null;for(;t%l===0n;)for(t/=l,++a,null===o&&(o=X.pow16(e));t%o===0n;)t/=o,a+=16n;return 1n===t?a:0n}ln(){if(this.mCrFactor===X.CR_E)return new X(this.mRatFactor,X.CR_ONE).ln().add(X.ONE);if(this.isComparable(X.ZERO)){if(this.signum()<=0)throw new f("log(non-positive)");let t=this.compareToA(X.ONE,-1e3);if(0===t){if(this.definitelyEquals(X.ONE))return X.ZERO}else if(t<0)return this.inverse().ln().negate();const e=U.asBigInteger(this.mRatFactor);if(null!==e)if(this.mCrFactor===X.CR_ONE){const t=X.sLogs;for(let r=0;r<t.length;++r)if(null!==t[r]){let n=X.getIntLog(e,r);if(0n!==n)return new X(new U(n),t[r])}}else{let t=X.getSquare(this.mCrFactor);if(null!==t){let r=t.intValue();const n=X.sLogs;if(null!==n[r]){let t=X.getIntLog(e,r);if(0n!==t){let e=U.add(new U(t),U.HALF);if(null!==e)return new X(e,n[r])}}}}}return X.newCR(this.crValue().ln())}exp(){if(this.definitelyEquals(X.ZERO))return X.ONE;if(this.definitelyEquals(X.ONE))return X.E;const t=this.getExp(this.mCrFactor);if(null!==t){let e=!1,r=this.mRatFactor;null===U.asBigInteger(r)&&(e=!0,r=U.multiply(r,U.TWO));let n=U.pow(t,r);if(null!==n){let t=X.newBR(n);return e&&(t=t.sqrt()),t}}return X.newCR(this.crValue().exp())}static genFactorial(t,e){if(t>4n*e){return X.genFactorial(t,2n*e)*X.genFactorial(t-e,2n*e)}{if(0n===t)return 1n;let r=t;for(let n=t-e;n>1n;n-=e)r*=n;return r}}fact(){let t=this.bigIntegerValue();if(null===t&&(t=this.crValue().get_appr(0),!this.approxEquals(X.newN(t),-1e3)))throw new f("Non-integral factorial argument");if(t<0n)throw new f("Negative factorial argument");if(F(t)>24)throw new f("Factorial argument too big");let e=X.genFactorial(t,1n),r=new U(e);return X.newBR(r)}digitsRequired(){return this.mCrFactor===X.CR_ONE||0===this.mRatFactor.signum()?U.digitsRequired(this.mRatFactor):2147483647}digitsRequiredByNumber(){return this.mCrFactor===X.CR_ONE||0===this.mRatFactor.signum()?U.digitsRequiredByNumber(this.mRatFactor):2147483647}leadingBinaryZeroes(){if(X.isNamed(this.mCrFactor)){const t=this.mRatFactor.wholeNumberBits();return-2147483648===t?2147483647:t>=3?0:3-t}return 2147483647}approxWholeNumberBitsGreaterThan(t){return X.isNamed(this.mCrFactor)?this.mRatFactor.wholeNumberBits()>t:F(this.crValue().get_appr(t-2))>2}}X.CR_ONE=E.ONE,X.CR_PI=E.PI,X.CR_E=E.ONE.exp(),X.CR_SQRT2=E.valueOfN(2n).sqrt(),X.CR_SQRT3=E.valueOfN(3n).sqrt(),X.CR_LN2=E.valueOfN(2n).ln(),X.CR_LN3=E.valueOfN(3n).ln(),X.CR_LN5=E.valueOfN(5n).ln(),X.CR_LN6=E.valueOfN(6n).ln(),X.CR_LN7=E.valueOfN(7n).ln(),X.CR_LN10=E.valueOfN(10n).ln(),X.sSqrts=Object.freeze([null,E.ONE,X.CR_SQRT2,X.CR_SQRT3,null,E.valueOfN(5n).sqrt(),E.valueOfN(6n).sqrt(),E.valueOfN(7n).sqrt(),null,null,E.valueOfN(10n).sqrt(),E.valueOfN(11n).sqrt(),null,E.valueOfN(13n).sqrt(),E.valueOfN(14n).sqrt(),E.valueOfN(15n).sqrt(),null,E.valueOfN(17n).sqrt(),null,E.valueOfN(19n).sqrt()]),X.sLogs=Object.freeze([null,null,X.CR_LN2,X.CR_LN3,null,X.CR_LN5,X.CR_LN6,X.CR_LN7,null,null,X.CR_LN10]),X.PI=X.newCR(X.CR_PI),X.E=X.newCR(X.CR_E),X.ZERO=X.newBR(U.ZERO),X.ONE=X.newBR(U.ONE),X.MINUS_ONE=X.newBR(U.MINUS_ONE),X.TWO=X.newBR(U.TWO),X.MINUS_TWO=X.newBR(U.MINUS_TWO),X.HALF=X.newBR(U.HALF),X.MINUS_HALF=X.newBR(U.MINUS_HALF),X.TEN=X.newBR(U.TEN),X.RADIANS_PER_DEGREE=new X(new U(1n,180n),X.CR_PI),X.SIX=X.newN(6n),X.HALF_SQRT2=new X(U.HALF,X.CR_SQRT2),X.SQRT3=X.newCR(X.CR_SQRT3),X.HALF_SQRT3=new X(U.HALF,X.CR_SQRT3),X.THIRD_SQRT3=new X(U.THIRD,X.CR_SQRT3),X.PI_OVER_2=new X(U.HALF,X.CR_PI),X.PI_OVER_3=new X(U.THIRD,X.CR_PI),X.PI_OVER_4=new X(U.QUARTER,X.CR_PI),X.PI_OVER_6=new X(U.SIXTH,X.CR_PI),X.EXTRA_PREC=10,X.EXTRA_PREC_BIG=10n;
;// ./src/calc_worker.ts
/*
 * Copyright 2025-2026 lll69
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*pUrVkSlX CONFIGURATION START FOR DOWNLOAD HxDlWyZk**/
const CONFIG_IS_ONLINE = true;
// Operators
const CONFIG_POWER = true;
const CONFIG_SQRT = true;
const CONFIG_CBRT = true;
const CONFIG_FACT = true;
// Function Panel
const CONFIG_FUNCTION_PANEL = true;
// Constants
const CONFIG_PI = true;
const CONFIG_E = true;
// Functions
const CONFIG_LN = true;
const CONFIG_LOG = true;
const CONFIG_EXP = true;
const CONFIG_POW10 = true;
const CONFIG_TRIG = true;
const CONFIG_TRIG_INV = true;
const CONFIG_HYP = true;
const CONFIG_HYP_INV = true;
// Switches
const CONFIG_SW_INV = true;
const CONFIG_SW_HYP = true;
const CONFIG_SW_BRACKETS = true;
// Input/Output
const CONFIG_UI_NO_KEYBOARD = true;
const CONFIG_SCROLLING = true;
// Control Buttons
const CONFIG_UI_COPY_RESULT = true;
const CONFIG_UI_COPY_TRUNC = true;
const CONFIG_UI_COPY_INTEGER = true;
const CONFIG_UI_SAVE_RESULT = true;
const CONFIG_UI_SIMPLIFY = true;
const CONFIG_UI_SPEED_SCROLL = true;
const CONFIG_UI_BUNDLE_FONTS = false;
/*HxDlWyZk CONFIGURATION END FOR DOWNLOAD pUrVkSlX**/
const STRICT_EXPR = true;
const urList = {};
const UR_E = X.E;
const UR_LN10 = X.TEN.ln();
const UR_RADIANS_PER_DEGREE = X.RADIANS_PER_DEGREE;
const cachedURMap = new Map();
const negateMap = new Map();
const factMap = new Map();
const sqrtMap = new Map();
const lnMap = new Map();
const sinMap = new Map();
const cosMap = new Map();
const tanMap = new Map();
const asinMap = new Map();
const acosMap = new Map();
const atanMap = new Map();
const addMap = new Map();
const multiplyMap = new Map();
const divideMap = new Map();
const powBIMap = new Map();
const powURMap = new Map();
const freezeObject = Object.freeze;
const postWorkerMessage = postMessage;
function getURFromStr(str) {
    let cached = cachedURMap.get(str);
    if (cached === undefined) {
        cached = X.newBR(U.valueOfS(str));
        cachedURMap.set(str, cached);
    }
    return cached;
}
function getURFromBI(bi) {
    let cached = cachedURMap.get(bi);
    if (cached === undefined) {
        cached = X.newN(bi);
        cachedURMap.set(bi, cached);
    }
    return cached;
}
function getNegate(ur) {
    let cached = negateMap.get(ur);
    if (cached === undefined) {
        cached = ur.negate();
        negateMap.set(ur, cached);
        negateMap.set(cached, ur);
    }
    return cached;
}
function getFact(ur) {
    let cached = factMap.get(ur);
    if (cached === undefined) {
        cached = ur.fact();
        factMap.set(ur, cached);
    }
    return cached;
}
function getSqrt(ur) {
    let cached = sqrtMap.get(ur);
    if (cached === undefined) {
        cached = ur.sqrt();
        sqrtMap.set(ur, cached);
    }
    return cached;
}
function getLn(ur) {
    let cached = lnMap.get(ur);
    if (cached === undefined) {
        cached = ur.ln();
        lnMap.set(ur, cached);
    }
    return cached;
}
function getSin(ur) {
    let cached = sinMap.get(ur);
    if (cached === undefined) {
        cached = ur.sin();
        sinMap.set(ur, cached);
    }
    return cached;
}
function getCos(ur) {
    let cached = cosMap.get(ur);
    if (cached === undefined) {
        cached = ur.cos();
        cosMap.set(ur, cached);
    }
    return cached;
}
function getTan(ur) {
    let cached = tanMap.get(ur);
    if (cached === undefined) {
        cached = ur.tan();
        tanMap.set(ur, cached);
    }
    return cached;
}
function getASin(ur) {
    let cached = asinMap.get(ur);
    if (cached === undefined) {
        cached = ur.asin();
        asinMap.set(ur, cached);
    }
    return cached;
}
function getACos(ur) {
    let cached = acosMap.get(ur);
    if (cached === undefined) {
        cached = ur.acos();
        acosMap.set(ur, cached);
    }
    return cached;
}
function getATan(ur) {
    let cached = atanMap.get(ur);
    if (cached === undefined) {
        cached = ur.atan();
        atanMap.set(ur, cached);
    }
    return cached;
}
function getCachedMap(map, ur) {
    let cachedMap = map.get(ur);
    if (cachedMap === undefined) {
        cachedMap = new Map();
        map.set(ur, cachedMap);
    }
    return cachedMap;
}
function getAdd(arg0, arg1) {
    const cachedMap = getCachedMap(addMap, arg0);
    let cached = cachedMap.get(arg1);
    if (cached === undefined) {
        cached = arg0.add(arg1);
        cachedMap.set(arg1, cached);
        getCachedMap(addMap, arg1).set(arg0, cached);
    }
    return cached;
}
function getSub(arg0, arg1) {
    return getAdd(arg0, getNegate(arg1));
}
function getMultiply(arg0, arg1) {
    const cachedMap = getCachedMap(multiplyMap, arg0);
    let cached = cachedMap.get(arg1);
    if (cached === undefined) {
        cached = arg0.multiply(arg1);
        cachedMap.set(arg1, cached);
        getCachedMap(multiplyMap, arg1).set(arg0, cached);
    }
    return cached;
}
function getDivide(arg0, arg1) {
    const cachedMap = getCachedMap(divideMap, arg0);
    let cached = cachedMap.get(arg1);
    if (cached === undefined) {
        cached = arg0.divide(arg1);
        cachedMap.set(arg1, cached);
    }
    return cached;
}
function getPowBI(arg0, arg1) {
    const cachedMap = getCachedMap(powBIMap, arg0);
    let cached = cachedMap.get(arg1);
    if (cached === undefined) {
        cached = arg0 ** arg1;
        cachedMap.set(arg1, cached);
    }
    return cached;
}
function getPowUR(arg0, arg1) {
    const cachedMap = getCachedMap(powURMap, arg0);
    let cached = cachedMap.get(arg1);
    if (cached === undefined) {
        if (arg0 === UR_E) {
            cached = arg1.exp();
        }
        else {
            cached = arg0.pow(arg1);
        }
        cachedMap.set(arg1, cached);
    }
    return cached;
}
function tokenize(expr) {
    const result = [];
    const locations = [];
    let len = expr.length;
    let i;
    let ch, lastChar = "\0";
    let unprocessed = "";
    let lparenCount = 0;
    for (i = 0; i < len; lastChar = ch, i++) {
        ch = expr[i];
        if (ch >= "0" && ch <= "9") {
            if (lastChar === "\0" || lastChar === "." || (lastChar >= "0" && lastChar <= "9")) {
                unprocessed += ch;
            }
            else if (lastChar === "!" || lastChar === ")" || lastChar === "\u03C0" || (lastChar >= "a" && lastChar <= "z")) {
                result.push(unprocessed);
                result.push("*");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i]));
                unprocessed = ch;
            }
            else if (lastChar === "(" || lastChar === "^" || lastChar === "+" || lastChar === "-"
                || lastChar === "*" || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                unprocessed = ch;
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch >= "a" && ch <= "z" || ch === "\u03C0") {
            if (lastChar === "\0" || lastChar === "\u03C0" || (lastChar >= "a" && lastChar <= "z")) {
                unprocessed += ch;
            }
            else if (lastChar === "!" || lastChar === ")"
                || lastChar === "." || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push("*");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i]));
                unprocessed = ch;
            }
            else if (lastChar === "(" || lastChar === "^" || lastChar === "+" || lastChar === "-"
                || lastChar === "*" || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                unprocessed = ch;
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === ".") {
            if (lastChar === "\0" || (lastChar >= "0" && lastChar <= "9")) {
                if (unprocessed.indexOf(".") >= 0) {
                    throw new Error("Invalid char '.' at position (" + i + ")");
                }
                unprocessed += ".";
            }
            else if (lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z")) {
                result.push(unprocessed);
                result.push("*");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i]));
                unprocessed = ".";
            }
            else if (lastChar === "(" || lastChar === "^" || lastChar === "+" || lastChar === "-"
                || lastChar === "*" || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                unprocessed = ".";
            }
            else if (lastChar === ".") {
                throw new Error("Invalid char '.' at position (" + i + ")");
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === "+" || ch === "-") {
            if (lastChar === "." || lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z") || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push(ch);
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\0" || lastChar === "(" || lastChar === "^"
                || lastChar === "+" || lastChar === "-" || lastChar === "*"
                || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                if (STRICT_EXPR && (lastChar === "^" || lastChar === "+" || lastChar === "-")) {
                    throw new Error("Missing '(' before '" + ch + "' at position (" + i + ")");
                }
                result.push((lastChar === "^") ? ("unary" + ch + "pow") : ("unary" + ch));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === "*" || ch === "\u00D7") {
            if (lastChar === "." || lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z") || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push("*");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\0" || lastChar === "(" || lastChar === "^"
                || lastChar === "+" || lastChar === "-" || lastChar === "*"
                || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                throw new Error("Invalid char '" + ch + "' at position (" + i + ")");
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === "/" || ch === "\u00F7") {
            if (lastChar === "." || lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z") || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push("/");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\0" || lastChar === "(" || lastChar === "^"
                || lastChar === "+" || lastChar === "-" || lastChar === "*"
                || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                throw new Error("Invalid char '" + ch + "' at position (" + i + ")");
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === "^") {
            if (lastChar === "." || lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z") || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push("^");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\0" || lastChar === "(" || lastChar === "^"
                || lastChar === "+" || lastChar === "-" || lastChar === "*"
                || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                throw new Error("Invalid char '^' at position (" + i + ")");
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
        }
        else if (ch === "(") {
            if (lastChar === "\0" || lastChar === "(" || lastChar === "^" || lastChar === "+" || lastChar === "-"
                || lastChar === "*" || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                result.push("(");
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "." || lastChar === "!" || lastChar === ")"
                || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push("*");
                result.push("(");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\u03C0" || (lastChar >= "a" && lastChar <= "z")) {
                result.push(unprocessed);
                result.push("(");
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
            lparenCount++;
        }
        else if (ch === ")" || ch === "!") {
            if (lastChar === "." || lastChar === "!" || lastChar === ")" || lastChar === "\u03C0"
                || (lastChar >= "a" && lastChar <= "z") || (lastChar >= "0" && lastChar <= "9")) {
                result.push(unprocessed);
                result.push(ch);
                locations.push(freezeObject([i - unprocessed.length, i]));
                locations.push(freezeObject([i, i + 1]));
                unprocessed = "";
            }
            else if (lastChar === "\0" || lastChar === "(" || lastChar === "^" || lastChar === "+" || lastChar === "-"
                || lastChar === "*" || lastChar === "/" || lastChar === "\u00D7" || lastChar === "\u00F7") {
                throw new Error("Invalid char '" + ch + "' at position (" + i + ")");
            }
            else {
                throw new Error("Invalid lastChar '" + lastChar + "' at position (" + i + ")");
            }
            if (ch === ")") {
                lparenCount--;
                if (lparenCount < 0) {
                    throw new Error("Invalid char ')' at position (" + i + ")");
                }
            }
        }
        else if (ch !== " ") {
            throw new Error("Unknown char '" + ch + "' at position (" + i + ")");
        }
    }
    if (unprocessed.length > 0) {
        result.push(unprocessed);
        locations.push(freezeObject([len - unprocessed.length, len]));
    }
    const finalResult = [];
    const finalLocations = [];
    len = result.length;
    for (i = 0; i < len; i++) {
        const token = result[i];
        const loc = locations[i];
        if (token !== "") {
            if (token.length > 0 && token !== "unary+" && token !== "unary-" && token !== "unary+pow" && token !== "unary-pow") {
                const firstChar = token[0];
                if ((firstChar < "0" || firstChar > "9") && firstChar !== ".") {
                    const lastChar = token[token.length - 1];
                    let possibleName;
                    if (token.length >= 6 && (lastChar === "n" || lastChar === "s")) {
                        possibleName = token.substring(token.length - 6);
                        if (possibleName === "arcsin" || possibleName === "arccos" || possibleName === "arctan") {
                            const newItems = Array.prototype.slice.call(token, 0, token.length - 6).join("*");
                            finalResult.push(...newItems);
                            for (let j = 0; j < newItems.length; j++) {
                                finalLocations.push(loc);
                            }
                            if (token.length > 6) {
                                finalResult.push("*");
                                finalLocations.push(loc);
                            }
                            finalResult.push(possibleName);
                            finalLocations.push(loc);
                            continue;
                        }
                    }
                    if (token.length >= 5 && (lastChar === "h")) {
                        possibleName = token.substring(token.length - 5);
                        if (possibleName === "asinh" || possibleName === "acosh" || possibleName === "atanh") {
                            const newItems = Array.prototype.slice.call(token, 0, token.length - 5).join("*");
                            finalResult.push(...newItems);
                            for (let j = 0; j < newItems.length; j++) {
                                finalLocations.push(loc);
                            }
                            if (token.length > 5) {
                                finalResult.push("*");
                                finalLocations.push(loc);
                            }
                            finalResult.push(possibleName);
                            finalLocations.push(loc);
                            continue;
                        }
                    }
                    if (token.length >= 4 && (lastChar === "n" || lastChar === "s" || lastChar === "t" || lastChar === "h")) {
                        possibleName = token.substring(token.length - 4);
                        if (possibleName === "asin" || possibleName === "acos" || possibleName === "atan" || possibleName === "sqrt"
                            || possibleName === "sinh" || possibleName === "cosh" || possibleName === "tanh") {
                            const newItems = Array.prototype.slice.call(token, 0, token.length - 4).join("*");
                            finalResult.push(...newItems);
                            for (let j = 0; j < newItems.length; j++) {
                                finalLocations.push(loc);
                            }
                            if (token.length > 4) {
                                finalResult.push("*");
                                finalLocations.push(loc);
                            }
                            finalResult.push(possibleName);
                            finalLocations.push(loc);
                            continue;
                        }
                    }
                    if (token.length >= 3 && (lastChar === "n" || lastChar === "s" || lastChar === "g" || lastChar === "p")) {
                        possibleName = token.substring(token.length - 3);
                        if (possibleName === "sin" || possibleName === "cos" || possibleName === "tan"
                            || possibleName === "log" || possibleName === "exp") {
                            const newItems = Array.prototype.slice.call(token, 0, token.length - 3).join("*");
                            finalResult.push(...newItems);
                            for (let j = 0; j < newItems.length; j++) {
                                finalLocations.push(loc);
                            }
                            if (token.length > 3) {
                                finalResult.push("*");
                                finalLocations.push(loc);
                            }
                            finalResult.push(possibleName);
                            finalLocations.push(loc);
                            continue;
                        }
                    }
                    if (token.length >= 2 && lastChar === "n") {
                        possibleName = token.substring(token.length - 2);
                        if (possibleName === "ln") {
                            const newItems = Array.prototype.slice.call(token, 0, token.length - 2).join("*");
                            finalResult.push(...newItems);
                            for (let j = 0; j < newItems.length; j++) {
                                finalLocations.push(loc);
                            }
                            if (token.length > 2) {
                                finalResult.push("*");
                                finalLocations.push(loc);
                            }
                            finalResult.push(possibleName);
                            finalLocations.push(loc);
                            continue;
                        }
                    }
                    const newItems = Array.prototype.join.call(token, "*");
                    finalResult.push(...newItems);
                    for (let j = 0; j < newItems.length; j++) {
                        finalLocations.push(loc);
                    }
                    continue;
                }
            }
            finalResult.push(token);
            finalLocations.push(loc);
        }
    }
    if (lparenCount > 0) {
        const lastLocation = freezeObject([expr.length, expr.length]);
        while (lparenCount--) {
            finalResult.push(")");
            finalLocations.push(lastLocation);
        }
    }
    return { tokens: finalResult, locations: finalLocations };
}
function tokenToRpn(tokenizeResult) {
    const tokens = tokenizeResult.tokens;
    const locations = tokenizeResult.locations;
    const len = tokens.length;
    const priority = freezeObject({
        "!": 6,
        "unary+pow": 5,
        "unary-pow": 5,
        "^": 4,
        "unary+": 3,
        "unary-": 3,
        "*": 2,
        "/": 2,
        "+": 1,
        "-": 1
    });
    const functions = freezeObject(new Set([
        "ln", "log", "exp", "sqrt",
        "sin", "cos", "tan",
        "asin", "acos", "atan",
        "arcsin", "arccos", "arctan",
        "sinh", "cosh", "tanh",
        "asinh", "acosh", "atanh",
    ]));
    const rightAssocList = freezeObject(new Set([
        "unary+", "unary-", "unary+pow", "unary-pow", "^"
    ]));
    const output = [];
    const stack = [];
    for (let i = 0; i < len; i++) {
        const token = tokens[i];
        const loc = locations[i];
        if (functions.has(token) || token === "(") {
            stack.push(freezeObject([token, loc]));
        }
        else if (token === ")") {
            while (stack.length > 0 && stack[stack.length - 1][0] !== "(") {
                output.push(stack.pop());
            }
            if (stack.length === 0) {
                throw new Error("Mismatched parentheses at position [" + loc + "]");
            }
            stack.pop();
            if (stack.length > 0 && functions.has(stack[stack.length - 1][0])) {
                output.push(stack.pop());
            }
        }
        else if (priority.hasOwnProperty(token)) {
            const currentPrio = priority[token];
            const currentAssoc = rightAssocList.has(token);
            while (stack.length > 0) {
                const topToken = stack[stack.length - 1][0];
                if (topToken === "(" || functions.has(topToken))
                    break;
                const topPrio = priority[topToken] || 0;
                if (currentAssoc ? (topPrio > currentPrio) : (topPrio >= currentPrio)) {
                    output.push(stack.pop());
                }
                else {
                    break;
                }
            }
            stack.push(freezeObject([token, loc]));
        }
        else {
            output.push(freezeObject([token, loc]));
        }
    }
    while (stack.length > 0) {
        const top = stack.pop();
        if (top[0] === "(") {
            throw new Error("Mismatched parentheses at position [" + top[1] + "]");
        }
        output.push(top);
    }
    return output;
}
function urToBigInt(ur) {
    if (ur.digitsRequiredByNumber() === 0) {
        let asBI = ur.bigIntegerValue();
        if (asBI === null) {
            asBI = ur.crValue().get_appr(0); // Correct if it was an integer.
            if (!ur.approxEquals(X.newN(asBI), -1000)) {
                return null;
            }
        }
        return asBI;
    }
    return null;
}
function createUR(expr, degreeMode) {
    const unaryOps = freezeObject(new Set([
        "unary+", "unary-", "unary+pow", "unary-pow", "!"
    ]));
    const binaryOps = freezeObject(new Set([
        "+", "-", "*", "/", "^"
    ]));
    const functions = freezeObject(new Set([
        "ln", "log", "exp", "sqrt",
        "sin", "cos", "tan",
        "asin", "acos", "atan",
        "arcsin", "arccos", "arctan",
        "sinh", "cosh", "tanh",
        "asinh", "acosh", "atanh",
    ]));
    const tokenizeResult = tokenize(expr);
    const rpnResult = tokenToRpn(tokenizeResult);
    const len = rpnResult.length;
    const stack = [];
    for (let i = 0; i < len; i++) {
        const rpnItem = rpnResult[i];
        const token = rpnItem[0];
        const loc = rpnItem[1];
        if (binaryOps.has(token)) {
            if (stack.length < 2) {
                throw new Error("Insufficient number of parameters for operator '" + token + "' at position [" + loc + "]");
            }
            const arg1 = stack.pop();
            const arg0 = stack.pop();
            try {
                switch (token) {
                    case "+":
                        stack.push(getAdd(arg0, arg1));
                        break;
                    case "-":
                        stack.push(getSub(arg0, arg1));
                        break;
                    case "*":
                        stack.push(getMultiply(arg0, arg1));
                        break;
                    case "/":
                        stack.push(getDivide(arg0, arg1));
                        break;
                    case "^": {
                        if (!CONFIG_POWER) {
                            throw new Error("Unsupported Operation: POWER");
                        }
                        if (arg0.digitsRequiredByNumber() === 0 && arg1.digitsRequiredByNumber() === 0) {
                            const big0 = urToBigInt(arg0);
                            const big1 = urToBigInt(arg1);
                            if (big0 && big1 && big1 >= 0) {
                                stack.push(getURFromBI(getPowBI(big0, big1)));
                                break;
                            }
                        }
                        stack.push(getPowUR(arg0, arg1));
                        break;
                    }
                }
            }
            catch (e) {
                console.error(e);
                throw new Error(e.message + " at position [" + loc + "]");
            }
        }
        else if (unaryOps.has(token)) {
            if (stack.length < 1) {
                throw new Error("Insufficient number of parameters for operator '" + token + "' at position [" + loc + "]");
            }
            const arg0 = stack.pop();
            try {
                switch (token) {
                    case "unary+":
                    case "unary+pow":
                        stack.push(arg0);
                        break;
                    case "unary-":
                    case "unary-pow": {
                        stack.push(getNegate(arg0));
                        break;
                    }
                    case "!": {
                        if (!CONFIG_FACT) {
                            throw new Error("Unsupported Operation: FACT");
                        }
                        stack.push(getFact(arg0));
                        break;
                    }
                }
            }
            catch (e) {
                console.error(e);
                throw new Error(e.message + " at position [" + loc + "]");
            }
        }
        else if (functions.has(token)) {
            if (stack.length < 1) {
                throw new Error("Insufficient number of parameters for function '" + token + "' at position [" + loc + "]");
            }
            const arg0 = stack.pop();
            try {
                switch (token) {
                    case "ln":
                        if (!CONFIG_LN) {
                            throw new Error("Unsupported Operation: ln");
                        }
                        stack.push(getLn(arg0));
                        break;
                    case "log":
                        if (!CONFIG_LOG) {
                            throw new Error("Unsupported Operation: log");
                        }
                        stack.push(getDivide(getLn(arg0), UR_LN10));
                        break;
                    case "exp":
                        if (!CONFIG_EXP) {
                            throw new Error("Unsupported Operation: exp");
                        }
                        stack.push(getPowUR(UR_E, arg0));
                        break;
                    case "sqrt":
                        if (!CONFIG_SQRT) {
                            throw new Error("Unsupported Operation: sqrt");
                        }
                        stack.push(getSqrt(arg0));
                        break;
                    case "sin":
                        if (!CONFIG_TRIG) {
                            throw new Error("Unsupported Operation: sin");
                        }
                        if (degreeMode) {
                            stack.push(getSin(getMultiply(arg0, UR_RADIANS_PER_DEGREE)));
                        }
                        else {
                            stack.push(getSin(arg0));
                        }
                        break;
                    case "cos":
                        if (!CONFIG_TRIG) {
                            throw new Error("Unsupported Operation: cos");
                        }
                        if (degreeMode) {
                            stack.push(getCos(getMultiply(arg0, UR_RADIANS_PER_DEGREE)));
                        }
                        else {
                            stack.push(getCos(arg0));
                        }
                        break;
                    case "tan":
                        if (!CONFIG_TRIG) {
                            throw new Error("Unsupported Operation: tan");
                        }
                        if (degreeMode) {
                            stack.push(getTan(getMultiply(arg0, UR_RADIANS_PER_DEGREE)));
                        }
                        else {
                            stack.push(getTan(arg0));
                        }
                        break;
                    case "asin":
                    case "arcsin":
                        if (!CONFIG_TRIG_INV) {
                            throw new Error("Unsupported Operation: asin");
                        }
                        if (degreeMode) {
                            stack.push(getDivide(getASin(arg0), UR_RADIANS_PER_DEGREE));
                        }
                        else {
                            stack.push(getASin(arg0));
                        }
                        break;
                    case "acos":
                    case "arccos":
                        if (!CONFIG_TRIG_INV) {
                            throw new Error("Unsupported Operation: acos");
                        }
                        if (degreeMode) {
                            stack.push(getDivide(getACos(arg0), UR_RADIANS_PER_DEGREE));
                        }
                        else {
                            stack.push(getACos(arg0));
                        }
                        break;
                    case "atan":
                    case "arctan":
                        if (!CONFIG_TRIG_INV) {
                            throw new Error("Unsupported Operation: atan");
                        }
                        if (degreeMode) {
                            stack.push(getDivide(getATan(arg0), UR_RADIANS_PER_DEGREE));
                        }
                        else {
                            stack.push(getATan(arg0));
                        }
                        break;
                    case "sinh":
                        if (!CONFIG_HYP) {
                            throw new Error("Unsupported Operation: sinh");
                        }
                        stack.push(getDivide(getSub(getPowUR(UR_E, arg0), getPowUR(UR_E, getNegate(arg0))), X.TWO));
                        break;
                    case "cosh":
                        if (!CONFIG_HYP) {
                            throw new Error("Unsupported Operation: cosh");
                        }
                        stack.push(getDivide(getAdd(getPowUR(UR_E, arg0), getPowUR(UR_E, getNegate(arg0))), X.TWO));
                        break;
                    case "tanh": {
                        if (!CONFIG_HYP) {
                            throw new Error("Unsupported Operation: tanh");
                        }
                        const t1 = getPowUR(UR_E, arg0);
                        const t2 = getPowUR(UR_E, getNegate(arg0));
                        stack.push(getDivide(getSub(t1, t2), getAdd(t1, t2)));
                        break;
                    }
                    case "asinh":
                        if (!CONFIG_HYP_INV) {
                            throw new Error("Unsupported Operation: asinh");
                        }
                        stack.push(getLn(getAdd(arg0, getSqrt(getAdd(getMultiply(arg0, arg0), X.ONE)))));
                        break;
                    case "acosh":
                        if (!CONFIG_HYP_INV) {
                            throw new Error("Unsupported Operation: acosh");
                        }
                        stack.push(getLn(getAdd(arg0, getSqrt(getSub(getMultiply(arg0, arg0), X.ONE)))));
                        break;
                    case "atanh":
                        if (!CONFIG_HYP_INV) {
                            throw new Error("Unsupported Operation: atanh");
                        }
                        stack.push(getDivide(getLn(getDivide(getAdd(X.ONE, arg0), getSub(X.ONE, arg0))), X.TWO));
                        break;
                }
            }
            catch (e) {
                console.error(e);
                throw new Error(e.message + " at position [" + loc + "]");
            }
        }
        else {
            const firstChar = token[0];
            if (firstChar === "." || (firstChar >= "0" && firstChar <= "9")) {
                // number
                stack.push(getURFromStr(firstChar === "." ? ("0" + token) : token));
            }
            else if (CONFIG_E && token === "e") {
                stack.push(UR_E);
            }
            else if (CONFIG_PI && token === "\u03C0") {
                stack.push(X.PI);
            }
            else {
                throw new Error("Unknown variable '" + token + "' at position [" + loc + "]");
            }
        }
    }
    if (stack.length != 1) {
        throw new Error("Invalid stack length: " + stack.length);
    }
    return stack.pop();
}
onmessage = function (e) {
    const msg = e.data;
    switch (msg.type) {
        case "createUR":
            try {
                let ur = createUR(msg.expr, msg.degreeMode);
                urList[msg.id] = ur;
                let digitsRequired = ur.digitsRequiredByNumber();
                let exactlyDisplayable = ur.exactlyDisplayable();
                postWorkerMessage({
                    type: "createUR",
                    id: msg.id,
                    uid: msg.uid,
                    expr: msg.expr,
                    degreeMode: msg.degreeMode,
                    digitsRequired: digitsRequired,
                    exactlyDisplayable: exactlyDisplayable,
                    success: true
                });
            }
            catch (e) {
                postWorkerMessage({
                    type: "createUR",
                    id: msg.id,
                    uid: msg.uid,
                    expr: msg.expr,
                    degreeMode: msg.degreeMode,
                    error: String(e)
                });
            }
            break;
        case "copyUR":
            urList[msg.id] = urList[msg.fromId];
            break;
        case "removeUR":
            delete urList[msg.id];
            break;
        case "toStringTruncated": {
            try {
                let ur = urList[msg.id];
                let result = ur.toStringTruncated(msg.prec);
                postWorkerMessage({
                    type: "toStringTruncated",
                    id: msg.id,
                    uid: msg.uid,
                    prec: msg.prec,
                    result: result
                });
            }
            catch (e) {
                postWorkerMessage({
                    type: "toStringTruncated",
                    id: msg.id,
                    uid: msg.uid,
                    prec: msg.prec,
                    error: String(e)
                });
            }
            break;
        }
        case "toNiceString": {
            try {
                if (!CONFIG_UI_SIMPLIFY) {
                    throw new Error("Unsupported Operation: SIMPLIFY");
                }
                let ur = urList[msg.id];
                let result = ur.toNiceString();
                postWorkerMessage({
                    type: "toNiceString",
                    id: msg.id,
                    uid: msg.uid,
                    result: result
                });
            }
            catch (e) {
                postWorkerMessage({
                    type: "toNiceString",
                    id: msg.id,
                    uid: msg.uid,
                    error: String(e)
                });
            }
            break;
        }
    }
};
postWorkerMessage({ type: "init" });

/******/ })()
;