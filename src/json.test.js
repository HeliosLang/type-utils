import { strictEqual, throws } from "node:assert"
import { describe, it } from "node:test"
import { assert, expect } from "./generic.js"
import { assertJsonSafe, expectJsonSafe, isJsonSafe } from "./json.js"

/**
 * @import { Assert, JsonSafe } from "./index.js"
 */

describe(expectJsonSafe.name, () => {
    it("ok for null", () => {
        strictEqual(expectJsonSafe(null), null)
    })

    it("ok for null using expect(check)", () => {
        const res = expect(isJsonSafe)(null)
        strictEqual(res, null)
    })

    it("ok for null using expect(input, check)", () => {
        const res = expect(null, isJsonSafe)
        strictEqual(res, null)
    })

    it("fails for undefined", () => {
        throws(() => expectJsonSafe(undefined))
    })

    it("fails for undefined using assertJsonSafe()", () => {
        throws(() => {
            /**
             * @type {unknown}
             */
            const x = undefined

            assertJsonSafe(x)

            /**
             * @satisfies {JsonSafe}
             */
            x
        })
    })

    it("fails for undefined using assert(check)", () => {
        throws(() => {
            /**
             * @type {unknown}
             */
            const x = undefined

            /**
             * The type of `a` must be explicitly set, this is a limitation of using assertions in typescript
             * @type {Assert<JsonSafe>}
             */
            const a = assert(isJsonSafe)

            a(x)

            /**
             * @satisfies {JsonSafe}
             */
            x
        })
    })

    it("fails for undefined using assert(input, check)", () => {
        throws(() => {
            /**
             * @type {unknown}
             */
            const x = undefined

            assert(x, isJsonSafe)

            /**
             * @satisfies {JsonSafe}
             */
            x
        })
    })
})
