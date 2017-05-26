let success = 0, failure = 0;

function reload(bot, name) {
    try {
        delete require.cache[require.resolve(`./${name}.js`)];
        const cmdFile = require(`./${name}.js`);

        bot.commands.set(name, cmdFile);

        logger.info(`Reloaded ${name} successfully!`);
        success++;
    } catch (err) {
        logger.error(`File failed to load: ${name}.`);
        logger.error(err);
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
            const cmdFile = bot.commands.get(args[i].toLowerCase()) || bot.commands.find(file => file.aliases.includes(args[i].toLowerCase()));
			
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
exports.use = "['all' or list of commands]";
exports.aliases = [
    "refresh"
];
