const Discord = require("discord.js");
const fs      = require("fs");
const nano    = require("nanoseconds");
const request = require("snekfetch");
const {exec}  = require("child_process");

class Client extends Discord.Client {
    constructor(options) {
        super(options);
    }

    async login() {
        super.login(this.config.token).catch(err => {
            logger.error(err);
            logger.warn("Error on login.\nCheck that your token is correct.");
            exec(`pm2 stop ${this.shard ? this.shard.id : "selfthis"}`, null, () => {
                process.exit(1);
            });
        });
        this.docs = await request.get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/11.1.0.json").then(res => JSON.parse(res.text));
    }

    loadCommands() {
        logger.log("Loading commands...");

        const loadStart = process.hrtime();

        fs.readdir("./src/commands", (err, files) => {
            if (err) return logger.error(err);

            for (let i = files.length; i--;) {
                const data = require(`./commands/${files[i]}`);
                
                this.commands.set(data.name, data);

                for (let i = data.aliases.length; i--;) this.aliases.set(data.aliases[i], data.name);

                logger.info(`Loaded command ${data.name} with ${data.aliases.length} alias${data.aliases.length ? "es" : ""}.`);
            }
            logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
            logger.log(`Loaded ${this.commands.size} commands!`);
        });
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
    }
}

/* eslint-disable no-multi-spaces */

Client.prototype.config   = require("../config.json");
Client.prototype.commands = new Discord.Collection();
Client.prototype.aliases  = new Discord.Collection();
Client.prototype.deleted  = new Discord.Collection();
Client.prototype.fudge    = new Map();

/* eslint-enable no-multi-spaces */

module.exports = Client;
