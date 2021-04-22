import { join } from 'path';
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

                const event = (await import(join(process.cwd(), dir, file))).default
                const name = file.split(".")[0];
                client.on(name, event.bind(null, client));

                console.log(colour("[CDHandler]", { textColour: "green" }) + ` Loading event ${name}`);

                
            } else if (file.endsWith(".coffee") || file.endsWith(".js") && !file.endsWith(".d.ts")) {

                const even = require(join(process.cwd(), dir, file))
                const nam = file.split(".")[0];
                client.on(nam, even.bind(null, client));

                console.log(colour("[CDHandler]", { textColour: "green" }) + ` Loading event ${nam}`);

            } else continue;

        }}
}

export default load;