const {RichEmbed} = require("discord.js");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();
    const type  = args[0].toLowerCase();

    if (!type) return logger.log("Must provide a type!");
    if (type === "types") {
        const types = [];

        bot.commands.forEach(a => a.type && !types.includes(a.type) ? types.push(a.type) : undefined);

        embed.setTitle("Types")
			.setDescription(types.sort().join("\n"))
			.setColor(24120);

        return message.edit({embed}).catch(logger.error);
    }
    const list = bot.commands.filter(a => a.type === type);

    if (!list) return logger.warn(`${type} is not a valid type!`);
    embed.setTitle(type.replace(/^(.)/, l => l.toString().toUpperCase()))
		.setDescription(list.map(a => a.name).sort().join("\n"))
		.setColor(24120);
    message.edit({embed}).catch(logger.error);
};

exports.name = "list",
exports.type = "utility";
exports.description = "Lists all commands of a specified type";
exports.use = "[type or 'types']";
exports.aliases = [
    "ls"
];
