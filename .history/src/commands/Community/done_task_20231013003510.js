const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done")
    .setDescription("Cambia el estado de una tarea a 'finalizado'.")
    .addStringOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID de la tarea que quieras finalizar.")
        .setRequired(true)
    ),
  async execute(interactions) {
    const id = interactions.options.getString("taskid");

    await interactions.deferReply("Estoy trabajando en tu solicitud...");
    const task = await taskSchema.findById(id);

    if (!task) {
      await interactions.editReply("Umm.. Me parece que la tarea no existe ˙◠˙.");
    }

    if (task.serverId === interactions.guild.id) {
      await taskSchema.updateOne(
        { _id: id },
        { isDone: 'true' });
    } else {
      await interactions.editReply(
        "¡ERROR! Solo puedes modificar una tarea de este servidor."
      );
    }

    await interactions.editReply(
      `¡Listo! Agrege la tarea a la lista de finalizadas ♡.`
    );
  },
};