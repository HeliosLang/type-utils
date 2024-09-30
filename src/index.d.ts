declare global {
    type Option<T> = null | undefined | T
    type Either<L, R> = { left: L } | { right: R } // use right to represent a correct value, left for errors
    type JsonSafe =
        | (string | number | boolean | null)
        | JsonSafe[]
        | { [key: string]: JsonSafe }
}

export type NotifyOnFalse = ((reason: string) => void) | undefined
export type Assert<T> = (
    input: unknown,
    msg?: string | undefined
) => asserts input is T
export type Check<T> = (input: unknown, onFalse?: NotifyOnFalse) => input is T
export type Expect<T> = (input: unknown, msg?: string | undefined) => T

export function assert<T>(check: Check<T>): Assert<T>
export function assert<T>(
    input: unknown,
    check: Check<T>,
    msg?: string | undefined
): asserts input is T
export function assert(
    condition: boolean,
    msg?: string | undefined
): asserts condition is true
export function check<T>(assertOrExpect: Assert<T> | Expect<T>): Check<T>
export function expect<T>(
    input: unknown,
    check: Check<T>,
    msg?: string | undefined
): T
export function expect<T>(check: Check<T>): Expect<T>
export function isExactly<T>(output: T): Check<T>
export function isExactly<T>(
    input: unknown,
    output: T,
    onFalse?: NotifyOnFalse
): input is T
export function isOneOf<T extends Array<Check<any>>>(
    checkVariants: [...T]
): T extends Array<Check<infer I>> ? I : never

export function assertArray<T>(checkItem: Check<T>): Assert<T[]>
export function assertArray<T>(
    input: unknown,
    checkItem: Check<T>,
    msg?: string | undefined
): asserts input is T[]
export function expectArray<T>(checkItem: Check<T>): Expect<T[]>
export function expectArray<T>(
    input: unknown,
    checkItem: Check<T>,
    msg?: string | undefined
): T[]
export function isArray<T>(checkItem: Check<T>): Check<T[]>
export function isArray<T>(
    input: unknown,
    checkItem: Check<T>,
    onFalse?: NotifyOnFalse
): input is T[]

