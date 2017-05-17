const moment = require("moment");
const chalk  = require("chalk");
const ctx    = new chalk.constructor({enabled:true});

function format(time, type, color = "gray") {
    const ret = [];
    
    if (time) ret.push(ctx.magenta((moment(Date.now()).format("h").length == 1 ? " " : "") + moment(Date.now()).format("LTS")), "|");
    if (type) ret.push(ctx[color](type));

    return ret;
}

class Logger {
    constructor({time = true, useInfo = true, useWarn = true} = {}) {
        this._time = time;
        this._useInfo = useInfo;
        this._useWarn = useWarn;
    }

    log(...args) {
        console.log(...format(this._time, "[LOG]"), ...args);
    }

    info(...args) {
        if (!this._useInfo) return;
        console.log(...format(this._time, "[INFO]", "white"), ...args);
    }

    warn(...args) {
        if (!this._useWarn) return;
        console.error(...format(this._time, "[WARN]", "yellow"), ...args);
    }

    error(...args) {
        console.error(...format(this._time, "[ERROR]", "red"), ...args);
    }
}

module.exports = Logger;
