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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var ms_1 = __importDefault(require("ms"));
var load_commands_1 = __importDefault(require("./load/load-commands"));
var load_features_1 = __importDefault(require("./load/load-features"));
var load_events_1 = __importDefault(require("./load/load-events"));
var message_1 = __importDefault(require("./events/message"));
var load_commands_2 = __importDefault(require("./defaults/load-commands"));
var cdcolours_1 = __importDefault(require("cdcolours"));
var slash_1 = __importDefault(require("./events/slash"));
var mongoose_1 = require("mongoose");
;
var CDHandler = /** @class */ (function () {
    function CDHandler(client, options) {
        var _this = this;
        var _a;
        this._warnings = false;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.prefixes = new discord_js_1.Collection();
        this.categories = new discord_js_1.Collection();
        this.slash = new discord_js_1.Collection();
        this.disabled = new discord_js_1.Collection();
        this.cd = new discord_js_1.Collection();
        this.client = client;
        this.pingReply = (options === null || options === void 0 ? void 0 : options.pingReply) === false ? options.pingReply : CDHandler._pingReply;
        this.category = (options === null || options === void 0 ? void 0 : options.category) ? options.category : CDHandler._category;
        this.devs = (_a = options === null || options === void 0 ? void 0 : options.devs) !== null && _a !== void 0 ? _a : [];
        if (options === null || options === void 0 ? void 0 : options.warnings)
            this._warnings = true;
        if (options === null || options === void 0 ? void 0 : options.prefix)
            this.prefix = options.prefix || "!";
        if (options === null || options === void 0 ? void 0 : options.mongo) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mongoose_1.connect(options === null || options === void 0 ? void 0 : options.mongo, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useFindAndModify: false,
                                useCreateIndex: true,
                                keepAlive: true,
                            }).catch(function (err) {
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Couldn't connect to MongoDB\n" + err);
                            })];
                        case 1:
                            _a.sent();
                            console.log(cdcolours_1.default("[CDHandler]", { textColour: "yellow" }) + " Connected to MongoDB.");
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        this.defaults = (options === null || options === void 0 ? void 0 : options.defaults) ? options.defaults : CDHandler._defaults;
        if (this._warnings)
            console.log(cdcolours_1.default("[CDHandler]", { textColour: "magenta" }) + " CoffeeScript support isn't stable.");
        if (options === null || options === void 0 ? void 0 : options.commandsDir) {
            load_commands_1.default((options.commandsDir || CDHandler._commandsDir), this.commands, this.aliases, this.categories, this.category, this.client, this.slash);
            message_1.default(this, this.client, this.prefix, this.pingReply, this.commands, this.aliases, this.prefixes, this.devs, this.cd);
            slash_1.default(this.slash, this.client, this);
        }
        ;
        if (this.defaults) {
            if (options === null || options === void 0 ? void 0 : options.commandsDir)
                load_commands_2.default(this.commands, this.aliases, this.categories, this.category);
        }
        ;
        if (options === null || options === void 0 ? void 0 : options.eventsDir) {
            load_events_1.default(this.client, (options.eventsDir || CDHandler._eventsDir));
        }
        ;
        if (options === null || options === void 0 ? void 0 : options.featuresDir) {
            load_features_1.default(this.client, (options.featuresDir || CDHandler._featuresDir));
        }
        ;
    }
    ;
    CDHandler.prototype.cooldown = function (message, timer) {
        var _a, _b, _c, _d;
        var time;
        if (typeof timer == 'string')
            time = ms_1.default(timer);
        else
            time = timer * 1000;
        var prefix = this.prefix;
        prefix = (_b = (_a = this.prefixes.get(message.guild.id)) !== null && _a !== void 0 ? _a : prefix) !== null && _b !== void 0 ? _b : null;
        if (!prefix || prefix == null)
            prefix = this.prefix;
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var cmdName = args.shift();
        // @ts-ignore
        var cmd = (_d = (_c = this.commands.get(cmdName.toLowerCase())) !== null && _c !== void 0 ? _c : this.commands.get(this.aliases.get(cmdName.toLowerCase()))) !== null && _d !== void 0 ? _d : null;
        if (cmd == null)
            return;
        var name = cmd.name;
        this.cd.set(name + message.guild.id + message.author.id, Date.now() + time);
    };
    ;
    CDHandler._pingReply = true;
    CDHandler._defaults = true;
    CDHandler._category = "Misc";
    CDHandler._commandsDir = "commands";
    CDHandler._eventsDir = "events";
    CDHandler._featuresDir = "features";
    return CDHandler;
}());
;
exports.default = CDHandler;
//# sourceMappingURL=CDHandler.js.map