export default () => ({
  token: process.env.TOKEN,
  allowGuilds: process.env.ALLOW_GUILDS,
  botPermissions: process.env.BOT_PERMISSIONS,
  twitterApiKey: process.env.TWITTER_API_KEY,
  twitterApiSecret: process.env.TWITTER_API_SECRET,
  twitterBearerToken: process.env.TWITTER_BEARER_TOKEN,
  twitterAllowedSearchAuthorIds: process.env.TWITTER_ALLOWED_SEARCH_AUTHOR_IDS
});
