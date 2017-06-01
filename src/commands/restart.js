const path = require("path");
const fs = require("fs");

exports.run = (bot, message) => {
    logger.info("Restarting...");
    message.edit("Restarting...").then(msg => {
        fs.writeFile(path.join(__dirname, "..", "restart.json"), JSON.stringify({channel:msg.channel.id, message:message.id, time:Date.now()}, null, 4), err => {
            if (err) logger.error(err);
            process.exit();
        });
    });
};

exports.name = "restart";
exports.type = "utility";
exports.description = "Exits the process gracefully and lets pm2 turn it back on.";
exports.use = "";
exports.aliases = [];
