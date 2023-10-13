const taskSchema = require('../../schemas/task');
const ObjectID = require('mongodb').ObjectId;
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done")
    .setDescription("Finalizar una tarea.")
    .addStringOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID de la tarea que desea finalizar.")
        .setRequired(true)
    ),
  async execute(interactions) {
    const id = interactions.options.getString("taskid");

    await interactions.reply("Chequeando...");
    const task = await taskSchema.findById(id);

    if (!task) {
      await interactions.followUp("La tarea no existe..");
    }

    if (task.serverId === interactions.guild.id) {
      await task.updateOne(
        { _id: new ObjectID(id) },
        {$set: {"isDone": true}},
      );
    } else {
      await interactions.followUp(
        "You can only tick off a task from the current server"
      );
    }

    await interactions.followUp(
      `Task with id ${id} has been ticked off from your todo list`
    );
  },
};