const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("personal-tasks")
    .setDescription("Lista de las tareas activas del usuario.")
    .addUserOption((option) => 
    option
    .setName("mention")
    .setDescription("Mencion para listar sus tareas.")
    .setRequired(true)),
  async execute(interaction) {
    try {
    const taggedUser = interaction.options.getMember("mention");

    const tasks = await taskSchema.find({
        archive: 'false',
        isDone: 'false',
        assignTo: taggedUser.id,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);

    let messageContent = tasks
      .map(task => `TASK: ${task.text} - ID: ${task.id}\n`)
      .join("");

    const embed = new EmbedBuilder()
    .setColor('#27005D')
    .setTitle(`Tareas pendientes de ${taggedUser.username}`)
    .setDescription(messageContent);

    await interaction.reply({
      embeds: [embed]
    });
    } catch (err) {
        console.log(err);
    }
  },
};