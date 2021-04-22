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
var load = function (client, dir) { return __awaiter(void 0, void 0, void 0, function () {
    var exists, files, _i, files_1, file, isFolder, event_1, name_1, even, nam;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exists = fs_1.existsSync(path_1.join(process.cwd(), dir));
                if (!exists) {
                    console.warn(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Cannot find the folder " + dir + " creating one...");
                    fs_1.mkdirSync(dir, { recursive: true });
                }
                files = fs_1.readdirSync(path_1.join(dir));
                _i = 0, files_1 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 6];
                file = files_1[_i];
                isFolder = fs_1.lstatSync(path_1.join(process.cwd(), dir, file));
                if (!isFolder.isDirectory()) return [3 /*break*/, 2];
                load(client, path_1.join(dir, file));
                return [3 /*break*/, 5];
            case 2:
                if (!(file.endsWith(".ts") && !file.endsWith(".d.ts"))) return [3 /*break*/, 4];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(path_1.join(process.cwd(), dir, file))); })];
            case 3:
                event_1 = (_a.sent()).default;
                name_1 = file.split(".")[0];
                client.on(name_1, event_1.bind(null, client));
                console.log(cdcolours_1.default("[CDHandler]", { textColour: "green" }) + (" Loading event " + name_1));
                return [3 /*break*/, 5];
            case 4:
                if (file.endsWith(".coffee") || file.endsWith(".js") && !file.endsWith(".d.ts")) {
                    even = require(path_1.join(process.cwd(), dir, file));
                    nam = file.split(".")[0];
                    client.on(nam, even.bind(null, client));
                    console.log(cdcolours_1.default("[CDHandler]", { textColour: "green" }) + (" Loading event " + nam));
                }
                else
                    return [3 /*break*/, 5];
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = load;
//# sourceMappingURL=load-events.js.map