/**
 * @typedef {import("./generic.js").NotifyOnFalse} NotifyOnFalse
 */

import { assert, expect } from "./generic.js"

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is string}
 */
export function isString(input, onFalse = undefined) {
    if (typeof input == "string") {
        return true
    } else {
        if (onFalse) {
            onFalse(`not a string`)
        }
        return false
    }
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 */
export function assertString(input, msg = undefined) {
    assert(input, isString, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {string}
 */
export function expectString(input, msg = undefined) {
    return expect(input, isString, msg)
}
