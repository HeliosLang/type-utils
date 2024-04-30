/**
 * @template [O=unknown]
 * @typedef {(input: unknown, msg?: string | undefined) => asserts input is O} Assert
 */

/**
 * @template {Record<string, Assert>} A
 * @template K
 * @typedef {K extends string ? {[K_ in K]: (A[K] extends Assert<infer O> ? O : never)} : never} EnumFromAsserts
 */

/**
 * @template {Record<string, Assert>} A
 * @param {unknown} input
 * @param {A} assertT
 * @param {string | undefined} msg
 * @returns {asserts input is EnumFromAsserts<A, keyof A>}
 */
export function expectEnum(input, assertT, msg = undefined) {
    if (input instanceof Object) {
        const keys = Object.keys(input)

        if (keys.length != 1) {
            throw new TypeError(msg ?? "invalid enum")
        }

        const [key] = keys
        const [value] = input[key]

        const a = assertT[key]

        if (!a) {
            throw new TypeError(`invalid enum variant ${key}`)
        }

        try {
            ;/** @type {any} */ (a)(value)
        } catch (e) {
            throw new TypeError(msg ?? e.toString())
        }
    } else {
        throw new TypeError(msg ?? "invalid enum")
    }
}
