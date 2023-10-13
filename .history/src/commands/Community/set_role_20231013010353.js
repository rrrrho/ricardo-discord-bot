const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Muestra todos los roles activos del servidor."),
  async execute(interaction) {
        server = interaction.guild;
            // Obtén la lista de roles del servidor
        const roles = guild.roles.cache;

        // Ahora puedes hacer lo que desees con la lista de roles, por ejemplo, mostrarlos en un mensaje embed
        const roleList = roles.map((role) => role.name).join("\n");

        // Crea un mensaje embed para mostrar la lista de roles
        const embed = new EmbedBuilder()
        .setTitle("Roles del servidor")
        .setDescription(roleList);

    // Responde con el mensaje embed
        await interaction.reply({ embeds: [embed] });
  },
};