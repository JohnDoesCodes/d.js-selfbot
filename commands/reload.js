let success = 0, failure = 0;

function reload(bot, name) {
	try {
		delete require.cache[require.resolve(`./${name}.js`)];
		const cmdFile = require(`./${name}.js`);

		bot.commands.set(name, cmdFile);
	
		for (let i = cmdFile.info.aliases.length; i--;) bot.aliases.set(cmdFile.info.aliases[i], name);

		console.log(`Reloaded ${name} successfully!`);
		success++;
	} catch (err) {
		console.error(`File failed to load: ${name}.`);
		console.error(err);
		failure++;
	}
}

exports.run = (bot, message, args) => {
	if (args[0] == "all") {
		bot.commands.forEach(a => {
			if (!a.info) return;
			reload(bot, a.info.name);
		});
	} else {
		for (const command of args) {
			const details = bot.commands.get(command);
			
			if (!details) continue;
			reload(bot, command);
		}
	}
	message.channel.send(`Reloaded ${success} command${success == 1 ? "" : "s"}, ${failure} failed.`);
	success = 0;
	failure = 0;
};

exports.name = "reload";
exports.type = "utility";
exports.description = "Reloads commands.";
exports.use = "reload ['all' or list of commands]";
exports.aliases = [
	"refresh"
];
