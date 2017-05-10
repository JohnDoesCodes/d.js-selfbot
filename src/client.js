const Discord = require("discord.js");
const fs      = require("fs");
const nano    = require("nanoseconds");

class Client extends Discord.Client {
    constructor(options) {
        super(options);
    }

    login() {
        return super.login(this.config.token);
    }

    loadCommands() {
        console.log("Loading commands...");

        const loadStart = process.hrtime();

        fs.readdir("./src/commands", (err, files) => {
            if (err) return console.error(err);

            for (let i = files.length; i--;) {
                const data = require(`./commands/${files[i]}`);
                
                this.commands.set(data.name, data);

                for (let i = data.aliases.length; i--;) this.aliases.set(data.aliases[i], data.name);
            }
            console.log(`Took ${(nano(process.hrtime(loadStart)) / 1000000).toFixed(3)}ms to load commands.`);
            console.log(`Loaded ${this.commands.size} commands!`);
        });
    }

    loadListeners() {
        console.log("Loading event listeners...");

        fs.readdir("./src/events", (err, files) => {
            if (err) return console.error(err);

            for (let i = files.length; i--;) {
                const listener = require(`./events/${files[i]}`);

                this[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, this));
                console.log(`Loaded ${listener.event} listener!`);
            }
            console.log("Listeners loaded!");
        });
    }
}

/* eslint-disable no-multi-spaces */

Client.prototype.config    = require("../config.json");
Client.prototype.commands  = new Discord.Collection();
Client.prototype.aliases   = new Discord.Collection();
Client.prototype.deleted   = new Discord.Collection();
Client.prototype.fudge     = new Map();

/* eslint-enable no-multi-spaces */

module.exports = Client;
