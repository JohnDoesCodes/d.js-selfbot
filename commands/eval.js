const Discord = require("discord.js");
const {inspect} = require("util");
const mTime = require("microtime");

exports.run = (bot, message, args) => {
	const code = args.join(" ");

	try {
		if (!code) return console.log("No code provided!");

		const start = mTime.nowDouble();
		let evaled = eval(code);
		const runTime = (mTime.nowDouble() - start) * 1000;

		if (typeof evaled !== "string") evaled = inspect(evaled);

		console.log(code);
		console.log(evaled);
		
		if (evaled.length > 2036) throw new Error("Output too long, saved to console");

		const embed = new Discord.RichEmbed()
			.setTitle("**OUTPUT**")
			.setDescription("```js\n" + evaled.replace(/`/g, "`\u200b").replace(new RegExp(`${bot.token}${bot.config.customsearch ? `|${bot.config.customsearch.token}|${bot.config.customsearch.id}` : ""}`, "g"), "[SECRET]") + "\n```")
			.setFooter(`Runtime: ${runTime.toFixed(3)}ms`, "https://cdn.discordapp.com/attachments/286943000159059968/298622278097305600/233782775726080012.png")
			.setColor(24120);

		message.edit(`**INPUT:** \`${code}\``, {embed}).catch(console.error);
	} catch (err) {
		message.edit("**INPUT:** `" + code + "`", {
			embed: {
				title: "<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>",
				description: `\`\`\`xl\n${err}\n\`\`\``,
				color: 13379110
			}
		});
		console.error(err);
	}
};

exports.name = "eval";
exports.type = "utility";
exports.description = "Evaluates code from a provided string.";
exports.use = "eval [code]";
exports.aliases = [
	"run"
];
