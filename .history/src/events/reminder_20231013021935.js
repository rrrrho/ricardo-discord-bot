const { EmbedBuilder, Events } = require(`discord.js`);
const cron = require('node-cron');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const server = client.guilds.cache.get('1062074461559468043');
        const members = await server.members.fetch();
        const wantRemindMembers = [];

        members.forEach(member => {
            roles = member.roles.cache.map(role => {
                if (role.name == 'Olvidadizo') {
                    wantRemindMembers.push(member);
                }
            })
        });

        console.log(wantRemindMembers)

        const todayIs = new Date().getDay();
        const reminderDays = [2, 3, 5];
    
        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setTitle('🖇 › ♡˖°꒰ : daily reminder')
        .setDescription(`≀➸ ❥ 𝘦𝘴 𝘮𝘰𝘮𝘦𝘯𝘵𝘰 𝘥𝘦 𝘱𝘳𝘦𝘱𝘢𝘳𝘢𝘳𝘴𝘦 𝘶𝘯 𝙘𝙖𝙛𝙚𝙘𝙞𝙩𝙤.‧₊°`)
        .setImage('https://i.pinimg.com/originals/5c/7f/23/5c7f23935276c1b242320bc92d304c35.gif')
    
        
        cron.schedule('20 02 * * *', () => {
    
            if (reminderDays.includes(todayIs)) {
    
            if (server) {
                wantRemindMembers.forEach(member => {
    
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