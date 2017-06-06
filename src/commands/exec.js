const {exec} = require("child_process");

exports.run = (bot, message, args) => {
    const toExec = args.join(" ");

    let out = "";

    if (/rm -rf --no-preserve-root/.test(toExec)) return logger.warn("Why do you wanna do that.");

    exec(toExec, (err, stdout, stdin) => {
        if (err) {
            logger.error(err);
            out += "ERROR\n" +
                `\`\`\`xl\n${err}\`\`\``;
        } else {
            if (stdin) {
                logger.log("[STDIN]", stdin);
                out += "**STDIN**\n" +
                    `\`\`\`\n${out.length < 1500 ? stdin : "Logged"}\n\`\`\``;
            }
            if (stdout) {
                logger.log("[STDOUT]", stdout);
                out += "**STDOUT**\n" +
                    `\`\`\`\n${out.length < 1500 ? stdout : "Logged"}\n\`\`\``;
            }
            if (!stdout && !stdin) {
                logger.log("No command line output");
                out += "**Success**";
            }
        }
        message.edit(`**EXEC**: \`${toExec}\`\n${out}`);
    });
};

exports.name = "exec";
exports.type = "utility";
exports.description = "Executes shell commands.";
exports.use = "[command]";
exports.aliases = [];
