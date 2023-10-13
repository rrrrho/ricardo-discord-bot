const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const cron = require('node-cron');

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on('ready', () => {
    console.log(`Bot está listo como ${client.user.tag}`);

    cron.schedule('0 12 * * *', () => {
        const canal = client.channels.cache.get('ID_DEL_CANAL'); // Reemplaza con el ID del canal deseado
        const mensaje = 'Este es un recordatorio automático a las 12:00 PM.';
        canal.send(mensaje);
      });
    });
})

