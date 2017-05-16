const {RichEmbed} = require("discord.js");
const {exec} = require("child_process");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();

    exec(args.join(" "), (err, stdout, stdin) => {
        if (err) {
            logger.error(err);
            embed.setTitle("ERROR")
                .setColor("RED")
                .setDescription(`\`\`\`xl${err}\`\`\``);
        } else {
            embed.setTitle("OUTPUT")
                .setColor("GREEN");
            
            if (stdin) {
                logger.log(stdin);
                embed.addField("STDIN", `\`\`\`\n${stdin || "Success"}\`\`\``);
            }
            if (stdout) {
                logger.log(stdout);
                embed.addField("STDOUT", `\`\`\`\n${stdout || "Success"}\`\`\``);
            }
        }
        message.edit(`**EXEC**: \`${args.join(" ")}\``, {embed});
    });
};

exports.name = "exec";
exports.type = "utility";
exports.description = "Executes shell commands.";
exports.use = "exec [command]";
exports.aliases = [];
