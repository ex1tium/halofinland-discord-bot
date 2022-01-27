export default () => ({
  token: process.env.TOKEN,
  applicationId: process.env.APPLICATION_ID,
  allowGuilds: process.env.ALLOW_GUILDS,
  guildID: process.env.GUILD_ID,
  botPermissions: process.env.BOT_PERMISSIONS,
  twitterApiKey: process.env.TWITTER_API_KEY,
  twitterApiSecret: process.env.TWITTER_API_SECRET,
  twitterBearerToken: process.env.TWITTER_BEARER_TOKEN,
  twitterAllowedSearchAuthorIds: process.env.TWITTER_ALLOWED_SEARCH_AUTHOR_IDS,
  haloDotToken: process.env.HALO_DOT_TOKEN,
  haloDotGamertag: process.env.HALO_DOT_GAMERTAG
});
