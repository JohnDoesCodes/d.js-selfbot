exports.run = (bot, message, args) => {
	const lang = args[0] || "";
	const code = lang == "js" ? "let x = \"hi\"; //code" : "code here";

	message.edit("Codeblocks:\n\\`\\`\\`" +
		`${lang}\n${code}\n` +
		"\\`\\`\\`\nbecomes\n```" +
		`${lang}\n${code}\n` +
		"```\n\nThe character is called a grave and is on the same key as the tilde (`~`)");
};

exports.info = {
	name: "codeblocks",
	type: "utility",
	description: "Displays how to properly use code block markdown.",
	use: "codeblocks <language>",
	aliases: [
		"blocks"
	]
};
