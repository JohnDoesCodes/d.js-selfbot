const moment = require("moment");
const chalk  = require("chalk").constructor({enabled:true});

class Logger {
    constructor({time = true, info = true, warn = true} = {}) {
        this.time = time;
        this.info = info;
        this.warn = warn;
    }

    log(...args) {
        if (this.time) console.log((moment(Date.now()).format("h").length == 2 ? "" : " ") + chalk.green(moment(Date.now()).format("LTS") + " |"), ...args);
        else console.log(...args);
    }

    info(...args) {
        if (!this.info) return;
        else if (this.time) console.log((moment(Date.now()).format("h").length == 2 ? "" : " ") + chalk.green(moment(Date.now()).format("LTS") + " |"), "[INFO]", ...args);
        else console.log("[INFO]", ...args);
    }

    warn(...args) {
        if (this.time) console.error((moment(Date.now()).format("h").length == 2 ? "" : " ") + chalk.red(moment(Date.now()).format("LTS") + " |"), chalk.yellow("[WARN]"), ...args);
        else console.error(chalk.yellow("[WARN]"), ...args);
    }

    error(...args) {
        if (this.time) console.error((moment(Date.now()).format("h").length == 2 ? "" : " ") + chalk.red(moment(Date.now()).format("LTS") + " |"), chalk.red("[ERROR]"), ...args);
        else console.error(chalk.red("[ERROR]"), ...args);
    }
}

module.exports = Logger;
