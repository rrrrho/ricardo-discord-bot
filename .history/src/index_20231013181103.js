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
const pollSchema = require('./schemas/vote');
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton() && (interaction.customId === 'yes' || interaction.customId === 'no')) {
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
    } else {
        if (!interaction.guild || !interaction.message || !interaction.isButton()) return;

        const data = await pollSchema.findOne({
            Guild: interaction.guild.id,
            Mesg: interaction.message.id
        });

        if (!data) return;

        const msg = await interaction.channel.messages.fetch(data.Msg);

        if (interaction.customId === 'up') {
            if (data.UpMembers.includes(interaction.user.id)) {
                return await interaction.reply({ content: `¡¡Ya enviaste un upvote a esta votacion!! <( •̀ᴖ•́)>`, 
                ephemeral: true })};

            let downvotes = data.Downvote;
            if (data.DownMembers.includes(interaction.user.id)) downvotes -= 1;

            const newEmbed = EmbedBuilder()
            .from(msg.embeds[0])
            .setFields({ name: 'Upvotes', value: `> **${data.Upvote + 1}** votes`, inline: true },
            { name: 'Downvotes', value: `> **${downvotes}** votes`, inline: true },
            { name: 'Author', value: `> <@${data.Owner}> votes` });

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('up')
                .setLabel(`✅`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('down')
                .setLabel(`❌`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel(`Votes`)
                .setStyle(ButtonStyle.Secondary)
            );

            await interaction.update({ embeds: [newEmbed], components: [buttons] });
            data.Upvote++;

            if (data.DownMembers.includes(interaction.user.id)) data.Downvote -= 1;
            data.UpMembers.push(interaction.user.id);
            data.DownMembers.pull(interaction.user.id)
            data.save();
        }

        if (i.customId == `down`) {
            if (data.DownMembers.includes(interaction.user.id)) {
                return await interaction.reply({ content: `¡¡Ya enviaste un downvote a esta votacion!! <( •̀ᴖ•́)>`, 
                ephemeral: true })};

            let upvotes = data.Upvote;
            if (data.UpMembers.includes(interaction.user.id)) upvotes -=1;   

            const newEmbed = EmbedBuilder()
            .from(msg.embeds[0])
            .setFields({ name: 'Upvotes', value: `> **${upvotes}** votes`, inline: true },
            { name: 'Downvotes', value: `> **${data.Downvote + 1}** votes`, inline: true },
            { name: 'Author', value: `> <@${data.Owner}> votes` });

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('up')
                .setLabel(`✅`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('down')
                .setLabel(`❌`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel(`Votes`)
                .setStyle(ButtonStyle.Secondary)
            );

            await interaction.update({ embeds: [newEmbed], components: [buttons] });
            data.Downvote++;

            if (data.UpMembers.includes(interaction.user.id)) data.Upvote -=1;   

            data.DownMembers.push(interaction.user.id);
            data.UpMembers.pull(interaction.user.id);
            data.save();
        }

        if (i.customId === 'votes') {
            let upvoters = [];
            await data.UpMembers.forEach(member => {
                upvoters.push(`<@${member}>`)
            });

            let downvoters = [];
            await data.DownMembers.forEach(member => {
                downvoters.push(`<@${member}>`)
            });

            const embed = new EmbedBuilder()
            .setColor('#6CC4A1')
            .setAuthor({ name: 'Poll System '})
            .setFields({ text: 'Poll Members' })
            .setTimestamp()
            .setTitle('Poll votes')
            .addFields({ name: `Upvoters (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) 
            || 'No upvoters!'}`, inline: true })
            .addFields({ name: `Downvoters (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) 
            || 'No downvoters!'}`, inline: true });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
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


//const pollSchema = require('./schemas/vote');
/*
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId == 'up' || interaction.customId == 'down') {
        if (!interaction.guild || !interaction.message || !interaction.isButton()) return;

        const data = await pollSchema.findOne({
            Guild: interaction.guild.id,
            Mesg: interaction.message.id
        });

        if (!data) return;

        const msg = await interaction.channel.messages.fetch(data.Msg);

        if (interaction.customId === 'up') {
            if (data.UpMembers.includes(interaction.user.id)) {
                return await interaction.reply({ content: `¡¡Ya enviaste un upvote a esta votacion!! <( •̀ᴖ•́)>`, 
                ephemeral: true })};

            let downvotes = data.Downvote;
            if (data.DownMembers.includes(interaction.user.id)) downvotes -= 1;

            const newEmbed = EmbedBuilder()
            .from(msg.embeds[0])
            .setFields({ name: 'Upvotes', value: `> **${data.Upvote + 1}** votes`, inline: true },
            { name: 'Downvotes', value: `> **${downvotes}** votes`, inline: true },
            { name: 'Author', value: `> <@${data.Owner}> votes` });

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('up')
                .setLabel(`✅`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('down')
                .setLabel(`❌`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel(`Votes`)
                .setStyle(ButtonStyle.Secondary)
            );

            await interaction.update({ embeds: [newEmbed], components: [buttons] });
            data.Upvote++;

            if (data.DownMembers.includes(interaction.user.id)) data.Downvote -= 1;
            data.UpMembers.push(interaction.user.id);
            data.DownMembers.pull(interaction.user.id)
            data.save();
        }

        if (i.customId == `down`) {
            if (data.DownMembers.includes(interaction.user.id)) {
                return await interaction.reply({ content: `¡¡Ya enviaste un downvote a esta votacion!! <( •̀ᴖ•́)>`, 
                ephemeral: true })};

            let upvotes = data.Upvote;
            if (data.UpMembers.includes(interaction.user.id)) upvotes -=1;   

            const newEmbed = EmbedBuilder()
            .from(msg.embeds[0])
            .setFields({ name: 'Upvotes', value: `> **${upvotes}** votes`, inline: true },
            { name: 'Downvotes', value: `> **${data.Downvote + 1}** votes`, inline: true },
            { name: 'Author', value: `> <@${data.Owner}> votes` });

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('up')
                .setLabel(`✅`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('down')
                .setLabel(`❌`)
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel(`Votes`)
                .setStyle(ButtonStyle.Secondary)
            );

            await interaction.update({ embeds: [newEmbed], components: [buttons] });
            data.Downvote++;

            if (data.UpMembers.includes(interaction.user.id)) data.Upvote -=1;   

            data.DownMembers.push(interaction.user.id);
            data.UpMembers.pull(interaction.user.id);
            data.save();
        }

        if (i.customId === 'votes') {
            let upvoters = [];
            await data.UpMembers.forEach(member => {
                upvoters.push(`<@${member}>`)
            });

            let downvoters = [];
            await data.DownMembers.forEach(member => {
                downvoters.push(`<@${member}>`)
            });

            const embed = new EmbedBuilder()
            .setColor('#6CC4A1')
            .setAuthor({ name: 'Poll System '})
            .setFields({ text: 'Poll Members' })
            .setTimestamp()
            .setTitle('Poll votes')
            .addFields({ name: `Upvoters (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) 
            || 'No upvoters!'}`, inline: true })
            .addFields({ name: `Downvoters (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) 
            || 'No downvoters!'}`, inline: true });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
})
*/

