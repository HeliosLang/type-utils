import { assert, expect } from "./generic.js"

/**
 * @import { NotifyOnFalse } from "./index.js"
 */

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is number}
 */
export function isNumber(input, onFalse = undefined) {
    if (typeof input == "number") {
        return true
    } else {
        if (onFalse) {
            onFalse("not a number")
        }

        return false
    }
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is number}
 */
export function assertNumber(input, msg = undefined) {
    return assert(input, isNumber, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {number}
 */
export function expectNumber(input, msg = undefined) {
    return expect(input, isNumber, msg)
}
