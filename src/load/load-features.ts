import { join } from "path";
import { readdirSync, lstatSync, existsSync, mkdirSync } from "fs";
import colour from 'cdcolours';
import { Client } from "discord.js";

const load = async (client: Client, dir: any) => {

    const exists = existsSync(join(process.cwd(), dir))
    if (!exists) { 
        console.warn(colour("[CDHandler]", { textColour: "red" }) + " Cannot find the folder " + dir + " creating one...")
        mkdirSync(dir, { recursive: true })
    }

    const files = readdirSync(join(dir))
    for (const file of files) {

        const isFolder = lstatSync(join(process.cwd(), dir, file))
        if (isFolder.isDirectory()) load(client, join(dir, file))
        else {

            if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
                (await import(join(process.cwd(), dir, file))).default(client);

                const name = file.split(".")[0];
                console.log(colour("[CDHandler]", { textColour: "magenta" }) + ` Loading feature ${name}`);

            } else if (file.endsWith(".coffee") || file.endsWith(".js") && !file.endsWith(".d.ts")) {

                require(join(process.cwd(), dir, file))(client);

                const nam = file.split(".")[0];
                console.log(colour("[CDHandler]", { textColour: "magenta" }) + ` Loading feature ${nam}`);

            } else continue;

        }}
}

export default load;