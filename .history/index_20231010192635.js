const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require(discord.js);
const preFix = '>';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("bot is online!");

    client.user.setActivity(`Hello uwu`, { type: "WATCHING" });
})