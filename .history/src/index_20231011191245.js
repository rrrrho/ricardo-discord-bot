const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require(`discord.js`);
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] }); 
const cron = require('node-cron');
const handelCommands = require('./functions/handelCommands');
const handelEvents = require('./functions/handelEvents');

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
    handelCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();



client.on('ready', async () => {
    console.log(`Bot está listo como ${client.user.tag}`);

    const server = client.guilds.cache.get('1062074461559468043');
    const members = await server.members.fetch();
    const todayIs = new Date().getDay();
    const reminderDays = [1, 2, 3, 4, 5];

    const embed = new EmbedBuilder()
    .setColor('#6CC4A1')
    .setTitle('ʚ🎵ɞ Daily reminder')
    .setDescription(`⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂ ⠂⠄⠄⠂☆\nEs momento de armar un cafecito.`)
    .setThumbnail('https://i.pinimg.com/564x/e0/8d/b7/e08db70153a6a02b6aed3949d701abfa.jpg')
    .setImage('https://i.pinimg.com/564x/6f/e8/7c/6fe87ccd7c71daf17a7d488e9e6613a6.jpg')

    
    cron.schedule('01 19 * * *', () => {

        if (reminderDays.includes(todayIs)) {

        if (server) {
            members.forEach(member => {

            if (!member.user.bot) {
                member.send({ embeds: [embed] })
                .then(() => console.log(`Mensaje de recordatorio enviado a ${member.user.tag}`))
                .catch(error => console.error(`Error al enviar el mensaje: ${error}`));
            }
            });
        } else {
            console.error(`Servidor con ID ${servidorID} no encontrado.`);
        }

        }
    });
})
