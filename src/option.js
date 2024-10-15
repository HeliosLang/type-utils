/**
 * @template T
 * @param {(T | null | undefined)[]} list
 * @returns {T[] | undefined}
 */
export function allOrUndefined(list) {
    return list.every(isDefined) ? /** @type {any} */ (list) : undefined
}

/**
 * @template T
 * @param {T | null | undefined} x
 * @param {string | undefined} msg
 * @returns {T}
 */
export function expectDefined(x, msg = undefined) {
    if (x !== null && x !== undefined) {
        return x
    } else {
        throw new TypeError(msg ?? `expected Option.some, got None`)
    }
}

/**
 * @template T
 * @param {T | null | undefined} x
 * @returns {x is T}
 */
export function isDefined(x) {
    return x !== null && x !== undefined
}

/**
 * @template T
 * @param {T | undefined} x
 * @returns {x is undefined}
 */
export function isUndefined(x) {
    return x === undefined
}
