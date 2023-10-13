const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("personal-tasks")
    .setDescription("Lista de las tareas activas de un miembro.")
    .addUserOption((option) => 
    option
    .setName("member")
    .setDescription("Miembro cuyas tareas se quieren listar.")
    .setRequired(true)),
  async execute(interaction) {
    try {
    const taggedUser = interaction.options.getMember("member");

    const tasks = await taskSchema.find({
        archive: 'false',
        isDone: 'false',
        assignTo: taggedUser.id,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);

    if (tasks.length == 0) {
        interaction.reply('Umm... no hay ninguna tarea para mostrar ˙◠˙...')
    } else {
        let messageContent = tasks
        .map(task => `TASK: ${task.text} - ID: ${task.id}\n`)
        .join("");

        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setThumbnail(taggedUser.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Tareas pendientes de ${taggedUser.user.username} ೕ(•̀ᴗ•́)`)
        .setDescription(messageContent);

        await interaction.reply({
        embeds: [embed]
        })}} catch (err) {
        console.log(err);
    }
  },
};