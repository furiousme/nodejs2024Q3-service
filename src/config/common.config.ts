export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  crypt: {
    salt: process.env.CRYPT_SALT,
  },
});
