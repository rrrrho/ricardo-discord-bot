const { SlashCommandBuilder, ActionRowBuilder, 
    ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Muestra todos los roles activos del servidor."),
  async execute(interaction) {
        await interaction.reply({
            content: '¡Selecciona un rol!',
            components: [
                new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                    .setCustomId('yes')
                    .setLabel('Olvidadizo')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('no')
                    .setLabel('Atento')
                    .setStyle(ButtonStyle.Primary)
                    )
                ]
            }) 
  }
};