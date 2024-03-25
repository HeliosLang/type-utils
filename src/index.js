/**
 * @type {null}
 */
export const None = null

/**
 * @template T
 * @param {Option<T>} option
 * @param {string} msg
 * @returns {T}
 */
export function expectSome(option, msg = `unexpected ${option}`) {
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
