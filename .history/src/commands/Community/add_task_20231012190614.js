const { SlashCommandBuilder } = require("discord.js");
const task = require('../../schemas/task');

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
      console.log(taggedUser);
      let taggedUserId = "";
      if (taggedUser) {
        taggedUserId = taggedUser.id;
      }

      const serverId = interactions.guild.id;

      await interactions.reply("Creando la tarea...");
      const newTask = await Task.create({
        text,
        serverId,
        assignTo: taggedUserId,
      });

      await interactions.followUp(`La tarea ${newTask.text} fue agregada.`);
    } catch (error) {
      console.error(error.toString());
      await interactions.reply(`Algo salio mal.`);
    }
  },
};