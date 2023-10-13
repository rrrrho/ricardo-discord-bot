const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('this is the test command'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'The bot is working!'});
    }
}