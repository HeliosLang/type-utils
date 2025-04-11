/**
 * @import { Either } from "./index.js"
 */

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @param {string | undefined} msg
 * @returns {L}
 */
export function expectLeft(either, msg = undefined) {
    if ("left" in either) {
        return either.left
    } else {
        throw new TypeError(msg ?? `expected Either.left, got Either.right`)
    }
}

/**
 * @template L
 * @template R
 * @param {Either<L, R>} either
 * @param {string | undefined} msg
 * @returns {R}
 */
export function expectRight(either, msg = undefined) {
    if ("right" in either) {
        return either.right
    } else {
        throw new TypeError(msg ?? `expected Either.right, got Either.left`)
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
