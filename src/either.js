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