module.exports = (bot) => {
	const info = require('../info.json').webhook;
	let wh = bot.extra.wh;

	bot.mf.once('spawn', () => {
		console.log('Minecraft bot spawned!');
	});

	bot.mf.on('chat', (username, msg) => {
		const message = msg.includes(bot.mf.username) ? `\`${msg.trim()}\` <@${process.env.YOUR_ID}>` : `\`${msg.trim()}\``;
		if(message === '``') return;
		console.log(`${username}: ${msg}`);
		wh.send(message, {
			username: username,
			avatarURL: `https://minotar.net/avatar/${username}`
		});
	});

	bot.mf.on('unmachedMessage', (msg) => {
		const message = msg.includes(bot.mf.username) ? `\`${msg.trim()}\` <@${process.env.YOUR_ID}>` : `\`${msg.trim()}\``;
		if(message === '``') return;
		console.log(msg);
		wh.send(message, {
			username: 'Server',
			avatarURL: `https://minotar.net/avatar/endereye`
		});
	});
}