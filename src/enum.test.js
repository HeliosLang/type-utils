import { describe, it } from "node:test"
import { assertEnum } from "./enum.js"
import { isObject } from "./object.js"
import { isString } from "./string.js"
import { isNumber } from "./number.js"
import { assert } from "./generic.js"
import { throws } from "node:assert"

describe(assertEnum.name, () => {
    const raw = '{"Mint": {"user": "admin", "timestamp": 0}}'
    const obj = JSON.parse(raw)

    /**
     * @type {import("./generic.js").Assert<{Mint: {user: string, timestamp: string}} | {Burn: string}>}
     */
    const a = assertEnum({
        Mint: assert(
            isObject({
                user: isString,
                timestamp: isNumber
            })
        ),
        Burn: assert(isString)
    })

    it("ok for correct object", () => {
        a(obj)

        obj
    })

    it("fails for bad object", () => {
        throws(() => a({ Burn: 0 }))
    })
})
