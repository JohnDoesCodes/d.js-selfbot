const fs = require("fs");
const {exec} = require("child_process");

exports.run = bot => {
    logger.log(`Logged in as ${bot.user.tag}`);
    bot.user.setGame(bot.config.startGame).then(() => logger.info("Initial game set."));

    if (fs.existsSync("./src/restart.json")) {
        const data = JSON.parse(fs.readFileSync("./src/restart.json"));

        bot.channels.get(data.channel).fetchMessage(data.message).then(msg => {
            msg.edit("Bot has restarted!");
            exec("cd src && del restart.json", err => err ? logger.error(err) : logger.info("Removed file successfully!"));
        });
    }
};

exports.event = "ready";
