const Discord = require("discord.js");
const {inspect} = require("util");
const nano = require("nanoseconds");

exports.run = async (bot, message, args) => {
	const code = args.join(" ");

	try {
		if (!code) return console.log("No code provided!");

		const start = process.hrtime();
		
		let evaled = await eval(`(async () => {${code}})()`);
		
		const runTime = nano(process.hrtime(start));

		if (typeof evaled !== "string") evaled = inspect(evaled);

		console.log(code);
		console.log(evaled);

		message.edit(`**INPUT:** \`${code}\``, {embed: new Discord.RichEmbed()
			.setTitle("**OUTPUT**")
			.setDescription(evaled.length < 2036 ? "```js\n" + evaled.replace(/`/g, "`\u200b").replace(new RegExp(`${bot.token}${bot.config.customsearch ? `|${bot.config.customsearch.token}|${bot.config.customsearch.id}` : ""}`, "g"), "[SECRET]") + "\n```" : "Output too long.\nSaved to console.")
			.setFooter(`Runtime: ${(runTime / 1000).toFixed(3)}\u03bcs`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
			.setColor(24120)
		}).catch(console.error);
	} catch (err) {
		message.edit("**INPUT:** `" + code + "`", {
			embed: {
				title: "<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>",
				description: `\`\`\`xl\n${err}\n\`\`\``,
				color: 13379110
			}
		}).catch(console.error);
		console.error(err);
	}
};

exports.name = "async";
exports.type = "utility";
exports.description = "Evaluates code from a provided string.\nAllows use of the `await` keyword.";
exports.use = "async [code]";
exports.aliases = [
	"aeval",
	"aval",
	"asynceval",
	"asyncrun"
];
