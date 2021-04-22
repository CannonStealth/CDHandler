import { APIMessage, Collection, Client, MessageEmbed, DataResolver } from "discord.js"

export default (map: Collection<string, Record<string, any>>, client: Client, handler: any) => {

    client.ws.on('INTERACTION_CREATE' as any, async interaction => {

        const { options } = interaction.data

        let data: any = {
          content: undefined,
        }

        let toSend;

        let args: any = {}
        let number;
        let guild = client.guilds.cache.get(interaction.guild_id) || await client.guilds.fetch(interaction.guild_id)
        let member = guild.members.cache.get(interaction.member.user.id) || await guild.members.fetch(interaction.member.user.id)
        let user = member.user
        let channel = client.channels.cache.get(interaction.channel_id) || await client.channels.fetch(interaction.channel_id)

        const message = {
          guild,
          member,
          user,
          channel
        }

        if (options) {
          for (const option of options) {
            const { name, value } = option
            args[name] = value
          }
        }

        const cmd = map.get(interaction.data.id) ?? null
        if (cmd == null) {
           toSend = 'ERROR'
           number = 4
        } else { 
            number = cmd.type ? cmd.type : 4
            toSend = await cmd!.run({ message, args, client, handler, interaction })
        }

        if (typeof toSend == "object") {
          data = await createAPIMessage(client, interaction, toSend) as any

        } else {
          data.content = toSend
        }
       
        // @ts-ignore
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
          type: number,
          data
          }
        })
      })
}

const createAPIMessage = async (client: Client, interaction: any, content: any) => {
  const { data, files } = await APIMessage.create(
    client.channels.resolve(interaction.channel_id) as any,
    content
  )
    .resolveData()
    .resolveFiles();

  return { ...data, files };
};