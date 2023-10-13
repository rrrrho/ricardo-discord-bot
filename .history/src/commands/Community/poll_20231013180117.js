const pollschema = require('../../schemas/vote');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Crea una votacion en el canal.')
    .addStringOption(option => option.setName('topic').setDescription('El tema de la votacion.')
    .setMinLength(1).setMaxLength(2000).setRequired(true)),
    async execute(interaction) {
        await interaction.reply({ content: '¡Tu votacion empezo justo abajo!', ephemeral: true });
        const topic = await interaction.options.getString('topic');

        console.log('hee')
        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        /*
        .setAuthor({ name: 'Poll System '})
        .setFields({ text: 'Poll Started' })
        */
        .setTimestamp()
        .setTitle('Poll Began')
        .setDescription(`> ${topic}`)
        .addFields({ name: 'Upvotes', value: `> **No votes**`, inline: true })
        .addFields({ name: 'Downvotes', value: `> **No votes**`, inline: true })
        .addFields({ name: 'Author', value: `> ${interaction.user}`, inline: false })
        
        console.log('uuuuuuuuu')
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

        console.log('777')

        const msg = await interaction.channel.send({ embeds: [embed], components: [buttons] });
        msg.createMessageComponentCollector();

        console.log('yeee')
        await pollschema.create({
            Msg: msg.id,
            Upvote: 0,
            Dowvote: 0,
            UpMembers: [],
            DownMembers: [],
            Guild: interaction.guild.id,
            Owner: interaction.user.id
        });
    }
}
