import { Message, Client, Collection, MessageEmbed } from "discord.js";
const x = "`";
const invite = 'https://discord.com/oauth2/authorize?client_id={INVITE}&scope=bot&permissions=2147483647';

const blockedEmbed = new MessageEmbed()
.setTitle('\\🔒 Command Locked')
.setColor('YELLOW')

export default {
    name: 'help',
    description: 'Shows all commands or a specific command information',
    usage: '[command | category]',
    hidden2: true,
    disabled: true,
    fire: async ({ message, args, client, handler }: any) => { 


    let prefix = handler.prefixes.get(message.guild!.id) ?? null

    if(prefix == null) prefix = handler.prefix

    const allEmbed: MessageEmbed = new MessageEmbed()
    .setColor('GREEN')
    .setAuthor(`${message.guild!.name} Available Commands List`, message.guild!.iconURL()!)


    if(args[0]) getInfo(args[0].toLowerCase())
    else help()

    function getInfo(command: string) { 
        const cmd = handler.commands.get(command) ?? handler.commands.get(handler.aliases.get(command)!) ?? null
        if(cmd == null || cmd.hidden) return category() 

        if(cmd.locked) { 
          blockedEmbed.setDescription(`I'm sorry but ${args[0].toLowerCase()} is blocked at the moment`)
          return message.channel.send(blockedEmbed)
        }

        const infoEmbed = new MessageEmbed()
        .setTitle(`${cmd.name} Command Info`)
        .setColor(cmd.colour || 'GREEN')

        if (cmd.description) infoEmbed.addField('Description', x + cmd.description + x, false)
        if (cmd.usage) infoEmbed.addField('Usage', x + prefix + cmd.name + ' ' + cmd.usage + x, false)
        else infoEmbed.addField('Usage', x + prefix + cmd.name + x, false)
        if (cmd.example) infoEmbed.addField('Example', x + prefix + cmd.name + ' ' + cmd.example + x, false)
        else infoEmbed.addField('Example', x + prefix + cmd.name + x, false)

        infoEmbed.setFooter(`Requested by ${message.member!.displayName || message.author.username}`, message.author.displayAvatarURL())

            if(cmd.aliases || typeof cmd.aliases != 'undefined') infoEmbed.addField('Aliases', x + '❯ ' + cmd.aliases.join(',\n❯ ') + x, false)
            if(cmd.cooldown && cmd.cooldown != '0s') infoEmbed.addField('Cooldown', x + (cmd.cooldown || '0s') + x, false)
      
        return message.channel.send(infoEmbed)      
    }

function help() {
    let total = 0

handler.categories.forEach((category: string[]) => {

  let desc: string[] = []

  category.slice(1).forEach((cmd: string) => {
    let command = handler.commands.get(cmd.toLowerCase()) || null
    if(command == null) return
    if(command.locked) return
    if(command.hidden) return
    if(command.hidden2) return
    if(handler.disabled.get(message.guild!.id)) {
    if(handler.disabled.get(message.guild!.id).includes(command.name)) return
  }
    desc.push(cmd)
    total++
  })

  if(!desc[0]) return

 allEmbed.addField('**' + caps(category[0]) + '**', '`' + desc.join('`, `') + '`')
  
})

allEmbed
.setDescription(
  `${client.user!.username} total available commands: **${total}**
  [Invite Me](${invite.replace('${INVITE}', client.user!.id)})
  `)
.setThumbnail(client.user!.displayAvatarURL())
.setFooter(`Requested by ${message.member!.displayName || message.author.username}`, message.author.displayAvatarURL())
return message.channel.send(allEmbed)
}

function category() {

  const categoryEmbed = new MessageEmbed()
  .setColor('BLUE')
  .setFooter(`Requested by ${message.member!.displayName || message.author.username}`, message.author.displayAvatarURL())

  let desc: string = ' '.trim()
  let total: number = 0

  let category = handler.categories.get(args.join(' ').toLowerCase()) || null
  if (category == null) return help()


  category.slice(1).forEach((cmd: string) => {
    let command = handler.commands.get(cmd.toLowerCase()) || null
    if(command == null) return
    if(command.locked) return
    if(command.hidden) return 
    if(command.hidden2) return 
    if(handler.disabled.get(message.guild!.id)) {
      if(handler.disabled.get(message.guild!.id).includes(command.name)) return
    }
    let description;

    if (command.description) description = ' - ' + '`' + command.description + '`'
    else description = ' '
    desc += '**' + prefix + command.name + '**' + description + '\n'
    total++
  })

  if(total == 0) return help()

  categoryEmbed
  .setDescription(desc)

  .setAuthor(`${message.guild!.name} ${caps(category[0])} Available Commands (${total})`, message.guild!.iconURL()!)

  
  return message.channel.send(categoryEmbed)

}
    }}
    function caps(text: string) {
        const splited = text.toLowerCase().trim().split(/ +/g)

        let final: string[] = []
        splited.forEach((value: string) => {
            final.push(value.charAt(0).toUpperCase() + (value.substring(1) || ''))
        })

        return final.join(' ')
      }