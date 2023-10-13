const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("personal-tasks")
    .setDescription("Lista de las tareas activas del usuario.")
    .addMentionableOption((option) => 
    option
    .setName("mention")
    .setDescription("Mencion para listar sus tareas.")
    .setRequired(true)),
  async execute(interaction) {
    try {
    const taggedUser = interaction.options.getMentionable("mention");

    const tasks = await taskSchema.find({
        archive: 'false',
        isDone: 'false',
        assignTo: taggedUser.id,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);


    let messageContent = tasks
      .map((task, idx) =>  `${idx + 1}. ${task.text} - ${task.id}\n`)
      .join("");


    await interaction.reply({
      content: `Tareas pendientes de ${taggedUser}\n` + messageContent +
        "\n Para finalizar una tarea, escriba `/done 1`. Reemplace 1 con el ID (ultimo digito)" +
        "\n Para ver las tareas finalizadas, escriba `/done-list`",
    });
    } catch (err) {
        console.log(err);
    }
  },
};