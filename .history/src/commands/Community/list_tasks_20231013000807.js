const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

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
      .setThumbnail(taggedUser.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`Todas las tareas pendientes${taggedUser.user.username} ೕ(•̀ᴗ•́)`)
      .setDescription(messageContent);

    await interaction.reply({
      content: messageContent +
        "\n Para finalizar una tarea, escriba `/done 1`. Reemplace 1 con el ID (ultimo digito)" +
        "\n Para ver las tareas finalizadas, escriba `/done-list`",
    });
    } catch (err) {
        console.log(err);
    }
  },
};