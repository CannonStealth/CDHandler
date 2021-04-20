import { Client, Collection, Message } from "discord.js";
import ms from "ms";
import loading from './load/load-commands';
import features from './load/load-features';
import events from './load/load-events';
import fireMessage from './message/message';
import loadDefaultCommands from './defaults/load-commands';
import colour from "cdcolours";

interface CDHandler {
    client: Client,
    pingReply?: boolean,
    category?: string,
    devs?: string[],
    prefix?: string,
    defaults?: boolean
    commandsDir?: string | boolean
    eventsDir?: string | boolean
    featuresDir?: string | boolean
    warnings?: boolean
    };

    type CDH = {
      commandsDir?: string
      eventsDir?: string
      featuresDir?: string
      defaults?: boolean
      prefix?: string
      category?: string
      pingReply?: boolean
      devs?: string[] | undefined
      warnings?: boolean

    }
    

    class CDHandler {

      private _prefix = "!"
      private _warnings = false;

      public commands: Collection<string, Record<string, any>> = new Collection()
      public aliases: Collection<string[], Record<string, any>> = new Collection()
      public prefixes: Collection<string, Record<string, any>> = new Collection()
      public categories: Collection<string, string[]> = new Collection()
      public disabled: Collection<any, any> = new Collection()
      public cd: Collection<string, number> = new Collection()

      private static _pingReply = true
      private static _defaults = true
      private static _category = "Misc"
      private static _commandsDir = "commands"
      private static _eventsDir = "events"
      private static _featuresDir = "features"

     
          constructor(client: Client, options?: CDH) {

          this.client = client;
          this.pingReply = options?.pingReply === false ? options.pingReply : CDHandler._pingReply;
          this.category = options?.category ? options.category : CDHandler._category;
          this.devs = options?.devs ?? [];

          if (options?.warnings) this._warnings = true


          if (options?.prefix) this._prefix = options.prefix
  
          this.defaults = options?.defaults ? options.defaults : CDHandler._defaults;

          if (this._warnings) console.log(colour("[CDHandler] ", { textColour: "magenta" }) + " CoffeeScript support isn't stable.")
    
          if (options?.commandsDir) {
            loading((options.commandsDir || CDHandler._commandsDir), this.commands, this.aliases, this.categories, this.category);
            fireMessage(this, this.client, this._prefix, this.pingReply, this.commands, this.aliases, this.prefixes, this.devs, this.cd);
          }
    
          if (this.defaults) { 
            if (options?.commandsDir) loadDefaultCommands(this.commands, this.aliases, this.categories, this.category);
          }
    
          if (options?.eventsDir) {
            events(this.client, (options.eventsDir || CDHandler._eventsDir));
          }
    
          if (options?.featuresDir) {
            features(this.client, (options.featuresDir || CDHandler._featuresDir));
          }
        }
    
        cooldown(message: Message, timer: string | number) {
          let time;
    
            if (typeof timer == 'string')
              time = ms(timer);
            else time = timer * 1000;
        
            let prefix: any = this.prefix
            prefix = this.prefixes.get(message.guild!.id) ?? prefix ?? null;
            if (!prefix || prefix == null) prefix = this.prefix;
    
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmdName = args.shift();
            // @ts-ignore
            const cmd = this.commands.get(cmdName.toLowerCase()) ?? this.commands.get(this.aliases.get(cmdName.toLowerCase())) ?? null;
            if (cmd == null) return;
    
            const name = cmd.name;
    
            this.cd.set(name + message.guild!.id + message.author!.id, Date.now() + time);
        }
    }
    
    
export default CDHandler