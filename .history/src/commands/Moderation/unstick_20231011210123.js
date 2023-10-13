const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const stickySchema = require('../../schemas/sticky');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unstick')
    .setDescription('Remueve un mensaje sticky del canal actual.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
    async execute (interaction) {
        const data = await stickySchema.findOne({ ChannelID: interaction.channel.id });
        if (!data) {
            return await interaction.reply({ content: 'No hay un mensaje sticky en este canal.', ephemeral: true });
        } else {
            try {
                interaction.client.channels.cache.get(data.ChannelID).messages.fetch(data.LastMessageID)
                .then(async (m) => {
                    await m.delete();
                })
            } catch {
                return;
            }
        }
        stickySchema.deleteMany({ ChannelID: interaction.channel.id }, async (err, data) => {
            if (err) throw err;
            return await interaction.reply({ content: 'El mensaje sticky ha sido eliminado.', ephemeral: true});
        })

    }
}