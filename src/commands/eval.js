const Discord = require("discord.js");
const {inspect} = require("util");
const nano = require("nanoseconds");

exports.run = (bot, message, args) => {
    const code = args.join(" ").replace(/\u037e/g, ";"), embed = new Discord.RichEmbed();

    if (!code) return logger.log("No code provided!");

    let start = process.hrtime();

    try {
        let evaled = eval(code);

        embed.setFooter("Runtime: " + (nano(process.hrtime(start)) / 1000).toFixed(3) + "\u03bcs", "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png");

        logger.log(code);
        logger.log(evaled);

        if (evaled instanceof Promise) {
            start = process.hrtime();
            evaled.then(done => {
                const end = nano(process.hrtime(start));

                logger.log(done);

                if (typeof done !== "string") done = inspect(done);

                embed.setTitle("PROMISE")
                    .setDescription((done.length < 900 ? `\`\`\`js\n${done}\`\`\`` : "```\nPromise return too long.\nLogged to console\n```") + `\nResolved in ${(end / 1000).toFixed(3)}\u03bcs`)
                    .setColor(24120);

                return message.edit(message.content, {embed});
            }).catch(err => {
                const end = nano(process.hrtime(start));

                logger.error(err);
                embed.setTitle("<:panicbasket:267397363956580352>PROMISE ERROR<:panicbasket:267397363956580352>")
                    .setDescription(`\`\`\`${err}\`\`\`\nRejected in ${(end / 1000).toFixed(3)}\u03bcs`)
                    .setColor(13379110);

                message.edit(message.content, {embed}).catch(logger.error.bind(logger));
            });
        } else {
            if (typeof evaled !== "string") evaled = inspect(evaled);
            embed.setTitle("**OUTPUT**")
                .setDescription(evaled.length < 2036 ? "```js\n" + evaled.replace(/`/g, "`\u200b").replace(new RegExp(`${bot.token}${bot.config.customsearch ? `|${bot.config.customsearch.token}|${bot.config.customsearch.id}` : ""}`, "g"), "[SECRET]") + "\n```" : "```Output too long.\nSaved to console.```")
                .setColor(24120);

            message.edit(`**INPUT:** \`${code.replace(/;/g, "\u037e")}\``, {embed}).catch(logger.error.bind(logger));
        }
    } catch (err) {
        const runTime = nano(process.hrtime(start));

        logger.error(err);
        message.edit("**INPUT:** `" + code.replace(/;/g, "\u037e") + "`", {embed: new Discord.RichEmbed()
            .setTitle("<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>")
            .setDescription(`\`\`\`xl\n${err}\n\`\`\``)
            .setFooter(`Runtime: ${(runTime / 1000).toFixed(3)}\u03bcs`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
            .setColor(13379110)
        }).catch(logger.error.bind(logger));
    }
};

exports.name = "eval";
exports.type = "utility";
exports.description = "Evaluates code from a provided string.";
exports.use = "[code]";
exports.aliases = [
    "run"
];
