const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Lista de las tareas activas."),
  async execute(interaction) {
    try {
    const tasks = await taskSchema.find({
        archive: 'false',
        isDone: 'false',
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);

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

      const embed = new EmbedBuilder()
      .setColor('#6CC4A1')
      .setTitle(`Todas las tareas pendientes ೕ(•̀ᴗ•́)`)
      .setDescription(messageContent);

    await interaction.reply({
      embeds: [embed],
      content: "\n Si quiere finalizar una tarea, envie `/done #` ¡Reemplace # con el ID correspondiente!\nPara ver las tareas que se encuentran finalizadas, envie `/done-list`."
    });
    } catch (err) {
        console.log(err);
    }
  },
};