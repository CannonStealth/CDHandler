"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(_a) {
        var name = _a.name, aliases = _a.aliases, cooldown = _a.cooldown, _b = _a.category, category = _b === void 0 ? "Misc" : _b, cooldownMessage = _a.cooldownMessage, minArgs = _a.minArgs, maxArgs = _a.maxArgs, argsMessage = _a.argsMessage, description = _a.description, usage = _a.usage, example = _a.example, dev = _a.dev, devMessage = _a.devMessage, nsfw = _a.nsfw, nsfwMessage = _a.nsfwMessage, permissions = _a.permissions, permissionsMessage = _a.permissionsMessage, botPermissions = _a.botPermissions, botPermissionsMessage = _a.botPermissionsMessage, locked = _a.locked, lockedMessage = _a.lockedMessage, hidden = _a.hidden, hidden2 = _a.hidden2, fire = _a.fire, run = _a.run, execute = _a.execute, callback = _a.callback, slash = _a.slash, servers = _a.servers, type = _a.type, serversMessage = _a.serversMessage;
        this.nsfw = nsfw;
        this.dev = dev;
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
        this.minArgs = minArgs !== null && minArgs !== void 0 ? minArgs : -1;
        this.maxArgs = maxArgs !== null && maxArgs !== void 0 ? maxArgs : null;
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
        this.servers = servers;
        this.type = type;
        this.serversMessage = serversMessage;
    }
    return Command;
}());
;
exports.default = Command;
//# sourceMappingURL=Command.js.map