const { ActivityType, Events } = require('discord.js');

const statusArray = [
    {
      content: 'chugga chugga choo choooo',
      type: ActivityType.Custom,
      status: 'dnd',
    }
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