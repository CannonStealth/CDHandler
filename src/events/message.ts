import colour from "cdcolours";
import ms from "ms";
import { Client, Collection, MessageEmbed } from "discord.js";

const lockedEmbed = new MessageEmbed()
.setTitle('🔒 Command Locked')
.setDescription("You can't use this command now, please try again later")

export default (handler: any, client: Client, defaultPrefix: string, ping: boolean, commands: Collection<string, Record<string, any>>, aliases: Collection<string[], Record<string, any>>, prefixes: Collection<string, Record<string, any>>, devs: string[], cd: any) => {

    client.on('message', async message => {

        let prefix: any = [] 
        if (typeof defaultPrefix == 'string') prefix.push(defaultPrefix)
        else prefix = prefix.concat(defaultPrefix)

        if (message.author.bot || message.channel.type == 'dm') return;
        const { author, member, content, guild } = message

        if (!author || !member || !content || !guild) return;

        prefix = prefixes.get(message.guild!.id) || prefix || null;

        if (prefix == null) return

        if (typeof prefix == 'string') prefix = [prefix]

            if(message.content.trim() == `<@!${client.user!.id}>` && ping) {
        
            if (typeof prefix == 'string' || !prefix[1]) return message.channel.send(`My prefix for **${message.guild!.name}** is \`${typeof prefix == 'string' ? prefix : prefix.join(' ')}\``)
            else return message.channel.send(`My prefixes for **${message.guild!.name}** are \`${prefix.join('\`, \`')}\``)
            }
 
        prefix.forEach(async (p: string) => {

        if (!message.content.startsWith(p)) return

        if (message.channel.type == 'dm') return false;

        const args = message.content.slice(p.length).trim().split(/ +/g)
        const cmdName = args.shift();
        const command = `${p.toLowerCase()}${cmdName?.toLowerCase()}`;

        // @ts-ignore
        const cmd: any = commands.get(cmdName.toLowerCase()) || commands.get(aliases.get(cmdName.toLowerCase())) || null
        if (cmd) {

        if (content.toLowerCase().startsWith(`${command} `) || content.toLowerCase() === command) {

        const {
            cooldownMessage,
            dev = false,
            devMessage,
            locked = false,
            lockedMessage = lockedEmbed,
            nsfw = false,
            nsfwMessage = "Run this command in a SFW channel!",
            permissions,
            permissionsMessage = "You don't have permissions to execute this command",
            minArgs = -1,
            maxArgs = null,
            argsMessage = "Incorrect usage!",
            botPermissions,
            botPermissionsMessage = "Make sure to give me permissions before executing this command",
            fire,
            callback,
            run,
            execute,
            servers = [],
            serversMessage = "This command isn't allowed in this server.",
           } = cmd

           if (servers[0] && !servers.includes(message.guild!.id)) {
           if (serversMessage) {
           return message.channel.send(serversMessage)
           } else return false;
        }

           if (locked) {
               if (lockedMessage) {
                   message.channel.send(lockedMessage)
                   return;
                } else return;
               return;
           }

           if (dev && devs.length && !devs.includes(message.author.id)) {
              if (devMessage) {
                  message.channel.send(devMessage)
                  return;
              } else return;
              return;
           }

           if (nsfw && !message.channel.nsfw) {
            if (nsfwMessage) {
                message.channel.send(nsfwMessage)
                return;
            } else return;
            return;
         }

         const cooldown = cd.get(cmd.name + message.guild!.id + message.author!.id) ?? null
           if (cooldown && (Number(cooldown) > Date.now())) {
               const remaining: number = Number(cooldown) - Date.now()
               remaining.toFixed(2)
               if (remaining > 0) {
                   if (cooldownMessage) {

                       message.channel.send(cooldownMessage.replace('{REMAINING}', ms(remaining)))
                       return;
                   } else { 
                    const cooldownEmbed = new MessageEmbed()
                    .setTitle("⏲️ Calm down you're in a cooldown!")
                    .setDescription(`Wait ${remaining} more to execute this command again`)
                       return message.channel.send(cooldownEmbed); 
                    }
               }
           }

         if (permissions && permissions.length && !message.member!.permissions.has(permissions)) {
             if (permissionsMessage) {
                 message.channel.send(permissionsMessage)
                 return;
             } else return;
         }

         if (!message.channel.permissionsFor(client.user!.id)!.has(botPermissions)) {
            if (botPermissionsMessage) {
                message.channel.send(botPermissionsMessage)
                return;
            } else return;
        }

         if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
             message.channel.send(argsMessage)
             return;
         }
                 
                 
         if (cmd.slash && typeof cmd.slash == 'string' && cmd.slash.toLowerCase() == 'both') {

            let result = [];
            let r;
            let running = cmd.run ? cmd.run : cmd.fire ? cmd.fire : cmd.execute ? cmd.execute : cmd.callback ? cmd.callback : null
            if (running == null) throw new Error(colour("[CDHANDLER] [ERROR]", { textColour: "red" }) + " Missing run function in " + cmd.name);
            else r = await running({ message, args, client, handler })
            if (typeof running == "string" || typeof running == "number") result = [running]
            else result = [...running]

            if (result && result[0]) {
                result?.forEach((r: any) => {
                message.channel.send(r)
            }) 

            } else {
                message.channel.send(r)
                return false;
            }
            return false;

         } else {

         if (fire) {
           fire({ message, args, client, handler })
           return;
         } else if (callback) {
            callback({ message, args, client, handler })
            return;
         } else if (run) {
            run({ message, args, client, handler })
            return;
         }  else if (execute) {
            execute({ message, args, client, handler })
            return;
         } else {
             throw new Error(colour("[CDHANDLER] [ERROR]", { textColour: "red" }) + " Missing run function in " + cmd.name);
         }
        }

        
      
    } else return false;
} 
return false;
})
})
}