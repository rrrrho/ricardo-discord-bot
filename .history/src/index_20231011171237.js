const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] }); 
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



client.on('ready', async () => {
    console.log(`Bot está listo como ${client.user.tag}`);

    const server = client.guilds.cache.get('1062074461559468043');
    const members = await server.members.fetch();
    const todayIs = new Date().getDay();
    const reminderDays = [1, 2, 3, 4, 5];
    const message = "DESPERTATE HAY DAILY EN DIEZ MINUTOS BESOS"
    
    cron.schedule('13 17 * * *', () => {
        if (reminderDays.includes(todayIs)) {

        if (server) {
            members.forEach(miembro => {

            if (!miembro.user.bot) {
                miembro.send(message)
                .then(() => console.log(`Mensaje de recordatorio enviado a ${miembro.user.tag}`))
                .catch(error => console.error(`Error al enviar el mensaje: ${error}`));
            }

            });
        } else {
            console.error(`Servidor con ID ${servidorID} no encontrado.`);
        }

        }
    });
})
