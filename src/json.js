export const JSONSafe = {
    parse: JSON.parse,
    stringify: JSON.stringify
}

/**
 * @param {unknown} input
 * @returns {input is JsonSafe}
 */
export function isJsonSafe(input) {
    if (typeof input == "number") {
        return true
    } else if (typeof input == "string") {
        return true
    } else if (typeof input == "boolean") {
        return true
    } else if (input === null) {
        return true
    } else if (Array.isArray(input)) {
        return input.every(isJsonSafe)
    } else if (typeof input == "object") {
        return Object.keys(input).every((key) => isJsonSafe(input[key]))
    } else {
        return false
    }
}

/**
 * @param {unknown} input
 * @param {string | undefined} msg
 * @returns {asserts input is JsonSafe}
 */
export function expectJsonSafe(input, msg = undefined) {
    if (isJsonSafe(input)) {
        return
    } else {
        throw new TypeError(msg ?? "invalid JsonSafe value")
    }
}