export function assertNumberArray(
    input: unknown,
    msg?: string | undefined
): asserts input is number[]
export function expectNumberArray(
    input: unknown,
    msg?: string | undefined
): number[]
export function isNumberArray(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is number[]

export function assertStringArray(
    input: unknown,
    msg?: string | undefined
): asserts input is string[]
export function expectStringArray(
    input: unknown,
    msg?: string | undefined
): string[]
export function isStringArray(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is string[]

export function assertBoolean(
    input: unknown,
    msg?: string | undefined
): asserts input is boolean
export function expectBoolean(input: unknown, msg?: string | undefined): boolean
export function isBoolean(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is boolean

export function expectLeft<L, R>(
    either: Either<L, R>,
    msg?: string | undefined
): L
export function expectRight<L, R>(
    either: Either<L, R>,
    msg?: string | undefined
): R
export function isLeft<L, R>(either: Either<L, R>): either is { left: L }
export function isRight<L, R>(either: Either<L, R>): either is { right: R }

type ToEnum<A extends Record<string, Assert<any>>, K> = K extends string
    ? { [K_ in K]: A[K] extends Assert<infer O> ? O : never }
    : never

export function assertEnum<A extends Record<string, Assert<any>>>(
    checkVariants: A
): Assert<ToEnum<A, keyof A>>

/**
 * `JSON` must be imported explicitly in order to override default JSON namespace
 */
export namespace JSON {
    function parse(
        text: string,
        reviver?: ((this: any, key: string, value: any) => any) | undefined
    ): JsonSafe
    function stringify(
        value: JsonSafe,
        replacer?: ((this: any, key: string, value: any) => any) | undefined,
        space?: string | number | undefined
    ): string
}

export function assertJsonSafe(
    input: unknown,
    msg?: string | undefined
): asserts input is JsonSafe
export function expectJsonSafe(
    input: unknown,
    msg?: string | undefined
): JsonSafe
export function isJsonSafe(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is JsonSafe

export function assertNumber(
    input: unknown,
    msg?: string | undefined
): asserts input is number
export function expectNumber(input: unknown, msg?: string | undefined): number
export function isNumber(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is number

type ToObject<T extends { [key: string]: Check<any> }> = {
    [I in keyof T]: T[I] extends Check<infer C> ? C : never
}

export function isObject<T extends { [key: string]: Check<any> }>(
    checkProperties: T
): Check<ToObject<T>>
export function isObject<T extends { [key: string]: Check<any> }>(
    input: unknown,
    checkProperties: T,
    onFalse?: NotifyFalse
): input is ToObject<T>

export const None: null
export function allOrNone<T>(list: Option<T>[]): Option<T[]>
export function expectSome<T>(option: Option<T>, msg?: string | undefined): T
export function isNone<T>(option: Option<T>): option is null | undefined
export function isSome<T>(option: Option<T>): option is T

export function assertString(
    input: unknown,
    msg?: string | undefined
): asserts input is string
export function expectString(input: unknown, msg?: string | undefined): string
export function isString(
    input: unknown,
    onFalse?: NotifyOnFalse
): input is string

type CheckFormat = (s: string) => boolean
export function isFormattedString(checkFormat: CheckFormat): Check<string>
export function isFormattedString(
    input: unknown,
    checkFormat: CheckFormat,
    onFalse?: NotifyOnFalse
): input is string

type ToTuple<T extends Array<Check<any>>> = {
    [I in keyof T]: T[I] extends Check<infer Ti> ? Ti : never
}
export function isTuple<T extends Array<Check<any>>>(
    checkItems: [...T]
): Check<ToTuple<T>>

/**
 * TypeSchema is a JSON-safe representation of any data-like type in the Helios language
 * This schema is used to correctly convert JS objects into UplcData and vice versa
 */
export type TypeSchema =
    | InternalTypeSchema
    | ReferenceTypeSchema
    | TupleTypeSchema
    | ListTypeSchema
    | MapTypeSchema
    | OptionTypeSchema
    | StructTypeSchema
    | EnumTypeSchema
    | VariantTypeSchema

export type InternalTypeSchema = {
    kind: "internal"
    name: string
}

/**
 * References are used to resolve recursive type structures (e.g. trees)
 */
export type ReferenceTypeSchema = {
    kind: "reference"
    id: string
}

export type TupleTypeSchema = {
    kind: "tuple"
    itemTypes: TypeSchema[]
}

export type ListTypeSchema = {
    kind: "list"
    itemType: TypeSchema
}

export type MapTypeSchema = {
    kind: "map"
    keyType: TypeSchema
    valueType: TypeSchema
}

export type OptionTypeSchema = {
    kind: "option"
    someType: TypeSchema
}

type CommonStructTypeSchema = {
    kind: "struct"
    name: string
    id: string
}

type PlainStructTypeSchema = CommonStructTypeSchema & {
    format: "singleton" | "list"
    fieldTypes: PlainStructFieldTypeSchema[]
}

type MapStructTypeSchema = CommonStructTypeSchema & {
    format: "map"
    fieldTypes: MapStructFieldTypeSchema[]
}

export type StructTypeSchema = PlainStructTypeSchema | MapStructTypeSchema

/**
 * Enums can only contain variants, but variants themselves are treated as standalone types
 */
export type EnumTypeSchema = {
    kind: "enum"
    name: string
    id: string
    variantTypes: VariantTypeSchema[]
}

export type VariantTypeSchema = {
    kind: "variant"
    name: string
    id: string
    tag: number
    fieldTypes: FieldTypeSchema[]
}

export type FieldTypeSchema = {
    name: string
    type: TypeSchema
}

export type PlainStructFieldTypeSchema = FieldTypeSchema
export type MapStructFieldTypeSchema = FieldTypeSchema & {
    key: string
}
