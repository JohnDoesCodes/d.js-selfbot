const {RichEmbed} = require("discord.js");
const {exec} = require("child_process");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();
    const toExec = args.join(" ");

    if (/rm -rf --no-preserve-root/.test(toExec)) return logger.warn("Why do you wanna do that.");

    exec(toExec, (err, stdout, stdin) => {
        if (err) {
            logger.error(err);
            embed.setTitle("ERROR")
                .setColor("RED")
                .setDescription(`\`\`\`xl\n${err}\`\`\``);
        } else {
            embed.setColor("GREEN");
            
            if (stdin) {
                logger.log("[STDIN]", stdin);
                embed.addField("STDIN", `\`\`\`\n${stdin}\`\`\``);
            }
            if (stdout) {
                logger.log("[STDOUT]", stdout);
                embed.addField("STDOUT", `\`\`\`\n${stdout}\`\`\``);
            }
            if (!stdout && !stdin) {
                logger.log("No command line output");
                embed.setTitle("Success");
            }
        }
        message.edit(`**EXEC**: \`${toExec}\``, {embed});
    });
};

exports.name = "exec";
exports.type = "utility";
exports.description = "Executes shell commands.";
exports.use = "exec [command]";
exports.aliases = [];
