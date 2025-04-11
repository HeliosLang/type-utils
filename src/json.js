import { assert, expect } from "./generic.js"

/**
 * @import { JsonSafe, NotifyOnFalse } from "./index.js"
 */

/**
 * `JSON` must be imported explicitly in order to override default JSON namespace
 * @namespace {JSON}
 */
export const JSONSafe = {
    /**
     * @param {string} text
     * @param {((this: any, key: string, value: any) => any) | undefined} [reviver]
     * @returns {JsonSafe}
     */
    parse: (text, reviver = undefined) => {
        return JSON.parse(text, reviver)
    },
    /**
     *
     * @param {JsonSafe} value
     * @param {((this: any, key: string, value: any) => any) | undefined} [replacer]
     * @param {string | number | undefined} [space]
     * @returns
     */
    stringify: (value, replacer = undefined, space = undefined) => {
        return JSON.stringify(value, replacer, space)
    }
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
