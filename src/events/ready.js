const fs = require("fs");
const {exec} = require("child_process");

exports.run = bot => {
    bot.logger.log(`Logged in as ${bot.user.tag}`);
    bot.user.setGame(bot.config.startGame).then(() => bot.logger.info("Initial game set."));

    if (fs.existsSync("./src/restart.json")) {
        const data = JSON.parse(fs.readFileSync("./src/restart.json"));

        bot.channels.get(data.channel).fetchMessage(data.message).then(msg => {
            msg.edit(`Bot has restarted! Took \`${Date.now() - data.time}\`ms`);
            exec("cd src && del restart.json", null, err => err ? bot.logger.error(err) : bot.logger.info("Removed file successfully!"));
        });
    }
};

exports.event = "ready";
