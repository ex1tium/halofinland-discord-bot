export default () => ({
  token: process.env.TOKEN,
  allowGuilds: process.env.ALLOW_GUILDS,
  botPermissions: process.env.BOT_PERMISSIONS,
});
