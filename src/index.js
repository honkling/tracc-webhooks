const traccInstance = require('./Client');
const assign_djs_events = require('./events/djs-events');
require('dotenv').config({ path: './../.env' });

const bot = new traccInstance({
	host: process.env.SERVER,
	email: process.env.MINECRAFT_EMAIL,
	password: process.env.MINECRAFT_PASSWORD
});

bot.djs.login(process.env.BOT_TOKEN);