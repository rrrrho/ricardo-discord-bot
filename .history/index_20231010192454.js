const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require(discord.js);
const preFix = '>';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent]});