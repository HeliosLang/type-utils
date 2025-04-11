import { assert, expect } from "./generic.js"

/**
 * @import { Check, CheckFormat, NotifyOnFalse } from "./index.js"
 */

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
 * @overload
 * @param {CheckFormat} checkFormat
 * @returns {Check<string>}
 */
/**
 * @overload
 * @param {unknown} input
 * @param {CheckFormat} checkFormat
 * @returns {input is string}
 */
/**
 * @overload
 * @param {unknown} input
 * @param {CheckFormat} checkFormat
 * @param {NotifyOnFalse} onFalse
 * @returns {input is string}
 */
/**
 * @param  {[CheckFormat] | [unknown, (s: string) => boolean] | [unknown, (s: string) => boolean, NotifyOnFalse]} args
 */
export function isFormattedString(...args) {
    if (args.length == 1) {
        const [checkFormat] = args

        /**
         * @type {Check<string>}
         */
        return (input, onFalse = undefined) => {
            return isFormattedString(input, checkFormat, onFalse)
        }
    } else {
        const [input, checkFormat, onFalse] = args

        if (isString(input, onFalse)) {
            if (!checkFormat(input)) {
                if (onFalse) {
                    onFalse("invalid format")
                }
            } else {
                return true
            }
        } else {
            return false
        }
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
