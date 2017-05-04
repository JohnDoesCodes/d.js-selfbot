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

bot.once('ready', () => {
	console.log(`Logged in as ${bot.user.tag}`);
	bot.user.setGame(bot.config.startGame).then(() => console.log("Initial game set."));
});

console.log("Loading event listeners...");

fs.readdir("./events", (err, files) => {
	if (err) return console.error(err);

	for (let i = files.length; i--;) bot.on(files[i].split(".")[0], require(`./events/${files[i]}`).bind(null, bot));
	console.log("Listeners loaded!");
});

console.log("Loading commands...");

const loadStart = mTime.nowDouble();

fs.readdir("./commands", (err, files) => {
	if (err) return console.error(err);

	for (let i = files.length; i--;) {
		const file = files[i];
		const data = require(`./commands/${file}`);
		
		bot.commands.set(data.info.name, data);
		for (let i = data.info.aliases.length; i--;) bot.aliases.set(data.info.aliases[i], data.info.name);
	}
	bot.loadFinalized = (mTime.nowDouble() - loadStart) * 1000;
	console.log(`Took ${bot.loadFinalized.toFixed(3)}ms to load commands.`);
	console.log(`Loaded ${bot.commands.size} commands!`);
});

bot.login(bot.config.token).catch(err => {
	console.error(err);
	console.log("Error on login.\nCheck that your token is correct.");
	exec("pm2 stop selfbot", null, () => {
		process.exit(1);
	});
});

process.on('unhandledRejection', (err, p) => console.error("Unhandled Rejection at:", p));
