const { SlashCommandBuilder } = require("discord.js");
const taskSchema = require('../../schemas/task');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Arega una nueva tarea")
    .addStringOption((option) =>
        option
        .setName("text")
        .setDescription("El texto que describe la tarea")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("assign")
        .setDescription("Mencion para asignar la tarea a alguien.")
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

      await interactions.deferReply("Creando la tarea...");

      const newTask = await taskSchema.create({
        text: text,
        serverId: serverId,
        assignTo: taggedUserId,
      });

      await interactions.editReply(`La tarea ${newTask.text} fue agregada.`);
    } catch (error) {
      console.error(error.toString());
      //await interactions.reply(`Algo salio mal.`);
    }
  },
};