const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, 
    ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Muestra todos los roles activos del servidor."),
  async execute(interaction) {
        const server = interaction.guild;
        const roles = server.roles.cache;
        const roleList = roles.map((role) => role.name).join("\n");

        const embed = new EmbedBuilder()
        .setTitle("Roles del servidor")
        .setDescription(roleList);

        await interaction.reply({ 
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
  },
};