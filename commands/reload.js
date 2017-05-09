let success = 0, failure = 0;

function reload(bot, name) {
    try {
        delete require.cache[require.resolve(`./${name}.js`)];
        const cmdFile = require(`./${name}.js`);

        bot.commands.set(name, cmdFile);
	
        for (let i = cmdFile.aliases.length; i--;) bot.aliases.set(cmdFile.aliases[i], name);

        console.log(`Reloaded ${name} successfully!`);
        success++;
    } catch (err) {
        console.error(`File failed to load: ${name}.`);
        console.error(err);
        failure++;
    }
}

exports.run = (bot, message, args) => {
    if (args[0] === "all") {
        bot.commands.forEach(a => {
            reload(bot, a.name.toLowerCase());
        });
    } else {
        for (let i = args.length; i--;) {
            let cmdFile = bot.commands.get(args[i].toLowerCase());
			
            if (!cmdFile) cmdFile = bot.commands.get(bot.aliases.get(args[i].toLowerCase()));
            if (!cmdFile) continue;

            reload(bot, cmdFile.name.toLowerCase());
        }
    }
    message.channel.send(`Reloaded ${success} command${success === 1 ? "" : "s"}, ${failure} failed.`);
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
