const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done-list")
    .setDescription("Lista todas las tareas finalizadas."),
  async execute(interaction) {
    const tasks = await taskSchema.find({
        archive: false,
        isDone: true,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);
    console.log(tasks);

    let messageContent = tasks
      .map((task, idx) => {
        if (task.assignTo) {
          return `${idx + 1}. ${task.text} - <@${task.assignTo}> - ${
            task.id
          }\n`;
        } else {
          return `${idx + 1}. ${task.text} - ${task.id}\n`;
        }
      })
      .join("");

    await interaction.reply(
      messageContent +
        "\n Para volver a agregar una tarea a pendiente, escriba /undo #. Reemplace el # con el ID correspondiente."
    );
  },
};