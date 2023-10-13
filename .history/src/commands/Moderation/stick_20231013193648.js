const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const stickySchema = require('../../schemas/sticky');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stick')
    .setDescription('Crea un mensaje sticky en el canal actual.')
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje que quieras pegar en el chat.')
    .setRequired(true)).addNumberOption(option => option.setName('frecuencia').setDescription('La frecuencia de re-envio del mensaje.')
    .setRequired(false)).setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDMPermission(false),
    async execute (interaction) {
        let str = interaction.options.getString('mensaje');
        let amount = interaction.options.getNumber('frecuencia') || 6;

        const embed = new EmbedBuilder()
        .setColor('#6CC4A1')
        .setDescription(str)
        .setFooter({ text: 'Este es un mensaje sticky.'});
        const data = await stickySchema.findOne({ ChannelID: interaction.channel.id })
        try{
            if (!data) {
                let msg = await interaction.channel.send({ embeds: [embed] });
                stickySchema.create(
                    {
                        ChannelID: interaction.channel.id,
                        Message: str,
                        MaxCount: amount.ChannelID,
                        LastMessageID: msg.id
                    }
                )
                return await interaction.reply({ content: 'Ya elimine el mensaje sticky. Ahora podes agregar otro (｡> ᴗ ☆｡) ‧₊˚ .', ephemeral: true });
            } else {
                await interaction.reply({ content: "Ya tenes un mensaje sticky establecido para este canal.\nPor favor, utiliza el comando `/unstick` para removerlo, y luego intentelo de nuevo.", ephemeral: true});
            } 
        } catch {
            return;
        }
    }
}