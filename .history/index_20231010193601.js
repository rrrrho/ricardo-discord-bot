const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require(`discord.js`);
const prefix = '>';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("bot is online!");

    client.user.setActivity(`Hello uwu`, { type: "WATCHING" });
})

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // message array
    const messageArray = message.content.split(" ");
    const arguments = messageArray.slice(1);
    const cmd = messageArray[0];

    // commands
    if (command === 'test') {
        message.channel.send("Bot is working!");
    }

    // test command
















})























client.login("MTE2MTQyNjYwNTk5MDc1MjI3Nw.GXm3uV.yiHRmJTN-Pns6TFUfUJ1hEqGNDuv5EvqSv7gTU");