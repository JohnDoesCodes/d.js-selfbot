exports.run = (bot, message) => {
    message.channel.send({file:"./images/ohh.png"})
		.then(() => message.delete())
		.catch(console.error);
};

exports.name = "ohh";
exports.type = "meme";
exports.description = "Sends ohh.png";
exports.use = "ohh";
exports.aliases = [];