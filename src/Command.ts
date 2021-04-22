import { Message } from "discord.js";

type CommandOptions = {
  
    name: string,
    aliases?: string[],
    cooldown?: string | number,
    category?: string,
    cooldownMessage?: string,
    minArgs?: number,
    maxArgs?: number,
    argsMessage?: string,
    description?: string,
    usage?: string,
    example?: string,
    dev?: boolean,
    devMessage?: string,
    nsfw?: boolean,
    nsfwMessage?: string,
    permissions?: string[],
    permissionsMessage?: string,
    botPermissions?: string[],
    botPermissionsMessage?: string,
    locked?: boolean,
    lockedMessage?: string,
    hidden?: boolean,
    hidden2?: boolean,
    fire?: any,
    run?: any,
    execute?: any,
    callback?: any,
    slash?: boolean | string,
    servers?: string[]
    type?: number,
    serversMessage?: string
}


interface Command {
    name: string,
    aliases?: string[],
    cooldown?: string | number,
    category?: string,
    cooldownMessage?: string,
    minArgs?: number,
    maxArgs?: number | null,
    argsMessage?: string,
    description?: string,
    usage?: string,
    example?: string,
    dev?: boolean,
    devMessage?: string,
    nsfw?: boolean,
    nsfwMessage?: string,
    permissions?: string[],
    permissionsMessage?: string,
    botPermissions?: string[],
    botPermissionsMessage?: string,
    locked?: boolean,
    lockedMessage?: string,
    hidden?: boolean,
    hidden2?: boolean,
    fire?: any,
    run?: any,
    execute?: any,
    callback?: any,
    slash?: boolean | string,
    servers?: string[]
    type?: number,
    serversMessage?: string
    }

class Command {
  constructor({
    name,
    aliases,
    cooldown,
    category = "Misc",
    cooldownMessage,
    minArgs,
    maxArgs,
    argsMessage,
    description,
    usage,
    example,
    dev,
    devMessage,
    nsfw,
    nsfwMessage,
    permissions,
    permissionsMessage,
    botPermissions,
    botPermissionsMessage,
    locked,
    lockedMessage,
    hidden,
    hidden2,
    fire,
    run,
    execute,
    callback,
    slash,
    servers,
    type,
    serversMessage,
  }: CommandOptions) {

    this.nsfw = nsfw
    this.dev = dev
    this.devMessage = devMessage;
    this.category = category || "Misc";
    this.name = name;
    this.aliases = aliases;
    this.description = description;
    this.usage = usage;
    this.nsfwMessage = nsfwMessage;
    this.example = example;
    this.cooldown = cooldown;
    this.cooldownMessage = cooldownMessage;
    this.permissions = permissions;
    this.permissionsMessage = permissionsMessage;
    this.minArgs = minArgs ?? -1;
    this.maxArgs = maxArgs ?? null;
    this.argsMessage = argsMessage;
    this.run = run;
    this.callback = callback;
    this.execute = execute;
    this.fire = fire;
    this.hidden = hidden;
    this.hidden2 = hidden2;
    this.locked = locked;
    this.lockedMessage = lockedMessage;
    this.botPermissions = botPermissions;
    this.botPermissionsMessage = botPermissionsMessage;
    this.slash = slash;
    this.servers = servers
    this.type = type
    this.serversMessage = serversMessage
  }
};

export { CommandOptions };
export default Command