const regex = /(\d*)d(\d+|%)(?:(\+|-)(\d+))?/i;

exports.run = (bot, message, args) => {
	const [dice] = regex.exec(args[0]);

	if (!dice) {
		return console.log("Not a valid roll!");
	} else {
		bot.fudge.set(dice, args[1]);
		console.log("Fudge set.");
	}
};

exports.name = "fudge";
exports.type = "general";
exports.description = "Sets a value for a fudged roll.";
exports.use = "fudge [roll to fudge] [value to roll]";
exports.aliases = [];
