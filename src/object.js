/**
 * @import { Check, NotifyOnFalse, ToObject } from "./index.js"
 */

/**
 * @template {{[key: string]: Check<any>}} T
 * @overload
 * @param {T} checkProperties
 * @returns {Check<ToObject<T>>}
 */
/**
 * @template {{[key: string]: Check<any>}} T
 * @overload
 * @param {unknown} input
 * @param {T} checkProperties
 * @returns {input is ToObject<T>}
 */
/**
 * @template {{[key: string]: Check<any>}} T
 * @overload
 * @param {unknown} input
 * @param {T} checkProperties
 * @param {NotifyOnFalse} onFalse
 * @returns {input is ToObject<T>}
 */
/**
 * @template {{[key: string]: Check<any>}} T
 * @param {[T] | [unknown, T] | [unknown, T, NotifyOnFalse]} args
 */
export function isObject(...args) {
    if (args.length == 1) {
        const [checkProperties] = args

        /**
         * @type {Check<ToObject<T>>}
         */
        return (input, onFalse = undefined) => {
            return isObject(input, checkProperties, onFalse)
        }
    } else {
        const [input, checkProperties, onFalse] = args

        if (!(input instanceof Object)) {
            if (onFalse) {
                onFalse("not an object")
            }
            return false
        } else {
            for (let key in checkProperties) {
                const checkProp = checkProperties[key]

                if (!(key in input)) {
                    if (onFalse) {
                        onFalse(`property ${key} not defined`)
                    }
                    return false
                }

                if (
                    !checkProp(
                        /** @type {any} */ (input)[key],
                        onFalse ? (r) => onFalse(`.${key}: ${r}`) : undefined
                    )
                ) {
                    return false
                }
            }

            return true
        }
    }
}
