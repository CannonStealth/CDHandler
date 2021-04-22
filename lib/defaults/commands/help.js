"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var x = "`";
var invite = 'https://discord.com/oauth2/authorize?client_id={INVITE}&scope=bot&permissions=2147483647';
var blockedEmbed = new discord_js_1.MessageEmbed()
    .setTitle('\\🔒 Command Locked')
    .setColor('YELLOW');
exports.default = {
    name: 'help',
    description: 'Shows all commands or a specific command information',
    usage: '[command | category]',
    hidden2: true,
    disabled: true,
    fire: function (_a) {
        var message = _a.message, args = _a.args, client = _a.client, handler = _a.handler;
        return __awaiter(void 0, void 0, void 0, function () {
            function getInfo(command) {
                var _a, _b;
                var cmd = (_b = (_a = handler.commands.get(command)) !== null && _a !== void 0 ? _a : handler.commands.get(handler.aliases.get(command))) !== null && _b !== void 0 ? _b : null;
                if (cmd == null || cmd.hidden)
                    return category();
                if (cmd.locked) {
                    blockedEmbed.setDescription("I'm sorry but " + args[0].toLowerCase() + " is blocked at the moment");
                    return message.channel.send(blockedEmbed);
                }
                var infoEmbed = new discord_js_1.MessageEmbed()
                    .setTitle(cmd.name + " Command Info")
                    .setColor(cmd.colour || 'GREEN');
                if (cmd.description)
                    infoEmbed.addField('Description', x + cmd.description + x, false);
                if (cmd.usage)
                    infoEmbed.addField('Usage', x + prefix + cmd.name + ' ' + cmd.usage + x, false);
                else
                    infoEmbed.addField('Usage', x + prefix + cmd.name + x, false);
                if (cmd.example)
                    infoEmbed.addField('Example', x + prefix + cmd.name + ' ' + cmd.example + x, false);
                else
                    infoEmbed.addField('Example', x + prefix + cmd.name + x, false);
                infoEmbed.setFooter("Requested by " + (message.member.displayName || message.author.username), message.author.displayAvatarURL());
                if (cmd.aliases || typeof cmd.aliases != 'undefined')
                    infoEmbed.addField('Aliases', x + '❯ ' + cmd.aliases.join(',\n❯ ') + x, false);
                if (cmd.cooldown && cmd.cooldown != '0s')
                    infoEmbed.addField('Cooldown', x + (cmd.cooldown || '0s') + x, false);
                return message.channel.send(infoEmbed);
            }
            function help() {
                var total = 0;
                handler.categories.forEach(function (category) {
                    var desc = [];
                    category.slice(1).forEach(function (cmd) {
                        var command = handler.commands.get(cmd.toLowerCase()) || null;
                        if (command == null)
                            return;
                        if (command.locked)
                            return;
                        if (command.hidden)
                            return;
                        if (command.hidden2)
                            return;
                        if (handler.disabled.get(message.guild.id)) {
                            if (handler.disabled.get(message.guild.id).includes(command.name))
                                return;
                        }
                        desc.push(cmd);
                        total++;
                    });
                    if (!desc[0])
                        return;
                    allEmbed.addField('**' + caps(category[0]) + '**', '`' + desc.join('`, `') + '`');
                });
                allEmbed
                    .setDescription(client.user.username + " total available commands: **" + total + "**\n  [Invite Me](" + invite.replace('${INVITE}', client.user.id) + ")\n  ")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter("Requested by " + (message.member.displayName || message.author.username), message.author.displayAvatarURL());
                return message.channel.send(allEmbed);
            }
            function category() {
                var categoryEmbed = new discord_js_1.MessageEmbed()
                    .setColor('BLUE')
                    .setFooter("Requested by " + (message.member.displayName || message.author.username), message.author.displayAvatarURL());
                var desc = ' '.trim();
                var total = 0;
                var category = handler.categories.get(args.join(' ').toLowerCase()) || null;
                if (category == null)
                    return help();
                category.slice(1).forEach(function (cmd) {
                    var command = handler.commands.get(cmd.toLowerCase()) || null;
                    if (command == null)
                        return;
                    if (command.locked)
                        return;
                    if (command.hidden)
                        return;
                    if (command.hidden2)
                        return;
                    if (handler.disabled.get(message.guild.id)) {
                        if (handler.disabled.get(message.guild.id).includes(command.name))
                            return;
                    }
                    var description;
                    if (command.description)
                        description = ' - ' + '`' + command.description + '`';
                    else
                        description = ' ';
                    desc += '**' + prefix + command.name + '**' + description + '\n';
                    total++;
                });
                if (total == 0)
                    return help();
                categoryEmbed
                    .setDescription(desc)
                    .setAuthor(message.guild.name + " " + caps(category[0]) + " Available Commands (" + total + ")", message.guild.iconURL());
                return message.channel.send(categoryEmbed);
            }
            var prefix, allEmbed;
            var _b;
            return __generator(this, function (_c) {
                prefix = (_b = handler.prefixes.get(message.guild.id)) !== null && _b !== void 0 ? _b : null;
                if (prefix == null)
                    prefix = handler.prefix;
                allEmbed = new discord_js_1.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.guild.name + " Available Commands List", message.guild.iconURL());
                if (args[0])
                    getInfo(args[0].toLowerCase());
                else
                    help();
                return [2 /*return*/];
            });
        });
    }
};
function caps(text) {
    var splited = text.toLowerCase().trim().split(/ +/g);
    var final = [];
    splited.forEach(function (value) {
        final.push(value.charAt(0).toUpperCase() + (value.substring(1) || ''));
    });
    return final.join(' ');
}
//# sourceMappingURL=help.js.map