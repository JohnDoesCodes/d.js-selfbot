const letters = {
	a: "<:~A:273287445162885120>",
	b: "<:~B:273287445519532033>",
	c: "<:~C:273287447096459264>",
	d: "<:~D:273287446731423746>",
	e: "<:~E:273287447268425728>",
	f: "<:~F:273287447482204171>",
	g: "<:~G:273287448958599179>",
	h: "<:~H:273287448929370113>",
	i: "<:~I:273287449793396736>",
	j: "<:~J:273287450489520128>",
	k: "<:~K:273287455313100813>",
	l: "<:~L:273287456969719819>",
	m: "<:~M:273287458932785162>",
	n: "<:~N:273287458521874434>",
	o: "<:~O:273287458429468673>",
	p: "<:~P:273287458207170560>",
	q: "<:~Q:273287453270343693>",
	r: "<:~R:279482536583757834>",
	s: "<:~S:273287458731458571>",
	t: "<:~T:273287458035204097>",
	u: "<:~U:273287458769207296>",
	v: "<:~V:273287458609692674>",
	w: "<:~W:273287458643247105>",
	x: "<:~X:273287459499147265>",
	y: "<:~Y:273287458102444033>",
	z: "<:~Z:273287458844704768>"
};

const slash = {
	"lenny": (bot, message) => {
		message.edit(message.content.split(" ").slice(1).join(" ") + " ( ͡° ͜ʖ ͡°)");
	},
	"welp": (bot, message) => {
		message.edit(message.content.split(" ").slice(1).join(" ") + ' (งツ)ว');
	},
	"dance": (bot, message) => {
		const content = message.content.split(" ").slice(1).join("   ");

		if (!content) return;
		message.edit(content
		.replace(/[a-z]/gi, l => letters[l.toString()])
		.replace(/~/g, "Dancing"))
		.catch(console.error);
	},
	"docs": (bot, message) => {
		message.edit("Read the Docs\u2122");
	},
	"spoonfeed": (bot, message) => {
		message.edit(message.content.split(/ +/).slice(1).join(" "), {
			embed: {
				title: "So you want to be spoonfed?",
				image: {
					url: "https://img.fireden.net/vg/image/1429/90/1429905490901.gif"
				},
				color: message.guild ? (message.member.displayColor || 0x229364) : 0x229364
			}
		});
	}
};

module.exports = slash;
