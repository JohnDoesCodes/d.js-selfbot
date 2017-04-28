const {exec} = require("child_process");
let dcCounter = 0, timeoutID;

module.exports = (bot, close) => {
	console.log(`Connection closed with code: ${close.code}`);
	if (close.code == 1000) process.exit();
	if (close.code == 1006) {
		dcCounter++;
		if (!timeoutID) {
			timeoutID = setTimeout(() => {
				dcCounter = 0;
				timeoutID = undefined;
				console.log("Issues resolved, cancelling auto exit.");
			}, 30000);
		}
	}
	if (dcCounter >= 10) {
		console.error("There is an issue with the connection to Discord.");
		bot.user.setGame(null).then(() => {
			exec("pm2 stop selfbot", null, () => {
				process.exit(1);
			});
		});
	}
};
