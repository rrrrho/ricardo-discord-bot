const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done-list")
    .setDescription("Lista todas las tareas finalizadas."),
  async execute(interaction) {
    const tasks = await taskSchema.findAll({
        archive: false,
        isDone: true,
        serverId: interactions.guild.id,
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
        "\n To Add a task back, send `/undo 1`. Replace 1 with the ID(last digit)"
    );
  },
};