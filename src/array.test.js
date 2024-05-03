import { describe, it } from "node:test"
import { strictEqual, throws } from "node:assert"
import { assertArray, isArray } from "./array.js"
import { isString } from "./string.js"

describe(isArray.name, () => {
    it("true for empty array [] using isString", () => {
        const a = []

        strictEqual(isArray(a, isString), true)
    })

    it("false for [[]] using isString", () => {
        const a = [[]]

        strictEqual(isArray(a, isString), false)
    })
})

describe(assertArray.name, () => {
    it("fails for nested array using isString", () => {
        const a = [[]]
        throws(() => assertArray(a, isString))
    })
})
