export default () => ({
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_DATABASE,
  },
  admin: {
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWD,
  },
});
