const moment = require("moment");
const chalk  = require("chalk");
const ctx    = new chalk.constructor({enabled:true});

function format(time, color, type) {
    const ret = [];
    
    if (time) ret.push(ctx.magenta((moment(Date.now()).format("h").length == 1 ? " " : "") + moment(Date.now()).format("LTS")));
    if (type) ret.push(ctx[color](type));

    return ret;
}

class Logger {
    constructor({time = true, useInfo = true, userWarn = true} = {}) {
        this._time = time;
        this._useInfo = useInfo;
        this._useWarn = userWarn;
    }

    log(...args) {
        console.log(format(this._time, "gray", "[LOG]").join(" | "), ...args);
    }

    info(...args) {
        if (!this._useInfo) return;
        console.log(format(this._time, "white", "[INFO]").join(" | "), ...args);
    }

    warn(...args) {
        if (!this._useWarn) return;
        console.log(format(this._time, "yellow", "[WARN]").join(" | "), ...args);
    }

    error(...args) {
        console.error(format(this._time, "red", "[ERROR]").join(" | "), ...args);
    }
}

module.exports = Logger;
