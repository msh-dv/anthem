import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => { console.log('Hola, listoi');});

client.on('messageCreate', (message) => {
    if (message.content === 'hola') {
        message.reply('¡Hola! ¿Cómo estás?');
    }
});

