import { describe, it } from "node:test"
import { isObject } from "./object.js"
import { isString } from "./string.js"
import { isNumber } from "./number.js"
import { strictEqual } from "node:assert"

/**
 * @param  {...any} _args
 */
function unused(..._args) {}

describe(isObject.name, () => {
    it(`passes for {a: string, b: number}`, () => {
        /**
         * @type {unknown}
         */
        const u = {
            a: "value",
            b: 12
        }

        const res = isObject(u, { a: isString, b: isNumber })

        if (res) {
            unused(
                /**
                 * @satisfies {{a: string, b: number}}
                 */
                (u)
            )
        }

        strictEqual(res, true)
    })

    it(`passes for {a: string, b: number, c: number} in two steps`, () => {
        /**
         * @type {unknown}
         */
        const u = {
            a: "value",
            b: 12,
            c: 13
        }

        const res = isObject(u, { a: isString, b: isNumber })

        strictEqual(res, true)

        if (res) {
            unused(
                /**
                 * @satisfies {{a: string, b: number}}
                 */
                (u)
            )

            const res2 = isObject(u, { c: isNumber })

            strictEqual(res2, true)

            if (res2) {
                unused(
                    /**
                     * @satisfies {string}
                     */
                    (u.a)
                )

                unused(
                    /**
                     * @satisfies {number}
                     */
                    (u.c)
                )
            }
        }
    })
})
