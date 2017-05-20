const Discord = require("discord.js");
const fs      = require("fs");
const nano    = require("nanoseconds");
const request = require("snekfetch");
const {exec}  = require("child_process");

require("moment-duration-format");

class Client extends Discord.Client {
    constructor(options) {
        super(options);
    }

    login() {
        const start = process.hrtime();

        super.login(this.config.token).then(() => {
            const end = nano(process.hrtime(start)) / 1000000;

            logger.info(`Login took ${end.toFixed(3)}ms`);
        }).catch(err => {
            logger.error(err);
            logger.warn("Error on login.\nCheck that your token is correct.");
            exec(`pm2 stop ${this.shard ? this.shard.id : "selfthis"}`, null, () => {
                process.exit(1);
            });
        });

        this.loadDocs();

        return this;
    }

    loadCommands() {
        logger.log("Loading commands...");

        const loadStart = process.hrtime();

        fs.readdir("./src/commands", (err, files) => {
            if (err) return logger.error(err);

            for (let i = files.length; i--;) {
                const data = require(`./commands/${files[i]}`);
                
                this.commands.set(data.name, data);

                logger.info(`Loaded command ${data.name} with ${data.aliases.length} alias${data.aliases.length == 1 ? "" : "es"}.`);
            }
            logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
            logger.log(`Loaded ${this.commands.size} commands!`);
        });

        return this;
    }

    loadListeners() {
        logger.log("Loading event listeners...");

        fs.readdir("./src/events", (err, files) => {
            if (err) return logger.error(err);

            for (let i = files.length; i--;) {
                const listener = require(`./events/${files[i]}`);

                this[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, this));
                logger.info(`Loaded ${listener.event} listener!`);
            }
            logger.log("Listeners loaded!");
        });

        return this;
    }

    async loadDocs() {
        this.docs = await request.get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/11.1.0.json").then(res => JSON.parse(res.text));
    }
}

/* eslint-disable no-multi-spaces */

Client.prototype.config   = require("../config.json");
Client.prototype.commands = new Discord.Collection();
Client.prototype.deleted  = new Discord.Collection();
Client.prototype.fudge    = new Map();

/* eslint-enable no-multi-spaces */

module.exports = Client;
