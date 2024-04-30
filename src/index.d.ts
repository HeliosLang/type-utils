declare global {
    type Option<T> = null | undefined | T
    type Either<L, R> = { left: L } | { right: R } // use right to represent a correct value, left for errors
    type JsonSafe =
        | (string | number | boolean | null)
        | JsonSafe[]
        | { [key: string]: JsonSafe }
}

export const None: null
export function allOrNone<T>(list: Option<T>[]): Option<T[]>
export function expectSome<T>(option: Option<T>, msg?: string): T
export function isNone<T>(option: Option<T>): option is null | undefined
export function isSome<T>(option: Option<T>): option is T

export function expectLeft<L, R>(either: Either<L, R>, msg?: string): L
export function expectRight<L, R>(either: Either<L, R>, msg?: string): R
export function isLeft<L, R>(either: Either<L, R>): either is { left: L }
export function isRight<L, R>(either: Either<L, R>): either is { right: R }

type Assert<O = unknown> = (
    input: unknown,
    msg?: string | undefined
) => asserts input is O
type EnumFromAsserts<A extends Record<string, Assert>, K> = K extends string
    ? { [K_ in K]: A[K] extends Assert<infer O> ? O : never }
    : never
export function expectEnum<A extends Record<string, Assert>>(
    input: unknown,
    assertT: A,
    msg: string | undefined = undefined
): asserts input is EnumFromAsserts<A, keyof A>

/**
 * Must be imported explicitly in order to override default JSON namespace
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

export function isJsonSafe(input: unknown): input is JsonSafe
export function expectJsonSafe(
    input: unknown,
    msg?: string | undefined
): asserts input is JsonSafe
