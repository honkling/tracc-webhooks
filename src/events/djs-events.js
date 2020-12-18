const assign_mf_events = require('./mf-events');

module.exports = (bot) => {
	bot.djs.on('ready', () => {
		console.log(`Discord bot ready as ${bot.djs.user.tag}`);
		const info = require('../info.json');
		bot.extra = {
			channel: bot.djs.channels.cache.get(process.env.DISCORD_CHANNEL),
		};
		if(info.webhook === {}) {
			const fs = require('fs');
			const channel = bot.extra.channel;
			channel.createWebhook('tracc')
				.then(w => info.webhook = { id: w.id, token: w.token })
				.catch(console.error);
			fs.writeFileSync('../info.json', JSON.stringify(info));
		}
		bot.djs.fetchWebhook(info.webhook.id, info.webhook.token).then(w => {
			bot.extra.wh = w;
			assign_mf_events(bot);
		});
	});

	bot.djs.on('error', console.error);

	bot.djs.on('message', (msg) => {
		if(msg.author.id !== process.env.YOUR_ID || msg.author.bot || msg.channel !== bot.extra.channel) return;
		msg.delete();
		if(msg.content.startsWith(process.env.PREFIX)) {
			const sub = msg.content.substr(process.env.PREFIX.length).split(' ')[0];
			let cmd = bot.djs.registry.commands.get(sub);
			if(!cmd) {
				bot.djs.registry.commands.forEach(c => {
					if(!c.aliases) return;
					if(c.aliases.includes(sub)) cmd = c;
				});
			}
			if(cmd) return;
			const tags = require('../info.json').tags;
			for(const i in tags) {
				const tag = tags[i];
				if(sub === i && typeof tag === 'string' && tag.trim() !== '') {
					return bot.mf.chat(tag);
				}
			}
			return bot.mf.chat(msg.content);
		} else {
			return bot.mf.chat(msg.content);
		}
	});
}