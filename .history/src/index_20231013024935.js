const { Client, GatewayIntentBits, Events, Collection, EmbedBuilder } = require(`discord.js`);
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] }); 
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
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

const stickySchema = require('./schemas/sticky');
const ROLES = {
    YES: '1161733912427511881',
    NO: '1162245049069871195'
}

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(ROLES[interaction.customId.toUpperCase()]);
        if (!role) return interaction.reply({ content: 'Ups, <( •᷄ ᴖ•́)> no estaria encontrando el rol.', ephemeral: true });

        let exists = false;
        const memberRoles = interaction.member.roles;
        memberRoles.cache.map(r => {
            if ((r.name == 'Olvidadizo' && role.name == 'Atento') || 
            (r.name == 'Atento' && role.name == 'Olvidadizo')) {
                memberRoles.remove(r);
            }

            if (r.name == role.name) {
                exists = true;
            }
        })

        if (exists) {
            return interaction.reply({ content: `¡Ya tenes el rol ${role}! (•̀⤙•́ )`, ephemeral: true });
        }

        return interaction.member.roles.add(role).then(member => 
            interaction.reply({ content: `¡Cha chan! El rol ${role} ahora es tuyo ( ˶ˆᗜˆ˵ ).`, ephemeral: true }))
            .catch(err => console.log(err));
            // add reply
    }
})

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    const data = await stickySchema.findOne({ ChannelID: message.channel.id })
    try {
        if (!data) {
            return;
        }
        let channel = data.ChannelID;
        let cachedChannel = client.channels.cache.get(channel);

        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setDescription(data.Message)
        .setFooter({ text: 'Este es un mensaje sticky' });

        if (message.channel.id == channel) {
            data.CurrentCount += 1;
            data.save();

            if (data.CurrentCount > data.MaxCount) {
                try {
                    await client.channels.cache.get(channel).messages.fetch(data.LastMessageID).then(async(m) => {
                        await m.delete();
                    })

                    let newMessage = await cachedChannel.send({ embeds: [embed] });
                    data.LastMessageID = newMessage.id;
                    data.CurrentCount = 0;
                    data.save();
                } catch {
                    return;
                }
            }
        }
    } catch {
        return;
    }
})


