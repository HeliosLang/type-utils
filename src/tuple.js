/**
 * @typedef {import("./generic.js").NotifyOnFalse} NotifyOnFalse
 */

/**
 * @template T
 * @typedef {import("./generic.js").Check<T>} Check
 */

/**
 * @template {Array<Check<any>>} T
 * @typedef {{[I in keyof T]: T[I] extends Check<infer Ti> ? Ti : never}} ToTuple
 */

/**
 * Sadly overloading this doesn't seem to work
 * @template {Array<Check<any>>} T
 * @param {[...T]} checkItems
 * @returns {Check<ToTuple<T>>}
 */
export function isTuple(checkItems) {
    /**
     * @type {Check<ToTuple<T>>}
     */
    return (input, onFalse = undefined) => {
        if (!Array.isArray(input)) {
            if (onFalse) {
                onFalse("not an array")
            }
            return false
        } else if (input.length < checkItems.length) {
            if (onFalse) {
                onFalse(
                    `expected at least ${checkItems.length} items, got ${input.length} items`
                )
            }
            return false
        } else if (
            checkItems.some(
                (checkItem, i) =>
                    !checkItem(
                        input[i],
                        onFalse ? (r) => onFalse(`[${i}]: ${r}`) : undefined
                    )
            )
        ) {
            return false
        } else {
            return true
        }
    }
}
