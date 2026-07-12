/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/Scroller.ts
/*
 * Copyright (C) 2006 The Android Open Source Project
 * Copyright 2026 lll69
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SCROLL_FRICTION = 0.015;
const mFlingFriction = SCROLL_FRICTION;
const DEFAULT_DURATION = 250;
const SCROLL_MODE = 0;
const FLING_MODE = 1;
const DECELERATION_RATE = 2.3582018154259448; // (float) (Math.log(0.78) / Math.log(0.9));
const INFLEXION = 0.35; // Tension lines cross at (INFLEXION, 1)
// const START_TENSION = 0.5;
// const END_TENSION = 1.0;
// const P1 = START_TENSION * INFLEXION;
// const P2 = 1.0 - END_TENSION * (1.0 - INFLEXION);
const NB_SAMPLES = 100;
// The values below come from calculated values in Android code
const SPLINE_POSITION = new Float32Array([0.000022888183591973643, 0.028561000304762274, 0.05705195792956655, 0.08538917797618413, 0.11349556286812107, 0.14129881694635613, 0.16877157254923383, 0.19581093511175632, 0.22239649722992452, 0.24843841866631658, 0.2740024733220569, 0.298967680744136, 0.32333234658228116, 0.34709556909569184, 0.3702249257894571, 0.39272483400399893, 0.41456988647721615, 0.43582889025419114, 0.4564192786416, 0.476410299013587, 0.4957560715637827, 0.5145493169954743, 0.5327205670880077, 0.5502846891191615, 0.5673274324802855, 0.583810881323224, 0.5997478744397482, 0.615194045299478, 0.6301165005270208, 0.6445484042257972, 0.6585198219185201, 0.6720397744233084, 0.6850997688076114, 0.6977281404741683, 0.7099506591298411, 0.7217749311525871, 0.7331784038850426, 0.7442308394229518, 0.7549087205105974, 0.7652471277371271, 0.7752251637549381, 0.7848768260203478, 0.7942056937103814, 0.8032299679689082, 0.8119428702388629, 0.8203713516576219, 0.8285187880808974, 0.8363794492831295, 0.8439768562813565, 0.851322799855549, 0.8584111051351724, 0.8652534074722162, 0.8718525580962131, 0.8782333271742155, 0.8843892099362031, 0.8903155590440985, 0.8960465359221951, 0.9015574505919048, 0.9068736766459904, 0.9119951682409297, 0.9169321898723632, 0.9216747065581234, 0.9262420604674766, 0.9306331858366086, 0.9348476990715433, 0.9389007110754832, 0.9427903495057521, 0.9465220679845756, 0.9500943036519721, 0.9535176728088761, 0.9567898524767604, 0.959924306623116, 0.9629127700159108, 0.9657622101750765, 0.9684818726275105, 0.9710676079044347, 0.9735231939498, 0.9758514437576309, 0.9780599066560445, 0.9801485715370128, 0.9821149805689633, 0.9839677526782791, 0.9857085499421516, 0.9873347811966005, 0.9888547171706613, 0.9902689443512227, 0.9915771042095881, 0.9927840651641069, 0.9938913963715834, 0.9948987305580712, 0.9958114963810524, 0.9966274782266875, 0.997352148697352, 0.9979848677523623, 0.9985285021374979, 0.9989844084453229, 0.9993537595844986, 0.999638729860106, 0.9998403888004533, 0.9999602810470701, 1]);
// const SPLINE_TIME = [0.0000020027160644794924, 0.00350088851162047, 0.007003151791358426, 0.01050731073492783, 0.014013891323670516, 0.017523412749995883, 0.021044179982194544, 0.024568856901080967, 0.0280979711137775, 0.031639706541330116, 0.03519451220773723, 0.03875514964645756, 0.0423372877837665, 0.045926214637862096, 0.04952993904436044, 0.05315635506474042, 0.056798371623819593, 0.060456429916064494, 0.06413833724598199, 0.06784445620030391, 0.07156781872033202, 0.07531616674972634, 0.07909715635060191, 0.08290382420836998, 0.08673654031211295, 0.09059567291543116, 0.09448879921236587, 0.09841623592301589, 0.10238548120098706, 0.1063824572603719, 0.11042187412541163, 0.11449677016440878, 0.11861462606887548, 0.12278282373185179, 0.126987355296371, 0.13124270691768766, 0.13554909374444132, 0.13989962399357997, 0.1443086837217326, 0.1487764311805297, 0.15329594218191872, 0.1578814921261533, 0.16251906080588643, 0.16722992199176986, 0.17200706421147602, 0.1768505231543152, 0.18176734137227613, 0.18675748211549406, 0.19183493654626624, 0.19699255455317474, 0.20223014913089796, 0.20755459289568823, 0.21297253856042192, 0.21849070813859012, 0.22410868710132487, 0.22983299382488986, 0.23565609107139063, 0.24159827112776977, 0.2476587777887822, 0.2538367425768127, 0.2601470810489064, 0.2665984291093018, 0.2731778623571628, 0.2799115355460708, 0.28681154956949156, 0.29384830367495496, 0.3010749218486822, 0.3084750439598085, 0.31606022895742814, 0.32383978803299374, 0.3318244247571328, 0.3400374455238979, 0.3484872109433661, 0.3571820722994804, 0.36612940062166444, 0.3753490685824846, 0.3848863316828227, 0.3947316813052522, 0.404900823219966, 0.41544681404329575, 0.42638092640322844, 0.43773771089022984, 0.4495569232067814, 0.4618604042728439, 0.4747289145198632, 0.48817716003830636, 0.5023105238939309, 0.5171495959740469, 0.5328215387321904, 0.5494551735755775, 0.5671297441043959, 0.5860694487019174, 0.6064431326010606, 0.6285359393086591, 0.6527741896434158, 0.6797394217927349, 0.7102442039790938, 0.7458008080547917, 0.7892455212301439, 0.8480819880681568, 1];
/** Controls the viscous fluid effect (how much of it). */
const VISCOUS_FLUID_SCALE = 8.0;
// The values below come from calculated values in Android code
const VISCOUS_FLUID_NORMALIZE = 1.000576751788537;
const VISCOUS_FLUID_OFFSET = 0;
const { abs, exp, hypot, log, round, sign, trunc, max, min } = Math;
const pNow = performance.now.bind(performance);
const viscousFluid = (x) => {
    x *= VISCOUS_FLUID_SCALE;
    if (x < 1.0) {
        x -= (1.0 - exp(-x));
    }
    else {
        const start = 0.36787944117; // 1/e == exp(-1)
        x = 1.0 - exp(1.0 - x);
        x = start + x * (1.0 - start);
    }
    return x;
};
const mInterpolator = (input) => {
    const interpolated = VISCOUS_FLUID_NORMALIZE * viscousFluid(input);
    if (interpolated > 0) {
        return interpolated + VISCOUS_FLUID_OFFSET;
    }
    return interpolated;
};
/* harmony default export */ const Scroller = (() => {
    let mMode = SCROLL_MODE;
    let mStartX = 0;
    let mStartY = 0;
    let mFinalX = 0;
    let mFinalY = 0;
    let mMinX = 0;
    let mMaxX = 0;
    let mMinY = 0;
    let mMaxY = 0;
    let mCurrX = 0;
    let mCurrY = 0;
    let mStartTime = 0;
    let mDuration = 0;
    let mDurationReciprocal = 0;
    let mDeltaX = 0;
    let mDeltaY = 0;
    let mFinished = true;
    const mFlywheel = true;
    let mVelocity = 0;
    let mCurrVelocity = 0;
    let mDistance = 0;
    const mPpi = (window.devicePixelRatio || 1) * 96;
    const computeDeceleration = (friction) => {
        return 9.80665 // g (m/s^2)
            * 39.37 // inch/meter
            * mPpi // pixels per inch
            * friction;
    };
    let mDeceleration = computeDeceleration(mFlingFriction);
    // A context-specific coefficient adjusted to physical values.
    let mPhysicalCoeff = computeDeceleration(0.84); // look and feel tuning
    const timePassed = () => {
        return pNow() - mStartTime;
    };
    const getCurrVelocity = () => (mMode == FLING_MODE ? mCurrVelocity : mVelocity - mDeceleration * timePassed() / 2000.0);
    const computeScrollOffset = () => {
        if (mFinished) {
            return false;
        }
        const timePassed = (pNow() - mStartTime);
        if (timePassed < mDuration) {
            switch (mMode) {
                case SCROLL_MODE:
                    const x = mInterpolator(timePassed * mDurationReciprocal);
                    mCurrX = mStartX + round(x * mDeltaX);
                    mCurrY = mStartY + round(x * mDeltaY);
                    break;
                case FLING_MODE:
                    const t = timePassed / mDuration;
                    const index = trunc(NB_SAMPLES * t);
                    let distanceCoef = 1;
                    let velocityCoef = 0;
                    if (index < NB_SAMPLES) {
                        const t_inf = index / NB_SAMPLES;
                        const t_sup = (index + 1) / NB_SAMPLES;
                        const d_inf = SPLINE_POSITION[index];
                        const d_sup = SPLINE_POSITION[index + 1];
                        velocityCoef = (d_sup - d_inf) / (t_sup - t_inf);
                        distanceCoef = d_inf + (t - t_inf) * velocityCoef;
                    }
                    mCurrVelocity = velocityCoef * mDistance / mDuration * 1000.0;
                    mCurrX = mStartX + round(distanceCoef * (mFinalX - mStartX));
                    // Pin to mMinX <= mCurrX <= mMaxX
                    mCurrX = min(mCurrX, mMaxX);
                    mCurrX = max(mCurrX, mMinX);
                    mCurrY = mStartY + round(distanceCoef * (mFinalY - mStartY));
                    // Pin to mMinY <= mCurrY <= mMaxY
                    mCurrY = min(mCurrY, mMaxY);
                    mCurrY = max(mCurrY, mMinY);
                    if (mCurrX == mFinalX && mCurrY == mFinalY) {
                        mFinished = true;
                    }
                    break;
            }
        }
        else {
            mCurrX = mFinalX;
            mCurrY = mFinalY;
            mFinished = true;
        }
        return true;
    };
    const startScroll = (startX, startY, dx, dy, duration) => {
        mMode = SCROLL_MODE;
        mFinished = false;
        mDuration = (duration || DEFAULT_DURATION);
        mStartTime = pNow();
        mStartX = startX;
        mStartY = startY;
        mFinalX = startX + dx;
        mFinalY = startY + dy;
        mDeltaX = dx;
        mDeltaY = dy;
        mDurationReciprocal = 1.0 / mDuration;
    };
    const getSplineDeceleration = (velocity) => {
        return log(INFLEXION * abs(velocity) / (mFlingFriction * mPhysicalCoeff));
    };
    const getSplineFlingDuration = (velocity) => {
        const l = getSplineDeceleration(velocity);
        const decelMinusOne = DECELERATION_RATE - 1.0;
        return (1000.0 * exp(l / decelMinusOne));
    };
    const getSplineFlingDistance = (velocity) => {
        const l = getSplineDeceleration(velocity);
        const decelMinusOne = DECELERATION_RATE - 1.0;
        return mFlingFriction * mPhysicalCoeff * exp(DECELERATION_RATE / decelMinusOne * l);
    };
    const fling = (startX, startY, velocityX, velocityY, minX, maxX, minY, maxY) => {
        // Continue a scroll or fling in progress
        if (mFlywheel && !mFinished) {
            const oldVel = getCurrVelocity();
            const dx = (mFinalX - mStartX);
            const dy = (mFinalY - mStartY);
            const hyp = hypot(dx, dy);
            const ndx = dx / hyp;
            const ndy = dy / hyp;
            const oldVelocityX = ndx * oldVel;
            const oldVelocityY = ndy * oldVel;
            if (sign(velocityX) == sign(oldVelocityX) &&
                sign(velocityY) == sign(oldVelocityY)) {
                velocityX += oldVelocityX;
                velocityY += oldVelocityY;
            }
        }
        mMode = FLING_MODE;
        mFinished = false;
        const velocity = hypot(velocityX, velocityY);
        mVelocity = velocity;
        mDuration = getSplineFlingDuration(velocity);
        mStartTime = pNow();
        mStartX = startX;
        mStartY = startY;
        const coeffX = velocity == 0 ? 1.0 : velocityX / velocity;
        const coeffY = velocity == 0 ? 1.0 : velocityY / velocity;
        const totalDistance = getSplineFlingDistance(velocity);
        mDistance = (totalDistance * sign(velocity));
        mMinX = minX;
        mMaxX = maxX;
        mMinY = minY;
        mMaxY = maxY;
        mFinalX = startX + round(totalDistance * coeffX);
        // Pin to mMinX <= mFinalX <= mMaxX
        mFinalX = min(mFinalX, mMaxX);
        mFinalX = max(mFinalX, mMinX);
        mFinalY = startY + round(totalDistance * coeffY);
        // Pin to mMinY <= mFinalY <= mMaxY
        mFinalY = min(mFinalY, mMaxY);
        mFinalY = max(mFinalY, mMinY);
    };
    return {
        /**
         *
         * Returns whether the scroller has finished scrolling.
         *
         * @return True if the scroller has finished scrolling, false otherwise.
         */
        isFinished: () => mFinished,
        /**
         * Force the finished field to a particular value.
         *
         * @param finished The new finished value.
         */
        forceFinished: (finished) => { mFinished = finished; },
        /**
         * Returns how long the scroll event will take, in milliseconds.
         *
         * @return The duration of the scroll in milliseconds.
         */
        getDuration: () => mDuration,
        /**
         * Returns the current X offset in the scroll.
         *
         * @return The new X offset as an absolute distance from the origin.
         */
        getCurrX: () => mCurrX,
        /**
         * Returns the current Y offset in the scroll.
         *
         * @return The new Y offset as an absolute distance from the origin.
         */
        getCurrY: () => mCurrY,
        /**
         * Returns the current velocity.
         *
         * @return The original velocity less the deceleration. Result may be
         * negative.
         */
        getCurrVelocity: getCurrVelocity,
        /**
         * Returns the start X offset in the scroll.
         *
         * @return The start X offset as an absolute distance from the origin.
         */
        getStartX: () => mStartX,
        /**
         * Returns the start Y offset in the scroll.
         *
         * @return The start Y offset as an absolute distance from the origin.
         */
        getStartY: () => mStartY,
        /**
         * Returns where the scroll will end. Valid only for "fling" scrolls.
         *
         * @return The final X offset as an absolute distance from the origin.
         */
        getFinalX: () => mFinalX,
        /**
         * Returns where the scroll will end. Valid only for "fling" scrolls.
         *
         * @return The final Y offset as an absolute distance from the origin.
         */
        getFinalY: () => mFinalY,
        /**
         * Call this when you want to know the new location.  If it returns true,
         * the animation is not yet finished.
         */
        computeScrollOffset: computeScrollOffset,
        /**
         * Start scrolling by providing a starting point, the distance to travel,
         * and the duration of the scroll.
         *
         * @param startX Starting horizontal scroll offset in pixels. Positive
         *        numbers will scroll the content to the left.
         * @param startY Starting vertical scroll offset in pixels. Positive numbers
         *        will scroll the content up.
         * @param dx Horizontal distance to travel. Positive numbers will scroll the
         *        content to the left.
         * @param dy Vertical distance to travel. Positive numbers will scroll the
         *        content up.
         * @param duration Duration of the scroll in milliseconds.
         */
        startScroll: startScroll,
        /**
         * Start scrolling based on a fling gesture. The distance travelled will
         * depend on the initial velocity of the fling.
         *
         * @param startX Starting point of the scroll (X)
         * @param startY Starting point of the scroll (Y)
         * @param velocityX Initial velocity of the fling (X) measured in pixels per
         *        second.
         * @param velocityY Initial velocity of the fling (Y) measured in pixels per
         *        second
         * @param minX Minimum X value. The scroller will not scroll past this
         *        point.
         * @param maxX Maximum X value. The scroller will not scroll past this
         *        point.
         * @param minY Minimum Y value. The scroller will not scroll past this
         *        point.
         * @param maxY Maximum Y value. The scroller will not scroll past this
         *        point.
         */
        fling: fling,
        /**
         * Stops the animation. Contrary to {@link #forceFinished(boolean)},
         * aborting the animating cause the scroller to move to the final x and y
         * position
         *
         * @see #forceFinished(boolean)
         */
        abortAnimation() {
            mCurrX = mFinalX;
            mCurrY = mFinalY;
            mFinished = true;
        },
        /**
         * Extend the scroll animation. This allows a running animation to scroll
         * further and longer, when used with {@link #setFinalX(int)} or {@link #setFinalY(int)}.
         *
         * @param extend Additional time to scroll in milliseconds.
         * @see #setFinalX(int)
         * @see #setFinalY(int)
         */
        extendDuration(extend) {
            const passed = timePassed();
            mDuration = passed + extend;
            mDurationReciprocal = 1.0 / mDuration;
            mFinished = false;
        },
        /**
         * Returns the time elapsed since the beginning of the scrolling.
         *
         * @return The elapsed time in milliseconds.
         */
        timePassed: timePassed,
        /**
         * Sets the final position (X) for this scroller.
         *
         * @param newX The new X offset as an absolute distance from the origin.
         * @see #extendDuration(int)
         * @see #setFinalY(int)
         */
        setFinalX(newX) {
            mFinalX = newX;
            mDeltaX = mFinalX - mStartX;
            mFinished = false;
        },
        /**
         * Sets the final position (Y) for this scroller.
         *
         * @param newY The new Y offset as an absolute distance from the origin.
         * @see #extendDuration(int)
         * @see #setFinalX(int)
         */
        setFinalY(newY) {
            mFinalY = newY;
            mDeltaY = mFinalY - mStartY;
            mFinished = false;
        },
        /**
         * @hide
         */
        isScrollingInDirection: (xvel, yvel) => (!mFinished && sign(xvel) == sign(mFinalX - mStartX) &&
            sign(yvel) == sign(mFinalY - mStartY)),
    };
});

