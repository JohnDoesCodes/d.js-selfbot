const Discord = require("discord.js");
const fs      = require("fs");
const mTime   = require("microtime");
const {exec}  = require("child_process");
const bot     = new Discord.Client();

/* eslint-disable no-multi-spaces */

bot.config    = require("./config.json");
bot.commands  = new Discord.Collection();
bot.aliases   = new Discord.Collection();
bot.deleted   = new Discord.Collection();
bot.fudge     = new Map();

/* eslint-enable no-multi-spaces */

console.log("Loading event listeners...");

fs.readdir("./events", (err, files) => {
	if (err) return console.error(err);

	for (let i = files.length; i--;) {
		const listener = require(`./events/${files[i]}`);

		bot[listener.event === "ready" ? "once" : "on"](listener.event, listener.run.bind(null, bot));
		console.log(`Loaded ${listener.event} listener!`);
	}
	console.log("Listeners loaded!");
});

console.log("Loading commands...");

const loadStart = mTime.nowDouble();

fs.readdir("./commands", (err, files) => {
	if (err) return console.error(err);

	for (let i = files.length; i--;) {
		const data = require(`./commands/${files[i]}`);
		
		bot.commands.set(data.name, data);

		for (let i = data.aliases.length; i--;) bot.aliases.set(data.aliases[i], data.name);
	}
	bot.loadFinalized = (mTime.nowDouble() - loadStart) * 1000;
	console.log(`Took ${bot.loadFinalized.toFixed(3)}ms to load commands.`);
	console.log(`Loaded ${bot.commands.size} commands!`);
});

bot.login(bot.config.token).catch(err => {
	console.error(err);
	console.log("Error on login.\nCheck that your token is correct.");
	exec(`pm2 stop ${bot.shard ? bot.shard.id : "selfbot"}`, null, () => {
		process.exit(1);
	});
});

process.on('unhandledRejection', (err, p) => console.error("Unhandled Rejection at:", p));
