//import { Converter, ParameterType } from 'typedoc';

/**
 * @import { Application } from "typedoc"
 */

/**
 * @param {Application} app
 */
export function load(app) {
    app.converter.addUnknownSymbolResolver((ref) => {
        console.log("Attempting to resolve: ", ref)

        return undefined
    })
}
