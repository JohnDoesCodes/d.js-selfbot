module.exports = async (bot, message, [match, flags, time] = []) => {
    await message.edit(message.content.replace(match, ""));

    if (flags.includes("a") && message.content) message = await message.edit(message.content.split("").join(" "));

    if (flags.includes("e") && message.content) {
        const msg = await message.channel.send({embed: {
            description: message.content,
            color:       message.member && message.member.displayColor ? message.member.displayColor : 25555
        }});

        await message.delete();
        message = msg;
    }

    if (flags.includes("d")) {
        let timeout = time ? parseInt(time) * 1000 : 5000;

        if (isNaN(time)) timeout = 5000;

        message.delete({timeout});
    }
};
