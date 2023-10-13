const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const stickySchema = require('../../schemas/sticky');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unstick')
    .setDescription('Remueve un sticky del canal actual.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
    async execute (interaction) {
        const data = await stickySchema.findOne({ ChannelID: interaction.channel.id });
        if (!data) {
            return await interaction.reply({ content: 'Um... <( •᷄ ᴖ•́)> no veo ningun sticky en este canal.', ephemeral: true });
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
        await stickySchema.deleteMany({ ChannelID: interaction.channel.id })
        try {
            return await interaction.reply({ content: '¡Ya elimine el sticky! Ahora podes agregar otro (｡> ᴗ ☆｡) ‧₊˚ .', ephemeral: true});
        } catch {
            return;
        }
    }
}