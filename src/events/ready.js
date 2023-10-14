const { ActivityType, Events } = require('discord.js');
const mongoose = require('mongoose')
const mongodbURL = process.env['MONGODBURL'];

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
        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
        })

        if (mongoose.connect) {
            console.log('Database is running.')
        }

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
};
