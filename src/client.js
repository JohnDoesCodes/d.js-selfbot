const Discord = require("discord.js");
const request = require("snekfetch");
const nano    = require("nanoseconds");
const {exec}  = require("child_process");
const {inspect} = require("util");

const commands  = require("./commands");
const listeners = require("./events");

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
            exec(`pm2 stop ${this.shard ? this.shard.id : "selfbot"}`, null, () => {
                process.exit(1);
            });
        });

        this.loadDocs();

        return this;
    }

    loadCommands() {
        logger.log("Loading commands...");

        const loadStart = process.hrtime();

        for (const file in commands) {
            this.commands.set(commands[file].name, commands[file]);

            for (const alias of commands[file].aliases) {
                if (this.aliases.has(alias)) logger.warn(`Command ${commands[file].name} has duplicate alias ${alias}!`);
                else this.aliases.set(alias, commands[file].name);
            }

            logger.info(`Loaded command ${commands[file].name} with ${commands[file].aliases.length} alias${commands[file].aliases.length == 1 ? "" : "es"}.`);
        }
        logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
        logger.log(`Loaded ${this.commands.size} commands!`);

        return this;
    }

    loadListeners() {
        logger.log("Loading event listeners...");

        const loadStart = process.hrtime();

        for (const file in listeners) {
            const listener = listeners[file];

            this[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, this));
            logger.info(`Loaded ${listener.event} listener!`);
        }
        logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load listeners.`);
        logger.log("Listeners loaded!");

        return this;
    }

    async loadDocs() {
        this.docs = {
            stable: await request.get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/11.1.0.json").then(res => JSON.parse(res.text)),
            master: await request.get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/master.json").then(res => JSON.parse(res.text))
        };
    }

    [inspect.custom]() {
        const user = this.user ? `${this.user.tag} (${this.user.id})` : null;
        
        return `Client {
  User: ${user},
  Guilds: Collection { ${this.guilds.size} },
  Channels: Collection { ${this.channels.size} },
  Users: Collection { ${this.users.size} },
  Commands: Collection { ${this.commands.size} },
  Deleted: Collection { ${this.deleted.size} }
}`;
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
