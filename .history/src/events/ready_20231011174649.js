const statusArray = [
    {
      content: '¡Hola, estoy en línea!',
      type: 'PLAYING', // Puedes usar 'PLAYING', 'WATCHING', 'LISTENING', 'STREAMING', etc.
      status: 'online',
    },
    {
      content: 'Descansando un poco',
      type: 'WATCHING',
      status: 'idle',
    },
    {
      content: 'No me molestes',
      type: 'LISTENING',
      status: 'dnd', // 'dnd' significa 'do not disturb' (no molestar)
    },
    // Puedes agregar más objetos para más estados
  ];

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        async function pickPresence () {
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