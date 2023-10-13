const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require(`discord.js`);
const preFix = '>';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("bot is online!");

    client.user.setActivity(`Hello uwu`, { type: "WATCHING" });
})

























client.login("MTE2MTQyNjYwNTk5MDc1MjI3Nw.GXm3uV.yiHRmJTN-Pns6TFUfUJ1hEqGNDuv5EvqSv7gTU");