let success = 0, failure = 0;

function reload(bot, name) {
    try {
        delete require.cache[require.resolve(`./${name}.js`)];
        const cmdFile = require(`./${name}.js`);

        bot.commands.set(name, cmdFile);

        bot.logger.info(`Reloaded ${name} successfully!`);
        success++;
    } catch (err) {
        bot.logger.error(`File failed to load: ${name}.`);
        bot.logger.error(err);
        failure++;
    }
}

exports.run = (bot, message, args) => {
    args = args.map(a => a.toLowerCase());

    if (args[0] === "all") {
        bot.commands.forEach(a => {
            reload(bot, a.name.toLowerCase());
        });
    } else if (args.some(a => bot.commands.has(a) || bot.commands.has(bot.aliases.get(a)))) {
        for (let i = args.length; i--;) {
            const cmdFile = bot.commands.get(args[i]) || bot.commands.find(file => file.aliases.includes(args[i]));
			
            if (!cmdFile) continue;

            reload(bot, cmdFile.name.toLowerCase());
        }
    } else {
        bot.commands.filter(a => a.type === args[0]).forEach(file => {
            reload(bot, file.name.toLowerCase());
        });
    }
    message.channel.send(`Reloaded ${success} command${success === 1 ? "" : "s"}, ${failure} failed.`);
    success = 0;
    failure = 0;
};

exports.name = "reload";
exports.type = "utility";
exports.description = "Reloads commands.";
exports.use = "['all' or type or list of commands]";
exports.aliases = [
    "refresh"
];
