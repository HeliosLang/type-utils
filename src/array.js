import { assert, expect } from "./generic.js"
import { isNumber } from "./number.js"
import { isString } from "./string.js"

/**
 * @import { Assert, NotifyOnFalse, Check, Expect } from "./index.js"
 */

/**
 * @template T
 * @overload
 * @param {Check<T>} checkItem
 * @returns {Check<T[]>}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @returns {input is T[]}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @param {NotifyOnFalse} onFalse
 * @returns {input is T[]}
 */
/**
 * @template T
 * @param {[Check<T>] | [unknown, Check<T>] | [unknown, Check<T>, NotifyOnFalse]} args
 */
export function isArray(...args) {
    if (args.length == 1) {
        const [checkItem] = args

        /**
         * @type {Check<T[]>}
         */
        return (input, msg = undefined) => {
            return isArray(input, checkItem, msg)
        }
    } else {
        const [input, checkItem, onFalse] = args

        if (Array.isArray(input)) {
            if (
                input.some(
                    (input, i) =>
                        !checkItem(
                            input,
                            onFalse ? (r) => onFalse(`[${i}]: ${r}`) : undefined
                        )
                )
            ) {
                return false
            } else {
                return true
            }
        } else {
            if (onFalse) {
                onFalse("not an array")
            }
            return false
        }
    }
}

/**
 * @template T
 * @overload
 * @param {Check<T>} checkItem
 * @returns {Assert<T[]>}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @returns {asserts input is T[]}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @param {string | undefined} msg
 * @returns {asserts input is T[]}
 */
/**
 * @template T
 * @param {[Check<T>] | [unknown, Check<T>] | [unknown, Check<T>, string | undefined]} args
 */
export function assertArray(...args) {
    if (args.length == 1) {
        const [checkItem] = args

        /**
         * @type {Assert<T[]>}
         */
        return (input, msg = undefined) => {
            assertArray(input, checkItem, msg)
        }
    } else {
        const [input, checkItem, msg] = args

        assert(input, isArray(checkItem), msg)
    }
}

/**
 * @template T
 * @overload
 * @param {Check<T>} checkItem
 * @returns {Expect<T[]>}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @returns {T[]}
 */
/**
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} checkItem
 * @param {string | undefined} msg
 * @returns {T[]}
 */
/**
 * @template T
 * @param {[Check<T>] | [unknown, Check<T>] | [unknown, Check<T>, string | undefined]} args
 */
export function expectArray(...args) {
    if (args.length == 1) {
        const [checkItem] = args

        /**
         * @type {Expect<T[]>}
         */
        return (input, msg = undefined) => {
            return expectArray(input, checkItem, msg)
        }
    } else {
        const [input, checkItem, msg] = args

        return expect(input, isArray(checkItem), msg)
    }
}

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is number[]}
 */
export function isNumberArray(input, onFalse = undefined) {
    return isArray(input, isNumber, onFalse)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {number[]}
 */
export function expectNumberArray(input, msg = undefined) {
    return expect(input, isNumberArray, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is string[]}
 */
export function assertNumberArray(input, msg = undefined) {
    return assert(input, isNumberArray, msg)
}

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is string[]}
 */
export function isStringArray(input, onFalse = undefined) {
    return isArray(input, isString, onFalse)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {string[]}
 */
export function expectStringArray(input, msg = undefined) {
    return expect(input, isStringArray, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is string[]}
 */
export function assertStringArray(input, msg = undefined) {
    return assert(input, isStringArray, msg)
}
