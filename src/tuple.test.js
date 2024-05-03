import { describe, it } from "node:test"
import { isTuple } from "./tuple.js"
import { isNumber } from "./number.js"
import { isBoolean } from "./boolean.js"
import { strictEqual, throws } from "node:assert"
import { assert } from "./generic.js"

describe(isTuple.name, () => {
    it("[0, true] passes [isNumber, isBoolean]", () => {
        /**
         * @type {unknown}
         */
        const t = [0, true]

        const res = isTuple([isNumber, isBoolean])(t)

        if (res) {
            /**
             * @satisfies {[number, boolean]}
             */
            t
        }

        strictEqual(res, true)
    })

    it("[0, true] fails [isNumber, isNumber]", () => {
        strictEqual(isTuple([isNumber, isNumber])([0, true]), false)
    })

    it("[0, true] passes [isNumber]", () => {
        strictEqual(isTuple([isNumber])([0, true]), true)
    })

    it("[0, true] throws for assert() with [isNumber, isNumber]", () => {
        throws(() => {
            const t = [0, true]

            assert(t, isTuple([isNumber, isNumber]))

            /**
             * @satisfies {[number, number]}
             */
            t
        })
    })
})
