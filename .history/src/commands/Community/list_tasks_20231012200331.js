const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Lista de las tareas activas."),
  async execute(interaction) {
    const tasks = await taskSchema.find({
        archive: false,
        isDone: false,
        serverId: interaction.guild.id,
    });

    console.log(tasks)

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
        "\n Para finalizar una tarea, escriba `/done 1`. Reemplace 1 con el ID (ultimo digito)" +
        "\n Para ver las tareas finalizadas, escriba `/done-list`"
    );
  },
};