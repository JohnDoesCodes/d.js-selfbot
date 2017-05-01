# d.js-selfbot
## About

This selfbot was a project I made mainly for myself.

It uses [discord.js](https://discord.js.org/#/docs/main/master/general/welcome).

Want to contact me? I'm EPICZEUS#2700 on Discord!

### Initializing

To clone the repository, run `git clone https://github.com/EPICZEUS1/d.js-selfbot.git`, or download directly.

Install [node](https://nodejs.org/en/download/current/) v7.6 or greater, then run `npm i` to download required packages.

If you do not have a custom search engine to use, remove the file `google.js` and the config value `customsearch`.

### Creating a New Command

Create a new JavaScript file in the commands directory. Commands follow this template:
```js
exports.run = (/* function arguments, typically bot, message, args */) => {
	// function code
}

exports.info = {
	name: "the file/command name",
	type: "the type of command. The default four groups are general, meme, utility, and admin",
	description: "A brief description of what the command does",
	use: "how the command is meant to be called",
	aliases: [
		"An array of aliases for the command",
		"There isn't any limit to the number of aliases you can have",
		"Spaces are not valid"
	]
}
```

Once the file is saved, you can add the command by using the newcmd command while in discord.
