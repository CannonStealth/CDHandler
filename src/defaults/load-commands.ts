import { join } from "path";
import { readdirSync, lstatSync, existsSync, mkdirSync } from "fs";
import colour from 'cdcolours';
import { Collection, Client } from "discord.js";

const loadDefaultCommands = async (Fcommands: Collection<string, Record<string, any>>, Faliases: Collection<string[], Record<string, any>>, Fcategories: any, Fcategory: string) => {

    const files = readdirSync(join(__dirname, 'commands'))
    
    if (!files) return;
    for (const file of files) {
    if (!file) return;

            if ((file.endsWith(".coffee") || file.endsWith(".js") || file.endsWith(".ts")) && !file.endsWith(".d.ts")) {

                const cmd = (await import(`./commands/${file}`)).default

                const command = Fcommands.get(cmd.name.toLowerCase()) ?? null

                if (cmd && cmd.name && command == null) {

                    // @ts-ignore
                    const aliases = Fcommands.get(Faliases.get(cmd.name.toLowerCase())) ?? null

                    if (aliases == null) {
            
                    Fcommands.set(cmd.name, cmd)
                    console.log(colour("[CDHandler]", { textColour: "cyan" }) + " Loading default command " + cmd.name)

                    if (cmd.aliases) {
                    for (const command of cmd.aliases) {
                        Faliases.set(command.toLowerCase(), cmd.name) 
                      }
                    }
                        let category = cmd.category || Fcategory
                 
                        let categoryGetter = Fcategories.get(category.toLowerCase())
                        if(!categoryGetter) categoryGetter = [category]
                        categoryGetter.push(cmd.name)
                    
                        Fcategories.set(category.toLowerCase(), categoryGetter)
                                          
                
            } else continue
            } else continue
    }
}
}

export default loadDefaultCommands;