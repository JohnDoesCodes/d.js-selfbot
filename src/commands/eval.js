const Discord = require("discord.js");
const {inspect} = require("util");
const nano = require("nanoseconds");

function update(bot, promise, embed, message) {
    if (!promise) return;
    const start = process.hrtime();

    return promise.then(done => {
        const end = nano(process.hrtime(start));

        logger.log(done);

        if (typeof done !== "string") done = inspect(done);

        embed.addField("PROMISE", (done.length < 900 ? `\`\`\`${done}\`\`\`` : "```\nPromise return too long.\nLogged to console\n```") + `\nResolved in ${(end / 1000).toFixed(3)}\u03bcs`);

        return message.edit(message.content, {embed});
    }).catch(err => {
        const end = nano(process.hrtime(start));

        logger.error(err);
        embed.addField("<:panicbasket:267397363956580352>PROMISE ERROR<:panicbasket:267397363956580352>", `\`\`\`${err}\`\`\`\nRejected in ${(end / 1000).toFixed(3)}\u03bcs`)
            .setColor(13379110);

        message.edit(message.content, {embed}).catch(logger.error.bind(logger));
    });
}

exports.run = (bot, message, args) => {
    const code = args.join(" ").replace(/\u037e/g, ";");
    let promise;

    if (!code) return logger.log("No code provided!");

    const start = process.hrtime();

    try {
        let evaled = eval(code);

        const runTime = nano(process.hrtime(start));

        logger.log(code);
        logger.log(evaled);

        if (typeof evaled !== "string") {
            if (evaled instanceof Promise) promise = evaled;
            evaled = inspect(evaled);
        }

        const embed = new Discord.RichEmbed()
            .setTitle("**OUTPUT**")
            .setDescription(evaled.length < 2036 ? "```js\n" + evaled.replace(/`/g, "`\u200b").replace(new RegExp(`${bot.token}${bot.config.customsearch ? `|${bot.config.customsearch.token}|${bot.config.customsearch.id}` : ""}`, "g"), "[SECRET]") + "\n```" : "Output too long.\nSaved to console.")
            .setFooter(`Runtime: ${(runTime / 1000).toFixed(3)}\u03bcs`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
            .setColor(24120);

        message.edit(`**INPUT:** \`${code.replace(/;/g, "\u037e")}\``, {embed}).then(update.bind(null, bot, promise, embed)).catch(logger.error.bind(logger));
    } catch (err) {
        const runTime = nano(process.hrtime(start));

        logger.error(err);
        message.edit("**INPUT:** `" + code.replace(/;/g, "\u037e") + "`", {embed: new Discord.RichEmbed()
            .setTitle("<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>")
            .setDescription(`\`\`\`xl\n${err}\n\`\`\``)
            .setFooter(`Runtime: ${(runTime / 1000).toFixed(3)}\u03bcs`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
            .setColor(13379110)
        });
    }
};

exports.name = "eval";
exports.type = "utility";
exports.description = "Evaluates code from a provided string.";
exports.use = "[code]";
exports.aliases = [
    "run"
];
