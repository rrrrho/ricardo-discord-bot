const { SlashCommandBuilder } = require("discord.js");
const taskSchema = require('../../schemas/task');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Agrega una nueva tarea.")
    .addStringOption((option) =>
        option
        .setName("text")
        .setDescription("La descripcion de la tarea.")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("assign")
        .setDescription("¿A quien quiere asignar la tarea?")
    ),
  async execute(interactions) {
    try {
      const text = interactions.options.getString("text");
      const taggedUser = interactions.options.getMentionable("assign");

      let taggedUserId = "";
      if (taggedUser) {
        taggedUserId = taggedUser.id;
      }

      const serverId = interactions.guild.id;

      await interactions.deferReply("Estoy trabajando en tu solicitud...");

      const newTask = await taskSchema.create({
        text: text,
        serverId: serverId,
        assignTo: taggedUserId,
      });

      await interactions.editReply(`¡Yaaa! Agrege la tarea a la lista de pendientes ♡.`);
    } catch (error) {
      console.error(error.toString());
      await interactions.editReply('Algo salio mal ˙◠˙.');
    }
  },
};