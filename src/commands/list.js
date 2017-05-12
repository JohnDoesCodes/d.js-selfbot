const {RichEmbed} = require("discord.js");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();

    if (!args[0]) return console.log("Must provide a type!");
    if (args[0] === "types") {
        const types = [];

        bot.commands.forEach(a => a.type && !types.includes(a.type) ? types.push(a.type) : undefined);

        embed.setTitle("Types")
			.setDescription(types.sort().join("\n"))
			.setColor(24120);

        return message.edit({embed}).catch(console.error);
    }
    const list = bot.commands.filter(a => a.type === args[0]);

    if (!list) return console.log(`${args[0]} is not a valid type!`);
    embed.setTitle(args[0].replace(/^(.)/, l => l.toString().toUpperCase()))
		.setDescription(list.map(a => a.name).sort().join("\n"))
		.setColor(24120);
    message.edit({embed}).catch(console.error);
};

exports.name = "list",
exports.type = "utility";
exports.description = "Lists all commands of a specified type";
exports.use = "list [type or 'types']";
exports.aliases = [
    "ls"
];
