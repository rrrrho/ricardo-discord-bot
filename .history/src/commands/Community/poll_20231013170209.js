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

        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setAuthor({ name: 'Poll System '})
        .setFields({ text: 'Poll Started' })
        .setTimestamp()
        .setTitle('Poll Began')
        .setDescription(`> ${topic}`)
        .addFields({ name: 'Upvotes', value: `> **No votes**`, inline: true })
        .addFields({ name: 'Downvotes', value: `> **No votes**`, inline: true })
        .addFields({ name: 'Author', value: `> ${interaction.user}`, inline: false })
    }
}
