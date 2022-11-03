export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoTestUri: process.env.TEST_MONGO_URI,
  tokenSecret: process.env.TOKEN_SECRET,
};
