/**
 * @template T
 * @typedef {T extends object ? { [P in keyof T]-?: T[P] } : T} MakeAllFieldsMandatory
 */
