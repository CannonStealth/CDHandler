import * as fs from 'fs';
import Command, { CommandOptions } from "./Command";;
import CDHandler from "./CDHandler";

require.extensions[".coffee"] = (module, filename) =>

// @ts-ignore
    module._compile(
        require('coffeescript')
        .compile(
            fs.readFileSync(
                filename,
                {encoding:"utf8"}
            )
        ),
        filename
    )
;

export { Command, CDHandler };
export type { CommandOptions };