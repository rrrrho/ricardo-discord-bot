const taskSchema = require('../../schemas/task');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("personal-done-tasks")
    .setDescription("Lista las tareas pendientes/activas de un miembro.")
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
        isDone: 'true',
        assignTo: taggedUser.id,
        serverId: interaction.guild.id,
    }, ["id", "text", "assignTo"]);

    if (tasks.length == 0) {
        await interaction.reply({
            content: 'Umm... me parece que no tienes tareas finalizadas para mostrar ˙◠˙...'
          });
    } else {

        let messageContent = tasks
        .map(task => `TASK: ${task.text} - ID: ${task.id}\n`)
        .join("");

        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setThumbnail(taggedUser.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Tareas finalizadas de ${taggedUser.user.username} ೕ(•̀ᴗ•́)`)
        .setDescription(messageContent);

        await interaction.reply({
        embeds: [embed],
        content: "\n Si queres devolver una tarea a la lista de pendientes, envia `/undo #` ¡Reemplace el # con el ID correspondiente!\nPara ver las tareas que se encuentran pendientes, envie `/list-personal-tasks #` ¡Reemplace el # con el username del miembro elegido!"
        });
        }
  } catch (err) {
    await interaction.reply('Algo salio mal ˙◠˙.');
    }
}
};