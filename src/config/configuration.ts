export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  crypt: {
    salt: process.env.CRYPT_SALT,
  },
});
