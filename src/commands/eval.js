const Discord = require("discord.js");
const {inspect} = require("util");
const nano = require("nanoseconds");

async function update(bot, message, promise, embed) {
    const start = process.hrtime();

    let done = await promise;

    const end = nano(process.hrtime(start));

    if (typeof done !== "string") done = inspect(done);

    logger.log(done);

    embed.addField("Promise", (done.length < 900 ? `\`\`\`${done}\`\`\`` : "```\nPromise return too long.\nLogged to logger\n```") + `\nResolved in ${(end / 1000).toFixed(3)}\u03bcs`);

    message.edit(message.content, {embed});
}

exports.run = (bot, message, args) => {
    const code = args.join(" ");
    let promise;

    try {
        if (!code) return logger.log("No code provided!");

        const start = process.hrtime();
		
        let evaled = eval(code);

        const runTime = nano(process.hrtime(start));

        if (typeof evaled !== "string") {
            if (evaled instanceof Promise) promise = evaled;
            evaled = inspect(evaled);
        }

        logger.log(code);
        logger.log(evaled);

        const embed = new Discord.RichEmbed()
			.setTitle("**OUTPUT**")
			.setDescription(evaled.length < 2036 ? "```js\n" + evaled.replace(/`/g, "`\u200b").replace(new RegExp(`${bot.token}${bot.config.customsearch ? `|${bot.config.customsearch.token}|${bot.config.customsearch.id}` : ""}`, "g"), "[SECRET]") + "\n```" : "Output too long.\nSaved to logger.")
			.setFooter(`Runtime: ${(runTime / 1000).toFixed(3)}\u03bcs`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
			.setColor(24120);

        message.edit(`**INPUT:** \`${code}\``, {embed}).then(async msg => {
            if (promise) update(bot, msg, promise, embed);
        }).catch(logger.error);
    } catch (err) {
        message.edit("**INPUT:** `" + code + "`", {embed: {
            title:       "<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>",
            description: `\`\`\`xl\n${err}\n\`\`\``,
            color:       13379110
        }});
        logger.error(err);
    }
};

exports.name = "eval";
exports.type = "utility";
exports.description = "Evaluates code from a provided string.";
exports.use = "eval [code]";
exports.aliases = [
    "run"
];
