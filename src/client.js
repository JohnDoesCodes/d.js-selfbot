const Discord = require("discord.js");
const nano    = require("nanoseconds");
const path    = require("path");
const fs      = require("fs");
const {get}   = require("snekfetch");
const {exec}  = require("child_process");
const {inspect} = require("util");

const commands  = require("./commands");
const listeners = require("./events");

const {Logger} = require("./util");

class Client extends Discord.Client {
    constructor(options) {
        super(options);

        this.logger = new Logger(options.logger);

        this.loadConfig();

        if (!this.config.prefix && !this.config.suffix) throw new Error("No prefix or suffix defined.");

        if (this.config.debug) this.on('debug', this.logger.info.bind(logger));

        this.loadCommands()
            .loadListeners();
    }

    login() {
        const start = process.hrtime();

        super.login(this.config.token).then(() => {
            const end = nano(process.hrtime(start)) / 1000000;

            this.logger.info(`Login took ${end.toFixed(3)}ms`);
        }).catch(err => {
            this.logger.error(err);
            this.logger.warn("Error on login.\nCheck that your token is correct.");
            exec(`pm2 stop ${this.shard ? this.shard.id : "selfbot"}`, null, () => {
                process.exit(1);
            });
        });

        this.loadDocs();
    }

    loadCommands() {
        this.logger.log("Loading commands...");

        const loadStart = process.hrtime();

        for (const file in commands) {
            this.commands.set(commands[file].name, commands[file]);

            for (const alias of commands[file].aliases) {
                if (this.aliases.has(alias)) this.logger.warn(`Command ${commands[file].name} has duplicate alias ${alias}!`);
                else this.aliases.set(alias, commands[file].name);
            }

            this.logger.info(`Loaded command ${commands[file].name} with ${commands[file].aliases.length} alias${commands[file].aliases.length == 1 ? "" : "es"}.`);
        }
        this.logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
        this.logger.log(`Loaded ${this.commands.size} commands!`);

        return this;
    }

    loadListeners() {
        this.logger.log("Loading event listeners...");

        const loadStart = process.hrtime();

        for (const file in listeners) {
            const listener = listeners[file];

            this[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, this));
            this.logger.info(`Loaded ${listener.event} listener!`);
        }
        this.logger.info(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load listeners.`);
        this.logger.log("Listeners loaded!");

        return this;
    }

    loadConfig() {
        if (fs.existsSync(path.join(__dirname, "..", "config.json"))) {
            this.config = require(path.join(__dirname, "..", "config.json"));
        } else {
            const config = {
                "debug": false,
                
                "prefix": ">>",
                "suffix": null,
                "token":  "",

                "customsearch": {
                    "token": null,
                    "id":    null
                },

                "startGame":  null,
                "logChannel": null,
                "ignoreList": []
            };

            fs.writeFile(path.join(__dirname, "..", "config.json"), JSON.stringify(config, null, 4), err => err ? this.logger.error(err) : this.logger.log("Config intialized successfully!"));

            this.logger.error("Please enter your token in the config!");

            exec("pm2 stop selfbot", () => {
                process.exit();
            });
        }

        return this;
    }

    async loadDocs() {
        this.docs = {
            stable: await get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/11.1.0.json").then(res => JSON.parse(res.text)),
            master: await get("https://raw.githubusercontent.com/hydrabolt/discord.js/docs/master.json").then(res => JSON.parse(res.text))
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

Client.prototype.commands = new Discord.Collection();
Client.prototype.aliases  = new Discord.Collection();
Client.prototype.deleted  = new Discord.Collection();
Client.prototype.fudge    = new Map();

/* eslint-enable no-multi-spaces */

module.exports = Client;
