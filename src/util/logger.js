const moment = require("moment");
const chalk  = require("chalk");
const ctx    = new chalk.constructor({enabled:true});

class Logger {
    constructor({time = true, info = true, warn = true} = {}) {
        this.time = time;
        this.useInfo = info;
        this.useWarn = warn;
    }
    
    log(...args) {
        if (this.time) console.log((moment(Date.now()).format("h").length == 2 ? "" : " ") + ctx.green(moment(Date.now()).format("LTS") + " |"), ...args);
        else console.log(...args);
    }

    info(...args) {
        if (!this.useInfo) return;
        else if (this.time) console.log((moment(Date.now()).format("h").length == 2 ? "" : " ") + ctx.green(moment(Date.now()).format("LTS") + " |"), "[INFO]", ...args);
        else console.log("[INFO]", ...args);
    }

    warn(...args) {
        if (!this.useWarn) return;
        if (this.time) console.error((moment(Date.now()).format("h").length == 2 ? "" : " ") + ctx.red(moment(Date.now()).format("LTS") + " |"), ctx.yellow("[WARN]"), ...args);
        else console.error(ctx.yellow("[WARN]"), ...args);
    }

    error(...args) {
        if (this.time) console.error((moment(Date.now()).format("h").length == 2 ? "" : " ") + ctx.red(moment(Date.now()).format("LTS") + " |"), ctx.red("[ERROR]"), ...args);
        else console.error(ctx.red("[ERROR]"), ...args);
    }
}

module.exports = Logger;
