const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("undo")
    .setDescription("Devuelve una tarea finalizada al listado de tareas pendientes.")
    .addStringOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID de la tarea que se desea devolver a estado pendiente.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const id = interaction.options.getString("taskid");

    await interaction.deferReply("Estoy trabajando en tu solicitud...");
    const task = await taskSchema.findById(id);

    if (task.serverId === interaction.guild.id) {
      await taskSchema.updateOne(
        { _id: id },
        { isDone: 'false' }
      );
    } else {
      await interaction.editReply(
        "¡ERROR! Solo puedes modificar una tarea de este servidor."
      );
    }

    await interaction.editReply(
      `¡Listo! Agrege la tarea a la lista de pendientes ♡.`
    );
  },
};