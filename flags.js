module.exports = async (bot, message, [match, flags, time]) => {
	const content = message.content.replace(match, "");

	if (flags.includes("a")) {
		console.log("Attempting to aestheticify...");

		if (content) message = await message.edit(content.split("").join(" "));
	}

	if (flags.includes("e")) {
		console.log("Attempting to embed...");

		if (content) {
			const msg = await message.channel.send({embed: {
				description: content,
				color: message.member && message.member.displayColor ? message.member.displayColor : 25555
			}});

			await message.delete();
			message = msg;
		}
	}

	if (flags.includes("d")) {
		time = time ? parseInt(time) * 1000 : 5000;

		if (isNaN(time)) time = 5000;

		message.delete(time);
	}
};
