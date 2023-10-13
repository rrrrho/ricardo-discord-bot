const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
        .setTitle(`Tareas finalizadas ೕ(•̀ᴗ•́)`)
        .setDescription(messageContent);

    await interaction.reply({
      embeds: [embed],
      content: "\n Si quiere devolver una tarea a la lista de pendientes, envie /undo # ¡Reemplace el # con el ID correspondiente!\nPara ver las tareas que se encuentran pendientes, envie `/list`"
    }
    );
  },
};