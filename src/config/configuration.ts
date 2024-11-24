export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    db: process.env.PG_DB,
  },
  crypt: {
    salt: process.env.CRYPT_SALT,
  },
});
