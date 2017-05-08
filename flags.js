module.exports = async (bot, message, match, flags, time) => {
	message = await message.edit(message.content.replace(match, ""));

	if (flags.includes("a")) {
		console.log("Attempting to aestheticify...");
		const content =	message.content.split("").join(" ");

		if (content) message = await message.edit(content);
	}

	if (flags.includes("e")) {
		console.log("Attempting to embed...");
		const content = message.content.split(/ +/).join(" ");

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
		console.log("deleting!");
		time = time ? parseInt(time) * 1000 : 5000;
		message.delete(time);
	}
};
