const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Muestra todos los roles activos del servidor."),
  async execute(interaction, client) {

        roles = client.roles.cache;
        roles.forEach((rol) => {
            console.log(`Nombre del rol: ${rol.name}`);
            console.log(`ID del rol: ${rol.id}`);
            console.log('---');
          });
        }
};