// require('ts-node/register');
require('dotenv/config.js')


module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
  migrationStorageTableName: "migrations",
  pool: {
    max: 2,
    min: 0,
    acquire: 3000,
    idle: 0
  },
  define: {
    freezeTableName: true
  }
};