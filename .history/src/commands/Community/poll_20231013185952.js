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
        .setAuthor({ name: 'Emergency meeting', iconURL: `https://static.wikia.nocookie.net/amongus/images/5/5b/Morado.png/revision/latest?cb=20210613094134&path-prefix=es`})
        .setTimestamp()
        .setTitle('Votacion iniciada')
        .setDescription(`> ${topic}`)
        .addFields({ name: 'Si', value: `> **Ningun voto**`, inline: true })
        .addFields({ name: 'No', value: `> **Ningun voto**`, inline: true })
        .addFields({ name: 'Autor', value: `> ${interaction.user}`, inline: false })
        
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

        const msg = await interaction.channel.send({ embeds: [embed], components: [buttons] });
        msg.createMessageComponentCollector();

        await pollschema.create({
            Msg: msg.id,
            Upvote: 0,
            Downvote: 0,
            UpMembers: [],
            DownMembers: [],
            Guild: interaction.guild.id,
            Owner: interaction.user.id
        });
    }
}