;// ./src/calc.ts
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
// URLs
const CONFIG_WORKER_JS_CONTENT = "";
/*HxDlWyZk CONFIGURATION END FOR DOWNLOAD pUrVkSlX**/
const INTEGER_MIN = -2147483648;
const INTEGER_MAX = 2147483647;
const INITIAL_PREC = 32;
const PREC_INCREMENT = 128;
const INCREMENT_THRESHOLD = 64;
const MAX_INITIAL_PREC = INITIAL_PREC + PREC_INCREMENT;
const ENABLE_VARIABLES = false;
let displayWidth = 25;
let chWidth = 0;
let degreeMode = false;
let isInvert = false;
let isShowHyp = false;
let simplifyRendered = false;
let invRendered = false;
let hypRendered = false;
const multiplyChar = "*";
const divideChar = "/";
const D = document;
const getElementById = D.getElementById.bind(D);
const createTextNode = D.createTextNode.bind(D);
const { min: calc_min, max: calc_max, abs: calc_abs, floor, round: calc_round, sqrt } = Math;
const { setInterval: calc_setInterval, clearInterval: calc_clearInterval, setTimeout: calc_setTimeout, clearTimeout: calc_clearTimeout, requestAnimationFrame, cancelAnimationFrame } = window;
const createObjectURL = URL.createObjectURL;
// @ts-ignore
const replaceStr = "".replaceAll ? (s, a, b) => s.replaceAll(a, b) : (s, a, b) => s.split(a).join(b);
const calculatorDiv = getElementById("calculator");
const exprInput = getElementById("expression");
const resultDiv = getElementById("result_div");
const resultBoldText = getElementById("result_bold");
const resultNormalText = getElementById("result_normal");
const buttonInv = getElementById("toggle_inv");
const invReact = getElementById("react_inv_root");
const buttonCalc = getElementById("but_eq");
const buttonMode = getElementById("toggle_mode");
const measureDiv = getElementById("measure_4ch");
const numButtons = [
    getElementById("num_0"),
    getElementById("num_1"),
    getElementById("num_2"),
    getElementById("num_3"),
    getElementById("num_4"),
    getElementById("num_5"),
    getElementById("num_6"),
    getElementById("num_7"),
    getElementById("num_8"),
    getElementById("num_9")
];
const normalButtons = [
    getElementById("fun_ln"),
    getElementById("fun_log")
];
const inverseButtons = [
    getElementById("fun_exp"),
    getElementById("fun_10pow")
];
const trigButtons = [
    getElementById("fun_sin"),
    getElementById("fun_cos"),
    getElementById("fun_tan"),
];
const inverseTrigButtons = [
    getElementById("fun_asin"),
    getElementById("fun_acos"),
    getElementById("fun_atan"),
];
const hypElements = [
    getElementById("react_sinh_root"),
    getElementById("react_cosh_root"),
    getElementById("react_tanh_root"),
];
const inverseHypElements = [
    getElementById("react_asinh_root"),
    getElementById("react_acosh_root"),
    getElementById("react_atanh_root"),
];
const copyButton = getElementById("copy_result");
const copyTruncatedButton = getElementById("copy_truncated");
const copyIntegerButton = getElementById("copy_integer");
const saveButton = getElementById("save_result");
const simplifyButton = getElementById("show_simplify");
const simplifyReact = getElementById("react_simplify_root");
const speedUpButton = getElementById("speed_up_scroll");
const gridOps = getElementById("grid_ops");
const gridVar = getElementById("grid_var");
const loadingElement = getElementById("loading");
const resultBoldTextNode = createTextNode("Loading...");
const resultNormalTextNode = createTextNode("");
resultBoldText.innerHTML = "";
resultBoldText.appendChild(resultBoldTextNode);
resultNormalText.appendChild(resultNormalTextNode);
const scroller = Scroller();
const crL10N = window["crL10N"] || {};
const muiPlugin = {};
let workerUrl = null;
let workerLoaded = false;
let workerBusy = false;
let needEnterNewExpr = false;
let hasResult = false;
let hasError = false;
let isResultSimplifiable = false;
let resultScrollable = false;
let speedUpFactor = 1;
let worker = null;
let resultString = "";
let digitMax = INTEGER_MAX;
let precisionNeeded = INITIAL_PREC;
let precisionCurrent = -1;
let pointIndex = -1;
let scrollOffset = 0;
let lastCalculateId = 1;
let lastCalculateUid = 1;
let loadAnimationIndex = 0;
let loadAnimationInterval;
let calcWaitTimeout;
function showMessage(title, message, fallback, showCopy) {
    let shown = false;
    if (muiPlugin.showAlert) {
        try {
            muiPlugin.showAlert(title, message, showCopy);
            shown = true;
        }
        catch (e) {
            console.error(e);
        }
    }
    if (!shown) {
        alert(fallback());
    }
}
function copyText(str) {
    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        try {
            navigator.clipboard.writeText(str);
            copied = true;
        }
        catch (e) {
            console.log(e);
        }
    }
    if (!copied) {
        const element = D.createElement("input");
        element.style.opacity = "0";
        element.value = str;
        D.body.appendChild(element);
        element.select();
        D.execCommand("copy");
        element.remove();
    }
}
function changeResultUIVisibility() {
    if (CONFIG_UI_COPY_RESULT) {
        copyButton.hidden = !hasResult;
    }
    if (CONFIG_UI_COPY_TRUNC) {
        copyTruncatedButton.hidden = !hasResult;
    }
    if (CONFIG_UI_COPY_INTEGER) {
        copyIntegerButton.hidden = !hasResult;
    }
    if (CONFIG_UI_SAVE_RESULT) {
        saveButton.hidden = !hasResult;
    }
    if (CONFIG_UI_SPEED_SCROLL) {
        speedUpButton.hidden = !hasResult;
    }
    if (CONFIG_UI_SIMPLIFY) {
        simplifyButton.hidden = !(!simplifyRendered && hasResult && isResultSimplifiable);
        simplifyReact.hidden = !(simplifyRendered && hasResult && isResultSimplifiable);
    }
}
function showScrolledResult(copyCallback, truncate) {
    if (!workerLoaded || !hasResult)
        return;
    const resultLength = resultString.endsWith(".") ? (resultString.length - 1) : resultString.length;
    const shouldEnableSelect = (digitMax !== INTEGER_MAX && resultLength <= displayWidth);
    resultScrollable = !shouldEnableSelect;
    if (pointIndex === -1) {
        pointIndex = resultString.indexOf(".");
        if (pointIndex === -1) {
            pointIndex = resultString.length;
        }
    }
    if (shouldEnableSelect) {
        if (copyCallback) {
            copyCallback(true, digitMax === 0 ? resultString.substring(0, resultString.length - 1) : resultString);
            return;
        }
        scrollOffset = 0;
        if (digitMax === 0) {
            resultBoldTextNode.textContent = resultString.substring(0, resultString.length - 1);
            resultNormalTextNode.textContent = "";
        }
        else {
            resultBoldTextNode.textContent = resultString;
            resultNormalTextNode.textContent = "";
        }
        resultDiv.classList.remove("result-movable");
        return;
    }
    let rightIndex = scrollOffset + displayWidth;
    if (rightIndex > resultLength) {
        if (digitMax === 0) {
            scrollOffset = calc_min(scrollOffset, pointIndex - displayWidth);
        }
        else if (digitMax !== INTEGER_MAX) {
            if (digitMax + 4 >= displayWidth) {
                scrollOffset = calc_min(scrollOffset, pointIndex + 1 + digitMax - displayWidth + String(digitMax).length + 2);
            }
            else {
                scrollOffset = calc_min(scrollOffset, pointIndex + 1 + digitMax - displayWidth);
            }
        }
        rightIndex = scrollOffset + displayWidth;
    }
    if (scrollOffset < 0) {
        scrollOffset = 0;
    }
    if (!resultDiv.classList.contains("result-movable")) {
        resultDiv.classList.add("result-movable");
    }
    if (rightIndex <= pointIndex) {
        rightIndex = calc_min(scrollOffset + displayWidth, resultString.length);
        let offsetDigits;
        let offsetStrLength;
        let newOffsetDigits;
        let newOffsetStr;
        let newOffsetStrLength;
        if (rightIndex !== pointIndex || digitMax !== 0) {
            offsetDigits = pointIndex - rightIndex;
            offsetStrLength = String(offsetDigits).length + 1;
            newOffsetDigits = offsetDigits + offsetStrLength;
            newOffsetStr = String(newOffsetDigits);
            newOffsetStrLength = newOffsetStr.length + 1;
            while (newOffsetStrLength > offsetStrLength) {
                offsetStrLength = newOffsetStrLength;
                newOffsetDigits = offsetDigits + offsetStrLength;
                newOffsetStr = String(newOffsetDigits);
                newOffsetStrLength = newOffsetStr.length + 1;
            }
        }
        else {
            newOffsetStr = "";
            newOffsetStrLength = 0;
        }
        if (scrollOffset === 0) {
            let usedScientific = false;
            if (newOffsetStrLength > 0 && pointIndex > displayWidth) {
                // Try to use scientific notation
                let powerOfTen = resultString[0] === "-" ? (pointIndex - 2) : (pointIndex - 1);
                let powerOfTenLength = String(powerOfTen).length + 1;
                if (powerOfTenLength < displayWidth - 3) {
                    let scientific;
                    if (resultString[0] === "-") {
                        scientific = resultString.substring(0, 2) + "." + resultString.substring(2, rightIndex - powerOfTenLength - 1) + "E" + powerOfTen;
                    }
                    else {
                        scientific = resultString[0] + "." + resultString.substring(1, rightIndex - powerOfTenLength - 1) + "E" + powerOfTen;
                    }
                    if (copyCallback) {
                        if (digitMax === INTEGER_MAX || truncate) {
                            copyCallback(false, scientific);
                        }
                        else {
                            copyCallback(true, digitMax === 0 ? resultString.substring(0, resultString.length - 1) : resultString);
                        }
                        return;
                    }
                    resultBoldTextNode.textContent = scientific;
                    resultNormalTextNode.textContent = "";
                    usedScientific = true;
                }
            }
            if (!usedScientific) {
                if (copyCallback) {
                    if (digitMax === INTEGER_MAX || truncate) {
                        copyCallback(false, resultString.substring(0, rightIndex - newOffsetStrLength) + "E" + newOffsetStr);
                    }
                    else {
                        copyCallback(true, digitMax === 0 ? resultString.substring(0, resultString.length - 1) : resultString);
                    }
                    return;
                }
                resultBoldTextNode.textContent = resultString.substring(scrollOffset, rightIndex - newOffsetStrLength);
                resultNormalTextNode.textContent = newOffsetStrLength > 0 ? "E" + newOffsetStr : "";
            }
        }
        else {
            if (copyCallback) {
                if (digitMax === INTEGER_MAX || truncate) {
                    copyCallback(false, resultString.substring(0, rightIndex - newOffsetStrLength) + "E" + newOffsetStr);
                }
                else {
                    copyCallback(true, digitMax === 0 ? resultString.substring(0, resultString.length - 1) : resultString);
                }
                return;
            }
            resultBoldTextNode.textContent = "..." + resultString.substring(scrollOffset + 3, rightIndex - newOffsetStrLength);
            resultNormalTextNode.textContent = newOffsetStrLength > 0 ? "E" + newOffsetStr : "";
        }
    }
    else if (scrollOffset === 0 || scrollOffset + 4 <= pointIndex) {
        rightIndex = calc_min(scrollOffset + displayWidth, resultString.length);
        if (copyCallback) {
            if (digitMax === INTEGER_MAX || truncate) {
                copyCallback(false, resultString.substring(0, rightIndex));
            }
            else {
                copyCallback(true, digitMax === 0 ? resultString.substring(0, resultString.length - 1) : resultString);
            }
            return;
        }
        if (scrollOffset === 0) {
            resultBoldTextNode.textContent = resultString.substring(scrollOffset, rightIndex);
        }
        else {
            resultBoldTextNode.textContent = "..." + resultString.substring(scrollOffset + 3, rightIndex);
        }
        resultNormalTextNode.textContent = "";
    }
    else {
        let offsetDigits = rightIndex - pointIndex - 1;
        let offsetStrLength = String(offsetDigits).length + 2;
        let newOffsetDigits = offsetDigits - offsetStrLength;
        let newOffsetStr = String(newOffsetDigits);
        let newOffsetStrLength = newOffsetStr.length + 2;
        while (newOffsetStrLength < offsetStrLength) {
            offsetStrLength = newOffsetStrLength;
            newOffsetDigits = offsetDigits - offsetStrLength;
            newOffsetStr = String(newOffsetDigits);
            newOffsetStrLength = newOffsetStr.length + 2;
        }
        if (newOffsetStrLength > offsetStrLength) {
            newOffsetDigits -= 1;
            newOffsetStr = String(newOffsetDigits);
            newOffsetStrLength = newOffsetStr.length + 3;
        }
        if (scrollOffset > resultLength - displayWidth + newOffsetStrLength) {
            if (copyCallback) {
                copyCallback(false, resultString);
                return;
            }
            resultBoldTextNode.textContent = crL10N["calculating"] || "Calculating...";
            precisionNeeded = calc_max(scrollOffset - pointIndex + newOffsetStrLength * 2, precisionCurrent + PREC_INCREMENT * calc_min(1024, 1 + floor(scrollOffset / 1600)));
            calculateHigherPrecision();
        }
        else {
            if (copyCallback) {
                copyCallback(false, resultString.substring(0, rightIndex - newOffsetStrLength));
                return;
            }
            resultBoldTextNode.textContent = "..." + resultString.substring(scrollOffset + 3, rightIndex - newOffsetStrLength);
        }
        resultNormalTextNode.textContent = "E-" + newOffsetStr;
        if (scrollOffset > resultLength - displayWidth + newOffsetStrLength - INCREMENT_THRESHOLD) {
            let newResultLength = resultLength;
            precisionNeeded = precisionCurrent;
            const precIncr = PREC_INCREMENT * calc_round(sqrt(speedUpFactor)) * calc_min(1024, 1 + floor(scrollOffset / 1600));
            while (scrollOffset > newResultLength - displayWidth + newOffsetStrLength - INCREMENT_THRESHOLD) {
                precisionNeeded += precIncr;
                newResultLength += precIncr;
            }
            precisionNeeded = calc_min(digitMax, precisionNeeded);
            calculateHigherPrecision();
        }
    }
}
function saveText(content, name) {
    if (CONFIG_UI_SAVE_RESULT) {
        let url = createObjectURL(new Blob([content], { type: "text/plain" }));
        let element = D.createElement("a");
        element.href = url;
        element.download = name;
        D.body.appendChild(element);
        element.click();
        element.remove();
    }
}
function copyResult(save, truncate) {
    const showAlert = (message) => {
        showMessage(crL10N["copied"] || "Copied", message, () => message);
    };
    let content;
    let exact;
    if (!truncate && digitMax === 0 && precisionCurrent === 0) {
        content = (resultString.substring(0, resultString.length - 1));
        exact = true;
    }
    else if (!truncate && digitMax !== INTEGER_MAX && precisionCurrent >= digitMax) {
        content = (resultString);
        exact = true;
    }
    else {
        content = "";
        exact = false;
        showScrolledResult((mightExact, str) => {
            content = (str);
            exact = (mightExact && (digitMax === 0 || (digitMax !== INTEGER_MAX && precisionCurrent >= digitMax)));
        }, truncate);
    }
    if (!save) {
        copyText(content);
        if (exact) {
            showAlert((crL10N["exactCopied"] || "Exact result has been copied (length:") + (content.length) + ")");
        }
        else {
            showAlert((crL10N["truncatedCopied"] || "TRUNCATED result has been copied (length:") + (content.length) + ")");
        }
    }
    else if (CONFIG_UI_SAVE_RESULT) {
        saveText(content, exact ? "output_exact.txt" : "output_truncated.txt");
    }
}
function scrollToErrorIfNeeded(e, str) {
    if (e.startsWith(str)) {
        resultDiv.scrollLeft = chWidth * str.length;
    }
}
function changeHypButtonIfNeeded() {
    if (CONFIG_SW_HYP && hypRendered && workerLoaded) {
        getElementById("fun_percent").classList.add("op-hide");
        getElementById("react_hyp_root").classList.remove("op-hide");
    }
}
function onWorkerMessage(e) {
    const msg = e.data;
    switch (msg.type) {
        case "init":
            if (!workerLoaded) {
                workerLoaded = true;
                for (let i = 0, arr = D.getElementsByClassName("intro"); i < arr.length; i++) {
                    arr[i].hidden = true;
                }
                getElementById("loading-style").remove();
                changeHypButtonIfNeeded();
                clearResult();
                focusExpression();
                if (navigator.userAgent.indexOf("Firefox") >= 0) {
                    loadingElement.innerText = crL10N["firefoxNotice"] || "When performing exponentiation and factorial calculations, Chrome/Edge may be faster than Firefox and can compute more digits.";
                    loadingElement.hidden = false;
                }
            }
            break;
        case "createUR":
            if (msg.success) {
                hasResult = true;
                isResultSimplifiable = msg.exactlyDisplayable;
                hasError = false;
                digitMax = msg.digitsRequired;
                precisionNeeded = digitMax !== INTEGER_MAX ? MAX_INITIAL_PREC : INITIAL_PREC;
                precisionCurrent = -1;
                pointIndex = -1;
                workerBusy = false;
                calculateHigherPrecision();
            }
            else {
                hasResult = false;
                hasError = true;
                workerBusy = false;
                calc_clearTimeout(calcWaitTimeout);
                buttonCalc.innerText = "=";
                resultDiv.classList.remove("result-movable");
                resultBoldTextNode.textContent = msg.error;
                resultNormalTextNode.textContent = "";
                let errString = String(msg.error);
                let match = errString.match(/at position \[(\d+),(\d+)\]/);
                if (match) {
                    focusExpression();
                    let start = Number(match[1]);
                    exprInput.selectionStart = start;
                    exprInput.selectionEnd = Number(match[2]);
                    exprInput.scrollLeft = chWidth * (start > 0 ? start - 1 : start);
                }
                match = errString.match(/at position \((\d+)\)/);
                if (match) {
                    focusExpression();
                    let start = Number(match[1]);
                    exprInput.selectionStart = start;
                    exprInput.selectionEnd = start + 1;
                    exprInput.scrollLeft = chWidth * (start > 0 ? start - 1 : start);
                }
                scrollToErrorIfNeeded(errString, "Error: ArithmeticException: ");
                changeResultUIVisibility();
            }
            break;
        case "toStringTruncated":
            if (msg.uid === lastCalculateUid) {
                workerBusy = false;
                calc_clearTimeout(calcWaitTimeout);
                buttonCalc.innerText = "=";
                if (msg.error) {
                    hasResult = false;
                    hasError = true;
                    resultDiv.classList.remove("result-movable");
                    resultBoldTextNode.textContent = msg.error;
                    resultNormalTextNode.textContent = "";
                    changeResultUIVisibility();
                }
                else {
                    hasResult = true;
                    hasError = false;
                    let result = msg.result;
                    if (msg.prec >= precisionCurrent) {
                        precisionCurrent = msg.prec;
                        resultString = result;
                        showScrolledResult();
                        changeResultUIVisibility();
                    }
                    if (precisionNeeded > precisionCurrent) {
                        calculateHigherPrecision();
                    }
                }
            }
            break;
        case "toNiceString":
            if (CONFIG_UI_SIMPLIFY && msg.uid === lastCalculateUid) {
                const text = msg.error || msg.result;
                const title = (digitMax === 0) ? (crL10N["integerResult"] || "Integer Result") : crL10N["simplifiedResult"] || "Simplified Result";
                const title2 = (digitMax === 0) ? (crL10N["integerResult2"] || "Integer Result: ") : (crL10N["simplifiedResult2"] || "Simplified Result: ");
                showMessage(title, text, () => title2 + text, true);
            }
            break;
    }
}
function onWorkerError(e) {
    console.error(e);
    loadingElement.innerText = "Worker Error: " + e.message;
    loadingElement.hidden = false;
}
function reInitWorker() {
    if (worker) {
        worker.terminate();
    }
    worker = new Worker(workerUrl);
    worker.onmessage = onWorkerMessage;
    worker.onerror = onWorkerError;
    workerBusy = false;
    hasResult = false;
    hasError = false;
    changeResultUIVisibility();
}
function initWorker(workerJs) {
    workerUrl = createObjectURL(new Blob([workerJs], { type: "text/javascript" }));
    reInitWorker();
}
function showLoadAnimation() {
    loadAnimationIndex = (loadAnimationIndex + 1) % 4;
    resultBoldTextNode.textContent = "Loading..." + "/-\\|"[loadAnimationIndex];
}
function onLoadingError(e) {
    calc_clearInterval(loadAnimationInterval);
    loadingElement.innerText = e;
    exprInput.readOnly = true;
    exprInput.value = e;
    resultDiv.classList.remove("result-movable");
    resultBoldTextNode.textContent = crL10N["tryRefresh"] || "Try refreshing the page.";
    resultNormalTextNode.textContent = "";
    Array.prototype.forEach.call(calculatorDiv.getElementsByTagName("button"), (e) => {
        e.disabled = true;
    });
}
function clearResult() {
    resultDiv.classList.remove("result-movable");
    resultBoldTextNode.textContent = "";
    resultNormalTextNode.textContent = "";
    loadingElement.hidden = true;
    needEnterNewExpr = false;
    hasResult = false;
    hasError = false;
    resultString = "";
    digitMax = INTEGER_MAX;
    precisionNeeded = INITIAL_PREC;
    precisionCurrent = -1;
    pointIndex = -1;
    scrollOffset = 0;
    changeResultUIVisibility();
}
function onExprChange() {
    if (workerBusy) {
        reInitWorker();
        buttonCalc.innerText = "=";
    }
    clearResult();
}
if (CONFIG_WORKER_JS_CONTENT === "") {
    loadAnimationInterval = calc_setInterval(showLoadAnimation, 100);
    fetch("/calc_worker.js").then((result) => {
        if (result.ok) {
            result.text().then((workerJs) => {
                calc_clearInterval(loadAnimationInterval);
                initWorker(workerJs);
            }).catch((e) => {
                console.error(e);
                onLoadingError("Error: calc_worker.js " + e);
            });
        }
        else {
            onLoadingError("Error: calc_worker.js status=" + result.status);
        }
    }).catch((e) => {
        console.error(e);
        onLoadingError("Error: calc_worker.js " + e);
    });
}
else {
    initWorker(CONFIG_WORKER_JS_CONTENT);
}
function onCalcTimeout() {
    if (workerBusy) {
        const title = crL10N["calcTimeOut"] || "Calculation timed out";
        const message = crL10N["calcTimeOutDesc"] || ("The calculation took longer than expected.\n"
            + "Value may be infinite or undefined (such as tan(90°) or 1/0), or the number may have too many digits.\n"
            + "You can stop the calculation or wait for it to complete. Waiting may result in prolonged high CPU usage.");
        showMessage(title, message, () => message);
    }
}
function calculateHigherPrecision() {
    if (!workerLoaded || !hasResult || workerBusy)
        return;
    let precision = calc_min(digitMax, precisionNeeded);
    if (precision <= precisionCurrent)
        return;
    workerBusy = true;
    buttonCalc.innerText = "STOP";
    worker.postMessage({
        type: "toStringTruncated",
        id: lastCalculateId,
        uid: ++lastCalculateUid,
        prec: precision
    });
}
function preprocessExpr() {
    let expr = exprInput.value;
    let modified = false;
    if (expr.indexOf(" ") >= 0) {
        expr = replaceStr(expr, " ", "");
        modified = true;
    }
    if (CONFIG_PI && expr.indexOf("pi") >= 0) {
        expr = replaceStr(expr, "pi", "\u03C0");
        modified = true;
    }
    if (CONFIG_POWER && expr.indexOf("**") >= 0) {
        expr = replaceStr(expr, "**", "^");
        modified = true;
    }
    if (expr.indexOf("\u00D7") >= 0) {
        expr = replaceStr(expr, "\u00D7", "*");
        modified = true;
    }
    if (expr.indexOf("\u00F7") >= 0) {
        expr = replaceStr(expr, "\u00F7", "/");
        modified = true;
    }
    if (modified) {
        exprInput.value = expr;
        exprInput.selectionStart = exprInput.selectionEnd = expr.length;
    }
}
function calculateResult() {
    if (!workerLoaded)
        return;
    if (workerBusy) {
        reInitWorker();
        clearResult();
        buttonCalc.innerText = "=";
        calc_clearTimeout(calcWaitTimeout);
        return;
    }
    clearResult();
    onCalculatorResize();
    preprocessExpr();
    needEnterNewExpr = true;
    buttonCalc.innerText = "STOP";
    worker.postMessage({ type: "removeUR", id: lastCalculateId });
    lastCalculateId = (lastCalculateId + 1) | 0;
    changeResultUIVisibility();
    worker.postMessage({
        type: "createUR",
        id: lastCalculateId,
        uid: lastCalculateId,
        expr: exprInput.value,
        degreeMode: degreeMode
    });
    workerBusy = true;
    calc_clearTimeout(calcWaitTimeout);
    calcWaitTimeout = calc_setTimeout(onCalcTimeout, 5000);
}
function focusExpression() {
    if (workerLoaded) {
        exprInput.focus();
    }
}
function refreshInverseButton() {
    buttonInv.title = invReact.title = isInvert ? (crL10N["hideInv"] || "Hide inverse functions") : (crL10N["showInv"] || "Show inverse functions");
    if (CONFIG_SW_INV && invRendered) {
        if (isInvert) {
            buttonInv.classList.add("op-hide");
            invReact.classList.remove("op-hide");
        }
        else {
            buttonInv.classList.remove("op-hide");
            invReact.classList.add("op-hide");
        }
    }
}
function refreshInverse() {
    for (const button of normalButtons) {
        if (isInvert) {
            button.classList.add("op-hide");
        }
        else {
            button.classList.remove("op-hide");
        }
    }
    for (const button of inverseButtons) {
        if (isInvert) {
            button.classList.remove("op-hide");
        }
        else {
            button.classList.add("op-hide");
        }
    }
    for (const button of trigButtons) {
        if (!isInvert && !isShowHyp) {
            button.classList.remove("op-hide");
        }
        else {
            button.classList.add("op-hide");
        }
    }
    for (const button of inverseTrigButtons) {
        if (isInvert && !isShowHyp) {
            button.classList.remove("op-hide");
        }
        else {
            button.classList.add("op-hide");
        }
    }
    for (const button of hypElements) {
        if (isShowHyp && !isInvert) {
            button.classList.remove("op-hide");
        }
        else {
            button.classList.add("op-hide");
        }
    }
    for (const button of inverseHypElements) {
        if (isShowHyp && isInvert) {
            button.classList.remove("op-hide");
        }
        else {
            button.classList.add("op-hide");
        }
    }
}
function inverseClick() {
    if (CONFIG_SW_INV) {
        if (!workerLoaded)
            return;
        isInvert = !isInvert;
        refreshInverse();
        refreshInverseButton();
        focusExpression();
    }
}
function hypClick(show) {
    if (!workerLoaded)
        return;
    isShowHyp = show;
    refreshInverse();
    refreshInverseButton();
    focusExpression();
}
function refreshModeButton() {
    if (CONFIG_TRIG || CONFIG_TRIG_INV) {
        buttonMode.title = degreeMode ? (crL10N["currDeg"] || "Currently in degree mode") : (crL10N["currRad"] || "Currently in radian mode");
        buttonMode.innerText = degreeMode ? "DEG" : "RAD";
    }
}
function modeClick() {
    if (!workerLoaded)
        return;
    degreeMode = !degreeMode;
    refreshModeButton();
    if (hasResult) {
        //calculateResult();
        clearResult();
    }
    focusExpression();
}
function insertStr(str) {
    if (!workerLoaded)
        return;
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    const selectionEnd = exprInput.selectionEnd;
    if (selectionStart === selectionEnd && selectionStart === currentExpr.length) {
        exprInput.value = currentExpr + str;
    }
    else {
        exprInput.value = currentExpr.substring(0, selectionStart) + str + currentExpr.substring(selectionEnd, currentExpr.length);
    }
    exprInput.selectionStart = exprInput.selectionEnd = selectionStart + str.length;
    onExprChange();
}
function checkEnterNewExpr() {
    if (hasResult && needEnterNewExpr) {
        needEnterNewExpr = false;
        exprInput.value = "";
        exprInput.selectionStart = 0;
        exprInput.selectionEnd = 0;
    }
}
function appendDigit(n, fromInput) {
    if (!workerLoaded)
        return;
    checkEnterNewExpr();
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    if (selectionStart > 0) {
        const prevChar = currentExpr[selectionStart - 1];
        if (")!\u03C0xyze".indexOf(prevChar) >= 0) {
            insertStr(multiplyChar + n);
            return true;
        }
    }
    if (!fromInput) {
        insertStr(String(n));
    }
}
function appendPoint(fromInput) {
    if (!workerLoaded)
        return true;
    checkEnterNewExpr();
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    const selectionEnd = exprInput.selectionEnd;
    if (selectionEnd < currentExpr.length) {
        let i = selectionEnd;
        while (i < currentExpr.length) {
            const charAtI = currentExpr[i];
            if ("0123456789".indexOf(charAtI) < 0) {
                if (charAtI === ".") {
                    return true;
                }
                break;
            }
            i++;
        }
    }
    if (selectionStart > 0) {
        const prevChar = currentExpr[selectionStart - 1];
        if (")!\u03C0xyze".indexOf(prevChar) >= 0) {
            insertStr(multiplyChar + "0.");
            return true;
        }
        else if ("+-\u00D7\u00F7*/^(".indexOf(prevChar) >= 0) {
            insertStr("0.");
            return true;
        }
        else {
            let i = selectionStart;
            while (i >= 0) {
                i--;
                const charAtI = currentExpr[i];
                if ("0123456789".indexOf(charAtI) < 0) {
                    if (charAtI === ".") {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    if (selectionStart <= 0) {
        insertStr("0.");
        return true;
    }
    if (!fromInput) {
        insertStr(".");
    }
}
function appendParen(p, fromInput) {
    if (!workerLoaded)
        return;
    if (p === "(") {
        const currentExpr = exprInput.value;
        const selectionStart = exprInput.selectionStart;
        const selectionEnd = exprInput.selectionEnd;
        let needMultiply = false;
        if (selectionStart > 0) {
            const prevChar = currentExpr[selectionStart - 1];
            if ("0123456789.)!\u03C0xyze".indexOf(prevChar) >= 0) {
                needMultiply = true;
            }
        }
        if (selectionStart !== selectionEnd) {
            if (needMultiply) {
                exprInput.value = currentExpr.substring(0, selectionStart) + multiplyChar + "(" + currentExpr.substring(selectionStart, selectionEnd) + ")" + currentExpr.substring(selectionEnd, currentExpr.length);
                exprInput.selectionStart = selectionStart + 2;
                exprInput.selectionEnd = selectionEnd + 2;
            }
            else {
                exprInput.value = currentExpr.substring(0, selectionStart) + "(" + currentExpr.substring(selectionStart, selectionEnd) + ")" + currentExpr.substring(selectionEnd, currentExpr.length);
                exprInput.selectionStart = selectionStart + 1;
                exprInput.selectionEnd = selectionEnd + 1;
            }
            onExprChange();
            return true;
        }
        if (needMultiply) {
            insertStr(multiplyChar + "(");
            return true;
        }
    }
    if (!fromInput) {
        insertStr(p);
    }
}
function appendOperator(op, fromInput) {
    if (!workerLoaded)
        return;
    if (op === "!") {
        if (!fromInput) {
            insertStr(op);
        }
        return false;
    }
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    if (selectionStart > 0) {
        const prevChar = currentExpr[selectionStart - 1];
        if (op === "-") {
            if (prevChar === "+") {
                exprInput.selectionStart = selectionStart - 1;
            }
            else if ("-\u00D7\u00F7*/^".indexOf(prevChar) >= 0) {
                insertStr("(" + op);
                return true;
            }
        }
        else if (CONFIG_POWER && op === "*" && prevChar === '*') {
            exprInput.selectionStart = selectionStart - 1;
            insertStr("^");
            return true;
        }
        else {
            if (selectionStart > 0 && "+-\u00D7\u00F7*/^".indexOf(prevChar) >= 0) {
                exprInput.selectionStart = selectionStart - 1;
                insertStr(op);
                return true;
            }
        }
    }
    if (!fromInput) {
        insertStr(op);
    }
}
function appendConst(c) {
    if (!workerLoaded)
        return;
    checkEnterNewExpr();
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    if (selectionStart > 0) {
        const prevChar = currentExpr.charAt(selectionStart - 1);
        if ("0123456789.)!\u03C0xyze".indexOf(prevChar) >= 0) {
            insertStr(multiplyChar + c);
            return;
        }
    }
    insertStr(c);
}
function appendFunction(fn) {
    if (!workerLoaded)
        return;
    checkEnterNewExpr();
    const currentExpr = exprInput.value;
    const selectionStart = exprInput.selectionStart;
    if (selectionStart > 0) {
        const prevChar = currentExpr.charAt(selectionStart - 1);
        if ("0123456789.)!\u03C0xyze".indexOf(prevChar) >= 0) {
            insertStr(multiplyChar + fn + "(");
            return;
        }
    }
    insertStr(fn + "(");
}
function registerFunction(fun) {
    getElementById("fun_" + fun).addEventListener("click", () => {
        appendFunction(fun);
        focusExpression();
    });
}
function onDel(fromInput) {
    if (!workerLoaded)
        return;
    if (fromInput)
        return false;
    const selectionStart = exprInput.selectionStart;
    const selectionEnd = exprInput.selectionEnd;
    if (selectionStart === selectionEnd) {
        if (selectionStart > 0) {
            const currentExpr = exprInput.value;
            exprInput.value = currentExpr.substring(0, selectionStart - 1) + currentExpr.substring(selectionEnd, currentExpr.length);
            exprInput.selectionStart = exprInput.selectionEnd = selectionStart - 1;
            onExprChange();
        }
    }
    else {
        insertStr("");
    }
}
function onClear() {
    if (!workerLoaded)
        return;
    if (workerBusy) {
        reInitWorker();
        buttonCalc.innerText = "=";
    }
    exprInput.value = "";
    clearResult();
}
refreshInverseButton();
if (CONFIG_SW_INV) {
    buttonInv.addEventListener("click", inverseClick);
}
refreshModeButton();
buttonMode.addEventListener("click", modeClick);
numButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
        appendDigit(idx);
        focusExpression();
    });
});
getElementById("num_point").addEventListener("click", () => {
    appendPoint();
    focusExpression();
});
getElementById("op_add").addEventListener("click", () => {
    appendOperator("+");
    focusExpression();
});
getElementById("op_sub").addEventListener("click", () => {
    appendOperator("-");
    focusExpression();
});
getElementById("op_mul").addEventListener("click", () => {
    appendOperator(multiplyChar);
    focusExpression();
});
getElementById("op_div").addEventListener("click", () => {
    appendOperator(divideChar);
    focusExpression();
});
if (CONFIG_POWER) {
    getElementById("op_pow").addEventListener("click", () => {
        appendOperator("^");
        focusExpression();
    });
}
if (CONFIG_FUNCTION_PANEL) {
    if (CONFIG_FACT) {
        getElementById("op_fact").addEventListener("click", () => {
            appendOperator("!");
            focusExpression();
        });
    }
    if (CONFIG_PI) {
        getElementById("const_pi").addEventListener("click", () => {
            appendConst("\u03C0");
            focusExpression();
        });
    }
    if (CONFIG_E) {
        getElementById("const_e").addEventListener("click", () => {
            appendConst("e");
            focusExpression();
        });
    }
    if (CONFIG_SW_BRACKETS) {
        getElementById("op_lparen").addEventListener("click", () => {
            appendParen("(");
            focusExpression();
        });
        getElementById("op_rparen").addEventListener("click", () => {
            appendParen(")");
            focusExpression();
        });
    }
    if (CONFIG_SQRT) {
        getElementById("op_sqrt").addEventListener("click", () => {
            appendFunction("sqrt");
            focusExpression();
        });
    }
    if (CONFIG_TRIG) {
        registerFunction("sin");
        registerFunction("cos");
        registerFunction("tan");
    }
    if (CONFIG_TRIG_INV) {
        registerFunction("asin");
        registerFunction("acos");
        registerFunction("atan");
    }
    if (CONFIG_LN) {
        registerFunction("ln");
    }
    if (CONFIG_LOG) {
        registerFunction("log");
    }
    if (CONFIG_EXP) {
        registerFunction("exp");
    }
    if (CONFIG_POW10) {
        getElementById("fun_10pow").addEventListener("click", () => {
            insertStr("10^");
            focusExpression();
        });
    }
    getElementById("fun_percent").addEventListener("click", () => {
        insertStr("/100");
        focusExpression();
    });
    if (CONFIG_CBRT) {
        getElementById("op_cbrt").addEventListener("click", () => {
            insertStr("^(1/3)");
            focusExpression();
        });
    }
}
else {
    const funPanel = document.querySelector(".grid-fun");
    if (funPanel)
        funPanel.remove();
}
getElementById("but_del").addEventListener("click", () => {
    onDel();
    focusExpression();
});
getElementById("but_clr").addEventListener("click", () => {
    onClear();
    focusExpression();
});
if (CONFIG_FUNCTION_PANEL && CONFIG_HYP) {
    muiPlugin.onSinhButtonClick = () => {
        appendFunction("sinh");
        focusExpression();
    };
    muiPlugin.onCoshButtonClick = () => {
        appendFunction("cosh");
        focusExpression();
    };
    muiPlugin.onTanhButtonClick = () => {
        appendFunction("tanh");
        focusExpression();
    };
}
if (CONFIG_FUNCTION_PANEL && CONFIG_HYP_INV) {
    muiPlugin.onASinhButtonClick = () => {
        appendFunction("asinh");
        focusExpression();
    };
    muiPlugin.onACoshButtonClick = () => {
        appendFunction("acosh");
        focusExpression();
    };
    muiPlugin.onATanhButtonClick = () => {
        appendFunction("atanh");
        focusExpression();
    };
}
if (CONFIG_FUNCTION_PANEL && CONFIG_SW_HYP) {
    muiPlugin.onHypButtonClick = hypClick;
}
if (CONFIG_FUNCTION_PANEL && CONFIG_SW_INV) {
    muiPlugin.onInvButtonClick = inverseClick;
}
buttonCalc.addEventListener("click", calculateResult);
exprInput.addEventListener("input", onExprChange);
exprInput.addEventListener("keydown", (e) => {
    if (!workerLoaded) {
        e.preventDefault();
        return;
    }
    const key = e.key;
    switch (key) {
        case "Backspace":
            if (onDel(true))
                e.preventDefault();
            break;
        case "Enter":
        case "=":
            e.preventDefault();
            calculateResult();
            break;
        case "(":
        case ")":
            if (CONFIG_SW_BRACKETS && appendParen(key, true))
                e.preventDefault();
            break;
        case ".":
            if (appendPoint(true))
                e.preventDefault();
            break;
        case "+":
        case "-":
            if (appendOperator(key, true))
                e.preventDefault();
            break;
        case "*":
            if (appendOperator(multiplyChar, true))
                e.preventDefault();
            break;
        case "/":
            if (appendOperator(divideChar, true))
                e.preventDefault();
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (appendDigit(Number(key), true))
                e.preventDefault();
            break;
    }
});
if (CONFIG_UI_COPY_RESULT) {
    copyButton.addEventListener("click", () => copyResult(false, false));
}
if (CONFIG_UI_COPY_TRUNC) {
    copyTruncatedButton.addEventListener("click", () => copyResult(false, true));
}
function copyOrSaveInteger(save) {
    const content = resultString.substring(0, pointIndex);
    if (save) {
        if (CONFIG_UI_SAVE_RESULT) {
            saveText(content, "output_integer.txt");
        }
    }
    else if (CONFIG_UI_COPY_INTEGER) {
        const showAlert = (message) => {
            showMessage(crL10N["copied"] || "Copied", message, () => message);
        };
        copyText(content);
        showAlert((crL10N["integerCopied"] || "Integer part has been copied (length:") + (content.length) + ")");
    }
}
if (CONFIG_UI_COPY_INTEGER) {
    copyIntegerButton.addEventListener("click", () => copyOrSaveInteger(false));
}
if (CONFIG_UI_SAVE_RESULT) {
    saveButton.addEventListener("click", () => {
        if (muiPlugin.showSaveOption) {
            const exact = (digitMax === 0 && precisionCurrent === 0) || (digitMax !== INTEGER_MAX && precisionCurrent >= digitMax);
            muiPlugin.showSaveOption(exact);
        }
        else {
            copyResult(true, false);
        }
    });
    muiPlugin.onSaveClick = (option) => {
        switch (option) {
            case "exact":
                copyResult(true, false);
                break;
            case "truncated":
                copyResult(true, true);
                break;
            case "integer":
                copyOrSaveInteger(true);
                break;
        }
    };
}
if (CONFIG_UI_SIMPLIFY) {
    simplifyButton.addEventListener("click", () => {
        if (hasResult && isResultSimplifiable) {
            worker.postMessage({
                type: "toNiceString",
                id: lastCalculateId,
                uid: ++lastCalculateUid,
            });
        }
    });
}
if (CONFIG_UI_SPEED_SCROLL) {
    speedUpButton.addEventListener("click", () => {
        switch (speedUpFactor) {
            case 1:
                speedUpFactor = 4;
                speedUpButton.classList.add("button-link-select1");
                break;
            case 4:
                speedUpFactor = 9;
                speedUpButton.classList.remove("button-link-select1");
                speedUpButton.classList.add("button-link-select2");
                break;
            case 9:
                speedUpFactor = 1;
                speedUpButton.classList.remove("button-link-select2");
                break;
        }
    });
}
if (!ENABLE_VARIABLES) {
    let varButton = getElementById("but_var");
    varButton.disabled = true;
    varButton.innerText = "";
}
getElementById("but_var").addEventListener("click", () => {
    if (!ENABLE_VARIABLES || !workerLoaded)
        return;
    gridOps.classList.add("grid-hide");
    gridVar.classList.remove("grid-hide");
    focusExpression();
});
getElementById("var_close").addEventListener("click", () => {
    if (!workerLoaded)
        return;
    gridOps.classList.remove("grid-hide");
    gridVar.classList.add("grid-hide");
    focusExpression();
});
function registerVariable(name) {
    getElementById("var_in_" + name).addEventListener("click", () => {
        if (!ENABLE_VARIABLES || !workerLoaded)
            return;
        throw new Error("Not yet implemented");
    });
    getElementById("var_out_" + name).addEventListener("click", () => {
        if (!ENABLE_VARIABLES || !workerLoaded)
            return;
        appendConst(name);
        focusExpression();
    });
}
registerVariable("x");
registerVariable("y");
registerVariable("z");
function disallowScroll(element) {
    let eLastScrollLeft = 0;
    let eHaveFocus = false;
    element.addEventListener("scroll", () => {
        let lastScrollLeft = eLastScrollLeft;
        eLastScrollLeft = element.scrollLeft;
        if (element.scrollLeft === 0 && !eHaveFocus && lastScrollLeft !== 0) {
            element.scrollLeft = lastScrollLeft;
        }
    });
    element.addEventListener("focus", () => {
        eHaveFocus = true;
        if (element === exprInput) {
            needEnterNewExpr = false;
        }
    });
    element.addEventListener("blur", () => {
        eHaveFocus = false;
    });
}
disallowScroll(exprInput);
exprInput.addEventListener("pointerdown", () => {
    needEnterNewExpr = false;
});
function onCalculatorResize() {
    chWidth = measureDiv.getBoundingClientRect().width / 4;
    let newDisplayWidth = floor(calculatorDiv.clientWidth / chWidth);
    if (newDisplayWidth !== displayWidth) {
        displayWidth = newDisplayWidth;
        if (hasResult) {
            showScrolledResult();
        }
    }
}
new ResizeObserver(onCalculatorResize).observe(calculatorDiv);
onCalculatorResize();
function registerScroll() {
    const SCROLL_TICK = 40;
    let isDown = false;
    let downType = "";
    let downX = 0;
    let lastDownX = 0;
    let downScrollOffset = 0;
    let lastTimestamp = 0;
    let lastSpeed = 0;
    let lastInterval = -1;
    let animationDx = 0;
    function timedScroll() {
        if (!hasResult)
            return;
        if (scroller.computeScrollOffset()) {
            let newDx = animationDx + scroller.getCurrX();
            let offsetCh = calc_round(newDx / chWidth);
            let newScrollOffset = calc_max(0, downScrollOffset - offsetCh);
            if (newScrollOffset !== scrollOffset) {
                scrollOffset = newScrollOffset;
                showScrolledResult();
            }
            lastInterval = requestAnimationFrame(timedScroll);
        }
    }
    function mouseDown(e) {
        if (workerLoaded && hasResult && resultScrollable) {
            e.preventDefault();
            if (e.type === "touchstart") {
                downX = e.touches[0].screenX;
            }
            else if (!isDown) {
                downX = e.screenX;
                resultDiv.setPointerCapture(e.pointerId);
            }
            downType = e.type;
            cancelAnimationFrame(lastInterval);
            lastDownX = downX;
            downScrollOffset = scrollOffset;
            lastTimestamp = e.timeStamp;
            lastSpeed = 0;
            isDown = true;
            resultDiv.focus({ preventScroll: true });
            if (!resultDiv.classList.contains("result-movable-active")) {
                resultDiv.classList.add("result-movable-active");
            }
        }
    }
    function mouseMove(e) {
        if (isDown) {
            e.preventDefault();
            let moveX;
            let offsetX;
            if (e.type === "touchmove" && downType === "touchstart") {
                moveX = e.touches[0].screenX;
            }
            else if (e.type === "pointermove" && downType === "pointerdown") {
                moveX = e.screenX;
            }
            else {
                return;
            }
            offsetX = moveX - downX;
            let offsetCh = calc_round(offsetX * speedUpFactor / chWidth);
            let offsetTime = e.timeStamp - lastTimestamp;
            if (offsetTime >= SCROLL_TICK) {
                lastTimestamp = e.timeStamp;
                lastSpeed = (moveX - lastDownX) * 1000 / offsetTime;
                lastDownX = moveX;
            }
            let newScrollOffset = calc_max(0, downScrollOffset - offsetCh);
            if (newScrollOffset !== scrollOffset) {
                scrollOffset = newScrollOffset;
                showScrolledResult();
            }
        }
    }
    function mouseUp(e) {
        if (isDown) {
            if (e.type === "pointerup" && downType === "pointerdown") {
                resultDiv.releasePointerCapture(e.pointerId);
            }
            else if (!(downType === "touchstart" && (e.type === "touchend" || e.type === "touchcancel"))) {
                return;
            }
            e.preventDefault();
            const offsetX = lastDownX - downX;
            animationDx = offsetX - calc_round(offsetX / chWidth) * chWidth;
            isDown = false;
            downX = 0;
            downScrollOffset = scrollOffset;
            if (calc_abs(lastSpeed) > chWidth) {
                scroller.abortAnimation();
                scroller.fling(0, 0, lastSpeed * speedUpFactor, 0, INTEGER_MIN, INTEGER_MAX, 0, 0);
                if (calc_abs(scroller.getFinalX()) > chWidth) {
                    lastInterval = requestAnimationFrame(timedScroll);
                }
            }
            resultDiv.classList.remove("result-movable-active");
        }
    }
    const P = { passive: false };
    resultDiv.addEventListener("touchstart", mouseDown, P);
    resultDiv.addEventListener("pointerdown", mouseDown, P);
    resultDiv.addEventListener("touchmove", mouseMove, P);
    resultDiv.addEventListener("pointermove", mouseMove, P);
    resultDiv.addEventListener("touchend", mouseUp, P);
    resultDiv.addEventListener("pointerup", mouseUp, P);
    resultDiv.addEventListener("touchcancel", mouseUp, P);
    resultDiv.addEventListener("wheel", (e) => {
        if (workerLoaded && hasResult && resultScrollable) {
            cancelAnimationFrame(lastInterval);
            e.preventDefault();
            let delta = e.deltaX + e.deltaY;
            let offsetCh = calc_round(delta * speedUpFactor / chWidth);
            let newScrollOffset = calc_max(0, scrollOffset + offsetCh);
            if (newScrollOffset !== scrollOffset) {
                scrollOffset = newScrollOffset;
                showScrolledResult();
            }
        }
    });
    resultDiv.addEventListener("keydown", (e) => {
        let newScrollOffset;
        switch (e.key) {
            case "ArrowLeft":
            case "ArrowUp":
                e.preventDefault();
                newScrollOffset = calc_max(0, scrollOffset - (e.ctrlKey ? 1 : 4) * speedUpFactor);
                if (newScrollOffset !== scrollOffset) {
                    scrollOffset = newScrollOffset;
                    showScrolledResult();
                }
                break;
            case "ArrowRight":
            case "ArrowDown":
                e.preventDefault();
                newScrollOffset = calc_max(0, scrollOffset + (e.ctrlKey ? 1 : 4) * speedUpFactor);
                if (newScrollOffset !== scrollOffset) {
                    scrollOffset = newScrollOffset;
                    showScrolledResult();
                }
                break;
            case "PageDown":
                e.preventDefault();
                newScrollOffset = calc_max(0, scrollOffset + displayWidth * speedUpFactor);
                if (newScrollOffset !== scrollOffset) {
                    scrollOffset = newScrollOffset;
                    showScrolledResult();
                }
                break;
            case "PageUp":
                e.preventDefault();
                newScrollOffset = calc_max(0, scrollOffset - displayWidth * speedUpFactor);
                if (newScrollOffset !== scrollOffset) {
                    scrollOffset = newScrollOffset;
                    showScrolledResult();
                }
                break;
        }
    });
}
if (CONFIG_SCROLLING) {
    registerScroll();
}
if (!CONFIG_UI_NO_KEYBOARD) {
    exprInput.inputMode = "";
}
window.calcMuiPlugin = muiPlugin;
addEventListener("message", (e) => {
    if (e.data === "hypRendered") {
        hypRendered = true;
        changeHypButtonIfNeeded();
    }
    else if (e.data === "simplifyRendered") {
        simplifyRendered = true;
        changeResultUIVisibility();
    }
    else if (e.data === "invRendered") {
        invRendered = true;
        refreshInverseButton();
    }
});
if (CONFIG_IS_ONLINE) {
    if (!location.toString().startsWith("file:")) {
        fetch("/counter.js").then((result) => {
            if (result.ok) {
                result.text().then((content) => {
                    Function(content)();
                }).catch((e) => {
                    console.error(e);
                });
            }
            else {
                console.error("Error: counter.js status=" + result.status);
            }
        }).catch((e) => {
            console.error(e);
        });
    }
}
if (CONFIG_IS_ONLINE) {
    fetch("/calc_mui.js").then((result) => {
        if (result.ok) {
            result.text().then((content) => {
                Function(content)();
            }).catch((e) => {
                console.error(e);
            });
        }
        else {
            console.error("Error: calc_mui.js status=" + result.status);
        }
    }).catch((e) => {
        console.error(e);
    });
}

/******/ })()
;