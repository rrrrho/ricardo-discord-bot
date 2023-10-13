const taskSchema = require('../../schemas/task');
const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Muestra todos los roles activos del servidor."),
  async execute(interaction) {
        
  },
};