const { EmbedBuilder, Events } = require(`discord.js`);
const cron = require('node-cron');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bot está listo como ${client.user.tag}`);
    
        const server = client.guilds.cache.get('1062074461559468043');
        const members = await server.members.fetch();
        const todayIs = new Date().getDay();
        const reminderDays = [1, 2, 3, 4, 5];
    
        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setTitle('- ———  :꒰ 𝚍𝚊𝚒𝚕𝚢 𝚛𝚎𝚖𝚒𝚗𝚍𝚎𝚛 ꒱:')
        .setDescription(`≀➸ ❥ 𝘦𝘴 𝘮𝘰𝘮𝘦𝘯𝘵𝘰 𝘥𝘦 𝘱𝘳𝘦𝘱𝘢𝘳𝘢𝘳𝘴𝘦 𝘶𝘯 𝙘𝙖𝙛𝙚𝙘𝙞𝙩𝙤.‧₊°`)
        .setThumbnail('https://i.pinimg.com/564x/ce/af/da/ceafda1de3d0f2c9b7fc29f8a5ca79ab.jpg')
        .setImage('https://i.pinimg.com/originals/5c/7f/23/5c7f23935276c1b242320bc92d304c35.gif')
    
        
        cron.schedule('59 23 * * *', () => {
    
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
    }
    
};