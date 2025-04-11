import { assert, expect } from "./generic.js"

/**
 * @import { NotifyOnFalse } from "./index.js"
 */

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is boolean}
 */
export function isBoolean(input, onFalse = undefined) {
    if (typeof input == "boolean") {
        return true
    } else {
        if (onFalse) {
            onFalse("not a boolean")
        }

        return false
    }
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is boolean}
 */
export function assertBoolean(input, msg = undefined) {
    assert(input, isBoolean, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {boolean}
 */
export function expectBoolean(input, msg = undefined) {
    return expect(input, isBoolean, msg)
}
