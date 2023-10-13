/*
const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Remind dailies to users.')
    .addSubcommand(command => command.setName('set').setDescription('Set a reminder.').addStringOption(option => 
        option.setName('reminder').setDescription('What do you want to be reminded of').setRequired(true)).addIntegerOption(option => 
            option.setName('minutes').setDescription('how many minutes from now').setRequired(true).setMinValue(0).setMaxValue(59))
            .addIntegerOption(option => option.setName('hours').setDescription('how many hours from now').setRequired(false)
            .setMinValue(0).setMaxValue(23)).addIntegerOption(option => option.setName('days').setDescription('how many days from now')
            .setRequired(false).setMinValue(0).setMaxValue(31))), async execute (interaction) {
                const { options, guild } = interaction;
                const reminder = options.getString('reminder');
                const minutes = options.getInteger('minutes') || 0;
                const hours = options.getInteger('hours') || 0;
                const days = options.getInteger('days') || 0;

                let time = Date.now() + (day * 1000 * 60 * 60 * 24) + (hour * 1000 * 60 * 60) + (day * 1000 * 60);

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`🍟 Your reminder HAAAAAA <t:${Math.floor(time/1000)}:R>! i will eeeeeeee "${reminder}"`)

                await interaction.reply({ embeds: [embed], ephemeral: true})

            }
        }
        */