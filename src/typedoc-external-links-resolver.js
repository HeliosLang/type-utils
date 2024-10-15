import * as fs from "node:fs"
import { Converter } from "typedoc"

/**
 * @import { Application } from "typedoc"
 */

/**
 * @param {Application} app
 */
export function load(app) {
    app.converter.on(Converter.EVENT_RESOLVE, () => {
        // read the current package.json file
        const packageConfig = JSON.parse(
            fs.readFileSync("./package.json").toString()
        )

        app.converter.addUnknownSymbolResolver((ref) => {
            if (
                ref.moduleSource &&
                ref.moduleSource != packageConfig.name &&
                ref.moduleSource.startsWith("@helios-lang/")
            ) {
                // link format: `docs.helios-lang.io/api/<package-name>/<version>/<symbol-type>/<symbol-name>.html

                // eg. "@helios-lang/type-utils"
                const packageName = ref.moduleSource.split("/")[1]

                // get the version from package.json (full format)
                const packageVersion =
                    packageConfig.dependencies[ref.moduleSource]

                const symbolType = ref.symbolReference?.meaning?.keyword

                const symbolName = ref.symbolReference?.meaning?.label

                if (packageName && packageVersion && symbolType && symbolName) {
                    return `https://docs.helios-lang.io/api/${packageName}/${packageVersion}/${symbolType}s/${symbolName}.html`
                }
            }

            return undefined
        })
    })
}
