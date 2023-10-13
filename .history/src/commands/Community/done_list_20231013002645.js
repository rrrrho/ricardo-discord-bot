const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done-list")
    .setDescription("Lista las tareas que se encuentran finalizadas."),
  async execute(interaction) {
    const tasks = await taskSchema.find({
        archive: false,
        isDone: true,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);
    console.log(tasks);

    let messageContent = tasks
      .map(task => {
        if (task.assignTo) {
            return `TASK: ${task.text} - ASSIGNED: <@${task.assignTo}> - ID: ${
              task.id
            }\n`;
          } else {
            return `TASK: ${task.text} - ID: ${task.id}\n`;
          }
      })
      .join("");

    await interaction.reply(
      messageContent +
        "\n Si quiere devolver una tarea a la lista de pendientes, envie /undo # ¡Reemplace el # con el ID correspondiente!"
    );
  },
};