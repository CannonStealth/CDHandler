"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var path_1 = require("path");
var fs_1 = require("fs");
var cdcolours_1 = __importDefault(require("cdcolours"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var register = function (dir, Fcommands, Faliases, Fcategories, Fcategory, client, Fslash) { return __awaiter(void 0, void 0, void 0, function () {
    var exists, files, _loop_1, _i, files_1, file;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                exists = fs_1.existsSync(path_1.join(process.cwd(), dir));
                if (!exists) {
                    console.warn(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Cannot find the folder " + dir + " creating one...");
                    fs_1.mkdirSync(dir, { recursive: true });
                }
                files = fs_1.readdirSync(path_1.join(dir));
                _loop_1 = function (file) {
                    var isFolder, cmd_1, _e, _f, command, category, categoryGetter, slashes, slashCommand, category, categoryGetter, urls_1, json_1;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                isFolder = fs_1.lstatSync(path_1.join(process.cwd(), dir, file));
                                if (!isFolder.isDirectory()) return [3 /*break*/, 1];
                                register(path_1.join(dir, file), Fcommands, Faliases, Fcategories, Fcategory, client, Fslash);
                                return [3 /*break*/, 15];
                            case 1:
                                if (!(file.endsWith(".coffee") || file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts"))) return [3 /*break*/, 14];
                                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(path_1.join(process.cwd(), dir, file))); })];
                            case 2:
                                cmd_1 = (_g.sent()).default;
                                if (!!cmd_1.name) return [3 /*break*/, 3];
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without name");
                            case 3:
                                if (!(!cmd_1.fire && !cmd_1.callback && !cmd_1.run && !cmd_1.execute)) return [3 /*break*/, 4];
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function");
                            case 4:
                                if (!(!cmd_1.slash && cmd_1.slash !== false)) return [3 /*break*/, 5];
                                Fcommands.set(cmd_1.name.toLowerCase(), cmd_1);
                                console.log(cdcolours_1.default("[CDHandler]", { textColour: "blue" }) + " Loading command " + cmd_1.name);
                                if (cmd_1.aliases) {
                                    for (_e = 0, _f = cmd_1.aliases; _e < _f.length; _e++) {
                                        command = _f[_e];
                                        Faliases.set(command.toLowerCase(), cmd_1.name);
                                    }
                                }
                                category = cmd_1.category || Fcategory || "Misc";
                                categoryGetter = Fcategories.get(category.toLowerCase());
                                if (!categoryGetter)
                                    categoryGetter = [category];
                                categoryGetter.push(cmd_1.name);
                                Fcategories.set(category.toLowerCase(), categoryGetter);
                                return [3 /*break*/, 13];
                            case 5:
                                if (!(cmd_1.slash === false)) return [3 /*break*/, 12];
                                if (!(!cmd_1.servers || !cmd_1.servers[0])) return [3 /*break*/, 10];
                                return [4 /*yield*/, client.api.applications((_a = client.user) === null || _a === void 0 ? void 0 : _a.id).commands.get().catch(function (err) { return console.error(err); })];
                            case 6:
                                slashes = _g.sent();
                                slashCommand = (_b = slashes.find(function (s) { return s.name.toLowerCase() == cmd_1.name.toLowerCase(); })) !== null && _b !== void 0 ? _b : null;
                                if (!(slashCommand == null)) return [3 /*break*/, 7];
                                return [2 /*return*/, "continue"];
                            case 7: return [4 /*yield*/, node_fetch_1.default("https://discord.com/api/v8/applications/" + client.user.id + "/commands/" + slashCommand.id, {
                                    method: 'delete',
                                    headers: {
                                        'Authorization': 'Bot ' + client.token,
                                        'Content-Type': 'application/json'
                                    }
                                }).catch(function (err) { return console.error(err); })];
                            case 8:
                                _g.sent();
                                console.log(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Deleting global slash command " + cmd_1.name);
                                _g.label = 9;
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                cmd_1.servers.forEach(function (server) { return __awaiter(void 0, void 0, void 0, function () {
                                    var sls, sl;
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, client.api.applications((_a = client.user) === null || _a === void 0 ? void 0 : _a.id).guilds(server).commands.get().catch(function (err) { return console.error(err); })];
                                            case 1:
                                                sls = _c.sent();
                                                sl = (_b = sls.find(function (s) { return s.name.toLowerCase() == cmd_1.name.toLowerCase(); })) !== null && _b !== void 0 ? _b : null;
                                                if (!(sl == null)) return [3 /*break*/, 2];
                                                return [2 /*return*/];
                                            case 2: return [4 /*yield*/, node_fetch_1.default("https://discord.com/api/v8/applications/" + client.user.id + "/guilds/" + server + "/commands/" + sl.id, {
                                                    method: 'delete',
                                                    headers: {
                                                        'Authorization': 'Bot ' + client.token,
                                                        'Content-Type': 'application/json'
                                                    }
                                                }).catch(function (err) { return console.error(err); })];
                                            case 3:
                                                _c.sent();
                                                console.log(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Deleting slash command " + cmd_1.name);
                                                _c.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                _g.label = 11;
                            case 11: return [3 /*break*/, 13];
                            case 12:
                                if (!cmd_1.run && !cmd_1.execute && !cmd_1.fire && !cmd_1.callback)
                                    throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function");
                                console.log(cdcolours_1.default("[CDHandler]", { textColour: "blue" }) + " Loading slash command " + cmd_1.name);
                                category = cmd_1.category || Fcategory || "Misc";
                                categoryGetter = Fcategories.get(category.toLowerCase());
                                if (!categoryGetter)
                                    categoryGetter = [category];
                                categoryGetter.push(cmd_1.name);
                                Fcategories.set(category.toLowerCase(), categoryGetter);
                                urls_1 = [];
                                if (cmd_1.servers && cmd_1.servers[0])
                                    cmd_1.servers.forEach(function (server) { return urls_1.push("https://discord.com/api/v8/applications/" + client.user.id + "/guilds/" + server + "/commands"); });
                                else
                                    urls_1.push("https://discord.com/api/v8/applications/" + client.user.id + "/commands");
                                json_1 = {
                                    name: cmd_1.name,
                                    description: (_c = cmd_1.description) !== null && _c !== void 0 ? _c : "No description",
                                    "options": cmd_1.data
                                };
                                urls_1.forEach(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                                    var response, Responser, cmdJson;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, node_fetch_1.default(url, {
                                                    method: 'post',
                                                    body: JSON.stringify(json_1),
                                                    headers: {
                                                        'Authorization': 'Bot ' + client.token,
                                                        'Content-Type': 'application/json'
                                                    }
                                                })];
                                            case 1:
                                                response = _a.sent();
                                                return [4 /*yield*/, response.json()];
                                            case 2:
                                                Responser = _a.sent();
                                                cmdJson = {
                                                    type: cmd_1.type || 4,
                                                    run: cmd_1.run ? cmd_1.run : cmd_1.fire ? cmd_1.fire : cmd_1.execute ? cmd_1.execute : cmd_1.callback ? cmd_1.callback : null
                                                };
                                                Fslash.set(Responser.id, cmdJson);
                                                Fcommands.set(cmd_1.name.toLowerCase(), cmd_1);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                _g.label = 13;
                            case 13: return [3 /*break*/, 15];
                            case 14: return [2 /*return*/, "continue"];
                            case 15: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, files_1 = files;
                _d.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 4];
                file = files_1[_i];
                return [5 /*yield**/, _loop_1(file)];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = register;
//# sourceMappingURL=load-commands.js.map