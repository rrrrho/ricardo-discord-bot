const { ActivityType } = require('discord.js');

const statusArray = [
    {
      content: 'with depression',
      type: ActivityType.Streaming, // Puedes usar 'PLAYING', 'WATCHING', 'LISTENING', 'STREAMING', etc.
      status: 'online',
    },
    {
      content: 'Descansando un poco',
      type: ActivityType.Watching,
      status: 'idle',
    },
    {
      content: 'No me molestes',
      type: ActivityType.Listening,
      status: 'dnd', // 'dnd' significa 'do not disturb' (no molestar)
    },
    // Puedes agregar más objetos para más estados
  ];

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        async () => {
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
            } catch (error) {
                console.error(error);
            }
        }
    },
};