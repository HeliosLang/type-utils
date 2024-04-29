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
