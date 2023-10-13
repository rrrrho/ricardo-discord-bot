const { ActivityType, Events } = require('discord.js');

const statusArray = [
    {
      content: 'comiendo un pancho 🌭',
      type: ActivityType.Custom, // Puedes usar 'PLAYING', 'WATCHING', 'LISTENING', 'STREAMING', etc.
      status: 'online',
    },
    {
      content: 'jugando a Obama saw game',
      type: ActivityType.Custom,
      status: 'idle',
    },
    {
      content: 'enojada no me jodan 😡🤬',
      type: ActivityType.Custom,
      status: 'dnd', // 'dnd' significa 'do not disturb' (no molestar)
    },
    // Puedes agregar más objetos para más estados
  ];

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log('Ready!!!');

        const option = Math.floor(Math.random() * statusArray.length);

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].content,
                        type: statusArray[option].type,

                    },
                ],

                status: statusArray[option].status
            })
            console.log('yayyy!!!');
        } catch (error) {
            console.error(error);
        }
    }
};