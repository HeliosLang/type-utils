declare global {
    type Option<T> = null | undefined | T
}

export const None: null
export function isNone<T>(option: Option<T>): option is (null | undefined)
export function isSome<T>(option: Option<T>): option is T
