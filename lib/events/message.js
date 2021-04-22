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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cdcolours_1 = __importDefault(require("cdcolours"));
var ms_1 = __importDefault(require("ms"));
var discord_js_1 = require("discord.js");
var lockedEmbed = new discord_js_1.MessageEmbed()
    .setTitle('🔒 Command Locked')
    .setDescription("You can't use this command now, please try again later");
exports.default = (function (handler, client, defaultPrefix, ping, commands, aliases, prefixes, devs, cd) {
    client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var prefix, author, member, content, guild;
        return __generator(this, function (_a) {
            prefix = [];
            if (typeof defaultPrefix == 'string')
                prefix.push(defaultPrefix);
            else
                prefix = prefix.concat(defaultPrefix);
            if (message.author.bot || message.channel.type == 'dm')
                return [2 /*return*/];
            author = message.author, member = message.member, content = message.content, guild = message.guild;
            if (!author || !member || !content || !guild)
                return [2 /*return*/];
            prefix = prefixes.get(message.guild.id) || prefix || null;
            if (prefix == null)
                return [2 /*return*/];
            if (typeof prefix == 'string')
                prefix = [prefix];
            if (message.content.trim() == "<@!" + client.user.id + ">" && ping) {
                if (typeof prefix == 'string' || !prefix[1])
                    return [2 /*return*/, message.channel.send("My prefix for **" + message.guild.name + "** is `" + (typeof prefix == 'string' ? prefix : prefix.join(' ')) + "`")];
                else
                    return [2 /*return*/, message.channel.send("My prefixes for **" + message.guild.name + "** are `" + prefix.join('\`, \`') + "`")];
            }
            prefix.forEach(function (p) { return __awaiter(void 0, void 0, void 0, function () {
                var args, cmdName, command, cmd, cooldownMessage, _a, dev, devMessage, _b, locked, _c, lockedMessage, _d, nsfw, _e, nsfwMessage, permissions, _f, permissionsMessage, _g, minArgs, _h, maxArgs, _j, argsMessage, botPermissions, _k, botPermissionsMessage, fire, callback, run, execute, _l, servers, _m, serversMessage, cooldown, remaining, cooldownEmbed, result, r, running;
                var _o;
                return __generator(this, function (_p) {
                    switch (_p.label) {
                        case 0:
                            if (!message.content.startsWith(p))
                                return [2 /*return*/];
                            if (message.channel.type == 'dm')
                                return [2 /*return*/, false];
                            args = message.content.slice(p.length).trim().split(/ +/g);
                            cmdName = args.shift();
                            command = "" + p.toLowerCase() + (cmdName === null || cmdName === void 0 ? void 0 : cmdName.toLowerCase());
                            cmd = commands.get(cmdName.toLowerCase()) || commands.get(aliases.get(cmdName.toLowerCase())) || null;
                            if (!cmd) return [3 /*break*/, 7];
                            if (!(content.toLowerCase().startsWith(command + " ") || content.toLowerCase() === command)) return [3 /*break*/, 6];
                            cooldownMessage = cmd.cooldownMessage, _a = cmd.dev, dev = _a === void 0 ? false : _a, devMessage = cmd.devMessage, _b = cmd.locked, locked = _b === void 0 ? false : _b, _c = cmd.lockedMessage, lockedMessage = _c === void 0 ? lockedEmbed : _c, _d = cmd.nsfw, nsfw = _d === void 0 ? false : _d, _e = cmd.nsfwMessage, nsfwMessage = _e === void 0 ? "Run this command in a SFW channel!" : _e, permissions = cmd.permissions, _f = cmd.permissionsMessage, permissionsMessage = _f === void 0 ? "You don't have permissions to execute this command" : _f, _g = cmd.minArgs, minArgs = _g === void 0 ? -1 : _g, _h = cmd.maxArgs, maxArgs = _h === void 0 ? null : _h, _j = cmd.argsMessage, argsMessage = _j === void 0 ? "Incorrect usage!" : _j, botPermissions = cmd.botPermissions, _k = cmd.botPermissionsMessage, botPermissionsMessage = _k === void 0 ? "Make sure to give me permissions before executing this command" : _k, fire = cmd.fire, callback = cmd.callback, run = cmd.run, execute = cmd.execute, _l = cmd.servers, servers = _l === void 0 ? [] : _l, _m = cmd.serversMessage, serversMessage = _m === void 0 ? "This command isn't allowed in this server." : _m;
                            if (servers[0] && !servers.includes(message.guild.id)) {
                                if (serversMessage) {
                                    return [2 /*return*/, message.channel.send(serversMessage)];
                                }
                                else
                                    return [2 /*return*/, false];
                            }
                            if (locked) {
                                if (lockedMessage) {
                                    message.channel.send(lockedMessage);
                                    return [2 /*return*/];
                                }
                                else
                                    return [2 /*return*/];
                                return [2 /*return*/];
                            }
                            if (dev && devs.length && !devs.includes(message.author.id)) {
                                if (devMessage) {
                                    message.channel.send(devMessage);
                                    return [2 /*return*/];
                                }
                                else
                                    return [2 /*return*/];
                                return [2 /*return*/];
                            }
                            if (nsfw && !message.channel.nsfw) {
                                if (nsfwMessage) {
                                    message.channel.send(nsfwMessage);
                                    return [2 /*return*/];
                                }
                                else
                                    return [2 /*return*/];
                                return [2 /*return*/];
                            }
                            cooldown = (_o = cd.get(cmd.name + message.guild.id + message.author.id)) !== null && _o !== void 0 ? _o : null;
                            if (cooldown && (Number(cooldown) > Date.now())) {
                                remaining = Number(cooldown) - Date.now();
                                remaining.toFixed(2);
                                if (remaining > 0) {
                                    if (cooldownMessage) {
                                        message.channel.send(cooldownMessage.replace('{REMAINING}', ms_1.default(remaining)));
                                        return [2 /*return*/];
                                    }
                                    else {
                                        cooldownEmbed = new discord_js_1.MessageEmbed()
                                            .setTitle("⏲️ Calm down you're in a cooldown!")
                                            .setDescription("Wait " + remaining + " more to execute this command again");
                                        return [2 /*return*/, message.channel.send(cooldownEmbed)];
                                    }
                                }
                            }
                            if (permissions && permissions.length && !message.member.permissions.has(permissions)) {
                                if (permissionsMessage) {
                                    message.channel.send(permissionsMessage);
                                    return [2 /*return*/];
                                }
                                else
                                    return [2 /*return*/];
                            }
                            if (!message.channel.permissionsFor(client.user.id).has(botPermissions)) {
                                if (botPermissionsMessage) {
                                    message.channel.send(botPermissionsMessage);
                                    return [2 /*return*/];
                                }
                                else
                                    return [2 /*return*/];
                            }
                            if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                                message.channel.send(argsMessage);
                                return [2 /*return*/];
                            }
                            if (!(cmd.slash && typeof cmd.slash == 'string' && cmd.slash.toLowerCase() == 'both')) return [3 /*break*/, 4];
                            result = [];
                            r = void 0;
                            running = cmd.run ? cmd.run : cmd.fire ? cmd.fire : cmd.execute ? cmd.execute : cmd.callback ? cmd.callback : null;
                            if (!(running == null)) return [3 /*break*/, 1];
                            throw new Error(cdcolours_1.default("[CDHANDLER] [ERROR]", { textColour: "red" }) + " Missing run function in " + cmd.name);
                        case 1: return [4 /*yield*/, running({ message: message, args: args, client: client, handler: handler })];
                        case 2:
                            r = _p.sent();
                            _p.label = 3;
                        case 3:
                            if (typeof running == "string" || typeof running == "number")
                                result = [running];
                            else
                                result = __spreadArray([], running);
                            if (result && result[0]) {
                                result === null || result === void 0 ? void 0 : result.forEach(function (r) {
                                    message.channel.send(r);
                                });
                            }
                            else {
                                message.channel.send(r);
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, false];
                        case 4:
                            if (fire) {
                                fire({ message: message, args: args, client: client, handler: handler });
                                return [2 /*return*/];
                            }
                            else if (callback) {
                                callback({ message: message, args: args, client: client, handler: handler });
                                return [2 /*return*/];
                            }
                            else if (run) {
                                run({ message: message, args: args, client: client, handler: handler });
                                return [2 /*return*/];
                            }
                            else if (execute) {
                                execute({ message: message, args: args, client: client, handler: handler });
                                return [2 /*return*/];
                            }
                            else {
                                throw new Error(cdcolours_1.default("[CDHANDLER] [ERROR]", { textColour: "red" }) + " Missing run function in " + cmd.name);
                            }
                            _p.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6: return [2 /*return*/, false];
                        case 7: return [2 /*return*/, false];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=message.js.map