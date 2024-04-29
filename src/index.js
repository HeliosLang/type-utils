export { JSONSafe as JSON } from "./json.js"

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

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @param {string} msg
 * @returns {L}
 */
export function expectLeft(
    either,
    msg = `expected Either.left, got ${either}`
) {
    if ("left" in either) {
        return either.left
    } else {
        throw new Error(msg)
    }
}

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @param {string} msg
 * @returns {R}
 */
export function expectRight(
    either,
    msg = `expected Either.right, got ${JSON.stringify(either)}`
) {
    if ("right" in either) {
        return either.right
    } else {
        throw new Error(msg)
    }
}

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @returns {either is {left: L}}
 */
export function isLeft(either) {
    return "left" in either
}

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @returns {either is {right: R}}
 */
export function isRight(either) {
    return "right" in either
}