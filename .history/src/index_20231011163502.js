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

    client.on('ready', () => {
        console.log(`Bot está listo como ${client.user.tag}`);
        const servidor = client.guilds.cache.get('1062074461559468043'); // Reemplaza con el ID de tu servidor
        const members = async () => await servidor.members.fetch()
        console.log(members.length)
    
    
    //////////////////
        cron.schedule('10 16 * * *', () => {
            const servidor = client.guilds.cache.get('1062074461559468043'); // Reemplaza con el ID de tu servidor
            const mensaje = 'Este es un recordatorio automático a las 15:30 (3:30 PM).';
            const members = servidor.members.fetch().then(console.log).catch(console.error);
    
            if (servidor) {
              members.forEach(miembro => {
            
                console.log(miembro.user.id);
    
                if (!miembro.user.bot) {
                    miembro.send(mensaje)
                    .then(() => console.log(`Mensaje de recordatorio enviado a ${miembro.user.tag}`))
                    .catch(error => console.error(`Error al enviar el mensaje: ${error}`));
                }
            });
            } else {
              console.error(`Servidor con ID ${servidorID} no encontrado.`);
            }
    
            console.log('ok');
          });
        });
})();

/*
client.on('ready', () => {
    console.log(`Bot está listo como ${client.user.tag}`);
    const servidor = client.guilds.cache.get('1062074461559468043'); // Reemplaza con el ID de tu servidor
    const members = async () => await servidor.members.fetch()
    console.log(members.length)


//////////////////
    cron.schedule('10 16 * * *', () => {
        const servidor = client.guilds.cache.get('1062074461559468043'); // Reemplaza con el ID de tu servidor
        const mensaje = 'Este es un recordatorio automático a las 15:30 (3:30 PM).';
        const members = servidor.members.fetch().then(console.log).catch(console.error);

        if (servidor) {
          members.forEach(miembro => {
        
            console.log(miembro.user.id);

            if (!miembro.user.bot) {
                miembro.send(mensaje)
                .then(() => console.log(`Mensaje de recordatorio enviado a ${miembro.user.tag}`))
                .catch(error => console.error(`Error al enviar el mensaje: ${error}`));
            }
        });
        } else {
          console.error(`Servidor con ID ${servidorID} no encontrado.`);
        }

        console.log('ok');
      });
    });

    */
    /*
    cron.schedule('21 15 * * *', () => {
        const canal = client.channels.cache.get('1161375676612493474'); // Reemplaza con el ID del canal deseado
        const mensaje = 'Este es un recordatorio automático a las 12:00 PM. @everyone';
        canal.send(mensaje);
      });
      */


