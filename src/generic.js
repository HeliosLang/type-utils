export {}

/**
 * @template T
 * @typedef {(input: unknown, msg?: string | undefined) => asserts input is T} Assert
 */

/**
 * @typedef {((reason: string) => void) | undefined} NotifyOnFalse
 */
/**
 * @template T
 * @typedef {(input: unknown, onFalse?: NotifyOnFalse) => input is T} Check
 */

/**
 * @template T
 * @typedef {(input: unknown, msg?: string | undefined) => T} Expect
 */

/**
 * @template T
 * @overload
 * @param {Check<T>} check
 * @returns {Assert<T>}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} check
 * @returns {asserts input is T}
 *
 * @overload
 * @param {boolean} condition
 * @param {string | undefined} msg
 * @returns {asserts condition is true}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} check
 * @param {string | undefined} msg
 * @returns {asserts input is T}
 *
 * @template T
 * @param {[Check<T>] | [unknown, Check<T>] | [boolean, string | undefined] | [unknown, Check<T>, string | undefined]} args
 */
export function assert(...args) {
    if (args.length == 1) {
        const [check] = args
        /**
         * @type {Assert<T>}
         */
        return (input, msg = undefined) => {
            assert(input, check, msg)
        }
    } else {
        const [input, check, msg] = args

        if (typeof check == "function") {
            /**
             * @type {string | undefined}
             */
            let reason = undefined
            if (
                check(input, (r) => {
                    reason = r
                })
            ) {
                return
            } else {
                throw new TypeError(msg ?? reason)
            }
        } else if (args.length == 2 && typeof input == "boolean") {
            const msg = check

            if (!input) {
                throw new Error(msg ?? "unexpected")
            }
        } else {
            throw new Error("unexpected assert() arguments")
        }
    }
}

/**
 * @template T
 * @param {Assert<T> | Expect<T>} assertOrExpect
 * @returns {Check<T>}
 */
export function check(assertOrExpect) {
    /**
     * @type {Check<T>}
     */
    return (input, onFalse = undefined) => {
        try {
            assertOrExpect(input)
            return true
        } catch (e) {
            if (onFalse) {
                onFalse(e.message)
            }
            return false
        }
    }
}

/**
 * @template T
 * @overload
 * @param {Check<T>} check
 * @returns {Expect<T>}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} check
 * @returns {T}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {Check<T>} check
 * @param {string | undefined} msg
 * @returns {T}
 *
 * @template T
 * @param {[Check<T>] | [unknown, Check<T>] | [unknown, Check<T>, string | undefined]} args
 */
export function expect(...args) {
    if (args.length == 1) {
        const [check] = args

        /**
         * @type {Expect<T>}
         */
        return (input, msg = undefined) => {
            return expect(input, check, msg)
        }
    } else {
        const [input, check, msg] = args

        /**
         * @type {string | undefined}
         */
        let reason = undefined
        if (
            check(input, (r) => {
                reason = r
            })
        ) {
            return input
        } else {
            throw new TypeError(msg ?? reason)
        }
    }
}

/**
 * @template T
 * @overload
 * @param {T} output
 * @returns {Check<T>}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {T} output
 * @returns {input is T}
 *
 * @template T
 * @overload
 * @param {unknown} input
 * @param {T} output
 * @param {NotifyOnFalse} onFalse
 * @returns {input is T}
 *
 * @template T
 * @param  {[T] | [unknown, T] | [unknown, T, NotifyOnFalse]} args
 */
export function isExactly(...args) {
    if (args.length == 1) {
        const [output] = args
        /**
         * @type {Check<T>}
         */
        return (input, onFalse = undefined) => {
            return isExactly(input, output, onFalse)
        }
    } else {
        const [input, output, onFalse] = args

        if (input === output) {
            return true
        } else {
            if (onFalse) {
                onFalse("not exactly what is expected")
            }

            return false
        }
    }
}

/**
 * @template {Array<Check<any>>} T
 * @typedef {T extends Array<Check<infer I>> ? I : never} ToOneOf
 */

/**
 * @template {Array<Check<any>>} T
 * @param {[...T]} checkVariants
 * @returns {Check<ToOneOf<T>>}
 */
export function isOneOf(checkVariants) {
    /**
     * @type {Check<ToOneOf<T>>}
     */
    return (input, onFalse = undefined) => {
        return checkVariants.some((check) => check(input, onFalse))
    }
}
