/**
 * @import { Assert, ToEnum } from "./index.js"
 */

/**
 * @template {Record<string, Assert<any>>} A
 * @param {A} checkVariants
 * @returns {Assert<ToEnum<A, keyof A>>}
 */
export function assertEnum(checkVariants) {
    /**
     * @type {Assert<ToEnum<A, keyof A>>}
     */
    return (input, msg = undefined) => {
        if (input instanceof Object) {
            const keys = Object.keys(input)

            if (keys.length != 1) {
                throw new TypeError(msg ?? "invalid enum")
            }

            const [key] = keys
            const value = input[key]

            /**
             * @type {any}
             */
            const a = checkVariants[key]

            if (!a) {
                throw new TypeError(`invalid enum variant ${key}`)
            }

            try {
                a(value)
            } catch (e) {
                throw new TypeError(msg ?? e.toString())
            }
        } else {
            throw new TypeError(msg ?? "invalid enum")
        }
    }
}
