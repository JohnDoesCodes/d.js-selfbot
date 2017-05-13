const Discord = require("discord.js");
const fs      = require("fs");
const nano    = require("nanoseconds");
const request = require("snekfetch");
const logger  = require("./util/logger.js");
const {exec}  = require("child_process");

class Client extends Discord.Client {
    constructor(options = {info:true}) {
        super(options);
        this.info = !!options.info;
    }

    login() {
        return super.login(this.config.token).catch(err => {
            this.logger.error(err);
            this.logger.warn("Error on login.\nCheck that your token is correct.");
            exec(`pm2 stop ${this.shard ? this.shard.id : "selfthis"}`, null, () => {
                process.exit(1);
            });
        });
    }

    loadCommands() {
        this.logger.log("Loading commands...");

        const loadStart = process.hrtime();

        fs.readdir("./src/commands", (err, files) => {
            if (err) return this.logger.error(err);

            for (let i = files.length; i--;) {
                const data = require(`./commands/${files[i]}`);
                
                this.commands.set(data.name, data);

                for (let i = data.aliases.length; i--;) this.aliases.set(data.aliases[i], data.name);
            }
            this.logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
            if (this.info) this.logger.info(`Loaded ${this.commands.size} commands!`);
        });
    }

    loadListeners() {
        this.logger.log("Loading event listeners...");

        fs.readdir("./src/events", (err, files) => {
            if (err) return this.logger.error(err);

            for (let i = files.length; i--;) {
                const listener = require(`./events/${files[i]}`);

                this[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, this));
                this.logger.info(`Loaded ${listener.event} listener!`);
            }
            if (this.info) this.logger.info("Listeners loaded!");
        });
    }
}

/* eslint-disable no-multi-spaces */

Client.prototype.logger   = new logger();
Client.prototype.config   = require("../config.json");
Client.prototype.commands = new Discord.Collection();
Client.prototype.aliases  = new Discord.Collection();
Client.prototype.deleted  = new Discord.Collection();
Client.prototype.fudge    = new Map();

/* eslint-enable no-multi-spaces */

request.get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/11.1.0.json").then(res => {
    Client.prototype.docs = JSON.parse(res.text);
});

module.exports = Client;
