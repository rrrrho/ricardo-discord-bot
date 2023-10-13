const pollschema = require('../../schemas/vote');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Crea una votacion en el canal.')
    .addStringOption(option => option.setName('topic').setDescription('El tema de la votacion.')
    .setMinLength(1).setMaxLength(2000).setRequired(true)),
    async execute(interaction) {
        await interaction.reply({ content: '¡Tu votacion empezo justo abajo!', ephemeral: true })
    }
}
