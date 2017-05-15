const {RichEmbed} = require("discord.js");
const {exec} = require("child_process");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();

    exec(args.join(" "), (err, stdout, stdin) => {
        if (err) {
            logger.error(err);
            embed.setTitle("ERROR")
                .setDescription(`\`\`\`xl${err}\`\`\``);
        } else {
            logger.log(stdin);
            embed.setTitle("STDIN")
                .setDescription(`\`\`\`\n${stdin}\`\`\``);
        }
        message.edit(`**EXEC**: \`${args.join(" ")}\``, {embed});
    });
};

exports.name = "exec";
exports.type = "utility";
exports.description = "Executes shell commands.";
exports.use = "exec [command]";
exports.aliases = [];
