import { describe, it } from "node:test"
import { isExactly, isOneOf } from "./generic.js"
import { isString } from "./string.js"
import { isNumber } from "./number.js"
import { strictEqual } from "node:assert"

/**
 * @param  {...any} _args
 */
function unused(..._args) {}

describe(isExactly.name, () => {
    it("0 passes isExactly(0)", () => {
        /**
         * @type {unknown}
         */
        const x = 0

        const res = isExactly(x, 0)
        strictEqual(res, true)

        if (res) {
            unused(
                /**
                 * @satisfies {0}
                 */
                (x)
            )
        }
    })

    it("0 fails isExactly(null)", () => {
        /**
         * @type {unknown}
         */
        const x = 0

        const res = isExactly(x, null)
        strictEqual(res, false)

        if (res) {
            unused(
                /**
                 * @satisfies {null}
                 */
                (x)
            )
        }
    })
})

describe(isOneOf.name, () => {
    it("0 passes [isNumber, isString]", () => {
        /**
         * @type {unknown}
         */
        const x = 0

        const res = isOneOf([isNumber, isString])(x)
        strictEqual(res, true)

        if (res) {
            unused(
                /**
                 * @satisfies {string | number}
                 */
                (x)
            )
        }
    })
})
