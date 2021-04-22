import { Client, Collection, Message } from "discord.js";
interface CDHandler {
    client: Client;
    pingReply?: boolean;
    category?: string;
    devs?: string[];
    prefix?: string;
    defaults?: boolean;
    commandsDir?: string | boolean;
    eventsDir?: string | boolean;
    featuresDir?: string | boolean;
}
declare type CDH = {
    commandsDir?: string;
    eventsDir?: string;
    featuresDir?: string;
    defaults?: boolean;
    prefix?: string;
    category?: string;
    pingReply?: boolean;
    devs?: string[] | undefined;
    warnings?: boolean;
    mongo?: string;
};
declare class CDHandler {
    private _warnings;
    commands: Collection<string, Record<string, any>>;
    aliases: Collection<string[], Record<string, any>>;
    prefixes: Collection<string, Record<string, any>>;
    categories: Collection<string, string[]>;
    slash: Collection<string, Record<string, any>>;
    disabled: Collection<any, any>;
    cd: Collection<string, number>;
    private static _pingReply;
    private static _defaults;
    private static _category;
    private static _commandsDir;
    private static _eventsDir;
    private static _featuresDir;
    constructor(client: Client, options?: CDH);
    cooldown(message: Message, timer: string | number): void;
}
export default CDHandler;
//# sourceMappingURL=CDHandler.d.ts.map