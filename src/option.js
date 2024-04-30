/**
 * @type {null}
 */
export const None = null

/**
 * @template T
 * @param {Option<T>[]} list
 * @returns {Option<T[]>}
 */
export function allOrNone(list) {
    return list.every(isSome) ? /** @type {any} */ (list) : None
}

/**
 * @template T
 * @param {Option<T>} option
 * @param {string} msg
 * @returns {T}
 */
export function expectSome(
    option,
    msg = `expected Option.some, got ${option}`
) {
    if (option !== null && option !== undefined) {
        return option
    } else {
        throw new Error(msg)
    }
}

/**
 * @template T
 * @param {Option<T>} option
 * @returns {opt is T}
 */
export function isSome(option) {
    return option !== null && option !== undefined
}

/**
 * @template T
 * @param {Option<T>} option
 * @returns {opt is (null | undefined)}
 */
export function isNone(option) {
    return option === null || option === undefined
}
