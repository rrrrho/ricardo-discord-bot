const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("undo")
    .setDescription("Devuelve una tarea finalizada a pendiente")
    .addStringOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID de la tarea que desea devolver a estado pendiente.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const id = interaction.options.getString("taskid");

    await interaction.deferReply("Chequeando...");
    const task = await taskSchema.findById(id);

    if (task.serverId === interaction.guild.id) {
      await taskSchema.updateOne(
        { _id: id },
        { isDone: 'false' }
      );
    } else {
      await interaction.editReply(
        "Solo puedes destildar una tarea del servidor actual."
      );
    }

    await interaction.editReply(
      `La tarea con el ID #${id} ha sido agregada a la tarea de pendientes.`
    );
  },
};