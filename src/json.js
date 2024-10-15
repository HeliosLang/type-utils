import { assert, expect } from "./generic.js"

/**
 * @typedef {import("./generic.js").NotifyOnFalse} NotifyOnFalse
 */

/**
 * Not quite the same as the actually exported type in index.d.ts because JSDoc isn't as permissive for circular-references within the same typedef
 * @typedef {(
 *   | (string | number | boolean | null)
 *   | { [key: number]: JsonSafe }
 *   | { [key: string]: JsonSafe }
 * )} JsonSafe
 */

export const JSONSafe = {
    parse: JSON.parse,
    stringify: JSON.stringify
}

/**
 * @param {unknown} input
 * @param {NotifyOnFalse} onFalse
 * @returns {input is JsonSafe}
 */
export function isJsonSafe(input, onFalse = undefined) {
    if (typeof input == "number") {
        return true
    } else if (typeof input == "string") {
        return true
    } else if (typeof input == "boolean") {
        return true
    } else if (input === null) {
        return true
    } else if (Array.isArray(input)) {
        return input.every((item, i) =>
            isJsonSafe(item, onFalse ? (r) => onFalse(`[${i}]${r}`) : undefined)
        )
    } else if (typeof input == "object") {
        return Object.keys(input).every((key) =>
            isJsonSafe(
                input[key],
                onFalse ? (r) => onFalse(`.${key}${r}`) : undefined
            )
        )
    } else {
        if (onFalse) {
            onFalse(
                ": not number | string | boolean | null nor Array/Record thereof"
            )
        }
        return false
    }
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is JsonSafe}
 */
export function assertJsonSafe(input, msg = undefined) {
    return assert(input, isJsonSafe, msg)
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {JsonSafe}
 */
export function expectJsonSafe(input, msg = undefined) {
    return expect(input, isJsonSafe, msg)
}
