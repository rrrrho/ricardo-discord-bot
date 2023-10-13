const { SlashCommandBuilder, EmbedBuilder, PermissionFlagBits } = require('discord.js');
const stickySchema = require('../../schemas/sticky');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unstick')
    .setDescription('Remueve un mensaje sticky del canal actual.')
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje que quieras pegar en el chat.')
    .setRequired(true)).addNumberOption(option => option.setName('frecuencia').setDescription('La frecuencia de re-envio del mensaje.')
    .setRequired(false)).setDefaultMemberPermissions(PermissionFlagBits.ManageMessages).setDMPermission(false),
    async execute (interaction) {
        let str = interaction.options.getString('mensaje');
        let amount = interaction.options.getNumber('frecuencia') || 6;

        const embed = new EmbedBuilder()
        .setColor('')
        .setDescription(str)
        .setFooter({ text: 'Este es un mensaje sticky.'});
        
        stickySchema.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                let msg = await interaction.channel.send({ embeds: [embed] });
                stickySchema.create(
                    {
                        ChannelID: interaction.ChannelID,
                        Message: str,
                        MaxCount: amount.ChannelID,
                        LastMessageID: msg.id
                    }
                )
                return await interaction.reply({ content: 'El mensaje sticky fue establecido.', ephemeral: true });
            } else {
                await interaction.reply({ content: `Ya tenes un mensaje sticky establecido para este canal. 
                Por favor, utiliza el comando /unstick para removerlo, y luego intentelo de nuevo.`, ephemeral: true});
            }
        })
    }
}