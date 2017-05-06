const regex = /(\d*)d(\d+|%)(?:(\+|-)(\d+))?/i;

const maths = {
	"+": (...items) => items.reduce((a, b) => a + b),
	"-": (...items) => items.reduce((a, b) => a - b),
};

exports.run = (bot, message, args) => {
	const out = args.map(a => {
		const dice = regex.exec(a), nums = [];

		if (!dice) return null;

		const fudge = bot.fudge.get(dice[0]);

		if (fudge) {
			bot.fudge.delete(dice[0]);

			return `${dice[0]}: <${fudge}>`;
		}

		const [diceCount, faceCount, math, bonus] = [dice[1] ? parseInt(dice[1]) : 1, dice[2] === "%" ? 100 : parseInt(dice[2]), dice[3], parseInt(dice[4])];

		for (let i = 0; i < diceCount; i++) nums.push(~~(Math.random() * 100 * faceCount) % faceCount + 1);

		const final = nums.reduce((a, b) => a + b);
		
		return `${dice[0]}: (${nums.join(" + ")}) => ${final} ${math && bonus ? `${math} ${bonus} ` : ""}= <${maths[math] && bonus ? maths[math](final, bonus) : final}>`;
	}).filter(a => a);

	out.length ? message.channel.send(out.join("\n"), {code:"html"}).catch(console.error) : console.log("No valid rolls!");
};

exports.name = "roll";
exports.type = "general";
exports.description = "Rolls dice.";
exports.use = "roll [dice {format: <#>[d#]<+|-#>}]";
exports.aliases = [];
