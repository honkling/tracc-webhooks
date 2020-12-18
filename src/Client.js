const { createBot } = require('mineflayer');
const { CommandoClient } = require('discord.js-commando');
const assign_mf_events = require('./events/mf-events');
const assign_djs_events = require('./events/djs-events');

module.exports = class traccInstance extends CommandoClient {
	#Required = ['host', 'email', 'password'];

	constructor(mf_options = {}) {
		const bot = {"djs":{},"mf":{}};
		bot.djs = super({
			commandPrefix: process.env.PREFIX,
			owner: process.env.YOUR_ID
		});
		let missing = this.#Required.filter(x => !mf_options[x]);
		if(missing.length > 0) throw new Error(`Missing values in client initiation:\n${missing.join('\n')}`);
		bot.mf = new MineflayerClient(mf_options);
		
		assign_djs_events(bot);

		return bot;
	}
}

class MineflayerClient {
	#Required = ['host', 'email', 'password'];

	constructor(options = {}) {
		const bot = createBot({
			host: options.host,
			username: options.email,
			password: options.password,
			version: options.version || false
		});
		bot.connected = true;
		return bot;
	}
}