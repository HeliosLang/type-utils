export { assert, check, expect, isExactly, isOneOf } from "./generic.js"
export {
    assertArray,
    expectArray,
    isArray,
    assertNumberArray,
    expectNumberArray,
    isNumberArray,
    assertStringArray,
    expectStringArray,
    isStringArray
} from "./array.js"
export { assertBoolean, expectBoolean, isBoolean } from "./boolean.js"
export { expectLeft, expectRight, isLeft, isRight } from "./either.js"
export { assertEnum } from "./enum.js"
export {
    JSONSafe as JSON,
    assertJsonSafe,
    expectJsonSafe,
    isJsonSafe
} from "./json.js"
export { assertNumber, expectNumber, isNumber } from "./number.js"
export { isObject } from "./object.js"
export {
    allOrUndefined,
    expectDefined,
    isUndefined,
    isDefined
} from "./option.js"
export {
    assertString,
    expectString,
    isString,
    isFormattedString
} from "./string.js"
export { isTuple } from "./tuple.js"

/**
 * Use right to represent a correct value, left for errors
 * @template L
 * @template R
 * @typedef {{ left: L } | { right: R }} Either
 */

/**
 * @typedef {(
 *   | (string | number | boolean | null)
 *   | { [key: number]: JsonSafe }
 *   | { [key: string]: JsonSafe }
 * )} JsonSafe
 */

/**
 * @template T
 * @typedef {(input: unknown, msg?: string | undefined) => asserts input is T} Assert
 */

/**
 * @typedef {((reason: string) => void) | undefined} NotifyOnFalse
 */

/**
 * @template T
 * @typedef {(input: unknown, onFalse?: NotifyOnFalse) => input is T} Check
 */

/**
 * @typedef {(s: string) => boolean} CheckFormat
 */

/**
 * @template T
 * @typedef {(input: unknown, msg?: string | undefined) => T} Expect
 */

/**
 * @template {Record<string, Assert<any>>} A
 * @template K
 * @typedef {K extends string ? {[K_ in K]: (A[K] extends Assert<infer O> ? O : never)} : never} ToEnum
 */

/**
 * @template {{[key: string]: Check<any>}} T
 * @typedef {{[I in keyof T]: T[I] extends Check<infer C> ? C : never}} ToObject
 */

/**
 * @template {Array<Check<any>>} T
 * @typedef {T extends Array<Check<infer I>> ? I : never} ToOneOf
 */

/**
 * @template {Array<Check<any>>} T
 * @typedef {{[I in keyof T]: T[I] extends Check<infer Ti> ? Ti : never}} ToTuple
 */

/**
 * TypeSchema is a JSON-safe representation of any data-like type in the Helios language
 * This schema is used to correctly convert JS objects into UplcData and vice versa
 * @typedef {(
 *  InternalTypeSchema
 *  | ReferenceTypeSchema
 *  | TupleTypeSchema
 *  | ListTypeSchema
 *  | MapTypeSchema
 *  | OptionTypeSchema
 *  | StructTypeSchema
 *  | EnumTypeSchema
 *  | VariantTypeSchema
 * )} TypeSchema
 */

/**
 * @typedef {{
 *   kind: "internal"
 *   name: string
 * }} InternalTypeSchema
 */

/**
 * References are used to resolve recursive type structures (e.g. trees)
 * @typedef {{
 *   kind: "reference"
 *   id: string
 * }}ReferenceTypeSchema
 */

/**
 * @typedef {{
 *   kind: "tuple"
 *   itemTypes: TypeSchema[]
 * }} TupleTypeSchema
 */

/**
 * @typedef {{
 *   kind: "list"
 *   itemType: TypeSchema
 * }} ListTypeSchema
 */

/**
 * @typedef {{
 *   kind: "map"
 *   keyType: TypeSchema
 *   valueType: TypeSchema
 * }} MapTypeSchema
 */

/**
 * @typedef {{
 *   kind: "option"
 *   someType: TypeSchema
 * }} OptionTypeSchema
 */

/**
 * @typedef {{
 *   kind: "struct"
 *   name: string
 *   id: string
 *   format: "singleton" | "list" | "map"
 *   fieldTypes: FieldTypeSchema[]
 * }} StructTypeSchema
 */

/**
 * Enums can only contain variants, but variants themselves are treated as standalone types
 * @typedef {{
 *   kind: "enum"
 *   name: string
 *   id: string
 *   variantTypes: VariantTypeSchema[]
 * }} EnumTypeSchema
 */

/**
 * @typedef {{
 *   kind: "variant"
 *   name: string
 *   id: string
 *   tag: number
 *   fieldTypes: FieldTypeSchema[]
 * }} VariantTypeSchema
 */

/**
 * `name` is used as fallback if `key` is expected
 * @typedef {{
 *   name: string
 *   key?: string
 *   type: TypeSchema
 * }} FieldTypeSchema
 */

/**
 * Use this to assert that one type extends another, without needing values
 * @template A
 * @template {A} B
 * @typedef {never} AssertExtends
 */

/**
 * @template A
 * @template B
 * @typedef {(A extends B
 *   ? B extends A
 *       ? import("./internal.js").MakeAllFieldsMandatory<A> extends import("./internal.js").MakeAllFieldsMandatory<B>
 *           ? import("./internal.js").MakeAllFieldsMandatory<B> extends import("./internal.js").MakeAllFieldsMandatory<A>
 *               ? true
 *               : false
 *           : false
 *       : false
 *   : false
 * )} IsSame
 */

/**
 * Use `AssertTrue<IsSame<A, B>>` when copying type verbatim so that they look better in the generated docs, but when you still want to assure that the types remains equal to the internal type
 * @template {true} T
 * @typedef {never} AssertTrue
 */

/**
 * @template T
 * @typedef {T extends (arg0: infer A) => any ? A : never} FirstArgType
 */

/**
 * @template T
 * @typedef {T extends (arg0: any, arg1: infer B) => any ? B : never} SecondArgType
 */

/**
 * @template T
 * @typedef {T extends (arg0: any, arg1: any, arg2: infer C) => any ? C : never} ThirdArgType
 */

/**
 * @template T
 * @typedef {T extends (arg0: any, arg1: any, arg2: any, arg3: infer D) => any ? D : never} FourthArgType
 */

/**
 * @template T
 * @typedef {T extends () => infer R ? R : never} ReturnType
 */

/**
 * @template {any[]} T
 * @typedef {T extends [infer E] ? E : T} UnwrapSingleton
 */
